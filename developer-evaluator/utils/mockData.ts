// utils/mockData.ts ----- 模拟数据

interface DeveloperData {
  name: string;
  nationality: string;
  confidence: number;
  probabilities: {
    China: number;
    USA: number;
    India: number;
  };
  rank: string;
  score: number;
  projects: number;
  contributions: number;
  domain: string;
}

export const mockDeveloperData: { [key: string]: DeveloperData } = {
  Alice: {
    name: "Alice",
    nationality: "USA",
    confidence: 85,
    probabilities: { China: 10, USA: 85, India: 5 },
    rank: "A",
    score: 92,
    projects: 15,
    contributions: 500,
    domain: "3D",
  },
  Bob: {
    name: "Bob",
    nationality: "China",
    confidence: 78,
    probabilities: { China: 78, USA: 15, India: 7 },
    rank: "B",
    score: 75,
    projects: 10,
    contributions: 300,
    domain: "AjaxAlgorithm算法",
  },
  Charlie: {
    name: "Charlie",
    nationality: "India",
    confidence: 70,
    probabilities: { China: 20, USA: 10, India: 70 },
    rank: "A",
    score: 88,
    projects: 12,
    contributions: 450,
    domain: "Amp",
  },
  David: {
    name: "David",
    nationality: "USA",
    confidence: 82,
    probabilities: { China: 8, USA: 82, India: 10 },
    rank: "C",
    score: 60,
    projects: 5,
    contributions: 150,
    domain: "3D",
  },
  Eva: {
    name: "Eva",
    nationality: "China",
    confidence: 75,
    probabilities: { China: 75, USA: 20, India: 5 },
    rank: "B",
    score: 80,
    projects: 8,
    contributions: 350,
    domain: "AjaxAlgorithm算法",
  },
};
