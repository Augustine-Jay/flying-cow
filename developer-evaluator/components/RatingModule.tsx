import React, { useState } from "react";
import { Input, Button, Typography, Spin } from "antd";
import { motion } from "framer-motion";
import ReactECharts from "echarts-for-react";
import debounce from "lodash/debounce";

const { Title, Text } = Typography;

interface DeveloperResult {
  rank: number;
  score: number;
  projects: number;
  contributions: number;
}

export default function RatingModule() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DeveloperResult | null>(null);

  const handleRate = async () => {
    setLoading(true);
    setResult(null);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const ratingResult: DeveloperResult = {
        rank: 42,
        score: 78,
        projects: 15,
        contributions: 237,
      };
      setResult(ratingResult);
    } catch (error) {
      console.error("Error fetching rating:", error);
      setResult(null);
    }
    setLoading(false);
  };

  const debouncedHandleRate = debounce(handleRate, 300);

  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, "#FF6E76"],
              [0.5, "#FDDD60"],
              [0.75, "#58D9F9"],
              [1, "#7CFFB2"],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 20,
          offsetCenter: [0, "-60%"],
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: "auto",
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: "auto",
            width: 5,
          },
        },
        axisLabel: {
          color: "#464646",
          fontSize: 20,
          distance: -60,
          formatter: function (value: number) {
            if (value === 0) {
              return "F";
            } else if (value === 25) {
              return "D";
            } else if (value === 50) {
              return "C";
            } else if (value === 75) {
              return "B";
            } else if (value === 100) {
              return "A";
            }
            return "";
          },
        },
        title: {
          offsetCenter: [0, "-20%"],
          fontSize: 30,
        },
        detail: {
          fontSize: 50,
          offsetCenter: [0, "0%"],
          valueAnimation: true,
          formatter: function (value: number) {
            return Math.round(value);
          },
          color: "auto",
        },
        data: [
          {
            value: result ? result.score : 0,
            name: "TalentRank",
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
        开发者评级
      </Title>
      <Input
        placeholder="输入开发者名称"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 16, width: "100%", maxWidth: "300px" }}
      />
      <Button
        type="primary"
        onClick={debouncedHandleRate}
        disabled={!name || loading}
        style={{
          marginBottom: 16,
          borderRadius: "2rem",
          background: "#00b96b",
          border: "none",
          boxShadow: "0 0 10px rgba(0,185,107,0.5)",
        }}
      >
        评估开发者
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
            评估结果
          </Title>
          <Text style={{ color: "#fff" }}>TalentRank: {result.rank}</Text>
          <Text style={{ color: "#fff" }}>项目数: {result.projects}</Text>
          <Text style={{ color: "#fff" }}>贡献数: {result.contributions}+</Text>
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

// Commented out API call
/*
const handleRate = async () => {
  setLoading(true);
  setResult(null);
  try {
    const response = await fetch(`/api/rate?name=${name}`);
    if (!response.ok) {
      throw new Error("Failed to fetch rating");
    }
    const ratingResult: DeveloperResult = await response.json();
    setResult(ratingResult);
  } catch (error) {
    console.error("Error fetching rating:", error);
    setResult(null);
  }
  setLoading(false);
};
*/
