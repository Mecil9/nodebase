/*
 * @Author: Mecil Meng
 * @Date: 2025-11-08 21:29:36
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-08 21:37:10
 * @FilePath: /nodebase/src/components/features/triggers/components/manual-trigger/dialog.tsx
 * @Description: 手动触发弹窗
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualTriggerDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Trigger</DialogTitle>
          <DialogDescription>
            手动触发该流程，该流程将立即开始执行。
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Used to manually execute a workflow, no configuration needed.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
