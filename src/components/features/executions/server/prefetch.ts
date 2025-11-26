/*
 * @Author: Mecil Meng
 * @Date: 2025-11-24 22:35:58
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-25 11:17:29
 * @FilePath: /nodebase/src/components/features/executions/server/prefetch.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.executions.getMany>;

// Prefetch all executions
export const prefetchExecutions = (params: Input) => {
  return prefetch(trpc.executions.getMany.queryOptions(params));
};

export const prefetchExecution = (id: string) => {
  return prefetch(trpc.executions.getOne.queryOptions({ id }));
};
