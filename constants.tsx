
import { Column, Priority, TaskType, User, Project } from './types';

const user1: User = { id: 'u1', name: 'lo', avatarColor: 'bg-yellow-500' };
const user2: User = { id: 'u2', name: 'Dev 1', avatarColor: 'bg-blue-500' };

export const MOCK_USERS: User[] = [
  user1, 
  user2,
  { id: 'u3', name: '产品经理', avatarColor: 'bg-purple-500' },
  { id: 'u4', name: '测试工程师', avatarColor: 'bg-green-500' },
  { id: 'u5', name: 'UI设计师', avatarColor: 'bg-pink-500' }
];

export const MOCK_PROJECTS: Project[] = [
  { 
    id: 'p1', 
    code: 'P1000',
    name: '敏捷研发项目01',
    type: '敏捷项目',
    manager: user1,
    statusLabel: '开始',
    memberCount: 1,
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
    memberCount: 1,
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
    count: 2,
    iconColor: 'text-gray-400',
    tasks: [
      {
        id: 't1',
        displayId: '#ICQMC6',
        title: '【示例任务】后端任务：菜品点赞接口',
        type: TaskType.Task,
        priority: Priority.High,
        tags: ['新手引导'],
        dueDate: '2025-08-16',
        assignee: user1,
        statusColor: 'bg-blue-600',
        description: '设计并实现菜品点赞的后端API接口，包括数据库设计、接口定义以及单元测试。需要处理高并发场景下的点赞计数问题。',
        progress: 0,
        projectId: 'p1',
        creatorId: 'u1'
      },
      {
        id: 't2',
        displayId: '#ICQMC5',
        title: '【示例任务】前端任务：点赞功能开发',
        type: TaskType.Task,
        priority: Priority.High,
        tags: ['新手引导'],
        dueDate: '2025-08-16',
        assignee: user1,
        statusColor: 'bg-blue-600',
        description: '在菜品详情页添加点赞按钮，实现与后端的交互逻辑，增加点赞动画效果，优化用户体验。',
        progress: 10,
        projectId: 'p1',
        creatorId: 'u1'
      }
    ]
  },
  {
    id: 'inprogress',
    title: '进行中',
    count: 10,
    iconColor: 'text-blue-500',
    tasks: [
      {
        id: 't3',
        displayId: '#ICQMCC',
        title: '【示例需求】后台支持发票审查通过功能',
        type: TaskType.Requirement,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-30',
        assignee: user1,
        statusColor: 'bg-blue-600',
        description: '运营后台需要新增发票审查模块，支持财务人员批量审核发票请求，并发送通知给用户。',
        progress: 45,
        projectId: 'p2',
        creatorId: 'u2'
      },
      {
        id: 't4',
        displayId: '#ICQMC2',
        title: '【示例任务】后端任务：删除菜品接口',
        type: TaskType.Task,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-16',
        assignee: user1,
        statusColor: 'bg-blue-600',
        description: '提供软删除菜品的接口，确保历史订单数据不受影响。',
        progress: 60,
        projectId: 'p1',
        creatorId: 'u1'
      },
      {
        id: 't5',
        displayId: '#ICQMC3',
        title: '【示例任务】前端任务：跳转逻辑修改',
        type: TaskType.Task,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-16',
        assignee: user1,
        statusColor: 'bg-blue-600',
        progress: 80,
        projectId: 'p1',
        creatorId: 'u1'
      },
       {
        id: 't6',
        displayId: '#ICQMC4',
        title: '【示例任务】后端任务：提交订单接口',
        type: TaskType.Task,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-16',
        assignee: user1,
        statusColor: 'bg-blue-600',
        progress: 25,
        projectId: 'p2',
        creatorId: 'u1'
      },
      {
        id: 't7',
        displayId: '#ICQMC1',
        title: '【示例任务】后端任务：编辑菜品接口',
        type: TaskType.Task,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-16',
        assignee: user1,
        statusColor: 'bg-blue-600',
        progress: 90,
        projectId: 'p1',
        creatorId: 'u1'
      }
    ]
  },
  {
    id: 'done',
    title: '已完成',
    count: 4,
    iconColor: 'text-green-500',
    tasks: [
      {
        id: 't8',
        displayId: '#ICQMC0',
        title: '【示例任务】后端任务：多人点餐接口',
        type: TaskType.Task,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-16',
        assignee: user1,
        statusColor: 'bg-green-500',
        progress: 100,
        projectId: 'p1',
        creatorId: 'u1'
      },
      {
        id: 't9',
        displayId: '#ICQMBZ',
        title: '【示例任务】前端任务：点餐人数显示',
        type: TaskType.Task,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-16',
        assignee: user1,
        statusColor: 'bg-green-500',
        progress: 100,
        projectId: 'p1',
        creatorId: 'u1'
      },
      {
        id: 't10',
        displayId: '#ICQMBX',
        title: '【示例任务】多人点餐测试用例编写',
        type: TaskType.Task,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-16',
        assignee: user1,
        statusColor: 'bg-green-500',
        progress: 100,
        projectId: 'p1',
        creatorId: 'u2'
      },
      {
        id: 't11',
        displayId: '#ICQMBQ',
        title: '【示例需求】支持多人扫码加入点餐',
        type: TaskType.Requirement,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-16',
        assignee: user1,
        statusColor: 'bg-green-500',
        progress: 100,
        projectId: 'p2',
        creatorId: 'u1'
      }
    ]
  },
  {
    id: 'intention',
    title: '意向',
    count: 5,
    iconColor: 'text-gray-400',
    tasks: [
      {
        id: 't12',
        displayId: '#ICQMCA',
        title: '【示例需求】开票完成后支持更改发票信息',
        type: TaskType.Requirement,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-30',
        assignee: user1,
        statusColor: 'bg-gray-300',
        projectId: 'p3',
        creatorId: 'u1'
      },
      {
        id: 't13',
        displayId: '#ICQMCB',
        title: '【示例需求】开票完成后支持发送至邮箱',
        type: TaskType.Requirement,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-30',
        assignee: user1,
        statusColor: 'bg-gray-300',
        projectId: 'p3',
        creatorId: 'u1'
      },
      {
        id: 't14',
        displayId: '#ICQMC8',
        title: '【示例需求】付款后支持自助申请开票',
        type: TaskType.Requirement,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-30',
        assignee: user1,
        statusColor: 'bg-gray-300',
        projectId: 'p3',
        creatorId: 'u1'
      },
      {
        id: 't15',
        displayId: '#ICQMC7',
        title: '【示例需求】支持用户在小程序自助开票',
        type: TaskType.Requirement,
        priority: Priority.Urgent,
        tags: ['新手引导'],
        dueDate: '2025-08-30',
        assignee: user1,
        statusColor: 'bg-gray-300',
        projectId: 'p3',
        creatorId: 'u1'
      },
       {
        id: 't16',
        displayId: '#ICQMC9',
        title: '【示例需求】订单页面支持查看开票进度',
        type: TaskType.Requirement,
        priority: Priority.High,
        tags: ['新手引导'],
        dueDate: '',
        assignee: null as any,
        statusColor: 'bg-gray-300',
        projectId: 'p2',
        creatorId: 'u2'
      }
    ]
  },
  {
    id: 'cancelled',
    title: '已取消',
    count: 0,
    iconColor: 'text-red-400',
    tasks: []
  }
];
