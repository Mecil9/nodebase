/*
 * @Author: Mecil Meng
 * @Date: 2025-11-04 17:37:33
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-05 18:53:04
 * @FilePath: /nodebase/src/app/(dashboard)/(rest)/workflows/page.tsx
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import WorkflowsList, {
  WorkflowsContainer,
} from "@/components/features/workflows/components/workflows";
import { workflowsParamsLoader } from "@/components/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/components/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  await requireAuth();

  const params = await workflowsParamsLoader(searchParams);
  prefetchWorkflows(params);

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error!</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
};

export default Page;
