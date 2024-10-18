"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Typography,
  Card,
  Tag,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  LockOutlined,
  EyeOutlined,
  EditFilled,
} from "@ant-design/icons";

const { Title } = Typography;

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPermissionId, setEditingPermissionId] = useState(null);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    const mockData = [
      {
        id: 1,
        pages: JSON.parse(
          '{"dashboard":{"view":1,"edit":1},"member":{"view":1,"edit":1},"product":{"view":1,"edit":1},"order":{"view":1,"edit":1},"transaction":{"view":1,"edit":1},"payment":[]}'
        ),
      },
    ];
    setPermissions(mockData);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Pages",
      dataIndex: "pages",
      key: "pages",
      render: (pages) => (
        <Space direction="vertical">
          {Object.entries(pages).map(([page, permissions]) => (
            <Tooltip
              key={page}
              title={
                <div>
                  {Object.entries(permissions).map(([action, value]) => (
                    <div key={action}>
                      {action}: {value ? "Allowed" : "Not Allowed"}
                    </div>
                  ))}
                </div>
              }
            >
              <Tag color="blue" style={{ marginRight: 0 }}>
                {page}{" "}
                <Space>
                  {permissions.view && <EyeOutlined />}
                  {permissions.edit && <EditFilled />}
                </Space>
              </Tag>
            </Tooltip>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
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
    setEditingPermissionId(record.id);
    form.setFieldsValue({ pages: JSON.stringify(record.pages, null, 2) });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    message.success(`Permission ${id} deleted successfully`);
    await fetchPermissions();
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingPermissionId) {
        message.success(
          `Permission ${editingPermissionId} updated successfully`
        );
      } else {
        message.success("New permission created successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingPermissionId(null);
      await fetchPermissions();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Card style={{ margin: "24px" }}>
      <Title level={4} style={{ marginBottom: "24px" }}>
        <LockOutlined style={{ marginRight: "12px" }} />
        Permissions Management
      </Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: "24px" }}
        size="middle"
      >
        Add New Permission
      </Button>
      <Table
        columns={columns}
        dataSource={permissions}
        rowKey="id"
        bordered
        style={{ backgroundColor: "white" }}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingPermissionId ? "Edit Permission" : "Add New Permission"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingPermissionId(null);
        }}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="pages"
            label="Pages Permissions (JSON)"
            rules={[
              { required: true, message: "Please input the permissions JSON" },
              {
                validator: (_, value) => {
                  try {
                    JSON.parse(value);
                    return Promise.resolve();
                  } catch (error) {
                    return Promise.reject("Invalid JSON format");
                  }
                },
              },
            ]}
          >
            <Input.TextArea rows={10} style={{ fontFamily: "monospace" }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default PermissionsPage;
