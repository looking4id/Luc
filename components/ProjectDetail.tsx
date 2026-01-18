
import React, { useState } from 'react';
import {
  LayoutDashboard, FileText, CheckSquare, Bug, Repeat, FlaskConical, GitBranch, Flag, ShieldAlert, GitPullRequest, PlayCircle, BarChart2, Users, Settings,
  Search, Bell, HelpCircle, Plus, ChevronDown, Box, LayoutList
} from './Icons';
import { Project, TaskType, Task } from '../types';
import { MOCK_COLUMNS } from '../constants';
import { CreateTaskModal, TaskDetailsModal } from './KanbanBoard';

// Imported Components
import { ProjectOverview } from './ProjectOverview';
import { WorkItemList } from './ProjectWorkItem';
import { ProjectIterations } from './ProjectIteration';
import { ProjectTesting } from './ProjectTesting';
import { ProjectCodeReview } from './ProjectCodeReview';
import { ProjectPipeline } from './ProjectPipeline';
import { ProjectMilestones } from './ProjectMilestones';
import { ProjectRisks } from './ProjectRisks';
import { ProjectMetrics } from './ProjectMetrics';
import { ProjectMembers } from './ProjectMembers';
import { ProjectSettings } from './ProjectSettings';
import { ProjectVersions } from './ProjectVersions';
import { DefectList } from './project/DefectList';
import { RequirementList } from './project/RequirementList';
import { ProjectGantt } from './project/ProjectGantt';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState('项目概览');
  const [isProjectPlusMenuOpen, setIsProjectPlusMenuOpen] = useState(false);
  
  // 维护项目内的局部工作项状态以支持 CRUD
  const [tasks, setTasks] = useState<Task[]>(
    MOCK_COLUMNS.flatMap(col => col.tasks).map(t => ({ ...t, projectId: project.id }))
  );
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createTaskType, setCreateTaskType] = useState<TaskType>(TaskType.Task);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
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
    // 补全缺失属性以适配详情组件
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
    { icon: FileText, label: '需求', count: 21 },
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
    { icon: Users, label: '成员', count: 5 },
    { icon: Settings, label: '项目设置' },
  ];

  const visibleCount = 8; 
  const visibleItems = menuItems.slice(0, visibleCount);
  const hiddenItems = menuItems.slice(visibleCount);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
        case '项目概览': return <ProjectOverview project={project} onIterationClick={() => setActiveTab('迭代')} />;
        case '需求': return <RequirementList onRequirementClick={handleWorkItemClick} />;
        case '任务': return (
            <WorkItemList 
                project={project} 
                type={TaskType.Task} 
                tasks={tasks}
                onCreate={() => openCreateModal(TaskType.Task)}
                onTaskClick={handleWorkItemClick}
                onDelete={handleDeleteTask}
            />
        );
        case '缺陷': return (
          <DefectList 
            tasks={tasks} 
            onCreate={() => openCreateModal(TaskType.Defect)}
            onDefectClick={handleWorkItemClick}
            onDelete={handleDeleteTask}
          />
        );
        case '甘特图': return <ProjectGantt />;
        case '迭代': return <ProjectIterations />;
        case '测试': return <ProjectTesting />;
        case '版本': return <ProjectVersions />;
        case '里程碑': return <ProjectMilestones />;
        case '风险': return <ProjectRisks />;
        case '代码评审': return <ProjectCodeReview />;
        case '流水线': return <ProjectPipeline />;
        case '效能度量': return <ProjectMetrics />;
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
    <div className="flex flex-col h-full w-full bg-slate-50 overflow-hidden font-sans">
      {/* Top Navigation Bar */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm flex-shrink-0 z-30">
         <div className="flex items-center gap-6">
             <div className="flex items-center gap-3 flex-shrink-0 pr-4 border-r border-slate-200">
                 <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors" title="返回项目列表">
                    <div className="w-6 h-6 rounded bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm shadow-blue-500/20">{project.name.substring(0,1)}</div>
                 </button>
                 <span className="font-bold text-slate-800 text-sm truncate max-w-[120px]">{project.name}</span>
                 <div className="relative">
                     <button onClick={() => setIsProjectPlusMenuOpen(!isProjectPlusMenuOpen)} className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${isProjectPlusMenuOpen ? 'bg-blue-50 text-blue-500' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                         <Plus size={14} />
                     </button>
                     {isProjectPlusMenuOpen && (
                         <>
                             <div className="fixed inset-0 z-40" onClick={() => setIsProjectPlusMenuOpen(false)}></div>
                             <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                                 <button onClick={() => { setActiveTab('需求'); setIsProjectPlusMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                     <FileText size={16} className="text-blue-500" /><span>创建需求</span>
                                 </button>
                                 <button onClick={() => { setActiveTab('缺陷'); openCreateModal(TaskType.Defect); setIsProjectPlusMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                     <Bug size={16} className="text-red-500" /><span>创建缺陷</span>
                                 </button>
                             </div>
                         </>
                     )}
                 </div>
             </div>

             <div className="flex items-center gap-1">
                 {visibleItems.map(item => (
                     <button
                        key={item.label}
                        onClick={() => setActiveTab(item.label)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-2 ${
                            activeTab === item.label ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                     >
                         <span>{item.label}</span>
                         {item.count !== undefined && item.count > 0 && (
                             <span className={`text-[10px] px-1.5 rounded-full ${activeTab === item.label ? 'bg-blue-200 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>{item.count}</span>
                         )}
                     </button>
                 ))}
                 {hiddenItems.length > 0 && (
                     <div className="relative ml-2">
                         <button onClick={() => setIsMoreOpen(!isMoreOpen)} className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded transition-colors ${hiddenItems.some(i => i.label === activeTab) || isMoreOpen ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                             <span>更多</span><ChevronDown size={14} className={`transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                         </button>
                         {isMoreOpen && (
                             <>
                                 <div className="fixed inset-0 z-40" onClick={() => setIsMoreOpen(false)}></div>
                                 <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-slate-200 shadow-xl rounded-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                                     {hiddenItems.map(item => (
                                         <button key={item.label} onClick={() => { setActiveTab(item.label); setIsMoreOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${activeTab === item.label ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-slate-700'}`}>
                                             <div className="flex items-center gap-3">
                                                 <item.icon size={16} className={activeTab === item.label ? 'text-blue-500' : 'text-slate-400'} /><span>{item.label}</span>
                                             </div>
                                             {item.count !== undefined && <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{item.count}</span>}
                                         </button>
                                     ))}
                                 </div>
                             </>
                         )}
                     </div>
                 )}
             </div>
         </div>

         {/* Right Utilities */}
         <div className="flex items-center gap-4 flex-shrink-0 pl-4 bg-white">
             <button className="text-slate-500 hover:text-slate-700"><HelpCircle size={20} /></button>
             <button className="text-slate-500 hover:text-slate-700"><Bell size={20} /></button>
             <button className="text-slate-500 hover:text-slate-700"><Settings size={20} /></button>
             <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer">Lo</div>
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
