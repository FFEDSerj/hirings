import { router, publicProcedure, protectedProcedure } from '../trpc';

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return await ctx.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        company: {
          select: {
            id: true,
            name: true,
            hirings: {
              select: {
                id: true,
                title: true,
                createdAt: true,
                mode: true,
                salary: true,
                position: true,
                description: true,
              },
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        },
      },
    });
  }),
});
