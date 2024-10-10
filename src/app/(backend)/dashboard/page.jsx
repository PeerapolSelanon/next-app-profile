"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Layout, Typography } from "antd";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function DashboardPage() {
  const user = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === "admin") {
            setIsAdmin(true);
          } else {
            router.push("/"); // ถ้าไม่ใช่ admin ให้เปลี่ยนไปหน้าอื่น
          }
        }
      }
    };
    checkAdminRole();
  }, [user, router]);

  if (!user || !isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#1890ff", color: "white", textAlign: "center", padding: "20px" }}>
        <Title level={3} style={{ color: "white" }}>Admin Dashboard</Title>
      </Header>

      <Content style={{ padding: "50px", textAlign: "center" }}>
        <Title level={4}>Welcome, Admin {user.email}!</Title>
        <p>This is the admin dashboard where you can manage the system.</p>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Admin Dashboard ©2024 Created by Your Name
      </Footer>
    </Layout>
  );
}
