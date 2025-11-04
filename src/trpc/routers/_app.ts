/*
 * @Author: Mecil Meng
 * @Date: 2025-11-04 01:04:30
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-04 22:17:44
 * @FilePath: /nodebase/src/trpc/routers/_app.ts
 * @Description: 应用程序路由
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import prisma from "@/lib/db";

import {
  baseProcedure,
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "../init";
import { inngest } from "@/inngest/client";
import { TRPCError } from "@trpc/server";

export const appRouter = createTRPCRouter({
  testAi: premiumProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });

    return { success: true, message: "Job queued." };
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "test@example.com",
      },
    });
    return {
      success: true,
      message: "workflow created",
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
