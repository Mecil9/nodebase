/*
 * @Author: Mecil Meng
 * @Date: 2025-11-24 22:35:58
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-25 11:16:14
 * @FilePath: /nodebase/src/components/features/executions/params.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { parseAsInteger, parseAsString } from "nuqs/server";
import { PAGINATION } from "@/config/constants";

export const executionsParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
};
