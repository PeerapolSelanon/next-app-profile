"use client";

import React from "react";
import { Row, Col, Card, Statistic, Table } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import ReactECharts from "echarts-for-react";

const Dashboard = () => {
  // ข้อมูลสำหรับกราฟยอดขาย
  const salesChartOption = {
    title: { text: "ยอดขายรายเดือน" },
    xAxis: {
      type: "category",
      data: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."],
    },
    yAxis: { type: "value" },
    series: [{ data: [150, 230, 224, 218, 135, 147], type: "line" }],
  };

  // ข้อมูลสำหรับกราฟวงกลมหมวดหมู่สินค้า
  const categoryChartOption = {
    title: { text: "สัดส่วนหมวดหมู่สินค้า" },
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "อิเล็กทรอนิกส์" },
          { value: 735, name: "เสื้อผ้า" },
          { value: 580, name: "อาหาร" },
          { value: 484, name: "เครื่องสำอาง" },
          { value: 300, name: "อื่นๆ" },
        ],
      },
    ],
  };

  // ข้อมูลสำหรับตารางสินค้าขายดี
  const topProductsColumns = [
    { title: "สินค้า", dataIndex: "name", key: "name" },
    { title: "ยอดขาย", dataIndex: "sales", key: "sales" },
    { title: "รายได้", dataIndex: "revenue", key: "revenue" },
  ];

  const topProductsData = [
    { key: "1", name: "สมาร์ทโฟน XYZ", sales: 120, revenue: "360,000฿" },
    { key: "2", name: "แล็ปท็อป ABC", sales: 80, revenue: "560,000฿" },
    { key: "3", name: "หูฟังไร้สาย DEF", sales: 200, revenue: "180,000฿" },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h1>แดชบอร์ด</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="ยอดขายวันนี้"
              value={11280}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix="฿"
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="ลูกค้าใหม่"
              value={93}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="คำสั่งซื้อที่รอดำเนินการ"
              value={14}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="อัตราการคืนสินค้า"
              value={2.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={12}>
          <Card>
            <ReactECharts option={salesChartOption} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <ReactECharts option={categoryChartOption} />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="สินค้าขายดี">
            <Table
              columns={topProductsColumns}
              dataSource={topProductsData}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
