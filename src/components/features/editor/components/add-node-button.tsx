/*
 * @Author: Mecil Meng
 * @Date: 2025-11-07 16:51:52
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-07 16:53:21
 * @FilePath: /nodebase/src/components/features/editor/components/add-node-button.tsx
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

export const AddNodeButton = memo(() => {
  return (
    <Button
      onClick={() => {}}
      size="icon"
      variant="outline"
      className="bg-background"
    >
      <PlusIcon />
    </Button>
  );
});

AddNodeButton.displayName = "AddNodeButton";
