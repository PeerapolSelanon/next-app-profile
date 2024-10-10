"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button, Input, Form, Card, message, Row, Col, Typography } from "antd";
import { doc, setDoc, getDoc } from "firebase/firestore"; // เพิ่ม Firestore functions
import Link from "next/link";

const { Text } = Typography;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // ฟังก์ชันสำหรับการล็อกอินด้วยอีเมลและรหัสผ่าน
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success("Logged in successfully!");
      router.push("/home");
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
    }
  };

  // ฟังก์ชันสำหรับการล็อกอินด้วย Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      // เก็บข้อมูลผู้ใช้เข้า Firestore (ถ้ายังไม่มี)
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          role: "user", 
        });
      }
  
      message.success("Logged in with Google successfully!");
      router.push("/home");
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        message.error("คุณปิดหน้าต่างลงชื่อเข้าใช้ กรุณาลองใหม่อีกครั้ง.");
      } else {
        console.error("Error during Google Sign-In:", error);
        message.error("Google Sign-In failed. Please try again.");
      }
    }
  };
  

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/images/bg_login.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Row justify="center" align="middle" style={{ width: "100%" }}>
        <Col xs={22} sm={16} md={10} lg={8} xl={6}>
          <Card
            title="Login"
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "8px",
            }}
          >
            <Form layout="vertical" onFinish={handleLogin}>
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

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>

              {/* ปุ่มเข้าสู่ระบบด้วย Google */}
              <Form.Item>
                <Button type="default" onClick={handleGoogleLogin} block>
                  Sign in with Google
                </Button>
              </Form.Item>

              <Form.Item>
                <Text>
                  Don't have an account?{" "}
                  <Link href="/register">Register here</Link>
                </Text>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
