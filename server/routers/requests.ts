import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import {
  createRequest,
  getPendingRequests,
  getAllRequests,
  approveRequest,
  rejectRequest,
  markAsDelivered,
  getOrCreateAreaStats,
} from "../db";

export const requestsRouter = router({
  /**
   * Create a new t-shirt request
   */
  create: protectedProcedure
    .input(
      z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        matricula: z.string().min(1),
        area: z.string().min(1),
        size: z.enum(["P", "M", "G", "GG"]),
        model: z.enum(["tradicional", "baby-look"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Ensure area stats exist
      await getOrCreateAreaStats(input.area);

      await createRequest({
        userId: ctx.user.id,
        fullName: input.fullName,
        email: input.email,
        matricula: input.matricula,
        area: input.area,
        size: input.size,
        model: input.model,
        status: "aguardando",
      });

      return {
        success: true,
      };
    }),

  /**
   * Get all pending requests (for manager dashboard)
   */
  getPending: protectedProcedure.query(async ({ ctx }) => {
    // Only managers and admins can view pending requests
    if (ctx.user.role !== "manager" && ctx.user.role !== "admin") {
      return [];
    }

    return await getPendingRequests();
  }),

  /**
   * Get all requests (for manager dashboard)
   */
  getAll: protectedProcedure.query(async ({ ctx }) => {
    // Only managers and admins can view all requests
    if (ctx.user.role !== "manager" && ctx.user.role !== "admin") {
      return [];
    }

    return await getAllRequests();
  }),

  /**
   * Approve a request
   */
  approve: protectedProcedure
    .input(
      z.object({
        requestId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Only managers and admins can approve
      if (ctx.user.role !== "manager" && ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      await approveRequest(input.requestId, ctx.user.id);

      return {
        success: true,
      };
    }),

  /**
   * Reject a request
   */
  reject: protectedProcedure
    .input(
      z.object({
        requestId: z.number(),
        reason: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Only managers and admins can reject
      if (ctx.user.role !== "manager" && ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      await rejectRequest(input.requestId, input.reason);

      return {
        success: true,
      };
    }),

  /**
   * Mark request as delivered
   */
  markDelivered: protectedProcedure
    .input(
      z.object({
        requestId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Only managers and admins can mark as delivered
      if (ctx.user.role !== "manager" && ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      await markAsDelivered(input.requestId, ctx.user.id);

      return {
        success: true,
      };
    }),
});
