import React, { useState } from 'react';
import {
  LayoutDashboard, Map, FileText, CheckSquare, Bug, Repeat, FlaskConical, GitBranch, Flag, ShieldAlert, GitPullRequest, PlayCircle, BarChart2, Users, Settings,
  Search, Bell, AiIcon, HelpCircle, Plus, MoreHorizontal, Maximize2, Zap, Clock, AlertTriangle, CheckCircle2, ChevronRight, Home, Activity, Box, Filter, ArrowUpDown, Download, Calendar, Trash2, Edit3, Target,
  LayoutList, Grid, List, ListFilter, ClipboardList, ChevronDown
} from './Icons';
import { Project, User, TaskType, Task, Priority } from '../types';
import { MOCK_COLUMNS, MOCK_USERS } from '../constants';
import { CreateTaskModal, TaskDetailsModal } from './KanbanBoard';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

// --- Helper Components ---

const DonutChart = ({ percentage, color, label }: { percentage: number; color: string; label: string }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="transform -rotate-90 w-full h-full">
          <circle cx="48" cy="48" r={radius} stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-lg font-bold text-slate-700">{percentage}%</span>
      </div>
      <span className="text-xs text-slate-500 mt-1">{label}</span>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
    let colorClass = 'bg-slate-100 text-slate-600';
    if (status === '进行中' || status === '处理中') colorClass = 'bg-blue-50 text-blue-600 border-blue-200';
    if (status === '已完成' || status === '已关闭' || status === '通过') colorClass = 'bg-green-50 text-green-600 border-green-200';
    if (status === '已逾期' || status === '失败' || status === 'Warning') colorClass = 'bg-red-50 text-red-600 border-red-200';
    if (status === '未开始' || status === '已识别') colorClass = 'bg-gray-50 text-gray-500 border-gray-200';
    
    return (
        <span className={`text-xs px-2 py-0.5 rounded border ${colorClass}`}>
            {status}
        </span>
    );
};

const PriorityBadge = ({ priority }: { priority?: Priority }) => {
    if (priority === Priority.Urgent) {
      return <span className="text-[10px] px-1 py-0.5 rounded border border-red-200 text-red-600 bg-red-50 font-medium">紧急</span>;
    }
    if (priority === Priority.High) {
      return <span className="text-[10px] px-1 py-0.5 rounded border border-orange-200 text-orange-500 bg-orange-50 font-medium">高</span>;
    }
    return <span className="text-[10px] px-1 py-0.5 rounded border border-slate-200 text-slate-500 bg-slate-50 font-medium">普通</span>;
};

// --- Mock Data ---

const MOCK_MILESTONES = [
    { id: 1, title: '项目启动会', date: '2025-07-01', status: '已完成', description: '完成项目立项，确定核心团队成员，签署项目章程。' },
    { id: 2, title: '需求规格说明书冻结', date: '2025-07-15', status: '已完成', description: '所有核心需求已确认签字，不再接受重大变更。' },
    { id: 3, title: 'Alpha 版本内部发布', date: '2025-08-10', status: '进行中', description: '完成核心功能开发，进行内部集成测试。' },
    { id: 4, title: 'Beta 版本公测', date: '2025-08-25', status: '未开始', description: '邀请种子用户参与测试，收集反馈。' },
    { id: 5, title: 'V1.0 正式上线', date: '2025-09-10', status: '未开始', description: '全量发布，配合市场推广活动。' },
];

const MOCK_RISKS = [
    { id: 'R-001', title: '第三方支付接口政策变动', probability: '高', impact: '高', status: '处理中', owner: 'looking4id', strategy: '规避', created: '2025-07-05' },
    { id: 'R-002', title: '服务器并发预估不足', probability: '中', impact: '高', status: '已识别', owner: 'dev01', strategy: '减轻', created: '2025-07-08' },
    { id: 'R-003', title: 'UI设计师临时请假', probability: '低', impact: '中', status: '已关闭', owner: 'pm01', strategy: '接受', created: '2025-07-10' },
    { id: 'R-004', title: '竞品提前上线', probability: '中', impact: '中', status: '已识别', owner: 'pm01', strategy: '转移', created: '2025-07-12' },
];

const MOCK_TEST_CASES = [
  { id: 'CUMR1', title: '【示例数据】注册时提示密码强度不足', version: '版本 1', reviewStatus: '待评审', type: '功能测试', priority: 'P0', maintainer: 'looking4id', cited: 0 },
  { id: 'CUMR3', title: '【示例数据】注册时校验用户名重复', version: '版本 1', reviewStatus: '待评审', type: '功能测试', priority: 'P0', maintainer: 'looking4id', cited: 0 },
  { id: 'CUMR6', title: '【示例数据】未登录状态浏览受限页面', version: '版本 1', reviewStatus: '待评审', type: '功能测试', priority: 'P1', maintainer: 'looking4id', cited: 0 },
  { id: 'CUMR2', title: '【示例数据】注册页面查看协议链接', version: '版本 1', reviewStatus: '待评审', type: '功能测试', priority: 'P1', maintainer: 'looking4id', cited: 0 },
  { id: 'CUMR4', title: '【示例数据】登录时记住密码功能', version: '版本 1', reviewStatus: '待评审', type: '功能测试', priority: 'P2', maintainer: 'looking4id', cited: 0 },
  { id: 'CUMR5', title: '【示例数据】正常进入商城', version: '版本 1', reviewStatus: '待评审', type: '功能测试', priority: 'P3', maintainer: 'looking4id', cited: 0 },
];

const MOCK_REVIEWS = [
  { id: 'REV-001', title: 'V1.0版本功能验收评审', status: '进行中', initiator: 'looking4id', passRate: 60, total: 20, completed: 12, dueDate: '2025-08-15' },
  { id: 'REV-002', title: '支付模块专项评审', status: '未开始', initiator: 'qa01', passRate: 0, total: 15, completed: 0, dueDate: '2025-08-20' },
  { id: 'REV-003', title: 'Sprint1 冒烟测试评审', status: '已完成', initiator: 'looking4id', passRate: 95, total: 30, completed: 30, dueDate: '2025-08-01' },
];

const MOCK_PLANS = [
  { id: 'PLAN-001', title: 'V1.0 全量回归测试计划', status: '进行中', owner: 'qa01', sprint: 'Sprint 1', coverage: '85%', passRate: '92%' },
  { id: 'PLAN-002', title: '支付接口自动化测试', status: '未开始', owner: 'dev01', sprint: 'Sprint 2', coverage: '0%', passRate: '-' },
  { id: 'PLAN-003', title: '小程序兼容性测试', status: '已完成', owner: 'qa02', sprint: 'Sprint 1', coverage: '100%', passRate: '98%' },
];

const MOCK_REPORTS = [
  { id: 'REP-001', title: 'Sprint 1 测试总结报告', type: '迭代报告', date: '2025-08-14', author: 'qa01', result: '通过' },
  { id: 'REP-002', title: 'V0.9 性能压测报告', type: '专项报告', date: '2025-08-01', author: 'dev01', result: 'Warning' },
  { id: 'REP-003', title: '支付模块安全测试报告', type: '安全报告', date: '2025-07-28', author: 'sec01', result: '通过' },
];

// --- Sub Views ---

const ProjectOverview: React.FC<{ project: Project }> = ({ project }) => (
    <div className="grid grid-cols-12 gap-6">
        {/* Row 1: Project Info & Charts */}
        <div className="col-span-12 md:col-span-4 bg-white rounded-lg border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
                    项目信息
                </h3>
                <MoreHorizontal size={16} className="text-slate-400 cursor-pointer" />
            </div>
            
            <div className="flex justify-around mb-8">
                <DonutChart percentage={16} color="#ef4444" label="工作项完成率" />
                <DonutChart percentage={0} color="#22c55e" label="工作项延误率" />
                <DonutChart percentage={100} color="#3b82f6" label="工作项类型" />
            </div>

            <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-slate-500">项目负责人:</span>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center">L</div>
                        <span className="font-medium text-slate-700">looking4id</span>
                    </div>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-slate-500">项目编号:</span>
                    <span className="font-mono text-slate-700">{project.code}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-500">项目状态:</span>
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-medium border border-blue-100">进行中</span>
                </div>
            </div>
        </div>

        <div className="col-span-12 md:col-span-8 bg-white rounded-lg border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
                    报表分析
                </h3>
                <div className="flex items-center gap-6 text-sm">
                    <span className="text-red-600 font-medium border-b-2 border-red-600 pb-1 cursor-pointer">成员负荷</span>
                    <span className="text-slate-500 hover:text-slate-800 cursor-pointer">团队速度</span>
                    <span className="text-slate-500 hover:text-slate-800 cursor-pointer">燃尽图</span>
                    <span className="text-slate-500 hover:text-slate-800 cursor-pointer">累计趋势</span>
                    <Zap size={16} className="text-slate-400 ml-4 cursor-pointer" />
                </div>
            </div>
            
            <div className="h-64 flex items-end justify-around px-8 pb-4 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 top-0 bottom-8 px-8 flex flex-col justify-between pointer-events-none">
                        {[16, 12, 8, 4, 0].map(v => (
                            <div key={v} className="border-b border-slate-100 w-full h-0 flex items-center">
                                <span className="text-xs text-slate-300 -ml-6">{v}</span>
                            </div>
                        ))}
                </div>

                {/* Bars */}
                {[
                    { user: 'looking4id', task: 12, defect: 4 },
                    { user: 'dev01', task: 8, defect: 2 },
                    { user: 'qa01', task: 5, defect: 8 },
                    { user: 'pm01', task: 15, defect: 0 }
                ].map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 z-10 w-12 group">
                        <div className="w-full flex flex-col-reverse h-56 justify-end relative">
                            <div style={{ height: `${d.task * 5}%` }} className="w-full bg-blue-500 rounded-t-sm relative group-hover:opacity-90 transition-opacity"></div>
                            <div style={{ height: `${d.defect * 5}%` }} className="w-full bg-red-500 rounded-t-sm relative group-hover:opacity-90 transition-opacity"></div>
                        </div>
                        <span className="text-xs text-slate-500">{d.user}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-slate-500">任务</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-slate-500">缺陷</span>
                </div>
            </div>
        </div>

        {/* Row 2: Sprint */}
        <div className="col-span-12 bg-white rounded-lg border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
                    迭代
                </h3>
                <div className="flex items-center gap-2 text-slate-400">
                        <Maximize2 size={14} className="cursor-pointer" />
                        <MoreHorizontal size={16} className="cursor-pointer" />
                </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-between border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-lg">Sp</div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-800">Sprint1: 功能优化</span>
                                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded border border-blue-200">进行中</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1">修复微信小程序在线点餐系统所存在的缺陷...</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-12">
                        <div className="text-center">
                            <div className="text-xs text-slate-500 mb-1">需求数</div>
                            <div className="font-bold text-slate-800">5</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-slate-500 mb-1">总缺陷</div>
                            <div className="font-bold text-slate-800">3</div>
                        </div>
                        <div className="flex flex-col items-end min-w-[140px]">
                            <div className="flex justify-between w-full text-xs text-slate-500 mb-1">
                                <span>时间进度</span>
                                <span>工作项进度 &nbsp; 4/18</span>
                            </div>
                            <div className="text-xs font-mono text-slate-700 mb-2">2025.12.01 - 2025.12.14</div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                <div className="w-[22%] h-full bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
);

interface WorkItemListProps {
    project: Project;
    type: TaskType;
    tasks: Task[];
    onCreate: () => void;
    onTaskClick: (t: Task) => void;
    onDelete: (taskId: string) => void;
}

const WorkItemList: React.FC<WorkItemListProps> = ({ project, type, tasks, onCreate, onTaskClick, onDelete }) => {
    // Filter tasks from passed props
    const displayTasks = tasks.filter(t => t.projectId === project.id && t.type === type);

    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                     <h3 className="font-bold text-slate-800 text-lg">{type}列表</h3>
                     <div className="flex items-center gap-2">
                         <div className="relative">
                             <input type="text" placeholder="搜索..." className="pl-8 pr-4 py-1.5 text-sm border border-slate-300 rounded focus:border-blue-500 outline-none w-64" />
                             <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                         </div>
                         <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-100">
                             <Filter size={14} /> 筛选
                         </button>
                     </div>
                 </div>
                 <button 
                    onClick={onCreate}
                    className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm shadow-sm transition-colors"
                 >
                     <Plus size={16} /> 新建{type}
                 </button>
            </div>
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 sticky top-0 z-10">
                        <tr className="border-b border-slate-200 text-slate-500 text-xs font-semibold">
                            <th className="py-3 px-4 w-10"><input type="checkbox" /></th>
                            <th className="py-3 px-4 w-24">ID</th>
                            <th className="py-3 px-4">标题</th>
                            <th className="py-3 px-4 w-32">状态</th>
                            <th className="py-3 px-4 w-32">负责人</th>
                            <th className="py-3 px-4 w-24">优先级</th>
                            <th className="py-3 px-4 w-32">截止日期</th>
                            <th className="py-3 px-4 w-20 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayTasks.map(task => (
                            <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50 group">
                                <td className="py-3 px-4"><input type="checkbox" /></td>
                                <td className="py-3 px-4 text-xs font-mono text-slate-500">{task.displayId}</td>
                                <td className="py-3 px-4">
                                    <div 
                                        onClick={() => onTaskClick(task)}
                                        className="text-sm font-medium text-slate-800 hover:text-blue-600 cursor-pointer"
                                    >
                                        {task.title}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <StatusBadge status={task.statusColor === 'bg-green-500' ? '已完成' : '处理中'} />
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        {task.assignee ? (
                                            <>
                                                <div className={`w-5 h-5 rounded-full ${task.assignee.avatarColor} text-white flex items-center justify-center text-[10px]`}>
                                                    {task.assignee.name.substring(0, 1)}
                                                </div>
                                                <span className="text-sm text-slate-600">{task.assignee.name}</span>
                                            </>
                                        ) : <span className="text-slate-400 text-sm">未分配</span>}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <PriorityBadge priority={task.priority} />
                                </td>
                                <td className="py-3 px-4 text-sm text-slate-500">{task.dueDate}</td>
                                <td className="py-3 px-4 text-right">
                                    <button 
                                        onClick={() => onDelete(task.id)}
                                        className="p-1 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="删除"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {displayTasks.length === 0 && (
                             <tr>
                                 <td colSpan={8} className="py-12 text-center text-slate-400">
                                     暂无{type}，点击右上角新建
                                 </td>
                             </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="p-3 border-t border-slate-200 flex justify-between items-center bg-slate-50">
                <span className="text-xs text-slate-500">共 {displayTasks.length} 条</span>
                <div className="flex gap-1">
                    <button className="px-2 py-1 border border-slate-300 rounded bg-white text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-50">上一页</button>
                    <button className="px-2 py-1 border border-slate-300 rounded bg-white text-xs text-slate-600 hover:bg-slate-50">下一页</button>
                </div>
            </div>
        </div>
    );
};

const ProjectPlanning = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">项目规划 (Roadmap)</h3>
            <div className="flex gap-2">
                 <button className="px-3 py-1.5 border border-slate-300 rounded text-sm flex items-center gap-1 hover:bg-slate-50">
                     <Calendar size={14} /> 按月视图
                 </button>
                 <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">新建规划</button>
            </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
            <div className="space-y-8">
                {['Q3 2025', 'Q4 2025'].map(quarter => (
                    <div key={quarter}>
                        <h4 className="font-bold text-slate-400 text-sm uppercase mb-4 border-b border-slate-100 pb-2">{quarter}</h4>
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-1/4">
                                        <div className="font-bold text-slate-700">核心功能迭代 v1.{i}</div>
                                        <div className="text-xs text-slate-500 mt-1">2025-0{7+i}-01 ~ 2025-0{8+i}-01</div>
                                    </div>
                                    <div className="flex-1 relative h-12 bg-slate-50 rounded border border-slate-100">
                                        <div 
                                            className={`absolute top-2 bottom-2 rounded opacity-80 ${i===1 ? 'bg-blue-400 left-4 right-1/2' : 'bg-green-400 left-1/2 right-4'}`}
                                        >
                                            <span className="text-xs text-white font-bold px-2 py-1 absolute left-2 top-1/2 -translate-y-1/2 whitespace-nowrap">
                                                {i===1 ? '进行中: 基础架构搭建' : '计划: 高级功能开发'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ProjectIterations = () => (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {[
             { name: 'Sprint 1: 基础功能', status: '进行中', progress: 65, start: '2025/08/01', end: '2025/08/14' },
             { name: 'Sprint 2: 支付模块', status: '未开始', progress: 0, start: '2025/08/15', end: '2025/08/28' },
             { name: 'Sprint 3: 报表优化', status: '未开始', progress: 0, start: '2025/08/29', end: '2025/09/12' },
         ].map((sprint, i) => (
             <div key={i} className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer">
                 <div className="flex justify-between items-start mb-4">
                     <div>
                         <div className="font-bold text-slate-800 text-lg mb-1">{sprint.name}</div>
                         <StatusBadge status={sprint.status} />
                     </div>
                     <MoreHorizontal size={16} className="text-slate-400 hover:text-slate-600" />
                 </div>
                 <div className="space-y-4">
                     <div className="flex justify-between text-sm text-slate-500">
                         <span>时间:</span>
                         <span className="font-mono">{sprint.start} - {sprint.end}</span>
                     </div>
                     <div>
                         <div className="flex justify-between text-xs text-slate-500 mb-1">
                             <span>完成度</span>
                             <span>{sprint.progress}%</span>
                         </div>
                         <div className="w-full bg-slate-100 rounded-full h-2">
                             <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${sprint.progress}%` }}></div>
                         </div>
                     </div>
                     <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-sm">
                         <div className="flex -space-x-2">
                             {[1,2,3].map(u => (
                                 <div key={u} className="w-6 h-6 rounded-full bg-slate-200 border border-white"></div>
                             ))}
                         </div>
                         <span className="text-blue-600 hover:underline">详情 &gt;</span>
                     </div>
                 </div>
             </div>
         ))}
         <div className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 cursor-pointer min-h-[200px] transition-colors">
             <Plus size={32} className="mb-2" />
             <span>创建新迭代</span>
         </div>
     </div>
);

// --- Test Management Components ---

const TestCaseView = () => (
    <>
         {/* Toolbar */}
         <div className="h-12 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50/30 flex-shrink-0">
             <div className="flex items-center gap-3">
                 <span className="text-sm text-slate-500">共有 {MOCK_TEST_CASES.length} 项</span>
                 <div className="relative">
                     <input 
                        type="text" 
                        placeholder="搜索..." 
                        className="pl-8 pr-4 py-1 text-sm border border-slate-300 rounded bg-white w-64 focus:outline-none focus:border-pink-500 transition-colors"
                     />
                     <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                 </div>
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-600">
                 <button className="flex items-center gap-1 hover:text-slate-900">
                     <Filter size={14} />
                     <span>筛选</span>
                 </button>
                 <button className="flex items-center gap-1 hover:text-slate-900">
                     <Settings size={14} />
                     <span>设置</span>
                 </button>
             </div>
         </div>

         {/* Table */}
         <div className="flex-1 overflow-auto">
             <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-200 sticky top-0 z-10">
                     <tr>
                         <th className="py-3 px-6 w-32">用例编号</th>
                         <th className="py-3 px-4">用例标题</th>
                         <th className="py-3 px-4 w-24">版本号</th>
                         <th className="py-3 px-4 w-40">当前版本评审结果</th>
                         <th className="py-3 px-4 w-24">用例类型</th>
                         <th className="py-3 px-4 w-24">优先级</th>
                         <th className="py-3 px-4 w-32">维护人</th>
                         <th className="py-3 px-4 w-20 text-center">被引用</th>
                         <th className="py-3 px-4 w-12 text-right"><Settings size={14} /></th>
                     </tr>
                 </thead>
                 <tbody className="text-sm">
                     {MOCK_TEST_CASES.map(tc => {
                         let priorityClass = 'text-slate-500 border-slate-200 bg-slate-50';
                         if (tc.priority === 'P0') priorityClass = 'text-red-600 border-red-200 bg-red-50';
                         if (tc.priority === 'P1') priorityClass = 'text-orange-500 border-orange-200 bg-orange-50';
                         if (tc.priority === 'P2') priorityClass = 'text-yellow-600 border-yellow-200 bg-yellow-50';
                         if (tc.priority === 'P3') priorityClass = 'text-slate-500 border-slate-200 bg-slate-50';

                         return (
                            <tr key={tc.id} className="border-b border-slate-100 hover:bg-slate-50 group transition-colors">
                                <td className="py-3 px-6">
                                    <span className="font-mono text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                                        {tc.id}
                                    </span>
                                </td>
                                <td className="py-3 px-4 font-medium text-slate-800 hover:text-pink-600 cursor-pointer transition-colors">
                                    {tc.title}
                                </td>
                                <td className="py-3 px-4 text-slate-500">{tc.version}</td>
                                <td className="py-3 px-4 text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3.5 h-3.5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center">
                                            <Clock size={10} />
                                        </div>
                                        {tc.reviewStatus}
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-slate-500">{tc.type}</td>
                                <td className="py-3 px-4">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${priorityClass}`}>
                                        {tc.priority}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-yellow-500 text-white flex items-center justify-center text-[10px] font-bold">
                                            Lo
                                        </div>
                                        <span className="text-slate-600">{tc.maintainer}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-center text-slate-500">{tc.cited}</td>
                                <td className="py-3 px-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                         );
                     })}
                 </tbody>
             </table>
         </div>
    </>
);

const TestReviewView = () => (
    <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_REVIEWS.map(review => {
                const percentage = Math.round((review.completed / review.total) * 100);
                return (
                    <div key={review.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg mb-1 line-clamp-1" title={review.title}>{review.title}</h3>
                                <StatusBadge status={review.status} />
                            </div>
                            <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18} /></button>
                        </div>
                        <div className="space-y-4">
                             <div className="flex justify-between text-sm text-slate-500">
                                 <span>通过率: <span className="text-slate-800 font-medium">{review.passRate}%</span></span>
                                 <span>截止: {review.dueDate}</span>
                             </div>
                             <div>
                                 <div className="flex justify-between text-xs text-slate-500 mb-1">
                                     <span>评审进度 ({review.completed}/{review.total})</span>
                                     <span>{percentage}%</span>
                                 </div>
                                 <div className="w-full bg-slate-100 rounded-full h-2">
                                     <div 
                                        className={`h-2 rounded-full transition-all ${percentage === 100 ? 'bg-green-500' : 'bg-blue-600'}`} 
                                        style={{ width: `${percentage}%` }}
                                     ></div>
                                 </div>
                             </div>
                             <div className="pt-4 border-t border-slate-50 flex items-center gap-2">
                                 <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                     {review.initiator.slice(0, 1).toUpperCase()}
                                 </div>
                                 <span className="text-xs text-slate-500">发起人: {review.initiator}</span>
                             </div>
                        </div>
                    </div>
                )
            })}
             <div className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 cursor-pointer min-h-[200px] transition-colors">
                 <Plus size={32} className="mb-2" />
                 <span>发起新评审</span>
             </div>
        </div>
    </div>
);

const TestPlanView = () => (
    <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-200 sticky top-0 z-10">
                <tr>
                    <th className="py-3 px-6 w-32">计划编号</th>
                    <th className="py-3 px-4">计划名称</th>
                    <th className="py-3 px-4 w-32">状态</th>
                    <th className="py-3 px-4 w-32">覆盖率</th>
                    <th className="py-3 px-4 w-32">通过率</th>
                    <th className="py-3 px-4 w-32">关联迭代</th>
                    <th className="py-3 px-4 w-32">负责人</th>
                    <th className="py-3 px-4 w-12 text-right">操作</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {MOCK_PLANS.map(plan => (
                    <tr key={plan.id} className="border-b border-slate-100 hover:bg-slate-50 group transition-colors">
                        <td className="py-4 px-6 font-mono text-xs text-slate-500">{plan.id}</td>
                        <td className="py-4 px-4 font-medium text-slate-800 hover:text-pink-600 cursor-pointer">{plan.title}</td>
                        <td className="py-4 px-4"><StatusBadge status={plan.status} /></td>
                        <td className="py-4 px-4 text-slate-600">{plan.coverage}</td>
                        <td className="py-4 px-4 font-medium text-green-600">{plan.passRate}</td>
                        <td className="py-4 px-4 text-slate-500">{plan.sprint}</td>
                        <td className="py-4 px-4 text-slate-500">{plan.owner}</td>
                        <td className="py-4 px-4 text-right">
                             <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const TestReportView = () => (
    <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
            {MOCK_REPORTS.map(report => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded flex items-center justify-center">
                            <BarChart2 size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-800 mb-1">{report.title}</div>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{report.type}</span>
                                <span>创建于: {report.date}</span>
                                <span>作者: {report.author}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <div className="text-xs text-slate-500 mb-1">结论</div>
                            <StatusBadge status={report.result} />
                        </div>
                        <ChevronRight size={20} className="text-slate-300" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- UPDATED ProjectTesting Component Container ---

const ProjectTesting = () => {
  const [activeSubItem, setActiveSubItem] = useState('测试用例');
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'mindmap'

  const subSidebarItems = [
      { id: '测试用例', icon: FileText, label: '测试用例' },
      { id: '测试评审', icon: CheckSquare, label: '测试评审' },
      { id: '测试计划', icon: ClipboardList, label: '测试计划' },
      { id: '测试报告', icon: BarChart2, label: '测试报告' },
  ];

  const renderContent = () => {
      switch (activeSubItem) {
          case '测试用例': return <TestCaseView />;
          case '测试评审': return <TestReviewView />;
          case '测试计划': return <TestPlanView />;
          case '测试报告': return <TestReportView />;
          default: return <TestCaseView />;
      }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex overflow-hidden">
        {/* Secondary Sidebar (Test Management) */}
        <div className="w-48 border-r border-slate-200 flex flex-col flex-shrink-0 bg-slate-50/50">
            <div className="h-12 flex items-center px-4 font-bold text-slate-800 gap-2 border-b border-slate-100 bg-white">
                <FlaskConical size={18} className="text-pink-600" />
                <span>测试管理</span>
            </div>
            <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
                {subSidebarItems.map(item => (
                    <div 
                        key={item.id}
                        onClick={() => setActiveSubItem(item.id)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm transition-colors ${
                            activeSubItem === item.id 
                            ? 'bg-pink-50 text-pink-700 font-medium' 
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                    >
                        <item.icon size={16} className={activeSubItem === item.id ? 'text-pink-600' : 'text-slate-400'} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
             {/* Header */}
             <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
                 <div className="flex items-center gap-6">
                     <h2 className="text-lg font-bold text-slate-800">{activeSubItem}</h2>
                     {activeSubItem === '测试用例' && (
                        <div className="flex items-center gap-4 text-sm">
                            <button 
                                onClick={() => setActiveTab('list')}
                                className={`pb-4 -mb-4 transition-colors ${activeTab === 'list' ? 'text-pink-600 border-b-2 border-pink-600 font-medium' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                列表
                            </button>
                            <button 
                                onClick={() => setActiveTab('mindmap')}
                                className={`pb-4 -mb-4 transition-colors ${activeTab === 'mindmap' ? 'text-pink-600 border-b-2 border-pink-600 font-medium' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                脑图
                            </button>
                        </div>
                     )}
                 </div>
                 <div className="flex items-center gap-2">
                     <button className="bg-red-800 hover:bg-red-900 text-white text-sm px-3 py-1.5 rounded flex items-center gap-1 shadow-sm transition-colors">
                         <Plus size={16} />
                         <span>新建{activeSubItem.replace('测试', '')}</span>
                     </button>
                     <button className="p-1.5 border border-slate-300 rounded hover:bg-slate-50 text-slate-600">
                         <MoreHorizontal size={16} />
                     </button>
                 </div>
             </div>

             {/* Dynamic Content */}
             {renderContent()}
        </div>
    </div>
  );
};

const ProjectVersions = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">发布版本</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">发布新版本</button>
        </div>
        <div className="divide-y divide-slate-100">
             {[
                 { v: '1.2.0', date: '2025-08-10', status: '已发布', desc: '包含多人点餐功能的正式发布' },
                 { v: '1.1.0', date: '2025-07-25', status: '已发布', desc: '基础点餐流程上线' },
                 { v: '1.0.0-beta', date: '2025-07-01', status: '已归档', desc: '内测版本' }
             ].map((ver, i) => (
                 <div key={i} className="p-4 hover:bg-slate-50 flex items-start justify-between">
                     <div className="flex items-start gap-4">
                         <div className="bg-slate-100 p-2 rounded text-slate-500">
                             <Box size={24} />
                         </div>
                         <div>
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="font-bold text-lg text-slate-800">{ver.v}</span>
                                 <StatusBadge status={ver.status === '已发布' ? '已完成' : '已逾期'} />
                             </div>
                             <div className="text-sm text-slate-500">{ver.desc}</div>
                             <div className="text-xs text-slate-400 mt-2 flex items-center gap-4">
                                 <span>发布于: {ver.date}</span>
                                 <span>负责人: looking4id</span>
                             </div>
                         </div>
                     </div>
                     <div className="flex items-center gap-2">
                         <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit3 size={16} /></button>
                         <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                     </div>
                 </div>
             ))}
        </div>
    </div>
);

const ProjectMembers = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-6">项目成员 (5)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {MOCK_USERS.map(user => (
                 <div key={user.id} className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg hover:border-blue-200 hover:shadow-sm transition-all group">
                     <div className={`w-12 h-12 rounded-full ${user.avatarColor} text-white flex items-center justify-center text-lg font-bold`}>
                         {user.name.substring(0, 1)}
                     </div>
                     <div className="flex-1">
                         <div className="font-bold text-slate-800">{user.name}</div>
                         <div className="text-xs text-slate-500">产品经理 / 管理员</div>
                     </div>
                     <button className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Trash2 size={16} />
                     </button>
                 </div>
             ))}
             <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors">
                 <Plus size={20} />
                 <span>邀请成员</span>
             </div>
        </div>
    </div>
);

const ProjectSettings = ({ project }: { project: Project }) => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 max-w-3xl">
        <h3 className="font-bold text-slate-800 mb-6 text-lg border-b border-slate-100 pb-4">项目设置</h3>
        
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">项目名称</label>
                <input type="text" defaultValue={project.name} className="w-full border border-slate-300 rounded px-3 py-2 focus:border-blue-500 outline-none" />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">项目标识 (Key)</label>
                <input type="text" defaultValue={project.code} disabled className="w-full border border-slate-200 bg-slate-50 rounded px-3 py-2 text-slate-500" />
                <p className="text-xs text-slate-400 mt-1">项目标识创建后不可修改。</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">描述</label>
                <textarea className="w-full border border-slate-300 rounded px-3 py-2 focus:border-blue-500 outline-none h-24" placeholder="简要描述项目目标..." defaultValue="这是一个示例敏捷开发项目..." />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">项目负责人</label>
                <select className="w-full border border-slate-300 rounded px-3 py-2 focus:border-blue-500 outline-none">
                    {MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-4">
                 <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">保存更改</button>
                 <button className="px-6 py-2 bg-white border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors">归档项目</button>
            </div>
        </div>
    </div>
);

// --- New Components: Milestones & Risks ---

const ProjectMilestones = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex flex-col">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Flag size={20} className="text-orange-500" /> 里程碑
            </h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-2">
                <Plus size={16} /> 新建里程碑
            </button>
        </div>
        <div className="flex-1 overflow-auto p-6">
            <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
                {MOCK_MILESTONES.map((m, i) => (
                    <div key={m.id} className="relative pl-6 group">
                        {/* Timeline Node */}
                        <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                            m.status === '已完成' ? 'bg-green-500' :
                            m.status === '进行中' ? 'bg-blue-500' : 'bg-slate-300'
                        }`}></div>
                        
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-slate-800 text-lg">{m.title}</h4>
                                <StatusBadge status={m.status} />
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                <span className="flex items-center gap-1 font-mono">
                                    <Calendar size={14} /> {m.date}
                                </span>
                                {m.status === '已完成' && (
                                    <span className="flex items-center gap-1 text-green-600">
                                        <CheckCircle2 size={14} /> 按期达成
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-slate-600">{m.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ProjectRisks = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <ShieldAlert size={20} className="text-red-500" /> 风险管理
            </h3>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <input type="text" placeholder="搜索风险..." className="pl-8 pr-4 py-1.5 text-sm border border-slate-300 rounded focus:border-blue-500 outline-none w-64" />
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm flex items-center gap-2">
                    <Plus size={16} /> 登记风险
                </button>
            </div>
        </div>
        <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                        <th className="py-3 px-4 w-24">ID</th>
                        <th className="py-3 px-4">风险标题</th>
                        <th className="py-3 px-4 w-24">可能性</th>
                        <th className="py-3 px-4 w-24">影响程度</th>
                        <th className="py-3 px-4 w-32">应对策略</th>
                        <th className="py-3 px-4 w-24">负责人</th>
                        <th className="py-3 px-4 w-24">状态</th>
                        <th className="py-3 px-4 w-24 text-right">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_RISKS.map(risk => {
                        const isCritical = risk.probability === '高' && risk.impact === '高';
                        return (
                            <tr key={risk.id} className={`border-b border-slate-100 hover:bg-slate-50 group ${isCritical ? 'bg-red-50/30' : ''}`}>
                                <td className="py-3 px-4 text-xs font-mono text-slate-500">{risk.id}</td>
                                <td className="py-3 px-4">
                                    <div className="font-medium text-slate-700 group-hover:text-blue-600 cursor-pointer">{risk.title}</div>
                                    <div className="text-xs text-slate-400 mt-1">创建于: {risk.created}</div>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`text-xs px-2 py-0.5 rounded ${
                                        risk.probability === '高' ? 'bg-red-100 text-red-700' :
                                        risk.probability === '中' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                    }`}>{risk.probability}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`text-xs px-2 py-0.5 rounded ${
                                        risk.impact === '高' ? 'bg-red-100 text-red-700' :
                                        risk.impact === '中' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                    }`}>{risk.impact}</span>
                                </td>
                                <td className="py-3 px-4 text-sm text-slate-600">{risk.strategy}</td>
                                <td className="py-3 px-4 text-sm text-slate-600">{risk.owner}</td>
                                <td className="py-3 px-4"><StatusBadge status={risk.status} /></td>
                                <td className="py-3 px-4 text-right">
                                    <button className="p-1 text-slate-400 hover:text-slate-600">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
);

// --- Main Component ---

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState('项目概览');
  
  // State for Managing Tasks locally within Project Detail to support Edit/Create
  const [tasks, setTasks] = useState<Task[]>(MOCK_COLUMNS.flatMap(col => col.tasks));
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createTaskType, setCreateTaskType] = useState<TaskType>(TaskType.Task);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    // If editing, update the modal content ref via state if needed, but TaskDetailsModal handles its own internal state mostly,
    // we just need to update the list.
    setEditingTask(updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    setEditingTask(null);
  };

  const openCreateModal = (type: TaskType) => {
      setCreateTaskType(type);
      setIsCreateModalOpen(true);
  };

  const primaryMenuItems = [
    { icon: LayoutDashboard, label: '项目概览' },
    { icon: FileText, label: '需求', count: tasks.filter(t => t.projectId === project.id && t.type === TaskType.Requirement).length },
    { icon: CheckSquare, label: '任务', count: tasks.filter(t => t.projectId === project.id && t.type === TaskType.Task).length },
    { icon: Bug, label: '缺陷', count: tasks.filter(t => t.projectId === project.id && t.type === TaskType.Defect).length },
    { icon: Repeat, label: '迭代' },
    { icon: FlaskConical, label: '测试' },
    { icon: Map, label: '规划' },
    { icon: GitBranch, label: '版本' },
  ];

  const secondaryMenuItems = [
    { icon: Flag, label: '里程碑', count: 5 },
    { icon: ShieldAlert, label: '风险', count: 4 },
    { icon: GitPullRequest, label: '代码评审', count: 1 },
    { icon: PlayCircle, label: '流水线' },
    { icon: BarChart2, label: '效能度量', badge: 'Beta' },
    { icon: Users, label: '成员', count: 5 },
    { icon: Settings, label: '项目设置' },
  ];

  const renderContent = () => {
    switch (activeTab) {
        case '项目概览': return <ProjectOverview project={project} />;
        case '需求': return (
            <WorkItemList 
                project={project} 
                type={TaskType.Requirement} 
                tasks={tasks}
                onCreate={() => openCreateModal(TaskType.Requirement)}
                onTaskClick={setEditingTask}
                onDelete={handleDeleteTask}
            />
        );
        case '任务': return (
            <WorkItemList 
                project={project} 
                type={TaskType.Task} 
                tasks={tasks}
                onCreate={() => openCreateModal(TaskType.Task)}
                onTaskClick={setEditingTask}
                onDelete={handleDeleteTask}
            />
        );
        case '缺陷': return (
             <WorkItemList 
                project={project} 
                type={TaskType.Defect} 
                tasks={tasks}
                onCreate={() => openCreateModal(TaskType.Defect)}
                onTaskClick={setEditingTask}
                onDelete={handleDeleteTask}
            />
        );
        case '规划': return <ProjectPlanning />;
        case '迭代': return <ProjectIterations />;
        case '测试': return <ProjectTesting />;
        case '版本': return <ProjectVersions />;
        case '里程碑': return <ProjectMilestones />;
        case '风险': return <ProjectRisks />;
        case '成员': return <ProjectMembers />;
        case '项目设置': return <ProjectSettings project={project} />;
        default: return (
            <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                <Box size={48} className="mb-4 opacity-20" />
                <h3 className="text-lg font-medium">功能开发中</h3>
                <p className="text-sm">该模块正在建设中，敬请期待...</p>
            </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 overflow-hidden">
      {/* Top Navigation Bar (Horizontal) */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm flex-shrink-0 z-20">
         <div className="flex items-center gap-6 overflow-hidden">
             {/* Project Title / Back */}
             <div className="flex items-center gap-3 flex-shrink-0 pr-4 border-r border-slate-200">
                 <button 
                    onClick={onBack} 
                    className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors"
                    title="返回项目列表"
                 >
                    <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                        {project.name.substring(0,1)}
                    </div>
                 </button>
                 <span className="font-bold text-slate-800 truncate max-w-[120px]">{project.name}</span>
                 <button className="w-6 h-6 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded text-slate-600">
                     <Plus size={14} />
                 </button>
             </div>

             {/* Horizontal Menu */}
             <div className="flex items-center gap-1 overflow-x-auto no-scrollbar mask-gradient">
                 {primaryMenuItems.map(item => (
                     <button
                        key={item.label}
                        onClick={() => setActiveTab(item.label)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-2 ${
                            activeTab === item.label 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                     >
                         <span>{item.label}</span>
                         {item.count !== undefined && item.count > 0 && (
                             <span className="text-xs bg-slate-100 text-slate-500 px-1.5 rounded-full">{item.count}</span>
                         )}
                     </button>
                 ))}
                 
                 {/* More Dropdown Trigger */}
                 <div className="relative group ml-2">
                     <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded hover:bg-slate-50">
                         <span>更多</span>
                         <ChevronDown size={14} />
                     </button>
                     {/* Dropdown Content */}
                     <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 shadow-xl rounded-lg py-1 hidden group-hover:block z-50">
                         {secondaryMenuItems.map(item => (
                             <button
                                key={item.label}
                                onClick={() => setActiveTab(item.label)}
                                className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center justify-between"
                             >
                                 <div className="flex items-center gap-2">
                                     <item.icon size={16} />
                                     <span>{item.label}</span>
                                 </div>
                                 {item.count !== undefined && (
                                     <span className="text-xs text-slate-400">{item.count}</span>
                                 )}
                             </button>
                         ))}
                     </div>
                 </div>
             </div>
         </div>

         {/* Right Utilities */}
         <div className="flex items-center gap-4 flex-shrink-0 pl-4 bg-white shadow-[-10px_0_10px_-5px_rgba(255,255,255,1)]">
             {/* Search */}
             <div className="relative hidden lg:block">
                 <input 
                    type="text" 
                    placeholder="搜索" 
                    className="pl-8 pr-4 py-1.5 text-sm border border-transparent hover:border-slate-300 focus:border-blue-500 rounded-full bg-slate-100 w-40 transition-all focus:w-56 focus:bg-white outline-none"
                 />
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             </div>
             
             <button className="text-slate-500 hover:text-slate-700">
                <HelpCircle size={20} />
             </button>
             <button className="text-slate-500 hover:text-slate-700">
                <Bell size={20} />
             </button>
             <button className="text-slate-500 hover:text-slate-700">
                <Settings size={20} />
             </button>
             <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold cursor-pointer">
                 Lo
             </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative bg-slate-50/50">
         <div className="h-full overflow-y-auto p-6 custom-scrollbar">
             {renderContent()}
         </div>
      </div>

      {/* Modals */}
      {isCreateModalOpen && (
          <CreateTaskModal 
              onClose={() => setIsCreateModalOpen(false)}
              onSubmit={handleCreateTask}
              defaultType={createTaskType}
              defaultProjectId={project.id}
          />
      )}
      
      {editingTask && (
          <TaskDetailsModal 
              task={editingTask}
              onClose={() => setEditingTask(null)}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
          />
      )}
    </div>
  );
};