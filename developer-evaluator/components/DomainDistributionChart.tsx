import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import ReactECharts from "echarts-for-react";

const { Title } = Typography;

interface DomainDistribution {
  name: string;
  value: number;
}

export default function DomainDistributionChart() {
  const [domainDistribution, setDomainDistribution] = useState<
    DomainDistribution[]
  >([]);

  useEffect(() => {
    // Simulating API call
    const fetchDomainDistribution = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const distribution: DomainDistribution[] = [
        { name: "3D", value: 30 },
        { name: "Ajax", value: 25 },
        { name: "Algorithm", value: 20 },
        { name: "Amp", value: 25 },
      ];
      setDomainDistribution(distribution);
    };

    fetchDomainDistribution();
  }, []);

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    series: [
      {
        name: "开发者领域分布",
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
        data: domainDistribution,
      },
    ],
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Title level={4} style={{ color: "#00b96b", marginBottom: "1rem" }}>
        开发者领域分布
      </Title>
      <ReactECharts
        option={option}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
}

// Commented out API call
/*
useEffect(() => {
  const fetchDomainDistribution = async () => {
    try {
      const response = await fetch("/api/domain-distribution");
      if (!response.ok) {
        throw new Error("Failed to fetch domain distribution");
      }
      const distribution: DomainDistribution[] = await response.json();
      setDomainDistribution(distribution);
    } catch (error) {
      console.error("Error fetching domain distribution:", error);
    }
  };

  fetchDomainDistribution();
}, []);
*/
