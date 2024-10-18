"use client";

import React, { useState } from "react";
import { Table, Space, Button, Input, Typography } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const AllProducts = () => {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      name: "Product 1",
      category: "Category A",
      price: "$10.99",
      stock: 100,
    },
    {
      id: 2,
      name: "Product 2",
      category: "Category B",
      price: "$15.99",
      stock: 50,
    },
    // Add more sample data as needed
  ];

  const handleEdit = (id) => {
    console.log("Edit product with id:", id);
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    console.log("Delete product with id:", id);
    // Implement delete functionality
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3} style={{ marginBottom: "24px" }}>
        <UnorderedListOutlined style={{ marginRight: "12px" }} />
        Products Management
      </Title>
      <Input
        placeholder="Search products"
        prefix={<SearchOutlined />}
        style={{ width: 300, marginBottom: 16 }}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default AllProducts;
