/*
 * @Author: Mecil Meng
 * @Date: 2025-11-08 15:55:37
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-24 21:32:24
 * @FilePath: /nodebase/src/components/features/executions/components/deepseek/node.tsx
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { DeepSeekDialog, DeepSeekFormValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { DEEPSEEK_CHANNEL_NAME } from "@/inngest/channels/deepseek";
import { fetchDeepSeekRealtimeToken } from "./actions";

type DeepSeekNodeData = {
  variableName?: string;
  credentialId?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

type DeepSeekNodeType = Node<DeepSeekNodeData>;

export const DeepSeekNode = memo((props: NodeProps<DeepSeekNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const nodeData = props.data;
  const description = nodeData?.userPrompt
    ? `deepseek-chat : ${nodeData.userPrompt.slice(0, 50)}... `
    : "Not Configured";

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: DEEPSEEK_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchDeepSeekRealtimeToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: DeepSeekNodeData) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }
        return node;
      })
    );
  };

  return (
    <>
      <DeepSeekDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/deepseek.svg"
        name="DeepSeek"
        status={nodeStatus}
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

DeepSeekNode.displayName = "DeepSeekNode";
