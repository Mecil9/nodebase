/*
 * @Author: Mecil Meng
 * @Date: 2025-11-05 12:08:33
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-05 12:15:27
 * @FilePath: /nodebase/src/components/features/workflows/server/prefetch.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.workflows.getMany>;

// Prefetch all workflows
export const prefetchWorkflows = (params: Input) => {
  return prefetch(trpc.workflows.getMany.queryOptions(params));
};
