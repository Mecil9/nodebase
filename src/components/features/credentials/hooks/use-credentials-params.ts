/*
 * @Author: Mecil Meng
 * @Date: 2025-11-05 18:43:58
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-18 14:27:55
 * @FilePath: /nodebase/src/components/features/credentials/hooks/use-credentials-params.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { useQueryStates } from "nuqs";
import { credentialsParams } from "../params";

export const useCredentialsParams = () => {
  return useQueryStates(credentialsParams);
};
