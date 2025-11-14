/*
 * @Author: Mecil Meng
 * @Date: 2025-11-11 12:42:00
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-14 12:11:34
 * @FilePath: /nodebase/src/components/features/executions/components/gemini/actions.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { geminiChannel } from "@/inngest/channels/gemini";

export type GeminiToken = Realtime.Token<typeof geminiChannel, ["status"]>;

export async function fetchGeminiRealtimeToken(): Promise<GeminiToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: geminiChannel(),
    topics: ["status"],
  });

  return token;
}
