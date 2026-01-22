import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { MOCK_COLUMNS, MOCK_USERS, MOCK_PROJECTS } from '../../../utils/constants';
import { KanbanCard } from './KanbanCard';
import { 
  Circle, MoreHorizontal, Plus, XCircle, ChevronDown, 
  Maximize2, Bold, Italic, Underline, Link, Box, ListChecks, History, Share2, 
  Ban, Trash2, Calendar, Target, Code2, List, LayoutList, Image as ImageIcon, 
  Strikethrough, Quote, Minus, Smile, Paperclip, RefreshCw, Star, 
  MessageSquare, User, CheckCircle2, ChevronRight, Edit3, Globe, Copy,
  LayoutGrid, FileText, Bug, Layers, Smartphone, Download, Clock, GitPullRequest, FlaskConical,
  CheckSquare, Search, BookOpen, Send, Sparkles, Keyboard, ThumbsUp, ThumbsDown
} from '../../../components/common/Icons';
import { Task, TaskType, Priority, Severity, Column, User as UserType, Attachment } from '../../../types';
import { StatusBadge, PriorityBadge } from '../../../components/common/ProjectShared';

// ------------------- Sub-Components for Details -------------------

// Fix: typed children as optional to satisfy TypeScript strict checks in deconstruction
const DetailLabel: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <div className="w-24 text-slate-400 text-sm font-medium flex-shrink-0">{children}</div>
);

// Fix: typed children as optional to satisfy TypeScript strict checks in deconstruction
const DetailValue: React.FC<{ children?: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
    <div className={`flex-1 text-slate-700 text-sm font-bold truncate flex items-center gap-2 ${className}`}>{children}</div>
);

// Fix: typed children as optional to satisfy TypeScript strict checks in deconstruction
const DetailRow: React.FC<{ label: string, children?: React.ReactNode }> = ({ label, children }) => (
    <div className="flex items-center min-h-[32px]">{/* Row */}
        <DetailLabel>{label}</DetailLabel>
        <DetailValue>{children}</DetailValue>
    </div>
);

// ------------------- Create Task Modal (Added missing export) -------------------

export const CreateTaskModal: React.FC<{
    onClose: () => void;
    onSubmit: (task: Task) => void;
    defaultType: TaskType | null;
    defaultProjectId?: string;
}> = ({ onClose, onSubmit, defaultType, defaultProjectId }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<TaskType>(defaultType || TaskType.Task);
    const [priority, setPriority] = useState<Priority>(Priority.Normal);
    const [assigneeId, setAssigneeId] = useState('u1');

    const isDefect = type === TaskType.Defect;
    const isSplitLayout = type === TaskType.Requirement || type === TaskType.Task || type === TaskType.Defect;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 font-sans">
            <div className={`bg-white rounded shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/20 ${isSplitLayout ? 'w-[1000px] h-[600px] max-h-[85vh]' : 'w-[880px]'}`}>
                {/* 头部导航 */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white flex-shrink-0">
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">新建{type}</h3>
                    <div className="flex items-center gap-4">
                        <button onClick={onClose} className="p-1 text-slate-300 hover:text-slate-600 transition-colors"><XCircle size={22} /></button>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden flex">
                    <div className="flex-1 flex p-8 gap-8 overflow-y-auto custom-scrollbar bg-white">
                        {/* Left Column */}
                        <div className="flex-1 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">标题 <span className="text-red-500">*</span></label>
                                <input 
                                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none placeholder:text-slate-300 transition-all" 
                                    placeholder="请填写" 
                                    value={title} 
                                    onChange={e => setTitle(e.target.value)} 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">负责人/协作者</label>
                                    <div className="relative">
                                        <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm appearance-none outline-none focus:border-blue-500 text-slate-500 bg-white" value={assigneeId} onChange={e => setAssigneeId(e.target.value)}>
                                            {MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">类型 <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select disabled className="w-full border border-slate-300 rounded px-3 py-2 text-sm appearance-none outline-none bg-slate-50 text-slate-700">
                                            <option>{type}</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 flex-1 flex flex-col">
                                <label className="text-sm font-bold text-slate-700">描述</label>
                                <div className="border border-slate-300 rounded flex-1 flex flex-col min-h-[200px]">
                                    <textarea className="flex-1 p-4 outline-none resize-none text-sm bg-white" placeholder="请输入描述内容..." />
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="w-72 border-l border-slate-100 pl-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">优先级</label>
                                <div className="relative">
                                    <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm appearance-none outline-none focus:border-blue-500 text-slate-500 bg-white" value={priority} onChange={e => setPriority(e.target.value as Priority)}>
                                        {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-10 py-5 border-t border-slate-100 bg-white flex items-center justify-end flex-shrink-0 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                    <div className="flex gap-4">
                        <button 
                            type="submit" 
                            onClick={() => {
                                const selectedUser = MOCK_USERS.find(u => u.id === assigneeId) || MOCK_USERS[0];
                                onSubmit({
                                    title,
                                    type,
                                    priority,
                                    assignee: selectedUser,
                                    projectId: defaultProjectId || 'p1',
                                } as any);
                            }} 
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-bold shadow-xl shadow-blue-200"
                        >
                            新建
                        </button>
                        <button onClick={onClose} type="button" className="px-6 py-2 bg-white border border-slate-200 text-slate-400 rounded text-sm font-bold hover:bg-slate-50 transition-all">取消</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ------------------- Task Details Modal -------------------

export const TaskDetailsModal: React.FC<{
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}> = ({ task, onClose, onUpdate, onDelete }) => {
  const [activeTab, setActiveTab] = useState('详情');
  const [comment, setComment] = useState('');

  // 模拟各个 Tab 的数据量
  const counts = {
    subTasks: 6,
    relatedTasks: 3,
    docs: 1,
    attachments: 2
  };

  const tabs = [
    { name: '详情' },
    { name: '子工作项', count: counts.subTasks },
    { name: '关联工作项', count: counts.relatedTasks },
    { name: '关联测试用例' },
    { name: '关联代码评审' },
    { name: '关联文档', count: counts.docs },
    { name: '工时' },
    { name: '附件' },
    { name: '更多' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case '详情':
        return (
          <div className="flex h-full">
            {/* Left Content Area */}
            <div className="flex-1 p-10 overflow-y-auto custom-scrollbar space-y-10">
              {/* Core Fields Grid */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <DetailRow label="负责人 / 协作">
                   <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]">Lo</div>
                   <span>{task.assignee?.name || 'looking4id'}</span>
                </DetailRow>
                <DetailRow label="类型">
                   <FileText size={14} className="text-blue-500" />
                   <span>{task.type}</span>
                </DetailRow>
                <DetailRow label="计划时间">
                   <span className="text-slate-600">2025.08.02</span>
                   <span className="mx-2 text-slate-300">→</span>
                   <span className="text-slate-600">2025.08.16</span>
                   <Calendar size={14} className="text-slate-300 ml-2" />
                </DetailRow>
                <DetailRow label="项目">
                   <Box size={14} className="text-slate-400" />
                   <span className="text-blue-600 hover:underline cursor-pointer">敏捷研发项目01</span>
                   <Copy size={12} className="text-slate-300 cursor-pointer" />
                </DetailRow>
                <DetailRow label="迭代">
                   <span className="text-slate-700">Sprint1：功能优化</span>
                   <Copy size={12} className="text-slate-300 cursor-pointer" />
                </DetailRow>
                <DetailRow label="版本">
                   <span className="text-slate-700">1.1 - 【示例数据】协同点餐功...</span>
                   <Copy size={12} className="text-slate-300 cursor-pointer" />
                </DetailRow>
              </div>

              {/* Description Section */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                   <h4 className="text-sm font-bold text-slate-500 flex items-center gap-2">描述 <Edit3 size={14}/></h4>
                   <button className="text-xs text-slate-400 flex items-center gap-1 hover:text-blue-600"><Maximize2 size={12}/> 全屏</button>
                </div>
                <div className="text-base text-slate-700 leading-relaxed min-h-[120px]">
                   {task.description || '我需要多人同时点餐功能，以便在多人聚会时每个人都能点到心仪的菜品'}
                </div>
                <div className="flex items-center gap-2 pt-2">
                   <button className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50 text-slate-400"><ThumbsUp size={16}/></button>
                   <button className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50 text-slate-400"><ThumbsDown size={16}/></button>
                   <button className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50 text-slate-400"><Smile size={16}/></button>
                </div>
              </div>

              {/* Comment / Log Tab Switch */}
              <div className="pt-10">
                 <div className="flex items-center gap-8 border-b border-slate-100 mb-6">
                    <button className="pb-3 text-sm font-bold text-blue-600 border-b-2 border-blue-600">评论 <span className="ml-1 opacity-50">0</span></button>
                    <button className="pb-3 text-sm font-bold text-slate-400 hover:text-slate-600">操作日志 <span className="ml-1 opacity-50">6</span></button>
                    <div className="ml-auto pb-3 text-xs text-slate-400 flex items-center gap-1 cursor-pointer">发布时间 <ChevronDown size={12}/></div>
                 </div>
                 <div className="py-20 text-center space-y-4 animate-in fade-in duration-500">
                    <div className="w-16 h-16 bg-slate-50 rounded-full mx-auto flex items-center justify-center text-slate-200">
                       <MessageSquare size={32} />
                    </div>
                    <p className="text-sm text-slate-300 font-medium tracking-wide">暂无评论</p>
                 </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-[300px] border-l border-slate-100 bg-slate-50/30 p-8 space-y-8 flex-shrink-0">
               <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">优先级</label>
                  <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-600 text-[10px] font-black rounded uppercase">紧急</span>
               </div>
               <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">标签</label>
                  <div className="flex flex-wrap gap-2">
                     <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded">
                        新手引导 <XCircle size={12} className="cursor-pointer opacity-70 hover:opacity-100"/>
                     </span>
                  </div>
               </div>
               <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">实际开始时间</label>
                  <div className="flex items-center justify-between text-slate-700 font-bold text-sm">
                     <span>2025-08-02 20:23</span>
                     <Calendar size={14} className="text-slate-300" />
                  </div>
               </div>
               <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">实际结束时间</label>
                  <div className="flex items-center justify-between text-slate-300 font-bold text-sm">
                     <span>选择日期</span>
                     <Calendar size={14} className="text-slate-300" />
                  </div>
               </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-300 space-y-4">
             <Box size={64} className="opacity-10" />
             <p className="font-bold text-lg">{activeTab} 内容开发中</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 font-sans">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white w-[1240px] h-[90vh] rounded shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 relative z-10 border border-slate-200 overflow-hidden">
        
        {/* 1. Page Header (複合頁眉) */}
        <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6 bg-white flex-shrink-0">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 pr-4 border-r border-slate-100">
                 <FileText size={18} className="text-blue-500" />
                 <Link size={16} className="text-slate-300 cursor-pointer" />
                 <span className="text-sm font-mono font-bold text-slate-400">#ICQMBP</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded px-3 py-1 text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                 进行中
                 <ChevronDown size={14} className="text-slate-400" />
              </div>
           </div>

           <div className="flex items-center gap-1">
              <div className="flex items-center gap-4 pr-6">
                 <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="工作流流程图"><Layers size={20}/></button>
                 <span className="text-xs font-bold text-emerald-500 tracking-tight">要规范，更高效！</span>
              </div>
              <div className="w-px h-6 bg-slate-100 mr-4"></div>
              <div className="flex items-center gap-1 text-slate-400">
                 <button className="p-2 hover:text-blue-600 hover:bg-slate-50 rounded transition-all"><Sparkles size={18}/></button>
                 <button className="p-2 hover:text-amber-500 hover:bg-slate-50 rounded transition-all"><Star size={18}/></button>
                 <button className="p-2 hover:text-blue-600 hover:bg-slate-50 rounded transition-all"><RefreshCw size={18}/></button>
                 <button className="p-2 hover:text-slate-700 hover:bg-slate-50 rounded transition-all"><Keyboard size={18}/></button>
                 <button className="p-2 hover:text-slate-700 hover:bg-slate-50 rounded transition-all"><Maximize2 size={18}/></button>
                 <button className="p-2 hover:text-blue-600 hover:bg-slate-50 rounded transition-all"><Paperclip size={18}/></button>
                 <button className="p-2 hover:text-slate-700 hover:bg-slate-50 rounded transition-all"><MoreHorizontal size={18}/></button>
              </div>
              <div className="w-px h-6 bg-slate-100 mx-4"></div>
              <button onClick={onClose} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><XCircle size={24}/></button>
           </div>
        </div>

        {/* 2. Main Title Section */}
        <div className="px-10 pt-8 pb-4 flex-shrink-0 bg-white group">
           <div className="flex items-center gap-4 mb-2">
              <h1 className="text-[26px] font-black text-slate-800 tracking-tight leading-tight">
                 {task.title || '【示例需求】支持多人同时点餐功能'}
              </h1>
              <button className="p-2 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-all"><Edit3 size={18}/></button>
           </div>
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span className="text-slate-600 font-black">looking4id</span>
              <span>创建于 2025年08月02日，最近更新于 2025年08月02日</span>
           </div>
        </div>

        {/* 3. Navigation Tabs */}
        <div className="px-10 border-b border-slate-100 bg-white flex-shrink-0 overflow-x-auto no-scrollbar">
           <div className="flex items-center gap-10">
              {tabs.map(tab => (
                 <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`pb-4 pt-6 text-sm font-bold transition-all relative whitespace-nowrap ${
                      activeTab === tab.name ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                    }`}
                 >
                    {tab.name}
                    {tab.count !== undefined && <span className="ml-1 font-medium opacity-60 text-xs">{tab.count}</span>}
                    {activeTab === tab.name && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                    )}
                 </button>
              ))}
           </div>
        </div>

        {/* 4. Tab Content Area */}
        <div className="flex-1 overflow-hidden relative bg-white">
           {renderTabContent()}
        </div>

        {/* 5. Fixed Comment Footer */}
        <div className="h-16 border-t border-slate-100 px-6 bg-white flex items-center gap-4 flex-shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
           <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">Lo</div>
           <div className="flex-1 relative">
              <input 
                 value={comment}
                 onChange={e => setComment(e.target.value)}
                 className="w-full h-10 bg-slate-50 border border-slate-200 rounded px-4 text-sm focus:bg-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                 placeholder="发表您的看法（Ctrl/Command+Enter发送）" 
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                 <button className="text-slate-300 hover:text-blue-600"><Smile size={16}/></button>
                 <button className="text-slate-300 hover:text-blue-600"><Link size={16}/></button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// ------------------- Kanban Board Core -------------------

interface KanbanBoardProps {
    columns: Column[];
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
    onTaskClick: (task: Task) => void;
    onAddClick: (type: TaskType) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  columns, setColumns, onTaskClick, onAddClick
}) => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
        const columnIndex = columns.findIndex(c => c.id === source.droppableId);
        const column = columns[columnIndex];
        const newTasks = Array.from(column.tasks);
        const [movedTask] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, movedTask);
        const newColumns = [...columns];
        newColumns[columnIndex] = { ...column, tasks: newTasks };
        setColumns(newColumns);
    } else {
        const sourceColIndex = columns.findIndex(c => c.id === source.droppableId);
        const destColIndex = columns.findIndex(c => c.id === destination.droppableId);
        const sourceCol = columns[sourceColIndex];
        const destCol = columns[destColIndex];
        if (!sourceCol || !destCol) return;
        const sourceTasks = Array.from(sourceCol.tasks);
        const destTasks = Array.from(destCol.tasks);
        const movedTask = sourceTasks.splice(source.index, 1)[0] as Task | undefined;
        if (!movedTask) return;
        let newStatusColor = movedTask.statusColor;
        if (destCol.id === 'done') newStatusColor = 'bg-green-500';
        else if (destCol.id === 'inprogress') newStatusColor = 'bg-blue-600';
        else if (destCol.id === 'todo') newStatusColor = 'bg-gray-400';
        destTasks.splice(destination.index, 0, { ...movedTask, statusColor: newStatusColor });
        const newColumns = [...columns];
        newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks, count: sourceTasks.length };
        newColumns[destColIndex] = { ...destCol, tasks: destTasks, count: destTasks.length };
        setColumns(newColumns);
    }
  };
  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden bg-slate-50/50">
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-full p-6 gap-6 min-w-max">
                {columns.map(col => (
                    <div key={col.id} className="w-80 flex flex-col h-full bg-slate-100/50 rounded-xl border border-slate-200/60 backdrop-blur-sm">
                        <div className="p-4 flex items-center justify-between flex-shrink-0"><div className="flex items-center gap-2"><Circle size={10} className={col.iconColor} fill="currentColor" /><span className="font-bold text-slate-700 text-sm">{col.title}</span><span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{col.tasks.length}</span></div><div className="flex gap-1"><button onClick={() => onAddClick(TaskType.Task)} className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors"><Plus size={14}/></button><button className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors"><MoreHorizontal size={14}/></button></div></div>
                        <Droppable droppableId={col.id}>{(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className={`flex-1 overflow-y-auto px-3 pb-3 custom-scrollbar transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50/30' : ''}`}>
                                    {col.tasks.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>{(provided, snapshot) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ ...provided.draggableProps.style }} className={`${snapshot.isDragging ? 'rotate-2 scale-105 z-50' : ''}`}><KanbanCard task={task} onClick={(t) => onTaskClick(t)} onUpdate={() => {}} /></div>
                                            )}</Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <button onClick={() => onAddClick(TaskType.Task)} className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-blue-500 hover:border-blue-200 hover:bg-white transition-all flex items-center justify-center gap-1.5 text-xs font-bold mt-2"><Plus size={14} /> 添加工作项</button>
                                </div>
                            )}</Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    </div>
  );
};
