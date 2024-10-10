"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // เพิ่ม db เพื่อใช้ Firestore
import { doc, setDoc } from "firebase/firestore"; // ใช้ setDoc เพื่อบันทึกลงใน Firestore
import { useRouter } from "next/navigation";
import { Button, Input, Form, Card, message, Row, Col, Typography } from "antd";
import Link from "next/link";

const { Text } = Typography;

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      // สมัครสมาชิก
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // บันทึกข้อมูลผู้ใช้ใน Firestore พร้อมบทบาท
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user", // กำหนดบทบาทให้เป็น "user" สำหรับผู้ใช้ทั่วไป
      });

      message.success("Registration successful!");
      router.push("/login"); // หลังจากสมัครสมาชิกสำเร็จ เปลี่ยนเส้นทางไปหน้า Login
    } catch (error) {
      message.error("Registration failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/images/bg_login.webp')", // เรียกใช้ภาพพื้นหลัง
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Row justify="center" align="middle" style={{ width: "100%" }}>
        <Col xs={22} sm={16} md={10} lg={8} xl={6}>
          <Card
            title="Register"
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "8px",
            }}
          >
            <Form layout="vertical" onFinish={handleRegister}>
              <Form.Item label="Email" required>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item label="Password" required>
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </Form.Item>

              <Form.Item label="Confirm Password" required>
                <Input.Password
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Register
                </Button>
              </Form.Item>

              {/* เพิ่มลิงก์สำหรับเข้าสู่ระบบ */}
              <Form.Item>
                <Text>
                  Already have an account?{" "}
                  <Link href="/login">Sign in here</Link>
                </Text>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
