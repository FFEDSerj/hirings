import { router, publicProcedure } from "../trpc";

export const hiringRouter = router({
  getHirings: publicProcedure.query(({ ctx }) => ctx.prisma.hiring.findMany()),
  
});
