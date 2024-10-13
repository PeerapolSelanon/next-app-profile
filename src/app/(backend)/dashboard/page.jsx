'use client';

import React, { useEffect, useRef } from 'react';
import { Layout, Typography, Card, Row, Col, Statistic, Table, Space, Tag, Progress } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, FileOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Dashboard() {
  const chartRef = useRef(null);

  // ข้อมูลสำหรับกราฟ
  const data = [
    { date: '2023-05-01', sales: 3 },
    { date: '2023-05-02', sales: 4 },
    { date: '2023-05-03', sales: 3.5 },
    { date: '2023-05-04', sales: 5 },
    { date: '2023-05-05', sales: 4.9 },
    { date: '2023-05-06', sales: 6 },
    { date: '2023-05-07', sales: 7 },
  ];

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    const option = {
      xAxis: {
        type: 'category',
        data: data.map(item => item.date)
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: data.map(item => item.sales),
        type: 'line',
        smooth: true
      }]
    };
    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, []);

  // ข้อมูลสำหรับตาราง
  const columns = [
    {
      title: 'สินค้า',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ราคา',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'สถานะ',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'ยกเลิก') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  
  const tableData = [
    {
      key: '1',
      name: 'เสื้อยืด',
      price: 350,
      status: ['ขายดี'],
    },
    {
      key: '2',
      name: 'กางเกงยีนส์',
      price: 1200,
      status: ['สินค้าใหม่', 'ขายดี'],
    },
    {
      key: '3',
      name: 'รองเท้าผ้าใบ',
      price: 2500,
      status: ['สินค้าลดราคา'],
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px' }}>
        <Title level={2}>แดชบอร์ด</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <Statistic
                title="ผู้ใช้งานทั้งหมด"
                value={1128}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
              <Text type="secondary">เพิ่มขึ้น 10% จากเดือนที่แล้ว</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <Statistic
                title="ยอดขายวันนี้"
                value={15}
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: '#cf1322' }}
              />
              <Text type="secondary">ลดลง 5% จากเมื่อวาน</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <Statistic
                title="รายได้รวม"
                value={9280}
                prefix={<DollarOutlined />}
                suffix="บาท"
                valueStyle={{ color: '#3f8600' }}
              />
              <Text type="secondary">เพิ่มขึ้น 20% จากเดือนที่แล้ว</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <Statistic
                title="คำสั่งซื้อที่รอดำเนินการ"
                value={42}
                prefix={<FileOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
              <Text type="secondary">ลดลง 2% จากเมื่อวาน</Text>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} md={12}>
            <Card title="ยอดขายรายวัน" hoverable>
              <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="สินค้าขายดี" hoverable>
              <Table columns={columns} dataSource={tableData} pagination={false} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} md={12}>
            <Card title="เป้าหมายยอดขายประจำเดือน" hoverable>
              <Row align="middle" gutter={16}>
                <Col span={12}>
                  <Progress type="dashboard" percent={75} width={180} />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="ยอดขายปัจจุบัน"
                    value={9280}
                    prefix={<DollarOutlined />}
                    suffix="/ 12,000 บาท"
                  />
                  <Space>
                    <ArrowUpOutlined style={{ color: '#3f8600' }} />
                    <Text type="success">75% ของเป้าหมาย</Text>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="สถิติการใช้งานเว็บไซต์" hoverable>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="ผู้เข้าชมวันนี้" value={1234} prefix={<ArrowUpOutlined />} />
                  <Text type="secondary">เพิ่มขึ้น 12% จากเมื่อวาน</Text>
                </Col>
                <Col span={12}>
                  <Statistic title="เวลาเฉลี่ยต่อการเข้าชม" value="00:05:23" prefix={<ArrowDownOutlined />} />
                  <Text type="secondary">ลดลง 2% จากเมื่อวาน</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
