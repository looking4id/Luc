
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { MOCK_COLUMNS, MOCK_USERS, MOCK_PROJECTS } from '../constants';
import { KanbanCard } from './KanbanCard';
import { Circle, CheckCircle2, MoreHorizontal, Plus, XCircle, Clock, Trash2, ChevronDown, Paperclip, Download, UploadCloud, FileText, ChevronRight, LayoutList, FolderTree, PlayCircle, ShieldAlert, Zap } from './Icons';
import { Task, TaskType, Priority, Severity, FilterState, Attachment, ViewType, Column, User } from '../types';
import { StatusBadge, PriorityBadge, SeverityBadge } from './ProjectShared';

// Added missing and exported CreateTaskModal component
export const CreateTaskModal: React.FC<{
    onClose: () => void;
    onSubmit: (task: Task) => void;
    defaultType: TaskType | null;
    defaultProjectId?: string;
}> = ({ onClose, onSubmit, defaultType, defaultProjectId }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<TaskType>(defaultType || TaskType.Task);
    const [priority, setPriority] = useState<Priority>(Priority.Normal);
    const [severity, setSeverity] = useState<Severity>(Severity.Normal);
    const [environment, setEnvironment] = useState('测试环境');
    const [reproRate, setReproRate] = useState('必然重现');
    const [assigneeId, setAssigneeId] = useState('u1');

    // Fix: Corrected typo in function name from handleSumbit to handleSubmit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = {
            id: `t${Date.now()}`,
            displayId: `#${type === TaskType.Requirement ? 'RQ' : type === TaskType.Defect ? 'DF' : 'TS'}-${Math.floor(Math.random() * 1000)}`,
            title,
            type,
            priority,
            severity: type === TaskType.Defect ? severity : undefined,
            environment: type === TaskType.Defect ? environment : undefined,
            reproductionRate: type === TaskType.Defect ? reproRate : undefined,
            dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
            assignee: MOCK_USERS.find(u => u.id === assigneeId) || MOCK_USERS[0],
            statusColor: type === TaskType.Defect ? 'bg-red-500' : 'bg-blue-600',
            creatorId: 'u1',
            projectId: defaultProjectId || 'p1'
        };
        onSubmit(newTask);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-black text-slate-800 text-lg tracking-tight">新建工作项</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors"><XCircle size={24} /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">标题</label>
                        <input 
                            required 
                            autoFocus
                            placeholder="输入简明扼要的标题..."
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 transition-all text-sm font-bold" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">工作项类型</label>
                            <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white font-bold text-slate-700" value={type} onChange={e => setType(e.target.value as TaskType)}>
                                {Object.values(TaskType).map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">负责人</label>
                            <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white font-bold text-slate-700" value={assigneeId} onChange={e => setAssigneeId(e.target.value)}>
                                {MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Defect Specific Fields */}
                    {type === TaskType.Defect && (
                        <div className="p-5 bg-red-50/30 rounded-2xl border border-red-100 space-y-5 animate-in slide-in-from-top-2 duration-300">
                           <div className="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest mb-1">
                              <ShieldAlert size={14} /> 缺陷核心维度
                           </div>
                           <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-tighter">严重程度</label>
                                    <select className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-white font-bold" value={severity} onChange={e => setSeverity(e.target.value as Severity)}>
                                        {Object.values(Severity).map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-tighter">重现率</label>
                                    <select className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-white font-bold" value={reproRate} onChange={e => setReproRate(e.target.value)}>
                                        {['必然重现', '间歇重现', '难以重现', '无法重现'].map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-tighter">发现环境</label>
                                    <select className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-white font-bold" value={environment} onChange={e => setEnvironment(e.target.value)}>
                                        {['开发环境', '测试环境', '预发布', '线上环境'].map(env => <option key={env} value={env}>{env}</option>)}
                                    </select>
                                </div>
                           </div>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">优先级</label>
                        <div className="flex gap-2">
                             {Object.values(Priority).map(p => (
                                 <button 
                                    key={p} 
                                    type="button" 
                                    onClick={() => setPriority(p)}
                                    className={`flex-1 py-2 text-xs font-black rounded-lg border transition-all ${priority === p ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                 >
                                     {p}
                                 </button>
                             ))}
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">取消</button>
                        <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-100 active:scale-[0.98] transition-all">创建工作项</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Added missing and exported TaskDetailsModal component
export const TaskDetailsModal: React.FC<{
    task: Task;
    onClose: () => void;
    onUpdate: (task: Task) => void;
    onDelete: (id: string) => void;
}> = ({ task, onClose, onUpdate, onDelete }) => {
    const [title, setTitle] = useState(task.title);

    return (
        <div className="fixed inset-0 bg-slate-900/10 z-[100] flex items-center justify-end font-sans">
            <div 
                className="fixed inset-0 cursor-default" 
                onClick={onClose}
            ></div>
            <div className="bg-white w-[680px] h-full shadow-[-20px_0_60px_rgba(0,0,0,0.12)] flex flex-col animate-in slide-in-from-right duration-300 relative z-10">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-black text-slate-300 bg-slate-100 px-2 py-1 rounded tracking-widest uppercase">{task.displayId}</span>
                        <h3 className="font-black text-slate-800 tracking-tight">事项详情</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => onDelete(task.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors" title="删除事项"><Trash2 size={18} /></button>
                        <button onClick={onClose} className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><XCircle size={24} /></button>
                    </div>
                </div>
                <div className="flex-1 overflow-auto p-10 space-y-12 custom-scrollbar">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">工作项标题</label>
                        <input 
                            className="text-2xl font-black text-slate-800 w-full outline-none border-b-2 border-transparent focus:border-blue-200 pb-2 transition-all"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            onBlur={() => onUpdate({ ...task, title })}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">业务类型</span>
                            <div className="text-sm font-black text-slate-700 flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${task.type === TaskType.Requirement ? 'bg-blue-500' : task.type === TaskType.Defect ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                {task.type}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">当前进度</span>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${task.statusColor} rounded-full`} style={{ width: `${task.progress || 0}%` }}></div>
                                </div>
                                <span className="text-xs font-black text-slate-400">{task.progress || 0}%</span>
                            </div>
                        </div>

                        {/* Defect Specific Attributes */}
                        {task.type === TaskType.Defect && (
                            <>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">严重程度</span>
                                    <div><SeverityBadge severity={task.severity} /></div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">重现率</span>
                                    <div className="text-sm font-bold text-slate-600">{task.reproductionRate || '未设置'}</div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">发现环境</span>
                                    <div className="text-sm font-bold text-slate-600 flex items-center gap-2">
                                        <Zap size={14} className="text-amber-400" />
                                        {task.environment || '未设置'}
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="space-y-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">优 先 级</span>
                            <div><PriorityBadge priority={task.priority} /></div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">负责人</span>
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full ${task.assignee.avatarColor} text-white flex items-center justify-center text-xs font-black shadow-sm ring-2 ring-white`}>{task.assignee.name.charAt(0)}</div>
                                <span className="text-sm font-black text-slate-700">{task.assignee.name}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">截止日期</span>
                            <div className="text-sm font-black text-slate-500 flex items-center gap-2">
                                <Clock size={16} className="text-slate-300" />
                                <span className="font-mono">{task.dueDate}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-8 border-t border-slate-50">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">详细描述说明</span>
                            <button className="text-[10px] font-black text-blue-500 uppercase hover:underline">编辑描述</button>
                        </div>
                        <div className="text-sm text-slate-600 bg-slate-50/50 p-6 rounded-3xl min-h-[200px] leading-relaxed border border-slate-100/50">
                            {task.description || '暂无详细描述内容，请及时完善以确保信息对齐。'}
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex justify-between">
                    <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-slate-500 hover:bg-white rounded-xl transition-all">返回列表</button>
                    <div className="flex gap-3">
                         <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">添加评论</button>
                         <button className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">提交变更</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Fix: Implemented and exported missing KanbanBoard component
interface KanbanBoardProps {
    filters: FilterState;
    viewType: ViewType;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (open: boolean) => void;
    createModalType: TaskType | null;
    setCreateModalType: (type: TaskType | null) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
    filters, viewType, isCreateModalOpen, setIsCreateModalOpen, createModalType, setCreateModalType 
}) => {
    const [columns, setColumns] = useState<Column[]>(MOCK_COLUMNS);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = columns.findIndex(c => c.id === source.droppableId);
            const destColIndex = columns.findIndex(c => c.id === destination.droppableId);
            const sourceCol = columns[sourceColIndex];
            const destCol = columns[destColIndex];
            const sourceTasks = [...sourceCol.tasks];
            const destTasks = [...destCol.tasks];
            const [removed] = sourceTasks.splice(source.index, 1);
            
            destTasks.splice(destination.index, 0, removed);

            const newColumns = [...columns];
            newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks, count: sourceTasks.length };
            newColumns[destColIndex] = { ...destCol, tasks: destTasks, count: destTasks.length };
            setColumns(newColumns);
        } else {
            const colIndex = columns.findIndex(c => c.id === source.droppableId);
            const column = columns[colIndex];
            const copiedTasks = [...column.tasks];
            const [removed] = copiedTasks.splice(source.index, 1);
            copiedTasks.splice(destination.index, 0, removed);
            const newColumns = [...columns];
            newColumns[colIndex] = { ...column, tasks: copiedTasks };
            setColumns(newColumns);
        }
    };

    const filteredColumns = useMemo(() => {
        return columns.map(col => ({
            ...col,
            tasks: col.tasks.filter(task => {
                const matchesSearch = !filters.search || 
                    task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                    task.displayId.toLowerCase().includes(filters.search.toLowerCase());
                const matchesAssignee = !filters.assigneeId || task.assignee?.id === filters.assigneeId;
                const matchesType = !filters.type || task.type === filters.type;
                const matchesPriority = !filters.priority || task.priority === filters.priority;
                const matchesProject = !filters.projectId || task.projectId === filters.projectId;
                const matchesCreator = !filters.creatorId || task.creatorId === filters.creatorId;
                const matchesStatus = !filters.status || col.title === filters.status;
                
                let matchesDate = true;
                if (filters.dateRange) {
                    const taskDate = new Date(task.dueDate);
                    const start = new Date(filters.dateRange.start);
                    const end = new Date(filters.dateRange.end);
                    matchesDate = taskDate >= start && taskDate <= end;
                }

                return matchesSearch && matchesAssignee && matchesType && matchesPriority && matchesProject && matchesCreator && matchesStatus && matchesDate;
            })
        }));
    }, [columns, filters]);

    const handleCreateTask = (task: Task) => {
        const todoIndex = columns.findIndex(c => c.id === 'todo');
        const newColumns = [...columns];
        newColumns[todoIndex] = {
            ...newColumns[todoIndex],
            tasks: [task, ...newColumns[todoIndex].tasks],
            count: newColumns[todoIndex].tasks.length + 1
        };
        setColumns(newColumns);
        setIsCreateModalOpen(false);
    };

    const handleUpdateTask = (updatedTask: Task) => {
        const newColumns = columns.map(col => ({
            ...col,
            tasks: col.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
        }));
        setColumns(newColumns);
    };

    const handleDeleteTask = (taskId: string) => {
        if (window.confirm("确定要删除该事项吗？")) {
            const newColumns = columns.map(col => ({
                ...col,
                tasks: col.tasks.filter(t => t.id !== taskId),
                count: col.tasks.filter(t => t.id !== taskId).length
            }));
            setColumns(newColumns);
            setEditingTask(null);
        }
    };

    if (viewType === 'list') {
        const allTasks = filteredColumns.flatMap(c => c.tasks);
        return (
            <div className="flex-1 bg-white overflow-auto p-6">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                            <th className="py-3 px-6">ID</th>
                            <th className="py-3 px-4">标题</th>
                            <th className="py-3 px-4">类型</th>
                            <th className="py-3 px-4">负责人</th>
                            <th className="py-3 px-4">优先级</th>
                            <th className="py-3 px-4 text-right pr-6"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {allTasks.map(task => (
                            <tr key={task.id} className="hover:bg-slate-50 group cursor-pointer" onClick={() => setEditingTask(task)}>
                                <td className="py-4 px-6 font-mono text-slate-400">{task.displayId}</td>
                                <td className="py-4 px-4 font-bold text-slate-700">{task.title}</td>
                                <td className="py-4 px-4"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold">{task.type}</span></td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-6 h-6 rounded-full ${task.assignee.avatarColor} text-white flex items-center justify-center text-[10px] font-bold`}>{task.assignee.name.charAt(0)}</div>
                                        <span className="font-medium">{task.assignee.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4"><PriorityBadge priority={task.priority} /></td>
                                <td className="py-4 px-4 text-right pr-6">
                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingTask && <TaskDetailsModal task={editingTask} onClose={() => setEditingTask(null)} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />}
                {isCreateModalOpen && <CreateTaskModal defaultType={createModalType} onClose={() => setIsCreateModalOpen(false)} onSubmit={handleCreateTask} />}
            </div>
        );
    }

    if (viewType === 'tree') {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <FolderTree size={64} strokeWidth={1} className="mb-4 opacity-20" />
                <h3 className="text-lg font-medium">树状视图正在建设中</h3>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-hidden relative">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex h-full p-4 gap-4 overflow-x-auto bg-slate-50/50 kanban-scroll">
                    {filteredColumns.map((column) => (
                        <div key={column.id} className="w-80 flex-shrink-0 flex flex-col h-full bg-slate-100/50 rounded-xl border border-slate-200/60">
                            <div className="p-3 flex items-center justify-between flex-shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${column.iconColor.replace('text', 'bg')}`}></div>
                                    <span className="font-bold text-slate-700 text-sm tracking-tight">{column.title}</span>
                                    <span className="bg-white/80 text-slate-400 text-[10px] px-2 py-0.5 rounded-full font-black border border-slate-100">{column.tasks.length}</span>
                                </div>
                                <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-white"><MoreHorizontal size={14} /></button>
                            </div>

                            <Droppable droppableId={column.id}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="flex-1 overflow-y-auto px-2 pb-2 custom-scrollbar min-h-[100px]"
                                    >
                                        {column.tasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <KanbanCard task={task} onClick={setEditingTask} onUpdate={handleUpdateTask} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        
                                        <button 
                                            onClick={() => { setCreateModalType(TaskType.Task); setIsCreateModalOpen(true); }}
                                            className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-blue-500 hover:border-blue-200 hover:bg-white transition-all flex items-center justify-center gap-1.5 text-xs font-bold"
                                        >
                                            <Plus size={14} /> 快速创建工作项
                                        </button>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
            
            {editingTask && (
                <TaskDetailsModal 
                    task={editingTask} 
                    onClose={() => setEditingTask(null)} 
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                />
            )}
            
            {isCreateModalOpen && (
                <CreateTaskModal 
                    defaultType={createModalType} 
                    onClose={() => setIsCreateModalOpen(false)} 
                    onSubmit={handleCreateTask} 
                />
            )}
        </div>
    );
};
