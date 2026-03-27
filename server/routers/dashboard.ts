import { protectedProcedure, router } from "../_core/trpc";
import { getInventory, getAreaStats } from "../db";

export const dashboardRouter = router({
  /**
   * Get inventory data
   */
  getInventory: protectedProcedure.query(async ({ ctx }) => {
    // Only managers and admins can view inventory
    if (ctx.user.role !== "manager" && ctx.user.role !== "admin") {
      return [];
    }

    return await getInventory();
  }),

  /**
   * Get area statistics
   */
  getAreaStats: protectedProcedure.query(async ({ ctx }) => {
    // Only managers and admins can view area stats
    if (ctx.user.role !== "manager" && ctx.user.role !== "admin") {
      return [];
    }

    return await getAreaStats();
  }),
});
