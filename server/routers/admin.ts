import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getAllManagers, upsertManager, getInventory, updateInventory, updateInventoryCost } from "../db";
import { TRPCError } from "@trpc/server";

/**
 * Admin router - restricted to admin/owner only
 */
export const adminRouter = router({
  // Get all managers (public for form population)
  getManagers: protectedProcedure.query(async () => {
    return await getAllManagers();
  }),

  // Create or update manager (admin only)
  upsertManager: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        area: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can manage managers",
        });
      }
      await upsertManager(input);
      return { success: true };
    }),

  // Get inventory (admin only)
  getInventory: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Only admins can access this",
      });
    }
    return await getInventory();
  }),

  // Update inventory quantity (admin only)
  updateInventoryQuantity: protectedProcedure
    .input(
      z.object({
        size: z.enum(["P", "M", "G", "GG"]),
        quantity: z.number().min(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can update inventory",
        });
      }
      await updateInventory(input.size, input.quantity);
      return { success: true };
    }),

  // Update inventory cost per unit (admin only)
  updateInventoryCost: protectedProcedure
    .input(
      z.object({
        size: z.enum(["P", "M", "G", "GG"]),
        costPerUnit: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can update inventory",
        });
      }
      await updateInventoryCost(input.size, input.costPerUnit);
      return { success: true };
    }),
});
