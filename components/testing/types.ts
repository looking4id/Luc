
export type ReviewResult = 'Pass' | 'Fail' | 'Blocked' | 'Pending';

export interface TestCase {
  id: string;
  title: string;
  version: string;
  reviewStatus: string;
  type: string;
  priority: string;
  maintainer: string;
  cited: number;
  precondition?: string;
  steps?: string;
  expectedResult?: string;
  description?: string;
}

export interface TestReview {
  id: string;
  title: string;
  status: string;
  initiator: string;
  passRate: number;
  total: number;
  completed: number;
  dueDate: string;
  linkedCaseIds: string[];
  results: Record<string, ReviewResult>;
}

export interface TestPlan {
  id: string;
  title: string;
  status: string;
  owner: string;
  sprint: string;
  coverage: string;
  passRate: string;
  description?: string;
}

export interface TestReport {
  id: string;
  title: string;
  type: string;
  date: string;
  author: string;
  result: string;
}
