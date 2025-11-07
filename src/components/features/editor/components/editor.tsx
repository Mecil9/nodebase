/*
 * @Author: Mecil Meng
 * @Date: 2025-11-07 12:47:53
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-07 12:50:19
 * @FilePath: /nodebase/src/components/features/editor/components/editor.tsx
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
"use client";

import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "../../workflows/hooks/use-workflows";

export const EditorLoading = () => {
  return <LoadingView message={"Loading workflow..."} />;
};

export const EditorError = () => {
  return <ErrorView message={"Error loading workflow"} />;
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  return <div>{JSON.stringify(workflow, null, 2)}</div>;
};
