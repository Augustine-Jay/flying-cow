// components/DomainDistributionChart.tsx
import { Typography } from "antd";
import ReactECharts from "echarts-for-react";
import { mockDeveloperData } from "../utils/mockData";

const { Title } = Typography;

type Domain = "3D" | "AjaxAlgorithm算法" | "Amp";

interface Developer {
  domain: Domain;
  // 其他开发者属性可以在这里定义
}

// 定义一个函数来转换 mockDeveloperData 的类型
const convertToDeveloper = (data: {
  [key: string]: any;
}): Record<string, Developer> => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      {
        ...value,
        domain: value.domain as Domain, // 断言 domain 为 Domain 类型
      },
    ])
  );
};

const mockDeveloperDataTyped: Record<string, Developer> =
  convertToDeveloper(mockDeveloperData);

const getDomainDistribution = () => {
  const distribution: Record<Domain, number> = {
    "3D": 0,
    AjaxAlgorithm算法: 0,
    Amp: 0,
  };
  Object.values(mockDeveloperDataTyped).forEach((dev: Developer) => {
    if (dev.domain in distribution) {
      distribution[dev.domain]++;
    }
  });
  return Object.entries(distribution).map(([name, value]) => ({ name, value }));
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
      data: getDomainDistribution(),
    },
  ],
};

export default function DomainDistributionChart() {
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
