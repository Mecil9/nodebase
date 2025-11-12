/*
 * @Author: Mecil Meng
 * @Date: 2025-11-11 10:56:56
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-12 16:09:53
 * @FilePath: /nodebase/src/inngest/channels/google-form-trigger.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { channel, topic } from "@inngest/realtime";

export const GOOGLE_FORM_TRIGGER_CHANNEL_NAME = "google-form-trigger-execution";

export const googleFormTriggerChannel = channel(
  GOOGLE_FORM_TRIGGER_CHANNEL_NAME
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
