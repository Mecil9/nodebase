/*
 * @Author: Mecil Meng
 * @Date: 2025-11-04 17:37:33
 * @LastEditors: Mecil Meng
 * @LastEditTime: 2025-11-05 15:06:40
 * @FilePath: /nodebase/src/app/(dashboard)/(rest)/layout.tsx
 * @Description:
 *
 * Copyright (c) 2025 by JCBEL/JCBLE/MSCI/MOTU, All Rights Reserved.
 */
import AppHeader from "@/components/app-header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      <main className="flex-1">{children}</main>
    </>
  );
};

export default Layout;
