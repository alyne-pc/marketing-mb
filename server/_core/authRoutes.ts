import type { Express, Request, Response } from "express";
import { authService } from "./auth";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./cookies";

export function registerAuthRoutes(app: Express) {
  /**
   * Register a new user
   */
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { email, password, name, area } = req.body;

      if (!email || !password || !name) {
        res.status(400).json({ error: "Email, password, and name are required" });
        return;
      }

      const user = await authService.registerUser(email, password, name, area);

      if (!user) {
        res.status(500).json({ error: "Failed to create user" });
        return;
      }

      // Create session token
      const sessionToken = await authService.createSessionToken(
        user.id,
        user.email || "",
        user.role,
        { expiresInMs: ONE_YEAR_MS }
      );

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("[Auth] Registration failed", error);
      res.status(400).json({ error: String(error) });
    }
  });

  /**
   * Login with email and password
   */
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const user = await authService.loginUser(email, password);

      // Create session token
      const sessionToken = await authService.createSessionToken(
        user.id,
        user.email || "",
        user.role,
        { expiresInMs: ONE_YEAR_MS }
      );

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("[Auth] Login failed", error);
      res.status(401).json({ error: "Invalid email or password" });
    }
  });

  /**
   * Logout
   */
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    try {
      const cookieOptions = getSessionCookieOptions(req);
      res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      res.json({ success: true });
    } catch (error) {
      console.error("[Auth] Logout failed", error);
      res.status(500).json({ error: "Logout failed" });
    }
  });
}
