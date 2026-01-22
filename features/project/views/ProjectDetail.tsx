
import React, { useState } from 'react';
import {
  LayoutDashboard, FileText, CheckSquare, Bug, Repeat, FlaskConical, GitBranch, Flag, ShieldAlert, GitPullRequest, PlayCircle, BarChart2, Users, Settings,
  Search, Bell, HelpCircle, Plus, ChevronDown, Box, LayoutList, Home, Edit3, Globe, Palette, User, LogOut, Send, ChevronRight, Check, ArrowLeft
} from '../../../components/common/Icons';
import { Project, TaskType, Task, User as UserType, Priority } from '../../../types';
import { MOCK_COLUMNS } from '../../../utils/constants';
import { CreateTaskModal, TaskDetailsModal } from '../kanban/KanbanBoard';
import { useApp } from '../../../utils/AppContext';
import { GlobalRightControls } from '../../../components/layout/GlobalRightControls';

// Imported Components
import { ProjectOverview } from '../../../components/ProjectOverview';
import { WorkItemList } from '../../../components/ProjectWorkItem';
import { ProjectIterations } from '../../../components/ProjectIteration';
import { ProjectTesting } from '../../../components/ProjectTesting';
import { ProjectCodeReview } from '../../../components/ProjectCodeReview';
import { ProjectPipeline } from '../../../components/ProjectPipeline';
import { ProjectMilestones } from '../../../components/ProjectMilestones';
import { ProjectRisks } from '../../../components/ProjectRisks';
// 替换为全功能效能度量组件
import { PerformanceMetrics } from '../../../components/PerformanceMetrics';
import { ProjectSettings } from '../../../components/ProjectSettings';
import { ProjectVersions } from '../../../components/ProjectVersions';
import { DefectList } from '../../../components/project/DefectList';
import { RequirementList } from '../../../components/project/RequirementList';
import { ProjectGantt } from '../../../components/project/ProjectGantt';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onLogout?: () => void;
  onGoHome?: () => void;
  user?: UserType | null;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onLogout, onGoHome, user }) => {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState('项目概览');
  const [isProjectPlusMenuOpen, setIsProjectPlusMenuOpen] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>(
    MOCK_COLUMNS.flatMap(col => col.tasks).map(t => ({ ...t, projectId: project.id }))
  );
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createTaskType, setCreateTaskType] = useState<TaskType>(TaskType.Task);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = (newTask: Partial<Task>) => {
    const taskToAdd: Task = {
      id: `t${Date.now()}`,
      displayId: `#RQ-${Math.floor(Math.random() * 9000 + 1000)}`,
      title: newTask.title || '无标题需求',
      type: newTask.type || createTaskType,
      priority: newTask.priority || Priority.Normal,
      dueDate: new Date().toISOString().split('T')[0],
      assignee: newTask.assignee || (user ? { id: user.id, name: user.name, avatarColor: user.avatarColor } : { id: 'u1', name: 'lo', avatarColor: 'bg-yellow-500' }),
      statusColor: 'bg-blue-500',
      creatorId: user?.id || 'u1',
      projectId: newTask.projectId || project.id,
      description: newTask.description || '',
      attachments: newTask.attachments || []
    };
    setTasks(prev => [taskToAdd, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    setEditingTask(updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("确定要删除该事项吗？此操作不可撤销。")) {
      setTasks(prev => prev.filter(t => t.id !== taskId));
      setEditingTask(null);
    }
  };

  const openCreateModal = (type: TaskType) => {
      setCreateTaskType(type);
      setIsCreateModalOpen(true);
  };

  const handleWorkItemClick = (item: Partial<Task>) => {
    const fullTask: Task = {
      id: item.id || '',
      displayId: item.displayId || '',
      title: item.title || '',
      type: item.type || TaskType.Task,
      priority: item.priority,
      dueDate: item.dueDate || '2026-01-01',
      assignee: item.assignee || { id: 'u1', name: 'lo', avatarColor: 'bg-yellow-500' },
      statusColor: item.statusColor || 'bg-blue-500',
      creatorId: 'u1',
      description: item.description || `这是 ${item.displayId} 的详细描述内容...`,
      projectId: project.id,
      ...item
    } as Task;
    setEditingTask(fullTask);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: '项目概览' },
    { icon: FileText, label: '需求', count: tasks.filter(t => t.type === TaskType.Requirement).length + 10 },
    { icon: CheckSquare, label: '任务', count: tasks.filter(t => t.type === TaskType.Task).length },
    { icon: Bug, label: '缺陷', count: tasks.filter(t => t.type === TaskType.Defect).length },
    { icon: LayoutList, label: '甘特图' },
    { icon: Repeat, label: '迭代' },
    { icon: FlaskConical, label: '测试' },
    { icon: GitBranch, label: '版本' },
    { icon: Flag, label: '里程碑', count: 5 },
    { icon: ShieldAlert, label: '风险', count: 4 },
    { icon: GitPullRequest, label: '代码评审', count: 1 },
    { icon: PlayCircle, label: '流水线' },
    { icon: BarChart2, label: '效能度量', badge: 'Beta' },
  ];

  const visibleCount = 8; 
  const visibleItems = menuItems.slice(0, visibleCount);
  const hiddenItems = menuItems.slice(visibleCount);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // 判断是否为需要“全屏沉浸”的页面（即自带导航和复杂布局的页面）
  const isFullPageTab = activeTab === '效能度量';

  const renderContent = () => {
    switch (activeTab) {
        case '项目概览': return <ProjectOverview project={project} onIterationClick={() => setActiveTab('迭代')} />;
        case '需求': return <RequirementList requirements={tasks} onRequirementClick={handleWorkItemClick} onCreate={() => openCreateModal(TaskType.Requirement)} />;
        case '任务': return <WorkItemList project={project} type={TaskType.Task} tasks={tasks} onCreate={() => openCreateModal(TaskType.Task)} onTaskClick={handleWorkItemClick} onDelete={handleDeleteTask} />;
        case '缺陷': return <DefectList tasks={tasks} onCreate={() => openCreateModal(TaskType.Defect)} onDefectClick={handleWorkItemClick} onDelete={handleDeleteTask} />;
        case '甘特图': return <ProjectGantt />;
        case '迭代': return <ProjectIterations />;
        case '测试': return <ProjectTesting />;
        case '版本': return <ProjectVersions />;
        case '里程碑': return <ProjectMilestones />;
        case '风险': return <ProjectRisks />;
        case '代码评审': return <ProjectCodeReview />;
        case '流水线': return <ProjectPipeline />;
        // 使用系统级效能度量组件，透传全局属性
        case '效能度量': return <PerformanceMetrics user={user} onLogout={onLogout} onGoHome={onGoHome} />;
        case '项目设置': return <ProjectSettings project={project} />;
        default: return (
            <div className="flex flex-col items-center justify-center h-96 text-slate-400 dark:text-slate-500">
                <Box size={48} className="mb-4 opacity-20" />
                <h3 className="text-lg font-medium">{t('功能开发中')}</h3>
                <p className="text-sm">{t('该模块正在建设中，敬请期待...')}</p>
            </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-900 overflow-hidden font-sans transition-colors duration-300">
      <div className="h-14 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 shadow-sm flex-shrink-0 z-30 transition-colors">
         <div className="flex items-center gap-6">
             <div className="flex items-center gap-3 flex-shrink-0 pr-4 border-r border-slate-200 dark:border-slate-700">
                 <button onClick={onBack} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500 dark:text-slate-400 transition-colors" title={t('返回项目列表')}>
                    <div className="w-6 h-6 rounded bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm shadow-blue-500/20">{project.name.substring(0,1)}</div>
                 </button>
                 <span className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate max-w-[120px]">{project.name}</span>
                 <div className="relative">
                     <button onClick={() => setIsProjectPlusMenuOpen(!isProjectPlusMenuOpen)} className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${isProjectPlusMenuOpen ? 'bg-blue-50 text-blue-600 dark:bg-slate-700' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                         <Plus size={14} />
                     </button>
                     {isProjectPlusMenuOpen && (
                         <>
                             <div className="fixed inset-0 z-40" onClick={() => setIsProjectPlusMenuOpen(false)}></div>
                             <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl rounded py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                                 <button onClick={() => { setActiveTab('需求'); setIsProjectPlusMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                                     <FileText size={16} className="text-blue-500" /><span>{t('创建需求')}</span>
                                 </button>
                                 <button onClick={() => { setActiveTab('缺陷'); openCreateModal(TaskType.Defect); setIsProjectPlusMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                                     <Bug size={16} className="text-red-500" /><span>{t('创建缺陷')}</span>
                                 </button>
                             </div>
                         </>
                     )}
                 </div>
             </div>
             <div className="flex items-center gap-1">
                 {visibleItems.map(item => (
                     <button key={item.label} onClick={() => setActiveTab(item.label)} className={`px-3 py-1.5 text-sm font-medium rounded whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === item.label ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200'}`}>
                         <span>{t(item.label)}</span>
                         {item.count !== undefined && item.count > 0 && (
                             <span className={`text-[10px] px-1.5 rounded ${activeTab === item.label ? 'bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-200' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>{item.count}</span>
                         )}
                     </button>
                 ))}
                 <div className="relative ml-2">
                     <button onClick={() => setIsMoreOpen(!isMoreOpen)} className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded transition-colors ${hiddenItems.some(i => i.label === activeTab) || isMoreOpen ? 'text-blue-600 bg-blue-50 dark:bg-slate-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700'}`}>
                         <span>{t('更多')}</span><ChevronDown size={14} className={`transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                     </button>
                     {isMoreOpen && (
                         <>
                             <div className="fixed inset-0 z-40" onClick={() => setIsMoreOpen(false)}></div>
                             <div className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl rounded py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                                 {hiddenItems.map(item => (
                                     <button key={item.label} onClick={() => { setActiveTab(item.label); setIsMoreOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${activeTab === item.label ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}>
                                         <div className="flex items-center gap-3">
                                             <item.icon size={16} className={activeTab === item.label ? 'text-blue-500' : 'text-slate-400'} /><span>{t(item.label)}</span>
                                         </div>
                                         {item.count !== undefined && <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">{item.count}</span>}
                                     </button>
                                 ))}
                                 <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                                 <button onClick={() => { setActiveTab('项目设置'); setIsMoreOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${activeTab === '项目设置' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}>
                                     <div className="flex items-center gap-3"><Settings size={16} className={activeTab === '项目设置' ? 'text-blue-500' : 'text-slate-400'} /><span>{t('设置')}</span></div>
                                 </button>
                             </div>
                         </>
                     )}
                 </div>
             </div>
         </div>
         <GlobalRightControls user={user} onLogout={onLogout} onGoHome={onGoHome} />
      </div>
      <div className="flex-1 overflow-hidden relative bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
         {/* 如果是全屏 Tab（如效能度量），移除 p-6 容器，允许组件自适应全屏 */}
         <div className={`h-full overflow-y-auto custom-scrollbar ${isFullPageTab ? 'p-0' : 'p-6'}`}>{renderContent()}</div>
      </div>
      {isCreateModalOpen && <CreateTaskModal onClose={() => setIsCreateModalOpen(false)} onSubmit={handleCreateTask} defaultType={createTaskType} defaultProjectId={project.id} />}
      {editingTask && <TaskDetailsModal task={editingTask} onClose={() => setEditingTask(null)} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />}
    </div>
  );
};
