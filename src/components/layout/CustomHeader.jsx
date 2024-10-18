import React, { useState } from "react";
import { Layout, Input, Select, Avatar, Dropdown, Badge } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { profileMenu } from "./Menu/profileMenu";

const { Header } = Layout;
const { Search } = Input;

const CustomHeader = ({ isMobile, isTablet }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
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
          menu={{ items: profileMenu }}
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
  );
};

export default CustomHeader;
