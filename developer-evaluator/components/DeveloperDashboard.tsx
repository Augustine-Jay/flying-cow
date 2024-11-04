import { useState, useEffect } from "react";
import { Typography, Row, Col, Card, Spin } from "antd";
import { motion } from "framer-motion";
import DeveloperTable from "./DeveloperTable";
import PredictionModule from "./PredictionModule";
import RatingModule from "./RatingModule";
import DomainDistributionChart from "./DomainDistributionChart";

const { Title } = Typography;

const MotionCard = motion(Card);

export default function DeveloperDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 48px)",
        }}
      >
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: "2rem", color: "#00b96b" }}
      >
        开发者评估仪表板
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              height: "100%",
              background: "#2c2c2c",
              borderColor: "#3a3a3a",
            }}
          >
            <PredictionModule />
          </MotionCard>
        </Col>
        <Col xs={24} lg={12}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              height: "100%",
              background: "#2c2c2c",
              borderColor: "#3a3a3a",
            }}
          >
            <RatingModule />
          </MotionCard>
        </Col>
        <Col xs={24}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ background: "#2c2c2c", borderColor: "#3a3a3a" }}
          >
            <DeveloperTable />
          </MotionCard>
        </Col>
        <Col xs={24}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ background: "#2c2c2c", borderColor: "#3a3a3a" }}
          >
            <DomainDistributionChart />
          </MotionCard>
        </Col>
      </Row>
    </motion.div>
  );
}
