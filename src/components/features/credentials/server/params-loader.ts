/*
 * @Author: Mecil Meng
 * @Date: 2025-11-18 20:06:58
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-18 20:08:25
 * @FilePath: /nodebase/src/components/features/credentials/server/params.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { createLoader } from "nuqs/server";
import { credentialsParams } from "../params";

export const credentialsParamsLoader = createLoader(credentialsParams);
