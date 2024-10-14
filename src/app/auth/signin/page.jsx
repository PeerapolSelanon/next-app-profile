'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Form, Input, Button, Checkbox, Card, Typography, message, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        message.error(result.error);
      } else {
        message.success('เข้าสู่ระบบสำเร็จ');

        // ตรวจสอบ role และ redirect ไปยังหน้าที่เหมาะสม
        if (session?.user?.role === 'ADMIN') {
          router.push('/dashboard');
        } else {
          router.push('/home');
        }
      }
    } catch (error) {
      message.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>เข้าสู่ระบบ</Title>
          <Form
            name="signin"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'กรุณากรอกอีเมล' },
                { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="อีเมล" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="รหัสผ่าน" />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>จดจำฉัน</Checkbox>
              </Form.Item>

              <Link href="/auth/forgot-password" style={{ float: 'right' }}>
                ลืมรหัสผ่าน?
              </Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>
          
          <Text style={{ display: 'block', textAlign: 'center' }}>
            ยังไม่มีบัญชี? <Link href="/auth/signup">ลงทะเบียน</Link>
          </Text>
        </Card>
      </Content>
    </Layout>
  );
}
