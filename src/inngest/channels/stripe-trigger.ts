/*
 * @Author: Mecil Meng
 * @Date: 2025-11-11 10:56:56
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-12 19:27:09
 * @FilePath: /nodebase/src/inngest/channels/stripe-trigger.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { channel, topic } from "@inngest/realtime";

export const STRIPE_TRIGGER_CHANNEL_NAME = "stripe-trigger-execution";

export const stripeTriggerChannel = channel(
  STRIPE_TRIGGER_CHANNEL_NAME
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
