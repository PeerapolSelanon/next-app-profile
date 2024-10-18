import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const CustomContent = ({ children, isMobile }) => {
  return (
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
  );
};

export default CustomContent;
