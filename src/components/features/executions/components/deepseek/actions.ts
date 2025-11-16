/*
 * @Author: Mecil Meng
 * @Date: 2025-11-11 12:42:00
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-14 14:29:16
 * @FilePath: /nodebase/src/components/features/executions/components/deepseek/actions.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { deepseekChannel } from "@/inngest/channels/deepseek";

export type DeepSeekToken = Realtime.Token<typeof deepseekChannel, ["status"]>;

export async function fetchDeepSeekRealtimeToken(): Promise<DeepSeekToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: deepseekChannel(),
    topics: ["status"],
  });

  return token;
}
