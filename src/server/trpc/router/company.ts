import { protectedProcedure } from './../trpc';
import { router } from '../trpc';
import { type Prisma } from '@prisma/client';
import { z } from 'zod';

const transformBudget = (budget: Prisma.Decimal) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(+budget * 1000);
};

export const companyRouter = router({
  getCompanies: protectedProcedure.query(async ({ ctx }) => {
    const companies = await ctx.prisma.company.findMany({
      select: {
        id: true,
        budget: true,
        ceo: true,
        name: true,
        staff: true,
        _count: true,
      },
    });
    return companies.map(c => {
      const budget = c.budget ? transformBudget(c.budget) : null;
      return {
        ...c,
        budget,
      };
    });
  }),
  createCompany: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(2, 'Must contain at least 2 characters long')
          .trim(),
        ceo: z.string().trim().nullish(),
        email: z.string().email('Please provide valid Email'),
        staff: z.number().nullish(),
        budget: z.number().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return await ctx.prisma.company.create({
        data: {
          ...input,
          user: {
            connect: { id: userId },
          },
        },
      });
    }),
});
