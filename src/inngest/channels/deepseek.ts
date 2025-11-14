/*
 * @Author: Mecil Meng
 * @Date: 2025-11-11 10:56:56
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-14 14:29:30
 * @FilePath: /nodebase/src/inngest/channels/deepseek.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { channel, topic } from "@inngest/realtime";

export const DEEPSEEK_CHANNEL_NAME = "deepseek-execution";

export const deepseekChannel = channel(DEEPSEEK_CHANNEL_NAME).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
