// components/PredictionModule.tsx
import { useState } from "react";
import { Input, Button, Typography, Spin } from "antd";
import { motion } from "framer-motion";
import ReactECharts from "echarts-for-react";
import { mockDeveloperData } from "../utils/mockData";

const { Title, Text } = Typography;

interface DeveloperResult {
  nationality: string;
  confidence: number;
  probabilities: { [key: string]: number };
}

export default function PredictionModule() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DeveloperResult | null>(null);

  const handlePredict = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const developerData = mockDeveloperData[name];
      if (developerData) {
        setResult({
          nationality: developerData.nationality,
          confidence: developerData.confidence,
          probabilities: developerData.probabilities,
        });
      } else {
        setResult(null);
      }
      setLoading(false);
    }, 2000);
  };

  const option = {
    radar: {
      indicator: [
        { name: "China", max: 100 },
        { name: "USA", max: 100 },
        { name: "India", max: 100 },
      ],
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: result
              ? [
                  result.probabilities.China,
                  result.probabilities.USA,
                  result.probabilities.India,
                ]
              : [],
            name: "Nationality Probability",
          },
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Title level={4} style={{ color: "#00b96b", marginBottom: "1rem" }}>
        国籍预测
      </Title>
      <Input
        placeholder="输入开发者名称"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 16, width: "100%", maxWidth: "300px" }}
      />
      <Button
        type="primary"
        onClick={handlePredict}
        disabled={!name || loading}
        style={{
          marginBottom: 16,
          borderRadius: "2rem",
          background: "#00b96b",
          border: "none",
          boxShadow: "0 0 10px rgba(0,185,107,0.5)",
        }}
      >
        预测国籍
      </Button>
      {loading && <Spin style={{ marginLeft: 16 }} />}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Title level={5} style={{ color: "#00b96b" }}>
            预测结果
          </Title>
          <Text style={{ color: "#fff" }}>国籍: {result.nationality}</Text>
          <Text style={{ color: "#fff" }}>置信度: {result.confidence}%</Text>
          <ReactECharts
            option={option}
            style={{ height: "300px", width: "100%", marginTop: 16 }}
          />
        </motion.div>
      )}
      {!result && !loading && name && (
        <Text style={{ color: "#ff4d4f" }}>未找到该开发者的数据</Text>
      )}
    </div>
  );
}
