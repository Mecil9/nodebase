/*
 * @Author: Mecil Meng
 * @Date: 2025-11-09 23:53:45
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-09 23:57:15
 * @FilePath: /nodebase/src/components/features/triggers/components/manual-trigger/executor.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import type { NodeExecutor } from "@/components/features/executions/types";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
  nodeId,
  context,
  step,
}) => {
  // TODO: Publish "loading" state for manual trigger

  const result = await step.run("manual-trigger", async () => context);

  // Todo: Publish "success state for manual trigger"

  return result;
};
