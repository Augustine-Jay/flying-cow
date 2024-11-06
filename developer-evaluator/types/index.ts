export interface Developer {
  id: string;
  name: string;
  username: string;
  talentRank: number;
  nation: string | null;
  domain: string;
}

export interface DeveloperResult {
  nationality: string;
  confidence: number;
  probabilities: { [key: string]: number };
}

export interface RatingResult {
  rank: number;
  score: number;
  projects: number;
  contributions: number;
}

export interface DomainDistribution {
  name: string;
  value: number;
}
