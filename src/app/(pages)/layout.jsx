"use client";

import React, { useState } from "react";
import {
  Layout as AntLayout,
  Menu,
  Input,
  Select,
  Badge,
  Avatar,
  Dropdown,
} from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  GithubFilled,
  CaretDownOutlined,
} from "@ant-design/icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const { Header, Content, Sider } = AntLayout;
const { Search } = Input;

const adminMenu = [
  {
    key: "1",
    label: "Profile",
    icon: <UserOutlined />,
  },
  {
    key: "2",
    label: "Setting",
    icon: <SettingOutlined />,
  },
  {
    key: "3",
    label: "Logout",
    icon: <LogoutOutlined />,
    danger: true,
    onClick: () => signOut({ callbackUrl: "/auth/signin" }),
  },
];

const items = [
  {
    key: "1",
    label: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    key: "2",
    label: "Sales",
    icon: <ShoppingCartOutlined />,
  },
  {
    key: "3",
    label: "Products",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "3-1",
        label: "Show All",
      },
    ],
  },
  {
    key: "4",
    label: "Reports",
    icon: <BarChartOutlined />,
  },
  {
    key: "5",
    label: "Customers",
    icon: <UserOutlined />,
  },
];

const Layout = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
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
        <div
          className="demo-logo-vertical"
          style={{
            padding: "0 24px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          {!collapsed && (
            <>
              <span style={{ fontSize: "28px", color: "white" }}>
                <GithubFilled />
              </span>
              <h1
                style={{
                  color: "white",
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Sweet Dream
              </h1>
            </>
          )}
          {collapsed && (
            <span style={{ fontSize: "28px", color: "white" }}>
              <GithubFilled />
            </span>
          )}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <AntLayout>
        <Header
          style={{
            background: "#fff",
            padding: isMobile ? "12px 16px" : "0 24px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center",
            justifyContent: "space-between",
            height: "auto",
            minHeight: isMobile ? "auto" : 64,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "stretch" : "center",
              gap: "12px",
              marginBottom: isMobile ? "12px" : 0,
              width: isMobile ? "100%" : "auto",
            }}
          >
            <Search
              placeholder="Search a product"
              style={{ width: isMobile ? "100%" : 250 }}
            />
            <Select
              defaultValue="Select Date"
              style={{ width: isMobile ? "100%" : 150 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: isMobile ? "space-between" : "flex-end",
              alignItems: "center",
              width: isMobile ? "100%" : "auto",
              gap: isMobile ? "12px" : "24px",
            }}
          >
            <div style={{ display: "flex", gap: "24px" }}>
              <Badge count={999} style={{ backgroundColor: "#52c41a" }}>
                <Avatar
                  shape="square"
                  icon={<ShoppingCartOutlined />}
                  style={{ backgroundColor: "#f56a00", color: "white" }}
                />
              </Badge>
              <Badge count={199} style={{ backgroundColor: "#1890ff" }}>
                <Avatar
                  shape="square"
                  icon={<AppstoreOutlined />}
                  style={{ backgroundColor: "#7265e6", color: "white" }}
                />
              </Badge>
            </div>
            <Dropdown
              menu={{ items: adminMenu }}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              trigger={["click"]}
              onOpenChange={(open) => setDropdownOpen(open)}
            >
              <div
                className="flex items-center gap-2 cursor-pointer"
                style={{ whiteSpace: "nowrap" }}
              >
                {!isTablet && <span>Peerapol Selanon</span>}
                <Avatar
                  size={35}
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#ff4d4f", color: "white" }}
                />
                <CaretDownOutlined
                  className={`transition-transform duration-300 ease-in-out ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: isMobile ? "16px 8px 0" : "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: isMobile ? 16 : 24,
              background: "#fff",
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
