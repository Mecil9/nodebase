/*
 * @Author: Mecil Meng
 * @Date: 2025-10-29 18:52:28
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-04 21:51:05
 * @FilePath: /nodebase/src/lib/auth-client.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { polarClient } from "@polar-sh/better-auth";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [polarClient()],
});
