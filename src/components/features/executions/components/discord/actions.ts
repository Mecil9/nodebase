/*
 * @Author: Mecil Meng
 * @Date: 2025-11-11 12:42:00
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-24 23:19:01
 * @FilePath: /nodebase/src/components/features/executions/components/discord/actions.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { discordChannel } from "@/inngest/channels/discord";

export type DiscordToken = Realtime.Token<typeof discordChannel, ["status"]>;

export async function fetchDiscordRealtimeToken(): Promise<DiscordToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: discordChannel(),
    topics: ["status"],
  });

  return token;
}
