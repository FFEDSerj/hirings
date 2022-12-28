import { router, publicProcedure } from '../trpc';
import { type Prisma } from '@prisma/client';

const transformBudget = (budget: Prisma.Decimal) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(+budget * 1000);
};

export const companyRouter = router({
  getCompanies: publicProcedure.query(async ({ ctx }) => {
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
});
