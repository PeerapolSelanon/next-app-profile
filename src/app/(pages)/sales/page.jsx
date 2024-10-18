"use client";

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import ReactECharts from "echarts-for-react";

const { Title } = Typography;

const SalesPage = () => {
  const [chartOption, setChartOption] = useState({});

  useEffect(() => {
    // สร้างข้อมูลจำลองสำหรับกราฟ
    const xData = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];
    const yData = [
      820, 932, 901, 934, 1290, 1330, 1320, 1450, 1200, 1100, 1020, 1180,
    ];

    setChartOption({
      title: {
        text: "ยอดขายรายเดือน",
        left: "center",
      },
      xAxis: {
        type: "category",
        data: xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: yData,
          type: "line",
          smooth: true,
        },
      ],
      tooltip: {
        trigger: "axis",
      },
    });
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>ยอดขาย</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="ยอดขายรวม"
              value={1234567}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix="฿"
              suffix={<ArrowUpOutlined />}
            />
            <Statistic
              value={8.5}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix="+"
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="ลูกค้าใหม่"
              value={256}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
            />
            <Statistic
              value={12.3}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix="+"
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="กำไร"
              value={345678}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix="฿"
              suffix={<ArrowUpOutlined />}
            />
            <Statistic
              value={5.7}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix="+"
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="คำสั่งซื้อ"
              value={789}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
            />
            <Statistic
              value={3.2}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix="+"
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: "24px" }}>
        <ReactECharts option={chartOption} style={{ height: "400px" }} />
      </Card>
    </div>
  );
};

export default SalesPage;
