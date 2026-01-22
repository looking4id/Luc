
import { MOCK_PROJECTS as INITIAL_PROJECTS, MOCK_USERS, MOCK_COLUMNS } from '../utils/constants';
import { Project, Task, WorkbenchData, ApiResponse, TaskType, Priority } from '../types/index';

// Session-based project storage
let sessionProjects = [...INITIAL_PROJECTS];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const success = <T>(data: T): ApiResponse<T> => ({
  code: 0, 
  data,
  msg: 'success'
});

export const AuthService = {
  login: async (username: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> => {
    await delay(800);
    if (username === 'admin' && password === '123456') {
      return success({
        token: 'mock-jwt-token',
        user: MOCK_USERS[0]
      });
    }
    return { code: 500, data: null as any, msg: '账号或密码错误 (提示: admin/123456)' };
  }
};

export const ProjectService = {
  list: async (): Promise<ApiResponse<Project[]>> => {
    await delay(300);
    return success([...sessionProjects]);
  },
  getById: async (id: string): Promise<ApiResponse<Project | undefined>> => {
    await delay(200);
    const project = sessionProjects.find(p => p.id === id);
    return success(project);
  },
  create: async (projectData: Partial<Project>): Promise<ApiResponse<Project>> => {
    await delay(500);
    const newProject: Project = {
      id: `p${sessionProjects.length + 1}`,
      code: projectData.code || `P${1000 + sessionProjects.length}`,
      name: projectData.name || '新项目',
      type: projectData.type || '敏捷项目',
      manager: projectData.manager || MOCK_USERS[0],
      statusLabel: '开始',
      memberCount: 1,
      repoCount: 0,
      activityTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      isStar: false,
      iconColor: projectData.iconColor || 'text-blue-500',
    };
    sessionProjects = [newProject, ...sessionProjects];
    return success(newProject);
  }
};

export const TaskService = {
  list: async (): Promise<ApiResponse<Task[]>> => {
    await delay(300);
    const all = MOCK_COLUMNS.flatMap(col => col.tasks);
    return success(all);
  },
  getMyTasks: async (userId: string): Promise<ApiResponse<Task[]>> => {
    await delay(300);
    const all = MOCK_COLUMNS.flatMap(col => col.tasks);
    const myTasks = all.filter(t => t.assignee?.id === userId || t.creatorId === userId);
    return success(myTasks);
  }
};

export const WorkbenchService = {
  getData: async (userId: string): Promise<ApiResponse<WorkbenchData>> => {
    await delay(600);
    const allTasks = MOCK_COLUMNS.flatMap(col => col.tasks);
    const myTasks = allTasks.filter(t => t.assignee?.id === userId && t.statusColor !== 'bg-green-500');
    const doneTasks = allTasks.filter(t => t.assignee?.id === userId && t.statusColor === 'bg-green-500');
    
    const activities = [
      { id: '1', user: MOCK_USERS[0], action: '更新了需求', target: '支持多人扫码加入点餐', time: '10分钟前' },
      { id: '2', user: MOCK_USERS[1], action: '创建了任务', target: '后端API性能优化', time: '30分钟前' },
      { id: '3', user: MOCK_USERS[0], action: '完成了', target: '前端点赞动画', time: '1小时前' },
      { id: '4', user: MOCK_USERS[2], action: '评论了', target: '发票审查流程', time: '2小时前' },
    ];

    return success({
      projects: sessionProjects,
      myTasks: myTasks.slice(0, 5),
      stats: {
        todo: myTasks.length,
        done: doneTasks.length,
        overdue: 2,
        efficiency: 92
      },
      activities
    });
  }
};
