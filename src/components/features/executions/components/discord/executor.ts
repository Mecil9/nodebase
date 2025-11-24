/*
 * @Author: Mecil Meng
 * @Date: 2025-11-09 23:53:45
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-24 23:44:01
 * @FilePath: /nodebase/src/components/features/executions/components/discord/executor.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import Handlebars from "handlebars";
import { decode } from "html-entities";
import type { NodeExecutor } from "@/components/features/executions/types";
import { NonRetriableError } from "inngest";
import { discordChannel } from "@/inngest/channels/discord";
import ky from "ky";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type DiscordData = {
  variableName?: string;
  webhookUrl?: string;
  content?: string;
  username?: string;
};

export const discordExecutor: NodeExecutor<DiscordData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(discordChannel().status({ nodeId, status: "loading" }));

  if (!data.content) {
    await publish(discordChannel().status({ nodeId, status: "error" }));
    throw new NonRetriableError("Discord node: content is required");
  }

  const rawContent = Handlebars.compile(data.content)(context);
  const content = decode(rawContent);
  const username = data.username
    ? decode(Handlebars.compile(data.username)(context))
    : undefined;

  try {
    const result = await step.run("discord-webhook", async () => {
      if (!data.webhookUrl) {
        await publish(discordChannel().status({ nodeId, status: "error" }));
        throw new NonRetriableError("Discord node: webhookUrl is required");
      }

      await ky.post(data.webhookUrl, {
        json: {
          content: content.slice(0, 2000), // Discord's max message length
          username,
        },
      });

      if (!data.variableName) {
        await publish(discordChannel().status({ nodeId, status: "error" }));
        throw new NonRetriableError("Discord node: variableName is required");
      }

      return {
        ...context,
        [data.variableName]: {
          messageContent: content.slice(0, 2000),
        },
      };
    });

    await publish(discordChannel().status({ nodeId, status: "success" }));

    return result;
  } catch (error) {
    await publish(discordChannel().status({ nodeId, status: "error" }));
    throw error;
  }
};
