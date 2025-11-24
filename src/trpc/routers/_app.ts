/*
 * @Author: Mecil Meng
 * @Date: 2025-11-04 01:04:30
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-18 12:26:27
 * @FilePath: /nodebase/src/trpc/routers/_app.ts
 * @Description: 应用程序路由
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */

import { credentialsRouter } from "@/components/features/credentials/server/routers";
import { createTRPCRouter } from "../init";
import { workflowsRouter } from "@/components/features/workflows/server/routers";

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
  credentials: credentialsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
