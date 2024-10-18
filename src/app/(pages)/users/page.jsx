"use client";

import React, { useState } from "react";
import {
  Table,
  Space,
  Button,
  Input,
  Modal,
  Form,
  Select,
  message,
  Typography,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    // Add more mock data as needed
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUserId, setEditingUserId] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "User", value: "User" },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
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

  const handleEdit = (record) => {
    setEditingUserId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (userId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setUsers(users.filter((user) => user.id !== userId));
        message.success("User deleted successfully");
      },
    });
  };

  const handleSearch = (value) => {
    // Implement search functionality here
    console.log("Searching for:", value);
  };

  const handleAddUser = () => {
    setEditingUserId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingUserId) {
          setUsers(
            users.map((user) =>
              user.id === editingUserId ? { ...user, ...values } : user
            )
          );
          message.success("User updated successfully");
        } else {
          const newUser = {
            id: users.length + 1,
            ...values,
          };
          setUsers([...users, newUser]);
          message.success("User added successfully");
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3} style={{ marginBottom: "24px" }}>
        <TeamOutlined style={{ marginRight: "12px" }} />
        Users Management
      </Title>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search
          placeholder="Search users"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </div>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <Modal
        title={editingUserId ? "Edit User" : "Add New User"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select the role!" }]}
          >
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;
