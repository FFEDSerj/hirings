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

export const companyIdInput = z.object({ companyId: z.number().optional() });

const upsertCompanyInput = z.object({
  name: z.string().min(2, 'Must contain at least 2 characters long').trim(),
  ceo: z.string().trim().nullish(),
  email: z.string().email('Please provide valid Email'),
  staff: z.number().nullish(),
  budget: z.number().nullish(),
});

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
  getCompanyDetails: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const result = await ctx.prisma.company.findFirst({
      where: { user: { id: { equals: userId } } },
      select: {
        name: true,
        ceo: true,
        staff: true,
        email: true,
        budget: true,
        id: true,
      },
    });
    if (result) {
      return {
        ...result,
        ceo: result?.ceo ? result.ceo : '',
        staff: result?.staff ? result.staff : 1,
        transformedBudget: result?.budget ? transformBudget(result.budget) : '',
        budget: result?.budget ? Number(result.budget) : 0,
      };
    }
  }),
  createCompany: protectedProcedure
    .input(upsertCompanyInput)
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
  updateCompanyInfo: protectedProcedure
    .input(upsertCompanyInput.merge(companyIdInput.required()))
    .mutation(async ({ ctx, input }) => {
      const { companyId, ...data } = input;

      return await ctx.prisma.company.update({
        where: {
          id: companyId,
        },
        data,
      });
    }),
  deleteCompany: protectedProcedure.input(companyIdInput.required()).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma.company.delete({
        where: {
          id: input.companyId,
        },
      })
  ),
});
