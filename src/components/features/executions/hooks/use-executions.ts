/*
 * @Author: Mecil Meng
 * @Date: 2025-11-24 22:35:58
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-25 11:31:29
 * @FilePath: /nodebase/src/components/features/executions/hooks/use-executions.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
/**
 * Hook to fetch all executions using suspense
 */

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useExecutionsParams } from "./use-executions-params";

export const useSuspenseExecutions = () => {
  const trpc = useTRPC();
  const [params] = useExecutionsParams();

  return useSuspenseQuery(trpc.executions.getMany.queryOptions(params));
};

/**
 * Hook to fetch a single execution using suspense
 */
export const useSuspenseExecution = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.executions.getOne.queryOptions({ id }));
};
