/*
 * @Author: Mecil Meng
 * @Date: 2025-11-05 18:43:58
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-05 18:50:44
 * @FilePath: /nodebase/src/components/features/workflows/hooks/use-workflows-params.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { useQueryStates } from "nuqs";
import { workflowsParams } from "../params";

export const useWorkflowsParams = () => {
  return useQueryStates(workflowsParams);
};
