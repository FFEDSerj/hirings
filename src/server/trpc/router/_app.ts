import { hiringRouter } from './hiring';
import { router } from "../trpc";
import { authRouter } from "./auth";
import { companyRouter } from './company';

export const appRouter = router({
  auth: authRouter,
  hiring: hiringRouter,
  company: companyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
