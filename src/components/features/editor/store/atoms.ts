/*
 * @Author: Mecil Meng
 * @Date: 2025-11-08 17:42:04
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-08 17:46:35
 * @FilePath: /nodebase/src/components/features/editor/store/atoms.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import type { ReactFlowInstance } from "@xyflow/react";
import { atom } from "jotai";

export const editorAtom = atom<ReactFlowInstance | null>(null);
