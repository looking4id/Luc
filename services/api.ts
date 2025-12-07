
import { MOCK_PROJECTS, MOCK_USERS, MOCK_COLUMNS } from '../constants';
import { Project, Task, WorkbenchData, ApiResponse, TaskType, Priority } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to wrap response in Ruoyi format
const success = <T>(data: T): ApiResponse<T> => ({
  code: 0, // Ruoyi uses 0 for success usually, or 200
  data,
  msg: 'success'
});

// "Database" state
let localProjects = [...MOCK_PROJECTS];
let localColumns = [...MOCK_COLUMNS];

// Flatten tasks from columns for easier manipulation
const getAllTasks = () => localColumns.flatMap(col => col.tasks);

/**
 * Service: Project Management
 * Simulating: /bpm/project/*
 */
export const ProjectService = {
  list: async (): Promise<ApiResponse<Project[]>> => {
    await delay(300);
    return success(localProjects);
  },

  getById: async (id: string): Promise<ApiResponse<Project | undefined>> => {
    await delay(200);
    const project = localProjects.find(p => p.id === id);
    return success(project);
  }
};

/**
 * Service: Task Management
 * Simulating: /bpm/task/*
 */
export const TaskService = {
  list: async (): Promise<ApiResponse<Task[]>> => {
    await delay(300);
    return success(getAllTasks());
  },

  getMyTasks: async (userId: string): Promise<ApiResponse<Task[]>> => {
    await delay(300);
    const all = getAllTasks();
    // In a real backend, this would utilize SQL WHERE clauses
    const myTasks = all.filter(t => t.assignee?.id === userId || t.creatorId === userId);
    return success(myTasks);
  },

  create: async (task: Task): Promise<ApiResponse<boolean>> => {
    await delay(400);
    // Add to 'todo' column by default in our mock DB
    const colIndex = localColumns.findIndex(c => c.id === 'todo');
    if (colIndex > -1) {
      localColumns[colIndex].tasks.unshift(task);
      localColumns[colIndex].count++;
    }
    return success(true);
  }
};

/**
 * Service: Workbench Dashboard
 * Simulating: Aggregated data for /system/dashboard/workbench
 */
export const WorkbenchService = {
  getData: async (userId: string): Promise<ApiResponse<WorkbenchData>> => {
    await delay(600); // Simulate complex query
    
    const allTasks = getAllTasks();
    const myTasks = allTasks.filter(t => t.assignee?.id === userId && t.statusColor !== 'bg-green-500'); // Assuming green is done
    const doneTasks = allTasks.filter(t => t.assignee?.id === userId && t.statusColor === 'bg-green-500');
    
    // Mock Activities
    const activities = [
      { id: '1', user: MOCK_USERS[0], action: '更新了需求', target: '支持多人扫码加入点餐', time: '10分钟前' },
      { id: '2', user: MOCK_USERS[1], action: '创建了任务', target: '后端API性能优化', time: '30分钟前' },
      { id: '3', user: MOCK_USERS[0], action: '完成了', target: '前端点赞动画', time: '1小时前' },
      { id: '4', user: MOCK_USERS[2], action: '评论了', target: '发票审查流程', time: '2小时前' },
    ];

    return success({
      projects: localProjects,
      myTasks: myTasks.slice(0, 5), // Limit 5
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
