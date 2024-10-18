"use client";

import React, { useState } from "react";
import { Table, Button, Input, Modal, Form, Typography, Space } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TagsOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Category A", productCount: 10 },
    { id: 2, name: "Category B", productCount: 5 },
    // Add more sample data as needed
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Product Count",
      dataIndex: "productCount",
      key: "productCount",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
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

  const handleEdit = (category) => {
    setEditingCategoryId(category.id);
    form.setFieldsValue(category);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleAdd = () => {
    setEditingCategoryId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingCategoryId) {
        setCategories(
          categories.map((category) =>
            category.id === editingCategoryId
              ? { ...category, ...values }
              : category
          )
        );
      } else {
        const newCategory = {
          id: categories.length + 1,
          ...values,
          productCount: 0,
        };
        setCategories([...categories, newCategory]);
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3} style={{ marginBottom: "24px" }}>
        <TagsOutlined style={{ marginRight: "12px" }} />
        Add New Category
      </Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Add Category
      </Button>
      <Table columns={columns} dataSource={categories} />
      <Modal
        title={editingCategoryId ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
