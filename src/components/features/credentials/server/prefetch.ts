/*
 * @Author: Mecil Meng
 * @Date: 2025-11-05 12:08:33
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-18 20:09:09
 * @FilePath: /nodebase/src/components/features/credentials/server/prefetch.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.credentials.getMany>;

// Prefetch all credentials
export const prefetchCredentials = (params: Input) => {
  return prefetch(trpc.credentials.getMany.queryOptions(params));
};

export const prefetchCredential = (id: string) => {
  return prefetch(trpc.credentials.getOne.queryOptions({ id }));
};
