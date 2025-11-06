/*
 * @Author: Mecil Meng
 * @Date: 2025-11-05 18:49:28
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-05 18:50:17
 * @FilePath: /nodebase/src/components/features/workflows/server/params-loader.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { createLoader } from "nuqs/server";
import { workflowsParams } from "../params";

export const workflowsParamsLoader = createLoader(workflowsParams);
