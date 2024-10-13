'use client';

import React from 'react';
import { Layout, Typography, Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Unauthorized() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Result
          status="403"
          title="ไม่มีสิทธิ์เข้าถึง"
          subTitle="ขออภัย คุณไม่มีสิทธิ์เข้าถึงหน้านี้"
          extra={[
            <Button key="back" onClick={handleGoBack}>
              กลับไปหน้าก่อนหน้า
            </Button>,
            <Button key="home" type="primary" onClick={handleGoHome}>
              กลับสู่หน้าหลัก
            </Button>,
          ]}
        />
      </Content>
    </Layout>
  );
}
