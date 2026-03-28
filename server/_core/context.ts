import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { authService } from "./auth";
import { COOKIE_NAME } from "@shared/const";
import * as db from "../db";
import { parse as parseCookieHeader } from "cookie";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    // Parse cookies from request
    const cookieHeader = opts.req.headers.cookie;
    if (!cookieHeader) {
      return { req: opts.req, res: opts.res, user: null };
    }

    const cookies = parseCookieHeader(cookieHeader);
    const sessionToken = cookies[COOKIE_NAME];

    if (!sessionToken) {
      return { req: opts.req, res: opts.res, user: null };
    }

    // Verify session token
    const session = await authService.verifySession(sessionToken);
    if (!session) {
      return { req: opts.req, res: opts.res, user: null };
    }

    // Get user from database
    user = (await db.getUserById(session.userId)) || null;
  } catch (error) {
    // Authentication is optional for public procedures.
    console.warn("[Context] Authentication error:", error);
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
