/*
 * @Author: Mecil Meng
 * @Date: 2025-11-11 10:56:56
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-11 14:05:48
 * @FilePath: /nodebase/src/inngest/channels/http-request.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { channel, topic } from "@inngest/realtime";

export const GEMINI_CHANNEL_NAME = "gemini-execution";

export const geminiChannel = channel(GEMINI_CHANNEL_NAME).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
