"use client";

import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  DatePicker,
  Select,
  Table,
  Button,
  Typography,
} from "antd";
import { DownloadOutlined, TeamOutlined } from "@ant-design/icons";
import ReactECharts from "echarts-for-react";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const Reports = () => {
  const [dateRange, setDateRange] = useState([]);
  const [reportType, setReportType] = useState("sales");

  // ข้อมูลสำหรับกราฟยอดขาย
  const salesChartOption = {
    title: {
      text: "รายงานยอดขาย",
      textStyle: { fontSize: 14 },
    },
    tooltip: { trigger: "axis" },
    color: ["#4e79a7", "#59a14f"],
    legend: {
      data: ["ยอดขาย", "กำไร"],
      textStyle: { fontSize: 12 },
    },
    xAxis: {
      type: "category",
      data: ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      axisLabel: { fontSize: 10 },
    },
    series: [
      { name: "ยอดขาย", type: "bar", data: [120, 200, 150, 80, 70, 110, 130] },
      { name: "กำไร", type: "line", data: [20, 40, 30, 10, 15, 25, 35] },
    ],
    grid: {
      top: 60,
      bottom: 30,
      left: 60,
      right: 30,
      containLabel: true,
    },
  };

  // ข้อมูลสำหรับกราฟสินค้าขายดี
  const topProductsChartOption = {
    title: {
      text: "สินค้าขายดี 5 อันดับ",
      subtext: "จากยอดขายทั้งหมด",
      textStyle: { fontSize: 14 },
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: { fontSize: 12 },
    },
    series: [
      {
        name: "สินค้าขายดี",
        type: "pie",
        radius: ["30%", "60%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "สมาร์ทโฟน XYZ" },
          { value: 735, name: "แล็ปท็อป ABC" },
          { value: 580, name: "หูฟังไร้สาย DEF" },
          { value: 484, name: "สมาร์ทวอทช์ GHI" },
          { value: 300, name: "ลำโพงบลูทูธ JKL" },
        ],
      },
    ],
  };

  // ข้อมูลสำหรับตารางรายงาน
  const columns = [
    { title: "วันที่", dataIndex: "date", key: "date" },
    { title: "ยอดขาย", dataIndex: "sales", key: "sales" },
    { title: "กำไร", dataIndex: "profit", key: "profit" },
    { title: "จำนวนคำสั่งซื้อ", dataIndex: "orders", key: "orders" },
  ];

  const data = [
    {
      key: "1",
      date: "2023-05-01",
      sales: "฿15,000",
      profit: "฿3,000",
      orders: 50,
    },
    {
      key: "2",
      date: "2023-05-02",
      sales: "฿18,500",
      profit: "฿3,700",
      orders: 62,
    },
    {
      key: "3",
      date: "2023-05-03",
      sales: "฿12,800",
      profit: "฿2,560",
      orders: 43,
    },
    {
      key: "4",
      date: "2023-05-04",
      sales: "฿21,000",
      profit: "฿4,200",
      orders: 70,
    },
    {
      key: "5",
      date: "2023-05-05",
      sales: "฿19,500",
      profit: "฿3,900",
      orders: 65,
    },
  ];

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const handleReportTypeChange = (value) => {
    setReportType(value);
  };

  const handleDownload = () => {
    // ตรงนี้จะเป็นลอจิกสำหรับการดาวน์โหลดรายงาน
    console.log("Downloading report...");
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3} style={{ marginBottom: "24px" }}>
        <TeamOutlined style={{ marginRight: "12px" }} />
        Reports
      </Title>
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col span={8}>
          <RangePicker style={{ width: "100%" }} onChange={handleDateChange} />
        </Col>
        <Col span={8}>
          <Select
            style={{ width: "100%" }}
            placeholder="เลือกประเภทรายงาน"
            onChange={handleReportTypeChange}
          >
            <Option value="sales">รายงานยอดขาย</Option>
            <Option value="products">รายงานสินค้า</Option>
            <Option value="customers">รายงานลูกค้า</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            ดาวน์โหลดรายงาน
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card styles={{ body: { height: "300px", padding: "20px" } }}>
            <ReactECharts
              option={salesChartOption}
              style={{ height: "100%", width: "700px" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card styles={{ body: { height: "300px", padding: "20px" } }}>
            <ReactECharts
              option={topProductsChartOption}
              style={{ height: "100%", width: "700px" }}
            />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="รายละเอียดรายงาน">
            <Table columns={columns} dataSource={data} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
