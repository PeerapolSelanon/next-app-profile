import React from "react";
import { GithubFilled } from "@ant-design/icons";

const LogoTitle = ({ collapsed }) => (
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
    {!collapsed ? (
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
    ) : (
      <span style={{ fontSize: "28px", color: "white" }}>
        <GithubFilled />
      </span>
    )}
  </div>
);

export default LogoTitle;
