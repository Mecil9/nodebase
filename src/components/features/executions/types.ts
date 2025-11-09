/*
 * @Author: Mecil Meng
 * @Date: 2025-11-09 23:41:29
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-09 23:49:44
 * @FilePath: /nodebase/src/components/features/executions/types.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import type { GetStepTools, Inngest } from "inngest";

export type WorkflowContext = Record<string, unknown>;

export type StepTools = GetStepTools<Inngest.Any>;

export interface NodeExecutorParams<TData = Record<string, unknown>> {
  data: TData;
  nodeId: string;
  context: WorkflowContext;
  step: StepTools;
  //publish: Todo add reltime later
}

export type NodeExecutor<TData = Record<string, unknown>> = (
  params: NodeExecutorParams<TData>
) => Promise<WorkflowContext>;
