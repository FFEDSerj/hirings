import { protectedProcedure } from '../trpc';
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

const hiringIdInput = z.object({
  hiringId: z.string(),
});

const defaultHiringFiels = {
  createdAt: true,
  id: true,
  numberOfViews: true,
  title: true,
  updatedAt: true,
};

export const hiringRouter = router({
  getHirings: publicProcedure.query(
    async ({ ctx }) =>
      await ctx.prisma.hiring.findMany({
        orderBy: {
          numberOfViews: 'desc',
        },
        select: defaultHiringFiels,
      })
  ),
  updateViews: publicProcedure.input(hiringIdInput).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma.hiring.update({
        where: {
          id: input.hiringId,
        },
        data: {
          numberOfViews: { increment: 1 },
        },
      })
  ),
  getHiringDetails: protectedProcedure
    .input(
      z.object({
        hiringId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.hiringId) {
        return;
      }
      return await ctx.prisma.hiring.findUnique({
        where: { id: input.hiringId },
        select: {
          id: true,
          description: true,
          mode: true,
          company: true,
          position: true,
          salary: true,
          title: true,
        },
      });
    }),
  getHiringsByCompanyId: publicProcedure
    .input(z.object({ companyId: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      if (!input?.companyId) {
        return [];
      }
      return await ctx.prisma.hiring.findMany({
        where: { companyId: input.companyId },
        select: defaultHiringFiels,
      });
    }),
});
