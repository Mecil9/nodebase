/*
 * @Author: Mecil Meng
 * @Date: 2025-11-09 23:53:45
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-12 19:31:11
 * @FilePath: /nodebase/src/components/features/triggers/components/stripe-trigger/executor.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import type { NodeExecutor } from "@/components/features/executions/types";
import { stripeTriggerChannel } from "@/inngest/channels/stripe-trigger";

type StripeTriggerData = Record<string, unknown>;

export const stripeTriggerExecutor: NodeExecutor<StripeTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  // Publish "loading" state for manual trigger
  await publish(
    stripeTriggerChannel().status({
      nodeId,
      status: "loading",
    })
  );

  const result = await step.run("stripe-trigger", async () => context);

  // Publish "success" state for stripe trigger
  await publish(
    stripeTriggerChannel().status({
      nodeId,
      status: "success",
    })
  );

  return result;
};
