import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, requests, inventory, areaStats, InsertRequest } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a new t-shirt request
 */
export async function createRequest(data: InsertRequest) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  const result = await db.insert(requests).values(data);
  return result;
}

/**
 * Get all pending requests (for manager dashboard)
 */
export async function getPendingRequests() {
  const db = await getDb();
  if (!db) {
    return [];
  }
  
  return await db
    .select()
    .from(requests)
    .where(eq(requests.status, "aguardando"))
    .orderBy(desc(requests.createdAt));
}

/**
 * Get all requests with any status
 */
export async function getAllRequests() {
  const db = await getDb();
  if (!db) {
    return [];
  }
  
  return await db.select().from(requests).orderBy(desc(requests.createdAt));
}

/**
 * Approve a request
 */
export async function approveRequest(requestId: number, managerId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  const req = await db.select().from(requests).where(eq(requests.id, requestId)).limit(1);
  if (!req.length) {
    throw new Error("Request not found");
  }
  
  const request = req[0];
  
  // Update request status
  await db
    .update(requests)
    .set({
      status: "aprovada",
      approvedBy: managerId,
      approvedAt: new Date(),
    })
    .where(eq(requests.id, requestId));
  
  // Decrease inventory - get current quantity first
  const invItem = await db
    .select()
    .from(inventory)
    .where(eq(inventory.size, request.size as any))
    .limit(1);
  
  if (invItem.length > 0) {
    await db
      .update(inventory)
      .set({
        quantity: Math.max(0, invItem[0].quantity - 1),
      })
      .where(eq(inventory.size, request.size as any));
  }
  
  // Update area stats
  const cost = await db
    .select({ costPerUnit: inventory.costPerUnit })
    .from(inventory)
    .where(eq(inventory.size, request.size as any))
    .limit(1);
  
  const costPerUnit = cost[0]?.costPerUnit ? parseFloat(cost[0].costPerUnit.toString()) : 0;
  
  // Get current area stats
  const currentStats = await db
    .select()
    .from(areaStats)
    .where(eq(areaStats.area, request.area))
    .limit(1);
  
  if (currentStats.length > 0) {
    const newSpent = parseFloat(currentStats[0].totalSpent.toString()) + costPerUnit;
    await db
      .update(areaStats)
      .set({
        totalShirts: currentStats[0].totalShirts + 1,
        totalSpent: newSpent.toString(),
      })
      .where(eq(areaStats.area, request.area));
  } else {
    // Create new area stats if doesn't exist
    await db.insert(areaStats).values({
      area: request.area,
      totalShirts: 1,
      totalSpent: costPerUnit.toString(),
    });
  }
}

/**
 * Reject a request
 */
export async function rejectRequest(requestId: number, reason: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  await db
    .update(requests)
    .set({
      status: "rejeitada",
      rejectionReason: reason,
    })
    .where(eq(requests.id, requestId));
}

/**
 * Mark request as delivered
 */
export async function markAsDelivered(requestId: number, deliveredBy: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  await db
    .update(requests)
    .set({
      status: "entregue",
      deliveredBy,
      deliveredAt: new Date(),
    })
    .where(eq(requests.id, requestId));
}

/**
 * Get inventory
 */
export async function getInventory() {
  const db = await getDb();
  if (!db) {
    return [];
  }
  
  return await db.select().from(inventory).orderBy(inventory.size);
}

/**
 * Get area statistics
 */
export async function getAreaStats() {
  const db = await getDb();
  if (!db) {
    return [];
  }
  
  return await db.select().from(areaStats).orderBy(desc(areaStats.totalSpent));
}

/**
 * Get or create area stats
 */
export async function getOrCreateAreaStats(area: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  const existing = await db
    .select()
    .from(areaStats)
    .where(eq(areaStats.area, area))
    .limit(1);
  
  if (existing.length > 0) {
    return existing[0];
  }
  
  await db.insert(areaStats).values({
    area,
    totalShirts: 0,
    totalSpent: "0",
  });
  
  const created = await db
    .select()
    .from(areaStats)
    .where(eq(areaStats.area, area))
    .limit(1);
  
  return created[0];
}
