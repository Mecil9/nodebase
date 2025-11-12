/*
 * @Author: Mecil Meng
 * @Date: 2025-11-09 00:53:01
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-11 10:59:47
 * @FilePath: /nodebase/src/inngest/client.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { Inngest } from "inngest";
import { realtimeMiddleware } from "@inngest/realtime/middleware";

export const inngest = new Inngest({
  id: "jcble-n8n",
  middleware: [realtimeMiddleware()],
});
