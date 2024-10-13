'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        await signIn('credentials', { 
          email: values.email, 
          password: values.password,
          callbackUrl: '/dashboard'
        });
      } else {
        const data = await response.json();
        setError(data.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center' }}>ลงทะเบียน</Title>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
        <Form
          name="signup"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="ชื่อ" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'กรุณากรอกอีเมล' },
              { type: 'email', message: 'กรุณากรอกอีเมลให้ถูกต้อง' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="อีเมล" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'กรุณากรอกรหัสผ่าน' },
              { min: 8, message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="รหัสผ่าน" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              ลงทะเบียน
            </Button>
          </Form.Item>
        </Form>
        <Text>
          มีบัญชีอยู่แล้ว? <Link href="/auth/signin">เข้าสู่ระบบ</Link>
        </Text>
        <Text type="secondary" style={{ display: 'block', marginTop: 16 }}>
          การลงทะเบียนถือว่าคุณยอมรับ <Link href="/terms">เงื่อนไขการใช้งาน</Link> และ <Link href="/privacy">นโยบายความเป็นส่วนตัว</Link> ของเรา
        </Text>
      </Card>
    </div>
  );
}
