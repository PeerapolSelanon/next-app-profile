"use client";

import React, { useState, useEffect } from "react";
import { Layout as AntLayout } from "antd";
import { useMediaQuery } from "react-responsive";
import CustomSider from "@/components/layout/CustomSider";
import CustomHeader from "@/components/layout/CustomHeader";
import CustomContent from "@/components/layout/CustomContent";

const AdminLayout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // หรือแสดง loading indicator
  }

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <CustomSider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobile={isMobile}
        isTablet={isTablet}
      />
      <AntLayout>
        <CustomHeader isMobile={isMobile} isTablet={isTablet} />
        <CustomContent isMobile={isMobile}>{children}</CustomContent>
      </AntLayout>
    </AntLayout>
  );
};

export default AdminLayout;
