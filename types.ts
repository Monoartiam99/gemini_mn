
export enum ReviewType {
  SECURITY = 'Security',
  PERFORMANCE = 'Performance',
  READABILITY = 'Readability',
  FULL = 'Comprehensive'
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
