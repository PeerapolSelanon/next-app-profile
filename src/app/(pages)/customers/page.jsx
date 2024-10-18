"use client";

import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Input,
  Table,
  Tag,
  Button,
  Space,
  Statistic,
} from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  DollarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ReactECharts from "echarts-for-react";

const { Search } = Input;

const Customers = () => {
  const [searchText, setSearchText] = useState("");

  // ข้อมูลสำหรับกราฟลูกค้าใหม่
  const newCustomersChartOption = {
    title: { text: "ลูกค้าใหม่รายเดือน" },
    xAxis: {
      type: "category",
      data: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."],
    },
    yAxis: { type: "value" },
    series: [
      { data: [150, 230, 224, 218, 135, 147], type: "line", smooth: true },
    ],
    color: ["#1890ff"],
  };

  // ข้อมูลสำหรับกราฟวงกลมประเภทลูกค้า
  const customerTypeChartOption = {
    title: {
      text: "ประเภทลูกค้า",
      subtext: "จำนวนลูกค้าแยกตามประเภท",
      left: "center",
    },
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", left: "left" },
    series: [
      {
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "ลูกค้าทั่วไป" },
          { value: 735, name: "ลูกค้า VIP" },
          { value: 580, name: "ลูกค้าองค์กร" },
          { value: 484, name: "ลูกค้าใหม่" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
    color: ["#1890ff", "#52c41a", "#faad14", "#f5222d"],
  };

  // ข้อมูลสำหรับตารางลูกค้า
  const columns = [
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ประเภท",
      key: "type",
      dataIndex: "type",
      render: (type) => (
        <Tag
          color={type === "VIP" ? "gold" : type === "องค์กร" ? "green" : "blue"}
        >
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "ยอดซื้อสะสม",
      dataIndex: "totalPurchase",
      key: "totalPurchase",
      render: (value) => `฿${value.toLocaleString()}`,
    },
    {
      title: "การดำเนินการ",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">ดูรายละเอียด</Button>
          <Button type="link">แก้ไข</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "สมชาย ใจดี",
      email: "somchai@example.com",
      type: "ทั่วไป",
      totalPurchase: 15000,
    },
    {
      key: "2",
      name: "สมหญิง รักสวย",
      email: "somying@example.com",
      type: "VIP",
      totalPurchase: 150000,
    },
    {
      key: "3",
      name: "บริษัท เอบีซี จำกัด",
      email: "contact@abc.com",
      type: "องค์กร",
      totalPurchase: 500000,
    },
    // เพิ่มข้อมูลลูกค้าเพิ่มเติมตามต้องการ
  ];

  const handleSearch = (value) => {
    setSearchText(value);
    // ทำการค้นหาข้อมูลลูกค้าตาม value ที่ได้รับ
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>ข้อมูลลูกค้า</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="จำนวนลูกค้าทั้งหมด"
              value={1234}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="ยอดซื้อเฉลี่ยต่อลูกค้า"
              value={25000}
              prefix={<ShoppingOutlined />}
              suffix="฿"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="รายได้รวมจากลูกค้า"
              value={30000000}
              prefix={<DollarOutlined />}
              suffix="฿"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={12}>
          <Card styles={{ body: { height: "300px", padding: "20px" } }}>
            <ReactECharts
              option={newCustomersChartOption}
              style={{ height: "100%", width: "700px" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card styles={{ body: { height: "300px", padding: "20px" } }}>
            <ReactECharts
              option={customerTypeChartOption}
              style={{ height: "100%", width: "700px" }}
            />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: "24px" }}>
        <Search
          placeholder="ค้นหาลูกค้า"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          style={{ marginBottom: "20px" }}
        />
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default Customers;
