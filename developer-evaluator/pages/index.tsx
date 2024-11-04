// pages/index.tsx
import { useState } from "react";
import { Button, Typography } from "antd";
import { motion } from "framer-motion";
import DeveloperDashboard from "../components/DeveloperDashboard";

const { Title } = Typography;

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  if (showContent) {
    return <DeveloperDashboard />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 48px)",

        background: "linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)",
      }}
    >
      <Title style={{ color: "#00b96b", marginBottom: "2rem" }}>
        开发者评估应用
      </Title>
      <Button
        type="primary"
        size="large"
        onClick={() => setShowContent(true)}
        style={{
          fontSize: "1.2rem",
          padding: "0.5rem 2rem",
          borderRadius: "2rem",
          background: "#00b96b",
          border: "none",
          boxShadow: "0 0 10px rgba(0,185,107,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "auto",
        }}
      >
        进入应用
      </Button>
    </motion.div>
  );
}
