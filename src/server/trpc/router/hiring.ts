import { router, publicProcedure } from '../trpc';

export const hiringRouter = router({
  getHirings: publicProcedure.query(({ ctx }) =>
    ctx.prisma.hiring.findMany({
      select: {
        createdAt: true,
        id: true,
        numberOfViews: true,
        title: true,
        updatedAt: true,
      },
    })
  ),
});
