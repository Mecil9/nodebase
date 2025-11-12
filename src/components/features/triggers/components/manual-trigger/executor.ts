/*
 * @Author: Mecil Meng
 * @Date: 2025-11-09 23:53:45
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-11 14:15:53
 * @FilePath: /nodebase/src/components/features/triggers/components/manual-trigger/executor.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import type { NodeExecutor } from "@/components/features/executions/types";
import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  // Publish "loading" state for manual trigger
  await publish(
    manualTriggerChannel().status({
      nodeId,
      status: "loading",
    })
  );

  const result = await step.run("manual-trigger", async () => context);

  // Publish "success" state for manual trigger
  await publish(
    manualTriggerChannel().status({
      nodeId,
      status: "success",
    })
  );

  return result;
};
