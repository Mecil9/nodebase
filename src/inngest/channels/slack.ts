/*
 * @Author: Mecil Meng
 * @Date: 2025-11-24 23:18:15
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-25 00:04:10
 * @FilePath: /nodebase/src/inngest/channels/slack.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { channel, topic } from "@inngest/realtime";

export const SLACK_CHANNEL_NAME = "slack-execution";

export const slackChannel = channel(SLACK_CHANNEL_NAME).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>()
);
