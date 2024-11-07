import React, { useState, useEffect, useRef, useCallback } from "react";
import { Typography, Row, Col, Card, Input, Select, Button } from "antd";
import { motion } from "framer-motion";
import PredictionModule from "./PredictionModule";
import RatingModule from "./RatingModule";
import DomainDistributionChart from "./DomainDistributionChart";
import debounce from "lodash/debounce";

const { Title } = Typography;
const { Option } = Select;

const MotionCard = motion(Card);

// Generate random developer data
const generateRandomDevelopers = (count: number) => {
  const domains = ["3D", "Ajax", "Algorithm", "Amp"];
  const nationalities = ["China", "America", "Japan", "England", "Russia"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Developer ${i + 1}`,
    domain: domains[Math.floor(Math.random() * domains.length)],
    nationality:
      nationalities[Math.floor(Math.random() * nationalities.length)],
    rank: Math.floor(Math.random() * 100) + 1,
  }));
};

const developers = generateRandomDevelopers(999);

const ROW_HEIGHT = 40;
const HEADER_HEIGHT = 50;
const VISIBLE_ROWS = 15;
const TABLE_WIDTH = 1000;
const TABLE_HEIGHT = VISIBLE_ROWS * ROW_HEIGHT + HEADER_HEIGHT;

export default function DeveloperDashboard() {
  const [filteredDevelopers, setFilteredDevelopers] = useState(developers);
  const [domain, setDomain] = useState("All");
  const [nationality, setNationality] = useState("All");
  const [searchName, setSearchName] = useState("");
  const [scrollTop, setScrollTop] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const applyFilters = useCallback(() => {
    let filtered = developers;
    if (domain !== "All") {
      filtered = filtered.filter((dev) => dev.domain === domain);
    }
    if (nationality !== "All") {
      filtered = filtered.filter((dev) => dev.nationality === nationality);
    }
    if (searchName) {
      filtered = filtered.filter((dev) =>
        dev.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    setFilteredDevelopers(filtered);
    setScrollTop(0);
  }, [domain, nationality, searchName]);

  const debouncedApplyFilters = debounce(applyFilters, 300);

  useEffect(() => {
    debouncedApplyFilters();
  }, [domain, nationality, searchName, debouncedApplyFilters]);

  const drawTable = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw header
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, HEADER_HEIGHT);
    ctx.fillStyle = "#000";
    ctx.font = "bold 16px Arial";
    ctx.fillText("ID", 10, 30);
    ctx.fillText("Name", 60, 30);
    ctx.fillText("Domain", 310, 30);
    ctx.fillText("Nationality", 560, 30);
    ctx.fillText("Rank", 810, 30);

    // Draw rows
    const startIndex = Math.floor(scrollTop / ROW_HEIGHT);
    const endIndex = Math.min(
      startIndex + VISIBLE_ROWS,
      filteredDevelopers.length
    );

    for (let i = startIndex; i < endIndex; i++) {
      const dev = filteredDevelopers[i];
      const y = (i - startIndex) * ROW_HEIGHT + HEADER_HEIGHT;

      ctx.fillStyle = i % 2 === 0 ? "#ffffff" : "#f9f9f9";
      ctx.fillRect(0, y, canvas.width, ROW_HEIGHT);

      ctx.fillStyle = "#000";
      ctx.font = "14px Arial";
      ctx.fillText(dev.id.toString(), 10, y + 25);
      ctx.fillText(dev.name, 60, y + 25);
      ctx.fillText(dev.domain, 310, y + 25);
      ctx.fillText(dev.nationality, 560, y + 25);
      ctx.fillText(dev.rank.toString(), 810, y + 25);
    }
  }, [filteredDevelopers, scrollTop]);

  useEffect(() => {
    drawTable();
  }, [drawTable]);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      const maxScrollTop = Math.max(
        0,
        (filteredDevelopers.length - VISIBLE_ROWS) * ROW_HEIGHT
      );
      setScrollTop((prevScrollTop) => {
        const newScrollTop = Math.max(
          0,
          Math.min(prevScrollTop + delta, maxScrollTop)
        );
        return newScrollTop;
      });
    },
    [filteredDevelopers.length]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMouseOver = false;

    const handleMouseEnter = () => {
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (isMouseOver) {
        handleScroll(e);
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleScroll]);

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
            <Title
              level={4}
              style={{
                color: "#00b96b",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              开发者列表
            </Title>
            <div
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Select
                style={{ width: 200 }}
                placeholder="选择领域"
                value={domain}
                onChange={(value) => setDomain(value)}
              >
                <Option value="All">All</Option>
                <Option value="3D">3D</Option>
                <Option value="Ajax">Ajax</Option>
                <Option value="Algorithm">Algorithm</Option>
                <Option value="Amp">Amp</Option>
              </Select>
              <Select
                style={{ width: 200 }}
                placeholder="选择国籍"
                value={nationality}
                onChange={(value) => setNationality(value)}
              >
                <Option value="All">All</Option>
                <Option value="China">China</Option>
                <Option value="America">America</Option>
                <Option value="Japan">Japan</Option>
                <Option value="England">England</Option>
                <Option value="Russia">Russia</Option>
              </Select>
              <Input
                placeholder="搜索开发者名称"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                style={{ width: 200 }}
              />
            </div>
            <div
              ref={containerRef}
              style={{
                display: "flex",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                height: TABLE_HEIGHT,
              }}
            >
              <canvas
                ref={canvasRef}
                width={TABLE_WIDTH}
                height={TABLE_HEIGHT}
                style={{
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            </div>
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
