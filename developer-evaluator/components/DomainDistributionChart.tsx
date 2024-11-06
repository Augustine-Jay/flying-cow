import { Typography } from "antd";
import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";

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
    fetchDomainDistribution();
  }, []);

  const fetchDomainDistribution = async () => {
    try {
      // API调用占位符
      // 需要接收的数据: DomainDistribution[]
      // API应该返回领域分布数据
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
