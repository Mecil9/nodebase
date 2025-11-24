/*
 * @Author: Mecil Meng
 * @Date: 2025-11-09 23:53:45
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-25 00:17:30
 * @FilePath: /nodebase/src/components/features/executions/components/slack/executor.ts
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
import { slackChannel } from "@/inngest/channels/slack";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type SlackData = {
  variableName?: string;
  webhookUrl?: string;
  content?: string;
};

export const slackExecutor: NodeExecutor<SlackData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(slackChannel().status({ nodeId, status: "loading" }));

  if (!data.content) {
    await publish(slackChannel().status({ nodeId, status: "error" }));
    throw new NonRetriableError("Slack node: content is required");
  }

  const rawContent = Handlebars.compile(data.content)(context);
  const content = decode(rawContent);

  try {
    const result = await step.run("slack-webhook", async () => {
      if (!data.webhookUrl) {
        await publish(slackChannel().status({ nodeId, status: "error" }));
        throw new NonRetriableError("Slack node: webhookUrl is required");
      }

      await ky.post(data.webhookUrl, {
        json: {
          content: content, // The key depends on workflow config
        },
      });

      if (!data.variableName) {
        await publish(slackChannel().status({ nodeId, status: "error" }));
        throw new NonRetriableError("Slack node: variableName is required");
      }

      return {
        ...context,
        [data.variableName]: {
          messageContent: content.slice(0, 2000),
        },
      };
    });

    await publish(slackChannel().status({ nodeId, status: "success" }));

    return result;
  } catch (error) {
    await publish(slackChannel().status({ nodeId, status: "error" }));
    throw error;
  }
};
