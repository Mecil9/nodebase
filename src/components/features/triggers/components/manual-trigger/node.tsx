/*
 * @Author: Mecil Meng
 * @Date: 2025-11-08 16:57:34
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-08 22:25:03
 * @FilePath: /nodebase/src/components/features/triggers/components/manual-trigger/node.tsx
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointerIcon } from "lucide-react";
import { ManualTriggerDialog } from "./dialog";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = "initial";

  const handleOpenSettings = () => setDialogOpen(true);

  return (
    <>
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name='When clicking "Execute workflow"'
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
      <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
});
