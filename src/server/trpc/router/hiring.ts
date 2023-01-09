import { FormData } from './../../../types/AddHiringForm/types';
import { protectedProcedure } from '../trpc';
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { companyIdInput } from './company';

const hiringIdInput = z.object({
  hiringId: z.string(),
});

const defaultHiringFiels = Prisma.validator<Prisma.HiringSelect>()({
  createdAt: true,
  id: true,
  numberOfViews: true,
  title: true,
  updatedAt: true,
});

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
    .input(companyIdInput)
    .query(async ({ ctx, input }) => {
      if (!input?.companyId) {
        return [];
      }
      return await ctx.prisma.hiring.findMany({
        where: { companyId: input.companyId },
        select: defaultHiringFiels,
      });
    }),
  addNewHiring: protectedProcedure
    .input(FormData.merge(z.object({ companyId: z.number() })))
    .mutation(async ({ ctx, input }) => {
      const { companyId, ...hiringData } = input;
      return await ctx.prisma.hiring.create({
        data: {
          ...hiringData,
          companyId,
        },
      });
    }),
  deleteHiring: protectedProcedure.input(z.object({ id: z.string() })).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma.hiring.delete({
        where: {
          id: input.id,
        },
      })
  ),
});
