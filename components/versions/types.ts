
export interface Version {
  id: string;
  version: string;
  name: string;
  phase: '开发环境' | '测试环境' | '预发布环境' | '生产环境';
  owner: string;
  date: string; // YYYY-MM-DD
  progress: number;
  description?: string;
  color: string;
}

export const PHASE_COLORS: Record<string, string> = {
  '开发环境': 'bg-blue-500',
  '测试环境': 'bg-amber-500',
  '预发布环境': 'bg-indigo-500',
  '生产环境': 'bg-emerald-500'
};
