/*
 * @Author: Mecil Meng
 * @Date: 2025-11-25 14:23:46
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-26 16:06:10
 * @FilePath: /nodebase/src/components/features/executions/components/execution.tsx
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
"use client";

import { ExecutionStatus } from "@/generated/prisma/enums";
import {
  CheckCircleIcon,
  XCircleIcon,
  Loader2Icon,
  ClockIcon,
} from "lucide-react";
import { useSuspenseExecution } from "../hooks/use-executions";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

const getStatusIcon = (status: ExecutionStatus) => {
  switch (status) {
    case ExecutionStatus.SUCCESS:
      return <CheckCircleIcon className="size-5 text-green-600" />;
    case ExecutionStatus.FAILED:
      return <XCircleIcon className="size-5 text-red-600" />;
    case ExecutionStatus.RUNNING:
      return <Loader2Icon className="size-5 text-yellow-600" />;
    default:
      return <ClockIcon className="size-5 text-gray-600" />;
  }
};

const formatStatus = (status: ExecutionStatus) => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export const ExecutionView = ({ executionId }: { executionId: string }) => {
  const { data: execution } = useSuspenseExecution(executionId);
  const [showStackTrace, setShowStackTrace] = useState(false);

  const duration = execution.completedAt
    ? Math.round(
        (new Date(execution.completedAt).getTime() -
          new Date(execution.startedAt).getTime()) /
          1000
      )
    : 0;

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex items-center gap-3">
          {getStatusIcon(execution.status)}
          <div className="">
            <CardTitle>{formatStatus(execution.status)}</CardTitle>
            <CardDescription>
              Execution for {execution.workflow.name}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Workflow
            </p>
            <Link
              prefetch
              className="text-sm hover:underline text-primary"
              href={`/workflows/${execution.workflow.id}`}
            >
              {execution.workflow.name}
            </Link>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <p className="text-sm">{formatStatus(execution.status)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Started At
            </p>
            <p className="text-sm">
              {formatDistanceToNow(new Date(execution.startedAt), {
                addSuffix: true,
              })}
            </p>
          </div>
          {execution.completedAt ? (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Completed At
              </p>
              <p className="text-sm">
                {formatDistanceToNow(new Date(execution.completedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          ) : null}
          {duration !== null ? (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Duration
              </p>
              <p className="text-sm">{duration}s</p>
            </div>
          ) : null}
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Inngest Event ID
            </p>
            <p className="text-sm">{execution.inngestEventId}</p>
          </div>
        </div>
        {execution.error && (
          <div className="mt-6 p-4 bg-red-50 rounded-md space-y-3">
            <div>
              <p className="text-sm font-medium text-red-900 mb-2">Error</p>
              <p className="text-sm.text-red-800 font-mono">
                {execution.error}
              </p>
            </div>
            {execution.errorStack && (
              <Collapsible
                open={showStackTrace}
                onOpenChange={setShowStackTrace}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-red-800 hover:bg-red-100"
                  >
                    {showStackTrace ? "Hide Stack Trace" : "Show Stack Trace"}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <pre className="text-xs text-red-800 font-mono overflow-auto mt-2 p-2 bg-red-100 rounded">
                    {execution.errorStack}
                  </pre>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        )}
        {execution.output && (
          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-sm font-medium mb-2">Output</p>
            <pre className="text-xs font-mono overflow-auto p-2 bg-muted-foreground/20 rounded-lg">
              {JSON.stringify(execution.output, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
