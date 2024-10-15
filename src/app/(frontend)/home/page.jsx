"use client";

import React from "react";
import { Layout, Typography, Card, Row, Col, Button, Carousel } from "antd";
import {
  ShoppingOutlined,
  GiftOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const featuredProducts = [
  {
    id: 1,
    name: "สินค้ายอดนิยม 1",
    price: "฿999",
    image: "/images/product1.jpg",
  },
  {
    id: 2,
    name: "สินค้ายอดนิยม 2",
    price: "฿1,299",
    image: "/images/product2.jpg",
  },
  {
    id: 3,
    name: "สินค้ายอดนิยม 3",
    price: "฿799",
    image: "/images/product3.jpg",
  },
];

export default function Home() {
  return (
    <Layout>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
        </Carousel>

        <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
          <Title level={2}>ยินดีต้อนรับสู่ร้านค้าออนไลน์ของเรา</Title>
          <Paragraph>
            ค้นพบสินค้าคุณภาพดีในราคาที่คุ้มค่า
            พร้อมบริการจัดส่งที่รวดเร็วและปลอดภัย
          </Paragraph>

          <Title level={3} style={{ marginTop: 40 }}>
            สินค้าแนะนำ
          </Title>
          <Row gutter={16}>
            {featuredProducts.map((product) => (
              <Col span={8} key={product.id}>
                <Card
                  hoverable
                  cover={<img alt={product.name} src={product.image} />}
                >
                  <Card.Meta title={product.name} description={product.price} />
                  <Button
                    type="primary"
                    icon={<ShoppingOutlined />}
                    style={{ marginTop: 16 }}
                  >
                    เพิ่มลงตะกร้า
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={16} style={{ marginTop: 40 }}>
            <Col span={8}>
              <Card>
                <ShoppingOutlined style={{ fontSize: 32, color: "#1890ff" }} />
                <Title level={4}>สินค้าคุณภาพ</Title>
                <Paragraph>เราคัดสรรสินค้าคุณภาพดีเพื่อคุณโดยเฉพาะ</Paragraph>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <GiftOutlined style={{ fontSize: 32, color: "#52c41a" }} />
                <Title level={4}>โปรโมชั่นพิเศษ</Title>
                <Paragraph>รับส่วนลดและของแถมมากมายเมื่อช้อปกับเรา</Paragraph>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <CustomerServiceOutlined
                  style={{ fontSize: 32, color: "#faad14" }}
                />
                <Title level={4}>บริการลูกค้า</Title>
                <Paragraph>ทีมงานพร้อมให้บริการตลอด 24 ชั่วโมง</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
