// components/DeveloperTable.tsx
import { Table, Select, Button, Input, Space, Typography } from "antd";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const { Option } = Select;
const { Title } = Typography;

const domains = ["All", "3D", "Ajax", "Algorithm算法", "Amp"];

interface Developer {
  id: string;
  name: string;
  domain: string;
  nationality: string;
  rank: string;
}

export default function DeveloperTable() {
  const [data, setData] = useState<Developer[]>([]);
  const [filters, setFilters] = useState({
    domain: "All",
    nationality: "All",
    name: "",
  });
  const [nationalities, setNationalities] = useState<string[]>(["All"]);

  useEffect(() => {
    fetchDevelopers();
    fetchNationalities();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const response = await fetch("API_ENDPOINT_FOR_DEVELOPERS");
      if (!response.ok) {
        throw new Error("Failed to fetch developers");
      }
      const developers = await response.json();
      setData(developers);
    } catch (error) {
      console.error("Error fetching developers:", error);
    }
  };

  const fetchNationalities = async () => {
    try {
      const response = await fetch("API_ENDPOINT_FOR_NATIONALITIES");
      if (!response.ok) {
        throw new Error("Failed to fetch nationalities");
      }
      const fetchedNationalities = await response.json();
      setNationalities(["All", ...fetchedNationalities]);
    } catch (error) {
      console.error("Error fetching nationalities:", error);
    }
  };

  const columns = [
    {
      title: "开发者",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "领域",
      dataIndex: "domain",
      key: "domain",
    },
    {
      title: "国籍",
      dataIndex: "nationality",
      key: "nationality",
      render: (nationality: string) => nationality || "-",
    },
    {
      title: "评级",
      dataIndex: "rank",
      key: "rank",
    },
  ];

  const handleFilter = async () => {
    try {
      const response = await fetch(
        `API_ENDPOINT_FOR_FILTERED_DEVELOPERS?domain=${filters.domain}&nationality=${filters.nationality}&name=${filters.name}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch filtered developers");
      }
      const filteredDevelopers = await response.json();
      setData(filteredDevelopers);
    } catch (error) {
      console.error("Error fetching filtered developers:", error);
    }
  };

  return (
    <div>
      <Title
        level={4}
        style={{ color: "#00b96b", marginBottom: "1rem", textAlign: "center" }}
      >
        开发者列表
      </Title>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex", marginBottom: 16 }}
      >
        <Space wrap style={{ justifyContent: "center" }}>
          <Select
            style={{ width: 200 }}
            placeholder="选择领域"
            onChange={(value) => setFilters({ ...filters, domain: value })}
          >
            {domains.map((domain) => (
              <Option key={domain} value={domain}>
                {domain}
              </Option>
            ))}
          </Select>
          <Select
            style={{ width: 200 }}
            placeholder="选择国籍"
            onChange={(value) => setFilters({ ...filters, nationality: value })}
          >
            {nationalities.map((nationality) => (
              <Option key={nationality} value={nationality}>
                {nationality}
              </Option>
            ))}
          </Select>
          <Input
            placeholder="搜索开发者名称"
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            onClick={handleFilter}
            style={{
              borderRadius: "2rem",
              background: "#00b96b",
              border: "none",
              boxShadow: "0 0 10px rgba(0,185,107,0.5)",
            }}
          >
            应用筛选
          </Button>
        </Space>
      </Space>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ delay: 0.2 }}
      >
        <Table
          columns={columns}
          dataSource={data}
          style={{ background: "#2c2c2c", color: "#fff" }}
        />
      </motion.div>
    </div>
  );
}
