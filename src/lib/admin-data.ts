import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "data", "portfolio-data.json");

export type Project = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  result: string;
  stack: string[];
  image: string;
  accent: string;
  role: string;
  status: "Live" | "Prototype" | "Draft";
  year: string;
  problem: string;
  process: string[];
  solution: string;
  proof: string[];
  links: { label: string; href: string; disabled?: boolean }[];
  video?: string;
};

export type TechItem = {
  name: string;
  group: string;
  level: string;
  note: string;
  id?: string;
  type?: "core" | "category" | "tech";
  x?: number;
  y?: number;
  iconUrl?: string;
  colorClassLight?: string;
  colorClassDark?: string;
  confidence?: number;
  projects?: string[];
};

export type PortfolioData = {
  projects: Project[];
  techItems: TechItem[];
};

export function readData(): PortfolioData {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as PortfolioData;
}

export function writeData(data: PortfolioData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}
