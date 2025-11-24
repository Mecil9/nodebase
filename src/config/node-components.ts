/*
 * @Author: Mecil Meng
 * @Date: 2025-11-07 16:08:55
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-24 23:50:34
 * @FilePath: /nodebase/src/config/node-components.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { DeepSeekNode } from "@/components/features/executions/components/deepseek/node";
import { DiscordNode } from "@/components/features/executions/components/discord/node";
import { GeminiNode } from "@/components/features/executions/components/gemini/node";
import { HttpRequestNode } from "@/components/features/executions/components/http-request/node";
import { OpenAiNode } from "@/components/features/executions/components/openai/node";
import { SlackNode } from "@/components/features/executions/components/slack/node";
import { GoogleFormTriggerNode } from "@/components/features/triggers/components/google-form-trigger/node";
import { ManualTriggerNode } from "@/components/features/triggers/components/manual-trigger/node";
import { StripeTriggerNode } from "@/components/features/triggers/components/stripe-trigger/node";
import { InitialNode } from "@/components/initial-node";
import { NodeType } from "@/generated/prisma/enums";
import type { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerNode,
  [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
  [NodeType.GEMINI]: GeminiNode,
  [NodeType.DEEPSEEK]: DeepSeekNode,
  [NodeType.OPENAI]: OpenAiNode,
  [NodeType.DISCORD]: DiscordNode,
  [NodeType.SLACK]: SlackNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
