import type { BrandIconName } from "@/components/ui/icons/brand-icons";

export type NavItem = {
  label: string;
  href: string;
  icon: BrandIconName;
};

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

export type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

export type GitHubActivity = {
  totalContributions: number;
  weeks: {
    contributionDays: ContributionDay[];
  }[];
};

export type GitHubCommit = {
  message: string;
  repo: string;
  url: string;
  pushedAt: string;
};
