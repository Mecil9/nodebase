/*
 * @Author: Mecil Meng
 * @Date: 2025-11-09 23:35:51
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-14 18:49:51
 * @FilePath: /nodebase/src/components/features/executions/lib/executor-registry.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "../../triggers/components/manual-trigger/executor";
import { httpRequestExecutor } from "../components/http-request/executor";
import { googleFormTriggerExecutor } from "../../triggers/components/google-form-trigger/executor";
import { stripeTriggerExecutor } from "../../triggers/components/stripe-trigger/executor";
import { geminiExecutor } from "../components/gemini/executor";
import { deepseekExecutor } from "../components/deepseek/executor";
import { openAiExecutor } from "../components/openai/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
  [NodeType.STRIPE_TRIGGER]: stripeTriggerExecutor,
  [NodeType.GEMINI]: geminiExecutor,
  [NodeType.DEEPSEEK]: deepseekExecutor,
  [NodeType.OPENAI]: openAiExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type: ${type}`);
  }
  return executor;
};
