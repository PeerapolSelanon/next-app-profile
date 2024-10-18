"use client";

import React, { useState } from "react";
import { Table, InputNumber, Button, Typography, message } from "antd";
import { InboxOutlined, SaveOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Inventory = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Product 1", currentStock: 100, newStock: 100 },
    { id: 2, name: "Product 2", currentStock: 50, newStock: 50 },
    // Add more sample data as needed
  ]);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Current Stock",
      dataIndex: "currentStock",
      key: "currentStock",
    },
    {
      title: "New Stock",
      dataIndex: "newStock",
      key: "newStock",
      render: (_, record) => (
        <InputNumber
          min={0}
          defaultValue={record.newStock}
          onChange={(value) => handleStockChange(record.id, value)}
        />
      ),
    },
  ];

  const handleStockChange = (id, value) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, newStock: value } : item
      )
    );
  };

  const handleSave = () => {
    setInventory(
      inventory.map((item) => ({
        ...item,
        currentStock: item.newStock,
      }))
    );
    message.success("Inventory updated successfully");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3} style={{ marginBottom: "24px" }}>
        <InboxOutlined style={{ marginRight: "12px" }} />
        Inventory Management
      </Title>
      <Table columns={columns} dataSource={inventory} />
      <Button
        type="primary"
        icon={<SaveOutlined />}
        onClick={handleSave}
        style={{ marginTop: 16 }}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default Inventory;
