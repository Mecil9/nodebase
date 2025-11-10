/*
 * @Author: Mecil Meng
 * @Date: 2025-11-09 23:53:45
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-11 00:02:40
 * @FilePath: /nodebase/src/components/features/executions/components/http-request/executor.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import Handlebars from "handlebars";
import type { NodeExecutor } from "@/components/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as KyOptions } from "ky";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type HttpRequestData = {
  variableName: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  // TODO: Publish "loading" state for http request
  if (!data.endpoint) {
    //Todo: Publish 'error' state for http request
    throw new NonRetriableError("Http Request node: No endpoint configured.");
  }

  if (!data.variableName) {
    throw new NonRetriableError(
      "Http Request node: No variable name configured."
    );
  }

  if (!data.method) {
    throw new NonRetriableError("Http Request node: No method configured.");
  }

  const result = await step.run(
    `http-request: ${data.variableName}`,
    async () => {
      const endpoint = Handlebars.compile(data.endpoint)(context);
      const method = data.method;

      const options: KyOptions = { method };

      if (["POST", "PUT", "PATCH"].includes(method)) {
        const resolved = Handlebars.compile(data.body || "{}")(context);
        JSON.parse(resolved);
        options.body = resolved;
        options.headers = {
          "Content-Type": "application/json",
        };
      }

      const response = await ky(endpoint, options);
      const contentType = response.headers.get("content-type");
      const responseData = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      const responsePayload = {
        httpResponse: {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        },
      };

      return {
        ...context,
        [data.variableName]: responsePayload,
      };
    }
  );

  // Todo: Publish "success state for http request"

  return result;
};
