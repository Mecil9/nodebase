/*
 * @Author: Mecil Meng
 * @Date: 2025-11-09 23:53:45
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-14 18:39:11
 * @FilePath: /nodebase/src/components/features/executions/components/deepseek/executor.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import Handlebars from "handlebars";
import type { NodeExecutor } from "@/components/features/executions/types";
import { NonRetriableError } from "inngest";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { generateText } from "ai";
import { deepseekChannel } from "@/inngest/channels/deepseek";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type DeepSeekData = {
  variableName?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

export const deepseekExecutor: NodeExecutor<DeepSeekData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(deepseekChannel().status({ nodeId, status: "loading" }));

  if (!data.variableName) {
    await publish(deepseekChannel().status({ nodeId, status: "error" }));
    throw new NonRetriableError("Gemini node: variableName is required");
  }

  if (!data.userPrompt) {
    await publish(deepseekChannel().status({ nodeId, status: "error" }));
    throw new NonRetriableError("Gemini node: userPrompt is required");
  }

  const systemPrompt = data.systemPrompt
    ? Handlebars.compile(data.systemPrompt)(context)
    : "You are a helpful assistant";
  const userPrompt = Handlebars.compile(data.userPrompt)(context);

  // Todo: fetch credential that user selected
  const credentialValue = process.env.DEEPSEEK_API_KEY;
  const deepseek = createDeepSeek({
    apiKey: credentialValue,
  });

  try {
    const { steps } = await step.ai.wrap(
      "deepseek-generate-text",
      generateText,
      {
        model: deepseek("deepseek-chat"),
        system: systemPrompt,
        prompt: userPrompt,
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const text =
      steps[0].content[0].type === "text" ? steps[0].content[0].text : "";

    await publish(deepseekChannel().status({ nodeId, status: "success" }));

    return {
      ...context,
      [data.variableName]: {
        aiResponse: text,
      },
    };
  } catch (error) {
    await publish(deepseekChannel().status({ nodeId, status: "error" }));
    throw error;
  }
};
