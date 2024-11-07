import React, { useState } from "react";
import { Input, Button, Typography, Spin, Modal } from "antd";
import { motion } from "framer-motion";
import ReactECharts from "echarts-for-react";
import debounce from "lodash/debounce";

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
  const [showLowConfidenceModal, setShowLowConfidenceModal] = useState(false);
  const [lowConfidenceResult, setLowConfidenceResult] =
    useState<DeveloperResult | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const predictionResult: DeveloperResult = {
        nationality: "China",
        confidence: 85,
        probabilities: {
          China: 85,
          America: 10,
          Japan: 3,
          England: 1,
          Russia: 1,
        },
      };

      if (predictionResult.nationality) {
        setResult(predictionResult);
      } else if (predictionResult.confidence < 50) {
        setLowConfidenceResult(predictionResult);
        setShowLowConfidenceModal(true);
      } else {
        setResult(predictionResult);
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setResult(null);
    }
    setLoading(false);
  };

  const debouncedHandlePredict = debounce(handlePredict, 300);

  const handleLowConfidencePrediction = async () => {
    setShowLowConfidenceModal(false);
    setLoading(true);
    try {
      // Simulating API call for low confidence prediction
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const predictionResult: DeveloperResult = {
        nationality: "Unknown",
        confidence: 30,
        probabilities: {
          China: 30,
          America: 25,
          Japan: 20,
          England: 15,
          Russia: 10,
        },
      };
      setResult(predictionResult);
    } catch (error) {
      console.error("Error fetching low confidence prediction:", error);
      setResult(null);
    }
    setLoading(false);
  };

  const debouncedHandleLowConfidencePrediction = debounce(
    handleLowConfidencePrediction,
    300
  );

  const handleCancelLowConfidencePrediction = () => {
    setShowLowConfidenceModal(false);
    setResult(lowConfidenceResult);
  };

  const option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Nationality Probability",
        type: "pie",
        radius: ["40%", "70%"],
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
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: result
          ? Object.entries(result.probabilities).map(([name, value]) => ({
              name,
              value,
            }))
          : [],
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
        onClick={debouncedHandlePredict}
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
      <Modal
        title="低置信度预测"
        visible={showLowConfidenceModal}
        onOk={debouncedHandleLowConfidencePrediction}
        onCancel={handleCancelLowConfidencePrediction}
        okText="继续预测"
        cancelText="取消"
      >
        <p>置信度较低，是否继续预测？</p>
      </Modal>
    </div>
  );
}

// Commented out API call
/*
const handlePredict = async () => {
  setLoading(true);
  setResult(null);
  try {
    const response = await fetch(`/api/predict?name=${name}`);
    if (!response.ok) {
      throw new Error("Failed to fetch prediction");
    }
    const predictionResult: DeveloperResult = await response.json();

    if (predictionResult.nationality) {
      setResult(predictionResult);
    } else if (predictionResult.confidence < 50) {
      setLowConfidenceResult(predictionResult);
      setShowLowConfidenceModal(true);
    } else {
      setResult(predictionResult);
    }
  } catch (error) {
    console.error("Error fetching prediction:", error);
    setResult(null);
  }
  setLoading(false);
};

const handleLowConfidencePrediction = async () => {
  setShowLowConfidenceModal(false);
  setLoading(true);
  try {
    const response = await fetch(`/api/predict-low-confidence?name=${name}`);
    if (!response.ok) {
      throw new Error("Failed to fetch low confidence prediction");
    }
    const predictionResult = await response.json();
    setResult(predictionResult);
  } catch (error) {
    console.error("Error fetching low confidence prediction:", error);
    setResult(null);
  }
  setLoading(false);
};
*/
