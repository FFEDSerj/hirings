import { hiringRouter } from './hiring';
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  hiring: hiringRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
