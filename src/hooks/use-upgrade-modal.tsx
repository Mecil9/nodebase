/*
 * @Author: Mecil Meng
 * @Date: 2025-11-05 16:05:13
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-05 16:15:39
 * @FilePath: /nodebase/src/hooks/use-upgrade-modal.tsx
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";
import UpgradeModal from "@/components/upgrade-modal";

export const useUpgradeModal = () => {
  const [open, setOpen] = useState(false);

  const handleError = (error: unknown) => {
    if (error instanceof TRPCClientError) {
      if (error.data?.code === "FORBIDDEN") {
        setOpen(true);
        return true;
      }
      return false;
    }
  };

  const modal = <UpgradeModal open={open} onOpenChange={setOpen} />;

  return {
    handleError,
    modal,
  };
};
