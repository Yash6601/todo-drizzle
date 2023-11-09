// import { todoRouter } from "~/server/api/routers/todo";
// import { createTRPCRouter } from "~/server/api/trpc";
//
// /**
//  * This is the primary router for your server.
//  *
//  * All routers added in /api/routers should be manually added here.
//  */
// export const appRouter = createTRPCRouter({
//   post: todoRouter,
// });
//
// // export type definition of API
// export type AppRouter = typeof appRouter;

import { createTRPCRouter } from "~/server/api/trpc";
import {taskRouter} from "~/server/api/routers/todo";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({

  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;