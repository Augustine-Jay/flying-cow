import { Table, Select, Button, Input, Space, Typography } from "antd";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import { fetchDevelopers, setFilters } from "../store/developerSlice";

const { Option } = Select;
const { Title } = Typography;

const domains = ["All", "3D", "Ajax", "Algorithm算法", "Amp"];

export default function DeveloperTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { developers, loading, filters } = useSelector(
    (state: RootState) => state.developers
  );
  const [nationalities, setNationalities] = useState<string[]>(["All"]);

  useEffect(() => {
    dispatch(fetchDevelopers());
    fetchNationalities();
  }, [dispatch]);

  const fetchNationalities = async () => {
    try {
      // API调用占位符
      // 需要接收的数据: string[]
      // API应该返回所有可用的国籍列表
      const response = await fetch("/api/nationalities");
      if (!response.ok) {
        throw new Error("Failed to fetch nationalities");
      }
      const fetchedNationalities: string[] = await response.json();
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

  const handleFilter = () => {
    dispatch(fetchDevelopers());
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
            value={filters.domain}
            onChange={(value) => dispatch(setFilters({ domain: value }))}
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
            value={filters.nationality}
            onChange={(value) => dispatch(setFilters({ nationality: value }))}
          >
            {nationalities.map((nationality) => (
              <Option key={nationality} value={nationality}>
                {nationality}
              </Option>
            ))}
          </Select>
          <Input
            placeholder="搜索开发者名称"
            value={filters.name}
            onChange={(e) => dispatch(setFilters({ name: e.target.value }))}
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
          dataSource={developers}
          loading={loading}
          style={{ background: "#2c2c2c", color: "#fff" }}
        />
      </motion.div>
    </div>
  );
}
