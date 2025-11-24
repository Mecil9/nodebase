/*
 * @Author: Mecil Meng
 * @Date: 2025-11-09 00:53:01
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-20 18:23:04
 * @FilePath: /nodebase/src/app/(dashboard)/(rest)/credentials/page.tsx
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import {
  CredentialError,
  CredentialLoading,
  CredentialsContainer,
  CredentialsList,
} from "@/components/features/credentials/components/credentials";
import { credentialsParamsLoader } from "@/components/features/credentials/server/params-loader";
import { prefetchCredentials } from "@/components/features/credentials/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "@sentry/nextjs";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  await requireAuth();

  const params = await credentialsParamsLoader(searchParams);
  prefetchCredentials(params);
  return (
    <CredentialsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<CredentialError />}>
          <Suspense fallback={<CredentialLoading />}>
            <CredentialsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </CredentialsContainer>
  );
};

export default Page;
