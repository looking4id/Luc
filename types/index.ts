
export enum Priority {
  High = '高',
  Normal = '中',
  Low = '低'
}

export enum Severity {
  Critical = '致命',
  Major = '严重',
  Normal = '一般',
  Minor = '提示'
}

export enum TaskType {
  Task = '任务',
  Requirement = '需求',
  Defect = '缺陷'
}

export interface User {
  id: string;
  name: string;
  avatarColor: string;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  description?: string; // 增加项目描述
  type: string;
  manager: User;
  statusLabel: string;
  memberCount: number;
  repoCount: number;
  activityTrend: number[];
  isStar: boolean;
  iconColor: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface Task {
  id: string;
  displayId: string;
  title: string;
  type: TaskType;
  priority?: Priority;
  severity?: Severity;
  environment?: string;
  reproductionRate?: string;
  tags?: string[];
  startDate?: string; // 新增：计划开始日期
  dueDate: string;     // 作为计划结束日期
  assignee: User;
  statusColor: string;
  description?: string;
  progress?: number;
  projectId?: string;
  iteration?: string;  // 新增：迭代
  version?: string;    // 新增：需求版本
  attachments?: Attachment[];
  creatorId: string;
}

export interface Risk {
  id: string;
  title: string;
  probability: '高' | '中' | '低';
  impact: '高' | '中' | '低';
  status: string;
  owner: string;
  strategy: string;
  created: string;
  description?: string;
}

export interface Column {
  id: string;
  title: string;
  count: number;
  tasks: Task[];
  iconColor: string;
}

export interface FilterState {
  search: string;
  assigneeId: string | null;
  type: TaskType | null;
  priority: Priority | null;
  dateRange: { start: string; end: string } | null;
  projectId: string | null;
  status: string | null;
  creatorId: string | null;
}

export type ViewType = 'kanban' | 'list' | 'tree';

export interface SavedView {
  name: string;
  type: 'system' | 'personal' | 'public';
  filters: Partial<FilterState>;
}

export interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string;
}

export interface WorkbenchData {
  projects: Project[];
  myTasks: Task[];
  stats: {
    todo: number;
    done: number;
    overdue: number;
    efficiency: number;
  };
  activities: {
    id: string;
    user: User;
    action: string;
    target: string;
    time: string;
  }[];
}

// ------------------- Metrics Related Types -------------------

/* Add MetricSummary interface for performance metrics dashboard */
export interface MetricSummary {
  id: string;
  label: string;
  value: string;
  unit: string;
  trend: number;
  isPositiveBetter: boolean;
}

/* Add MetricSection interface for performance metrics dashboard */
export interface MetricSection {
  id: string;
  title: string;
  icon: any;
  metrics: MetricSummary[];
}

/* Add DetailItem interface for drill-down views in metrics */
export interface DetailItem {
  id: string;
  title: string;
  status: string;
  owner: string;
  updatedAt: string;
}
