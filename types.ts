
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
  type: string;
  manager: User;
  statusLabel: string; // e.g. '开始'
  memberCount: number;
  repoCount: number;
  activityTrend: number[]; // Simple array for sparkline
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
  severity?: Severity; // 新增：严重程度
  environment?: string; // 新增：发现环境
  reproductionRate?: string; // 新增：重现率
  tags?: string[];
  dueDate: string;
  assignee: User;
  statusColor: string; // The vertical bar color on the left
  description?: string;
  progress?: number; // Percentage 0-100
  projectId?: string;
  attachments?: Attachment[];
  creatorId: string;
}

// 新增：风险实体接口
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
  iconColor: string; // Color for the column status icon
}

export interface FilterState {
  search: string;
  assigneeId: string | null;
  type: TaskType | null;
  priority: Priority | null;
  dateRange: { start: string; end: string } | null;
  projectId: string | null;
  status: string | null; // Filters by Column Title
  creatorId: string | null;
}

export type ViewType = 'kanban' | 'list' | 'tree';

export interface SavedView {
  name: string;
  type: 'system' | 'personal' | 'public';
  filters: Partial<FilterState>;
}

// Ruoyi-Vue-Pro Standard Response Wrapper
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
