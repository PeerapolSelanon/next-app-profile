"use client";

import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { ConfigProvider, theme } from "antd";
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
