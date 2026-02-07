export enum ReviewType {
  SECURITY = 'Security',
  PERFORMANCE = 'Performance',
  READABILITY = 'Readability',
  FULL = 'Comprehensive'
}

export enum FileFormat {
  JAVASCRIPT = 'JavaScript',
  TYPESCRIPT = 'TypeScript',
  CSS = 'CSS',
  JSON = 'JSON',
  HTML = 'HTML',
  PYTHON = 'Python',
  JAVA = 'Java',
  CPP = 'C++',
  CSHARP = 'C#',
  GO = 'Go',
  RUST = 'Rust',
  PHP = 'PHP',
  RUBY = 'Ruby',
  SWIFT = 'Swift',
  KOTLIN = 'Kotlin'
}

export interface ReviewResponse {
  summary: string;
  issues: {
    severity: 'critical' | 'warning' | 'info';
    title: string;
    description: string;
    suggestion: string;
  }[];
  score: number;
}

export interface NavItem {
  label: string;
  href: string;
}