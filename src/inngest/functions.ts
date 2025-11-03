import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import * as Sentry from "@sentry/nextjs";

import http from "http";
import HttpsProxyAgent from "https-proxy-agent";

// Explicitly pass API key to ensure the provider works even if env var name differs
const google = createGoogleGenerativeAI({
  apiKey:
    process.env.GOOGLE_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
const deepseek = createDeepSeek();
const openai = createOpenAI();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend", "5s");

    Sentry.logger.info("User triggered test log", {
      log_source: "sentry_test",
    });

    const { steps: deepseekSteps } = await step.ai.wrap(
      "deepseek-generate-text",
      generateText,
      {
        model: deepseek("deepseek-chat"),
        system: "You are a helpful assistant.",
        prompt: "What is 2 + 2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    // const { steps: openAiSteps } = await step.ai.wrap(
    //   "openai-generate-text",
    //   generateText,
    //   {
    //     model: openai("gpt-4"),
    //     system: "You are a helpful assistant.",
    //     prompt: "What is 2 + 2?",
    //     experimental_telemetry: {
    //       isEnabled: true,
    //       recordInputs: true,
    //       recordOutputs: true,
    //     },
    //   }
    // );

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant.",
        prompt: "What is 2 + 2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    return {
      geminiSteps,
      deepseekSteps,
      // openAiSteps,
    };
  }
);
