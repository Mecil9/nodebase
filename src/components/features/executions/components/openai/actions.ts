/*
 * @Author: Mecil Meng
 * @Date: 2025-11-11 12:42:00
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-14 18:32:41
 * @FilePath: /nodebase/src/components/features/executions/components/openai/actions.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { openAiChannel } from "@/inngest/channels/openai";

export type OpenAiToken = Realtime.Token<typeof openAiChannel, ["status"]>;

export async function fetchOpenAiRealtimeToken(): Promise<OpenAiToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: openAiChannel(),
    topics: ["status"],
  });

  return token;
}
