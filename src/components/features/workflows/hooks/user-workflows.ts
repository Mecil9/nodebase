/*
 * @Author: Mecil Meng
 * @Date: 2025-11-05 12:04:02
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-05 16:30:59
 * @FilePath: /nodebase/src/components/features/workflows/hooks/user-workflows.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
/**
 * Hook to fetch all workflows using suspense
 */

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
};

// Hook to create a new workflow
export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data?.name}" created successfully`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions());
      },
      onError: (error) => {
        toast.error(`Failed to create workflow "${error?.message}"`);
      },
    })
  );
};
