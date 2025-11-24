/*
 * @Author: Mecil Meng
 * @Date: 2025-11-09 23:53:45
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-24 22:46:35
 * @FilePath: /nodebase/src/components/features/executions/components/openai/executor.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import Handlebars from "handlebars";
import type { NodeExecutor } from "@/components/features/executions/types";
import { NonRetriableError } from "inngest";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { openAiChannel } from "@/inngest/channels/openai";
import prisma from "@/lib/db";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type OpenAiData = {
  variableName?: string;
  credentialId?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

export const openAiExecutor: NodeExecutor<OpenAiData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  await publish(openAiChannel().status({ nodeId, status: "loading" }));

  if (!data.variableName) {
    await publish(openAiChannel().status({ nodeId, status: "error" }));
    throw new NonRetriableError("OpenAi node: variableName is required");
  }

  if (!data.credentialId) {
    await publish(openAiChannel().status({ nodeId, status: "error" }));
    throw new NonRetriableError("OpenAi node: credentialId is required");
  }

  if (!data.userPrompt) {
    await publish(openAiChannel().status({ nodeId, status: "error" }));
    throw new NonRetriableError("OpenAi node: userPrompt is required");
  }

  const systemPrompt = data.systemPrompt
    ? Handlebars.compile(data.systemPrompt)(context)
    : "You are a helpful assistant";
  const userPrompt = Handlebars.compile(data.userPrompt)(context);

  const credential = await step.run("get-credential", async () => {
    return prisma.credential.findUnique({
      where: {
        id: data.credentialId,
        userId,
      },
    });
  });

  if (!credential) {
    await publish(openAiChannel().status({ nodeId, status: "error" }));
    throw new NonRetriableError("OpenAi node: credential not found");
  }

  const openAi = createOpenAI({
    apiKey: credential?.value,
  });

  try {
    const { steps } = await step.ai.wrap("openai-generate-text", generateText, {
      model: openAi("gpt-4"),
      system: systemPrompt,
      prompt: userPrompt,
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    const text =
      steps[0].content[0].type === "text" ? steps[0].content[0].text : "";

    await publish(openAiChannel().status({ nodeId, status: "success" }));

    return {
      ...context,
      [data.variableName]: {
        aiResponse: text,
      },
    };
  } catch (error) {
    await publish(openAiChannel().status({ nodeId, status: "error" }));
    throw error;
  }
};
