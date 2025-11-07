/*
 * @Author: Mecil Meng
 * @Date: 2025-11-07 16:08:55
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-07 16:17:45
 * @FilePath: /nodebase/src/config/node-components.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { InitialNode } from "@/components/initial-node";
import { NodeType } from "@/generated/prisma/enums";
import type { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
