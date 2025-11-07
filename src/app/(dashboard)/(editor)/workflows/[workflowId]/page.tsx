/*
 * @Author: Mecil Meng
 * @Date: 2025-11-04 17:37:33
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-07 12:55:36
 * @FilePath: /nodebase/src/app/(dashboard)/(editor)/workflows/[workflowId]/page.tsx
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import {
  Editor,
  EditorError,
} from "@/components/features/editor/components/editor";
import { EditorLoading } from "@/components/features/editor/components/editor";
import { EditorHeader } from "@/components/features/editor/components/editor-header";
import { prefetchWorkflow } from "@/components/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  await requireAuth();
  const { workflowId } = await params;
  prefetchWorkflow(workflowId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <EditorHeader workflowId={workflowId} />
          <main className="flex-1">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;
