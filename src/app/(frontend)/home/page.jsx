"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button, Layout, Typography } from "antd";
import LogoutButton from "@/components/LogoutButton";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function HomePage() {
  const user = useAuth();
  const router = useRouter();

  if (!user) {
    return <div>Loading...</div>;  // แสดงหน้ารอขณะที่ตรวจสอบสถานะผู้ใช้
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#1890ff", color: "white", textAlign: "center", padding: "20px" }}>
        <Title level={3} style={{ color: "white" }}>Welcome to the Home Page</Title>
      </Header>

      <Content style={{ padding: "50px", textAlign: "center" }}>
        <Title level={4}>Hello, {user.email}!</Title>
        <Text>You are now logged in.</Text>

        <div style={{ marginTop: "20px" }}>
          <Button type="primary" onClick={() => router.push("/dashboard")} style={{ marginRight: "10px" }}>
            Go to Dashboard
          </Button>
          <LogoutButton />
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Home Page ©2024 Created by Your Name
      </Footer>
    </Layout>
  );
}
