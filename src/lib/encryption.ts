/*
 * @Author: Mecil Meng
 * @Date: 2025-11-26 16:28:05
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-26 16:28:33
 * @FilePath: /nodebase/src/lib/encryption.ts
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import Cryptr from "cryptr";

const encryptionKey = process.env.ENCRYPTION_KEY || "1234567890";
const cryptr = new Cryptr(encryptionKey);

export const encrypt = (text: string) => cryptr.encrypt(text);
export const decrypt = (text: string) => cryptr.decrypt(text);
