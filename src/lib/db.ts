/*
 * @Author: Mecil Meng
 * @Date: 2025-10-28 16:33:48
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-24 22:58:43
 * @FilePath: /nodebase/src/lib/db.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
