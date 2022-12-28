import { protectedProcedure } from '../trpc';
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

const hiringIdInput = z.object({
  hiringId: z.string(),
});

export const hiringRouter = router({
  getHirings: publicProcedure.query(({ ctx }) =>
    ctx.prisma.hiring.findMany({
      orderBy: {
        numberOfViews: 'desc',
      },
      select: {
        createdAt: true,
        id: true,
        numberOfViews: true,
        title: true,
        updatedAt: true,
      },
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
});
