"use client";

import React from "react";
import { Form, Input, InputNumber, Select, Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Implement add product functionality
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3} style={{ marginBottom: "24px" }}>
        <PlusOutlined style={{ marginRight: "12px" }} />
        Add New Product
      </Title>
      <Form
        form={form}
        name="add_product"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select placeholder="Select a category">
            <Option value="category_a">Category A</Option>
            <Option value="category_b">Category B</Option>
            <Option value="category_c">Category C</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Initial Stock"
          rules={[
            { required: true, message: "Please input the initial stock!" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
