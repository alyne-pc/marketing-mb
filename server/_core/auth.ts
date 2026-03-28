import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { ONE_YEAR_MS } from "@shared/const";
import { ENV } from "./env";
import * as db from "../db";

export type SessionPayload = {
  userId: number;
  email: string;
  role: string;
};

class AuthService {
  private getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }

  /**
   * Hash a password using bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * Compare password with hash
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Create a session token for a user
   */
  async createSessionToken(
    userId: number,
    email: string,
    role: string,
    options: { expiresInMs?: number } = {}
  ): Promise<string> {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1000);
    const secretKey = this.getSessionSecret();

    return new SignJWT({
      userId,
      email,
      role,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(expirationSeconds)
      .sign(secretKey);
  }

  /**
   * Verify a session token
   */
  async verifySession(
    token: string | undefined | null
  ): Promise<SessionPayload | null> {
    if (!token) {
      console.warn("[Auth] Missing session token");
      return null;
    }

    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(token, secretKey, {
        algorithms: ["HS256"],
      });

      const { userId, email, role } = payload as Record<string, unknown>;

      if (
        typeof userId !== "number" ||
        typeof email !== "string" ||
        typeof role !== "string"
      ) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }

      return {
        userId,
        email,
        role,
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }

  /**
   * Register a new user
   */
  async registerUser(
    email: string,
    password: string,
    name: string,
    area?: string
  ) {
    // Check if user already exists
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await this.hashPassword(password);

    // Create user
    const user = await db.createUser({
      email,
      password: hashedPassword,
      name,
      area,
      openId: `user_${Date.now()}`, // Generate a unique openId
      role: "user",
    });

    return user;
  }

  /**
   * Login user with email and password
   */
  async loginUser(email: string, password: string) {
    const user = await db.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.password) {
      throw new Error("User has no password set");
    }

    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Update last signed in
    await db.updateUserLastSignedIn(user.id);

    return user;
  }
}

export const authService = new AuthService();
