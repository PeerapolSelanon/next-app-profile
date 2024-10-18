import React from "react";
import { Layout, Menu } from "antd";
import LogoTitle from "./Logo/LogoTitle";
import { sidebarMenu } from "./Menu/sidebarMenu";
const { Sider } = Layout;

const CustomSider = ({ collapsed, setCollapsed, isMobile, isTablet }) => {
  return (
    <Sider
      collapsible
      collapsed={isMobile || collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="dark"
      width={250}
      style={{ padding: "16px 0" }}
      breakpoint="lg"
      collapsedWidth={isMobile ? 0 : isTablet ? 80 : 80}
    >
      <LogoTitle collapsed={collapsed} />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarMenu}
      />
    </Sider>
  );
};

export default CustomSider;
