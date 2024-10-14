"use client";

import { useState } from "react";
import { Form, Input, Button, Typography, Alert, Card, Layout } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSuccess("ลิงก์สำหรับรีเซ็ตรหัสผ่านได้ถูกส่งไปยังอีเมลของคุณแล้ว");
      } else {
        const data = await response.json();
        setError(data.message || "เกิดข้อผิดพลาดในการส่งคำขอรีเซ็ตรหัสผ่าน");
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: 400,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            padding: "20px",
          }}
        >
          <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
            ลืมรหัสผ่าน
          </Title>
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}
          {success && (
            <Alert
              message={success}
              type="success"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}
          <Form name="forgot-password" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "กรุณากรอกอีเมล" },
                { type: "email", message: "กรุณากรอกอีเมลให้ถูกต้อง" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="อีเมล" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
              >
                ส่งคำขอรีเซ็ตรหัสผ่าน
              </Button>
            </Form.Item>
          </Form>
          <Text>
            นึกขึ้นได้แล้ว? <Link href="/auth/signin">เข้าสู่ระบบ</Link>
          </Text>
        </Card>
      </Content>
    </Layout>
  );
}
