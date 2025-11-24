/*
 * @Author: Mecil Meng
 * @Date: 2025-11-11 12:42:00
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-25 00:04:54
 * @FilePath: /nodebase/src/components/features/executions/components/slack/actions.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { discordChannel } from "@/inngest/channels/discord";
import { slackChannel } from "@/inngest/channels/slack";

export type SlackToken = Realtime.Token<typeof slackChannel, ["status"]>;

export async function fetchSlackRealtimeToken(): Promise<SlackToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: slackChannel(),
    topics: ["status"],
  });

  return token;
}
