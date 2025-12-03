import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { MOCK_COLUMNS, MOCK_USERS, MOCK_PROJECTS } from '../constants';
import { KanbanCard } from './KanbanCard';
import { Circle, CheckCircle2, MoreHorizontal, Plus, XCircle, Clock, Trash2, ChevronDown, Paperclip, Download, UploadCloud, FileText, ChevronRight, LayoutList, FolderTree } from './Icons';
import { Task, TaskType, Priority, FilterState, Attachment, ViewType, Column } from '../types';

interface CreateTaskModalProps {
  columnTitle?: string;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  defaultType?: TaskType | null;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ columnTitle, onClose, onSubmit, defaultType }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TaskType>(defaultType || TaskType.Task);
  const [priority, setPriority] = useState<Priority>(Priority.Normal);
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(MOCK_PROJECTS[0].id);
  
  // Update local type state if defaultType prop changes (e.g. from dropdown)
  useEffect(() => {
    if (defaultType) setType(defaultType);
  }, [defaultType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: `new-${Date.now()}`,
      displayId: `#NEW${Math.floor(Math.random() * 1000)}`,
      title,
      type,
      priority,
      tags: ['新任务'],
      dueDate: new Date().toISOString().split('T')[0],
      assignee: MOCK_USERS[0],
      statusColor: 'bg-blue-500',
      description: description,
      progress: 0,
      projectId: projectId,
      creatorId: 'u1', // Mock current user
      attachments: []
    };

    onSubmit(newTask);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-[500px] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">新建{type} {columnTitle ? `(${columnTitle})` : ''}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XCircle size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">标题</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="输入任务标题..."
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">类型</label>
               <select 
                 value={type}
                 onChange={(e) => setType(e.target.value as TaskType)}
                 className="w-full border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
               >
                 {Object.values(TaskType).map(t => (
                   <option key={t} value={t}>{t}</option>
                 ))}
               </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">优先级</label>
               <select 
                 value={priority}
                 onChange={(e) => setPriority(e.target.value as Priority)}
                 className="w-full border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
               >
                 {Object.values(Priority).map(p => (
                   <option key={p} value={p}>{p}</option>
                 ))}
               </select>
            </div>
          </div>
           <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">所属项目</label>
               <select 
                 value={projectId}
                 onChange={(e) => setProjectId(e.target.value)}
                 className="w-full border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
               >
                 {MOCK_PROJECTS.map(p => (
                   <option key={p.id} value={p.id}>{p.name}</option>
                 ))}
               </select>
            </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">描述</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-24 resize-none"
              placeholder="添加任务描述..."
            />
          </div>
          <div className="flex justify-end pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded mr-2 transition-colors"
            >
              取消
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-sm"
            >
              创建
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, onClose, onUpdate, onDelete }) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const newAttachment: Attachment = {
              id: `att-${Date.now()}`,
              name: file.name,
              url: '#', // In a real app, this would be the uploaded URL
              type: file.type,
              size: file.size,
              uploadedAt: new Date().toISOString()
          };
          
          const updated = {
              ...editedTask,
              attachments: [...(editedTask.attachments || []), newAttachment]
          };
          setEditedTask(updated);
          onUpdate(updated);
      }
  };

  const handleDeleteAttachment = (attId: string) => {
      const updated = {
          ...editedTask,
          attachments: editedTask.attachments?.filter(a => a.id !== attId)
      };
      setEditedTask(updated);
      onUpdate(updated);
  };

  const handleChange = (field: keyof Task, value: any) => {
      const updated = { ...editedTask, [field]: value };
      setEditedTask(updated);
      onUpdate(updated);
  };

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            // In this implementation updates are immediate, but we simulate a "Save" action feedback
            setShowSaveIndicator(true);
            setTimeout(() => setShowSaveIndicator(false), 2000);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleDelete = () => {
      if (window.confirm('确定要删除这个任务吗？此操作无法撤销。')) {
          onDelete(task.id);
          onClose();
      }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-[800px] h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
             <div className="text-sm text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                {task.displayId}
             </div>
             {showSaveIndicator && (
                 <span className="text-xs text-green-600 font-medium flex items-center gap-1 animate-in fade-in">
                     <CheckCircle2 size={12} /> 已保存
                 </span>
             )}
          </div>
          <div className="flex items-center gap-2">
            <button 
                onClick={handleDelete}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="删除任务"
            >
                <Trash2 size={18} />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded transition-colors">
              <XCircle size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
             <input 
               type="text"
               value={editedTask.title}
               onChange={(e) => handleChange('title', e.target.value)}
               className="text-2xl font-bold text-slate-800 w-full mb-6 border-b border-transparent hover:border-slate-200 focus:border-blue-500 outline-none bg-transparent transition-colors pb-1"
             />

             {/* Description Section */}
             <div className="mb-8">
                 <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                     <FileText size={16} className="text-slate-500" />
                     描述
                 </h4>
                 <textarea 
                    value={editedTask.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full min-h-[120px] p-3 text-slate-600 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
                    placeholder="添加更详细的描述..."
                 />
             </div>

             {/* Attachments Section */}
             <div className="mb-8">
                 <div className="flex items-center justify-between mb-3">
                     <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                         <Paperclip size={16} className="text-slate-500" />
                         附件 ({editedTask.attachments?.length || 0})
                     </h4>
                     <label className="cursor-pointer text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded flex items-center gap-1 transition-colors">
                         <UploadCloud size={14} />
                         上传文件
                         <input type="file" className="hidden" onChange={handleFileUpload} />
                     </label>
                 </div>
                 
                 {(!editedTask.attachments || editedTask.attachments.length === 0) ? (
                     <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center text-slate-400 text-sm">
                         暂无附件，点击右上角上传
                     </div>
                 ) : (
                     <div className="space-y-2">
                         {editedTask.attachments.map(att => (
                             <div key={att.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group">
                                 <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                                         <FileText size={16} />
                                     </div>
                                     <div>
                                         <div className="text-sm font-medium text-slate-700">{att.name}</div>
                                         <div className="text-xs text-slate-400">
                                             {(att.size / 1024).toFixed(1)} KB • {att.uploadedAt.split('T')[0]}
                                         </div>
                                     </div>
                                 </div>
                                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                         <Download size={14} />
                                     </button>
                                     <button 
                                        onClick={() => handleDeleteAttachment(att.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                                     >
                                         <Trash2 size={14} />
                                     </button>
                                 </div>
                             </div>
                         ))}
                     </div>
                 )}
             </div>

             {/* Activity / Comments Placeholder */}
             <div>
                 <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                     <MoreHorizontal size={16} className="text-slate-500" />
                     动态
                 </h4>
                 <div className="flex gap-3">
                     <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">Lo</div>
                     <div className="flex-1">
                         <input 
                            type="text" 
                            placeholder="写下评论..." 
                            className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none"
                         />
                     </div>
                 </div>
             </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-slate-50 border-l border-slate-200 p-6 overflow-y-auto">
              <div className="space-y-6">
                  {/* Status */}
                  <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase">状态</label>
                      <div className={`px-3 py-1.5 rounded text-sm font-medium inline-block text-white ${task.statusColor.replace('bg-', 'bg-')}`}>
                          {/* Note: In a real app we'd map this statusColor back to status text */}
                          处理中
                      </div>
                  </div>

                   {/* Assignee */}
                   <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase">负责人</label>
                      <div className="relative">
                          <select 
                             value={editedTask.assignee?.id || ''}
                             onChange={(e) => {
                                 const user = MOCK_USERS.find(u => u.id === e.target.value);
                                 if (user) handleChange('assignee', user);
                             }}
                             className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2 pr-8 focus:border-blue-500 outline-none cursor-pointer hover:border-slate-300"
                          >
                              {MOCK_USERS.map(u => (
                                  <option key={u.id} value={u.id}>{u.name}</option>
                              ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase">优先级</label>
                      <div className="relative">
                          <select 
                             value={editedTask.priority}
                             onChange={(e) => handleChange('priority', e.target.value)}
                             className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2 pr-8 focus:border-blue-500 outline-none cursor-pointer hover:border-slate-300"
                          >
                              {Object.values(Priority).map(p => (
                                  <option key={p} value={p}>{p}</option>
                              ))}
                          </select>
                           <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                  </div>

                   {/* Type */}
                   <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase">类型</label>
                      <div className="relative">
                          <select 
                             value={editedTask.type}
                             onChange={(e) => handleChange('type', e.target.value)}
                             className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2 pr-8 focus:border-blue-500 outline-none cursor-pointer hover:border-slate-300"
                          >
                              {Object.values(TaskType).map(t => (
                                  <option key={t} value={t}>{t}</option>
                              ))}
                          </select>
                           <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                  </div>

                  {/* Due Date */}
                  <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase">截止日期</label>
                      <div className="relative">
                         <input 
                            type="date"
                            value={editedTask.dueDate}
                            onChange={(e) => handleChange('dueDate', e.target.value)}
                            className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2 focus:border-blue-500 outline-none hover:border-slate-300"
                         />
                      </div>
                  </div>

                  {/* Tags */}
                   <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase">标签</label>
                      <input 
                         type="text"
                         value={editedTask.tags?.join(', ') || ''}
                         onChange={(e) => handleChange('tags', e.target.value.split(',').map(s => s.trim()))}
                         className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-md px-3 py-2 focus:border-blue-500 outline-none hover:border-slate-300"
                         placeholder="用逗号分隔..."
                      />
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase flex justify-between">
                          <span>进度</span>
                          <span className="text-blue-600">{editedTask.progress}%</span>
                      </label>
                      <div className="flex items-center gap-2">
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={editedTask.progress || 0} 
                            onChange={(e) => handleChange('progress', parseInt(e.target.value))}
                            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <input 
                              type="number"
                              min="0"
                              max="100"
                              value={editedTask.progress || 0}
                              onChange={(e) => handleChange('progress', parseInt(e.target.value))}
                              className="w-14 text-xs border border-slate-200 rounded px-1 py-0.5 text-center focus:border-blue-500 outline-none"
                          />
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskListView: React.FC<{ tasks: Task[], onTaskClick: (t: Task) => void }> = ({ tasks, onTaskClick }) => {
    return (
        <div className="flex-1 overflow-auto bg-white p-4">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-xs">
                        <th className="py-3 px-4 font-semibold w-24">ID</th>
                        <th className="py-3 px-4 font-semibold">标题</th>
                        <th className="py-3 px-4 font-semibold w-32">状态</th>
                        <th className="py-3 px-4 font-semibold w-24">优先级</th>
                        <th className="py-3 px-4 font-semibold w-32">负责人</th>
                        <th className="py-3 px-4 font-semibold w-32">截止日期</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr 
                            key={task.id} 
                            onClick={() => onTaskClick(task)}
                            className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group"
                        >
                            <td className="py-3 px-4 text-xs font-mono text-slate-400">{task.displayId}</td>
                            <td className="py-3 px-4">
                                <div className="text-sm text-slate-700 font-medium group-hover:text-blue-600">{task.title}</div>
                            </td>
                            <td className="py-3 px-4">
                                <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">{task.statusColor.replace('bg-', '') || 'Unknown'}</span>
                            </td>
                            <td className="py-3 px-4">
                                <span className={`text-xs px-2 py-1 rounded ${
                                    task.priority === Priority.Urgent ? 'bg-red-50 text-red-600' :
                                    task.priority === Priority.High ? 'bg-orange-50 text-orange-600' :
                                    'bg-slate-100 text-slate-600'
                                }`}>
                                    {task.priority}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                     {task.assignee ? (
                                        <>
                                            <div className={`w-5 h-5 rounded-full ${task.assignee.avatarColor} text-white flex items-center justify-center text-[10px]`}>
                                                {task.assignee.name.slice(0, 1)}
                                            </div>
                                            <span>{task.assignee.name}</span>
                                        </>
                                     ) : '未分配'}
                                </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-500">{task.dueDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TaskTreeView: React.FC<{ tasks: Task[], onTaskClick: (t: Task) => void }> = ({ tasks, onTaskClick }) => {
    // Group by Type
    const groupedTasks = useMemo(() => {
        const groups: Record<string, Task[]> = {};
        tasks.forEach(task => {
            const key = task.type;
            if (!groups[key]) groups[key] = [];
            groups[key].push(task);
        });
        return groups;
    }, [tasks]);

    const [expanded, setExpanded] = useState<Record<string, boolean>>(
        Object.keys(groupedTasks).reduce((acc, key) => ({...acc, [key]: true}), {})
    );

    const toggleGroup = (key: string) => {
        setExpanded(prev => ({...prev, [key]: !prev[key]}));
    };

    return (
        <div className="flex-1 overflow-auto bg-white p-4">
             {Object.entries(groupedTasks).map(([type, groupTasks]) => (
                 <div key={type} className="mb-4">
                     <div 
                        onClick={() => toggleGroup(type)}
                        className="flex items-center gap-2 py-2 px-2 hover:bg-slate-50 cursor-pointer select-none"
                     >
                         <ChevronRight size={16} className={`text-slate-400 transition-transform ${expanded[type] ? 'rotate-90' : ''}`} />
                         <span className="font-semibold text-slate-700 text-sm">{type}</span>
                         <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{(groupTasks as Task[]).length}</span>
                     </div>
                     
                     {expanded[type] && (
                         <div className="ml-6 border-l-2 border-slate-100 pl-4 mt-1 space-y-1">
                             {(groupTasks as Task[]).map(task => (
                                 <div 
                                    key={task.id}
                                    onClick={() => onTaskClick(task)}
                                    className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer group border border-transparent hover:border-slate-100"
                                 >
                                     <div className="flex items-center gap-3">
                                         <div className={`w-1.5 h-1.5 rounded-full ${task.statusColor}`}></div>
                                         <span className="text-sm text-slate-700 group-hover:text-blue-600">{task.title}</span>
                                     </div>
                                     <div className="flex items-center gap-4 text-xs text-slate-400">
                                         <span className="font-mono bg-slate-50 px-1 rounded">{task.displayId}</span>
                                         <span>{task.assignee?.name}</span>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     )}
                 </div>
             ))}
        </div>
    );
};

interface KanbanBoardProps {
  filters: FilterState;
  viewType: ViewType;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (isOpen: boolean) => void;
  createModalType: TaskType | null;
  setCreateModalType: (type: TaskType | null) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
    filters, 
    viewType,
    isCreateModalOpen,
    setIsCreateModalOpen,
    createModalType,
    setCreateModalType
}) => {
  const [columns, setColumns] = useState<Column[]>(MOCK_COLUMNS);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const isTaskVisible = (task: Task) => {
    // 1. Search Filter (Title, DisplayId, Description)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(searchLower);
      const matchesId = task.displayId.toLowerCase().includes(searchLower);
      const matchesDesc = task.description?.toLowerCase().includes(searchLower);
      if (!matchesTitle && !matchesId && !matchesDesc) return false;
    }
    
    // 2. Assignee Filter
    if (filters.assigneeId && task.assignee?.id !== filters.assigneeId) {
      return false;
    }
    
    // 3. Type Filter
    if (filters.type && task.type !== filters.type) {
        return false;
    }

    // 4. Priority Filter
    if (filters.priority && task.priority !== filters.priority) {
        return false;
    }

    // 5. Date Range Filter
    if (filters.dateRange) {
        const taskDate = new Date(task.dueDate).getTime();
        const start = new Date(filters.dateRange.start).getTime();
        const end = new Date(filters.dateRange.end).getTime();
        // Simple comparison, ensuring tasks with no date are filtered out if range is set
        if (!task.dueDate || taskDate < start || taskDate > end) {
            return false;
        }
    }

    // 6. Project Filter
    if (filters.projectId && task.projectId !== filters.projectId) {
        return false;
    }

    // 7. Creator Filter
    if (filters.creatorId && task.creatorId !== filters.creatorId) {
        return false;
    }

    return true;
  };

  const filteredColumns = useMemo(() => {
    return columns.map(col => ({
      ...col,
      tasks: col.tasks.filter(isTaskVisible)
    })).filter(col => {
        // Status Filter (Column Title)
        if (filters.status && col.title !== filters.status) return false;
        return true;
    });
  }, [columns, filters]);

  // Flatten tasks for List/Tree views
  const allFilteredTasks = useMemo(() => {
      return filteredColumns.flatMap(col => col.tasks);
  }, [filteredColumns]);

  const onDragEnd = (result: DropResult) => {
    // Disable Drag and Drop if filters are active (to avoid data inconsistency visually)
    const hasFilters = Boolean(filters.search || filters.assigneeId || filters.type || filters.priority || filters.dateRange || filters.projectId || filters.status || filters.creatorId);
    
    if (hasFilters) {
        // Optional: Show a toast or message saying "Clear filters to reorder"
        return;
    }

    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within same column
      const column = columns.find(col => col.id === source.droppableId);
      if (!column) return;

      const newTasks = Array.from(column.tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      const newColumns = columns.map(col => 
        col.id === source.droppableId ? { ...col, tasks: newTasks } : col
      );
      setColumns(newColumns);
    } else {
      // Moving between columns
      const sourceCol = columns.find(col => col.id === source.droppableId);
      const destCol = columns.find(col => col.id === destination.droppableId);
      if (!sourceCol || !destCol) return;

      const sourceTasks = Array.from(sourceCol.tasks);
      const destTasks = Array.from(destCol.tasks);
      const [removed] = sourceTasks.splice(source.index, 1);
      
      const taskToMove = removed as Task;

      // Update status/color based on column (Mock logic)
      if (destination.droppableId === 'done') {
          taskToMove.statusColor = 'bg-green-500';
          taskToMove.progress = 100;
      } else if (destination.droppableId === 'todo') {
          taskToMove.statusColor = 'bg-blue-600'; // Default
      }

      destTasks.splice(destination.index, 0, taskToMove);

      const newColumns = columns.map(col => {
        if (col.id === source.droppableId) return { ...col, tasks: sourceTasks, count: sourceTasks.length };
        if (col.id === destination.droppableId) return { ...col, tasks: destTasks, count: destTasks.length };
        return col;
      });
      setColumns(newColumns);
    }
  };

  const handleCreateTask = (newTask: Task) => {
    const targetColumnId = activeColumnId || columns[0].id;
    const newColumns = columns.map(col => {
      if (col.id === targetColumnId) {
        return {
          ...col,
          tasks: [newTask, ...col.tasks],
          count: col.count + 1
        };
      }
      return col;
    });
    setColumns(newColumns);
    setIsCreateModalOpen(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
      const newColumns = columns.map(col => ({
          ...col,
          tasks: col.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
      }));
      setColumns(newColumns);
      // Also update selected task to reflect changes in modal immediately
      setSelectedTask(updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
      const newColumns = columns.map(col => ({
          ...col,
          tasks: col.tasks.filter(t => t.id !== taskId),
          count: col.tasks.filter(t => t.id !== taskId).length
      }));
      setColumns(newColumns);
  };

  const handleAddColumn = () => {
      const title = window.prompt("请输入新列名称");
      if (title) {
          const newCol: Column = {
              id: `col-${Date.now()}`,
              title,
              count: 0,
              tasks: [],
              iconColor: 'text-gray-400'
          };
          setColumns([...columns, newCol]);
      }
  };

  if (viewType === 'list') {
      return (
          <>
            <TaskListView tasks={allFilteredTasks} onTaskClick={setSelectedTask} />
            {selectedTask && (
                <TaskDetailsModal 
                    task={selectedTask} 
                    onClose={() => setSelectedTask(null)} 
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                />
            )}
             {isCreateModalOpen && (
                <CreateTaskModal 
                    columnTitle={columns.find(c => c.id === activeColumnId)?.title}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateTask}
                    defaultType={createModalType || filters.type}
                />
            )}
          </>
      );
  }

  if (viewType === 'tree') {
      return (
          <>
            <TaskTreeView tasks={allFilteredTasks} onTaskClick={setSelectedTask} />
            {selectedTask && (
                <TaskDetailsModal 
                    task={selectedTask} 
                    onClose={() => setSelectedTask(null)} 
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                />
            )}
             {isCreateModalOpen && (
                <CreateTaskModal 
                    columnTitle={columns.find(c => c.id === activeColumnId)?.title}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateTask}
                    defaultType={createModalType || filters.type}
                />
            )}
          </>
      );
  }

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden bg-slate-50/50 p-6 kanban-scroll relative">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex items-start h-full gap-4 min-w-max">
          {filteredColumns.map((column) => (
            <div key={column.id} className="w-80 flex-shrink-0 flex flex-col h-full max-h-full bg-slate-100/50 rounded-xl border border-slate-200/60">
              {/* Column Header */}
              <div className="p-3 flex items-center justify-between group flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Circle size={12} className={column.iconColor} fill="currentColor" />
                  <span className="font-semibold text-slate-700">{column.title}</span>
                  <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium">{column.tasks.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => {
                        setActiveColumnId(column.id);
                        setCreateModalType(filters.type || TaskType.Task);
                        setIsCreateModalOpen(true);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded transition-all"
                    title={`在 ${column.title} 中新建`}
                  >
                    <Plus size={16} />
                  </button>
                  <button className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded opacity-0 group-hover:opacity-100 transition-all">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              {/* Tasks Container */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 overflow-y-auto px-2 pb-2 kanban-scroll ${
                      snapshot.isDraggingOver ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style }}
                          >
                             <KanbanCard task={task} onClick={setSelectedTask} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              
              {/* Column Footer (Quick Add) */}
               <button 
                  onClick={() => {
                      setActiveColumnId(column.id);
                      setCreateModalType(filters.type || TaskType.Task);
                      setIsCreateModalOpen(true);
                  }}
                  className="mx-2 mb-2 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors border border-transparent hover:border-slate-300 border-dashed"
               >
                 <Plus size={14} />
                 <span>添加任务</span>
               </button>
            </div>
          ))}
          
          {/* Add Column Button */}
          <button 
            onClick={handleAddColumn}
            className="w-80 h-12 flex-shrink-0 flex items-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group"
          >
             <div className="w-6 h-6 rounded bg-slate-200 group-hover:bg-blue-200 text-slate-500 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                <Plus size={16} />
             </div>
             <span className="font-medium">添加列</span>
          </button>
        </div>
      </DragDropContext>

      {isCreateModalOpen && (
        <CreateTaskModal 
          columnTitle={columns.find(c => c.id === activeColumnId)?.title}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateTask}
          defaultType={createModalType || filters.type}
        />
      )}

      {selectedTask && (
        <TaskDetailsModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};