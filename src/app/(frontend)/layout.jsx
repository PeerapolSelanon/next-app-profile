"use client";

import React from "react";
import { Layout as AntLayout, Menu } from "antd";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";

const { Header, Content, Footer, Sider } = AntLayout;

const Layout = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            หน้าหลัก
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            โปรไฟล์
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            ตั้งค่า
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<SettingOutlined />}
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          >
            ออกจากระบบ
          </Menu.Item>
        </Menu>
      </Sider>
      <AntLayout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} สร้างด้วย Ant Design
        </Footer>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
