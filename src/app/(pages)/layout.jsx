"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ConfigProvider, theme } from "antd";

const AdminLayout = dynamic(() => import("@/components/layout/AdminLayout"), {
  ssr: false,
});

const Layout = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
      }}
    >
      <AdminLayout>{children}</AdminLayout>
    </ConfigProvider>
  );
};

export default Layout;
