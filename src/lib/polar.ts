/*
 * @Author: Mecil Meng
 * @Date: 2025-11-04 21:35:25
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-04 21:38:51
 * @FilePath: /nodebase/src/lib/polar.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { Polar } from "@polar-sh/sdk";

export const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: "sandbox", // Todo: Change to production
});
