
import { Column, Priority, Severity, TaskType, User, Project } from './types';

const user1: User = { id: 'u1', name: 'lo', avatarColor: 'bg-yellow-500' };
const user2: User = { id: 'u2', name: 'Dev 1', avatarColor: 'bg-blue-500' };
const user3: User = { id: 'u3', name: '产品经理', avatarColor: 'bg-purple-500' };
const user4: User = { id: 'u4', name: '测试工程师', avatarColor: 'bg-green-500' };
const user5: User = { id: 'u5', name: 'UI设计师', avatarColor: 'bg-pink-500' };

export const MOCK_USERS: User[] = [
  user1, 
  user2,
  user3,
  user4,
  user5
];

export const MOCK_PROJECTS: Project[] = [
  { 
    id: 'p1', 
    code: 'P1000',
    name: '敏捷研发项目01',
    type: '敏捷项目',
    manager: user1,
    statusLabel: '开始',
    memberCount: 5,
    repoCount: 1,
    activityTrend: [2, 4, 3, 5, 4, 6, 7, 5, 8, 9],
    isStar: true,
    iconColor: 'text-orange-500'
  },
  { 
    id: 'p2', 
    code: 'P1001',
    name: '标准研发项目01',
    type: '标准项目',
    manager: user1,
    statusLabel: '开始',
    memberCount: 3,
    repoCount: 0,
    activityTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    isStar: true,
    iconColor: 'text-blue-500'
  }
];

export const MOCK_COLUMNS: Column[] = [
  {
    id: 'todo',
    title: '待办的',
    count: 5,
    iconColor: 'text-gray-400',
    tasks: [
      {
        id: 't1',
        displayId: '#RQ-101',
        title: '【需求】支持移动端扫码支付功能',
        type: TaskType.Requirement,
        priority: Priority.High,
        tags: ['支付模块', '核心'],
        dueDate: '2025-08-20',
        assignee: user1,
        statusColor: 'bg-gray-400',
        description: '在结算页面增加聚合支付入口，支持微信与支付宝扫码。',
        progress: 0,
        projectId: 'p1',
        creatorId: 'u3'
      },
      {
        id: 't2',
        displayId: '#DF-201',
        title: '【缺陷】结算页面在iOS 15系统下样式错乱',
        type: TaskType.Defect,
        priority: Priority.High,
        severity: Severity.Critical,
        environment: '测试环境',
        reproductionRate: '必然重现',
        tags: ['兼容性'],
        dueDate: '2025-08-16',
        assignee: user2,
        statusColor: 'bg-red-500',
        description: '结算按钮在低版本系统下高度塌陷。',
        progress: 0,
        projectId: 'p1',
        creatorId: 'u4'
      },
      {
        id: 't101',
        displayId: '#RQ-105',
        title: '【需求】增加多语言支持 (中/英)',
        type: TaskType.Requirement,
        priority: Priority.Normal,
        tags: ['国际化'],
        dueDate: '2025-09-01',
        assignee: user3,
        statusColor: 'bg-gray-400',
        projectId: 'p1',
        creatorId: 'u3'
      }
    ]
  },
  {
    id: 'inprogress',
    title: '进行中',
    count: 4,
    iconColor: 'text-blue-500',
    tasks: [
      {
        id: 't3',
        displayId: '#RQ-102',
        title: '【需求】个人中心增加余额提取功能',
        type: TaskType.Requirement,
        priority: Priority.High,
        tags: ['钱包'],
        dueDate: '2025-08-30',
        assignee: user1,
        statusColor: 'bg-blue-600',
        description: '支持用户将余额提取至绑定的银行卡。',
        progress: 45,
        projectId: 'p1',
        creatorId: 'u3'
      },
      {
        id: 't4',
        displayId: '#DF-202',
        title: '【缺陷】图片上传超过5MB时无错误提示',
        type: TaskType.Defect,
        priority: Priority.Normal,
        severity: Severity.Major,
        environment: '开发环境',
        reproductionRate: '必然重现',
        tags: ['UI反馈'],
        dueDate: '2025-08-18',
        assignee: user2,
        statusColor: 'bg-blue-600',
        description: '直接卡死或转圈，需要明确告知用户。',
        progress: 60,
        projectId: 'p1',
        creatorId: 'u1'
      },
      {
        id: 't5',
        displayId: '#TS-301',
        title: '【任务】后端API接口文档维护',
        type: TaskType.Task,
        priority: Priority.Normal,
        tags: ['文档'],
        dueDate: '2025-08-22',
        assignee: user1,
        statusColor: 'bg-blue-600',
        progress: 80,
        projectId: 'p1',
        creatorId: 'u1'
      }
    ]
  },
  {
    id: 'done',
    title: '已完成',
    count: 3,
    iconColor: 'text-green-500',
    tasks: [
      {
        id: 't8',
        displayId: '#RQ-100',
        title: '【需求】基础登录注册流程开发',
        type: TaskType.Requirement,
        priority: Priority.High,
        tags: ['账号系统'],
        dueDate: '2025-08-10',
        assignee: user1,
        statusColor: 'bg-green-500',
        progress: 100,
        projectId: 'p1',
        creatorId: 'u3'
      },
      {
        id: 't9',
        displayId: '#DF-200',
        title: '【缺陷】首页Banner在某些分辨率下显示模糊',
        type: TaskType.Defect,
        priority: Priority.Normal,
        severity: Severity.Normal,
        environment: '线上环境',
        reproductionRate: '间歇重现',
        tags: ['视觉体验'],
        dueDate: '2025-08-12',
        assignee: user5,
        statusColor: 'bg-green-500',
        progress: 100,
        projectId: 'p1',
        creatorId: 'u4'
      }
    ]
  },
  {
    id: 'intention',
    title: '意向',
    count: 2,
    iconColor: 'text-gray-400',
    tasks: [
      {
        id: 't12',
        displayId: '#RQ-108',
        title: '【需求】增加数据导出Excel功能',
        type: TaskType.Requirement,
        priority: Priority.Normal,
        tags: ['数据'],
        dueDate: '2025-12-30',
        assignee: user1,
        statusColor: 'bg-gray-300',
        projectId: 'p1',
        creatorId: 'u1'
      },
      {
        id: 't16',
        displayId: '#RQ-109',
        title: '【需求】支持暗黑模式自动切换',
        type: TaskType.Requirement,
        priority: Priority.Low,
        tags: ['体验优化'],
        dueDate: '2026-01-15',
        assignee: user5,
        statusColor: 'bg-gray-300',
        projectId: 'p1',
        creatorId: 'u5'
      }
    ]
  },
  {
    id: 'cancelled',
    title: '已取消',
    count: 1,
    iconColor: 'text-red-400',
    tasks: [
      {
        id: 't200',
        displayId: '#DF-500',
        title: '【缺陷】IE 11兼容性问题 (已放弃支持)',
        type: TaskType.Defect,
        priority: Priority.Low,
        severity: Severity.Minor,
        environment: '测试环境',
        reproductionRate: '难以重现',
        tags: ['兼容性'],
        dueDate: '2025-07-01',
        assignee: user2,
        statusColor: 'bg-red-200',
        projectId: 'p1',
        creatorId: 'u4'
      }
    ]
  }
];
