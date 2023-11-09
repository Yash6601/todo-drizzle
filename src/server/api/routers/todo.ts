import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {z} from "zod";
import { tasks} from "~/server/db/schema";
import {eq} from "drizzle-orm";


export const taskRouter = createTRPCRouter({
  list: publicProcedure.query(({ctx})=>{

    return ctx.db.query.tasks.findMany();
  }),
  add: publicProcedure.input(z.object({
    title: z.string().min(1)
  })).mutation(async ({ctx, input})=>{

    await ctx.db.insert(tasks).values({
      title: input.title,
    });
    // remove: publicProcedure.input(z.object({
    //   taskID: z.bigint()
    // })).mutation(async ({ctx, input})=>{
    //
    //   await ctx.db.delete(tasks).where(eq(tasks.id,{taskID:  input.key} ));
    //   );

  }),
  deleteMutation: publicProcedure.input(z.object({
    id: z.number()}))
    .mutation(async ({ ctx, input }) => {
    const { id } = input;
    // const taskToDelete = await ctx.db.query.tasks.findMany({
    //   where: (tasks,{eq})=>(eq(tasks.id, id)),
    //   with:{
    //     id: true
    //   }
    // });
    await ctx.db.delete(tasks).where(eq(tasks.id,id));
  }),
});