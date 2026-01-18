
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { MOCK_COLUMNS, MOCK_USERS, MOCK_PROJECTS } from '../constants';
import { KanbanCard } from './KanbanCard';
import { Circle, CheckCircle2, MoreHorizontal, Plus, XCircle, Clock, Trash2, ChevronDown, Paperclip, Download, UploadCloud, FileText, ChevronRight, LayoutList, FolderTree, PlayCircle } from './Icons';
import { Task, TaskType, Priority, FilterState, Attachment, ViewType, Column, User } from '../types';
import { StatusBadge } from './ProjectShared';

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
    const [assigneeId, setAssigneeId] = useState('u1');

    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = {
            id: `t${Date.now()}`,
            displayId: `#${type === TaskType.Requirement ? 'RQ' : type === TaskType.Defect ? 'DF' : 'TS'}-${Math.floor(Math.random() * 1000)}`,
            title,
            type,
            priority,
            dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
            assignee: MOCK_USERS.find(u => u.id === assigneeId) || MOCK_USERS[0],
            statusColor: type === TaskType.Defect ? 'bg-red-500' : 'bg-blue-600',
            creatorId: 'u1',
            projectId: defaultProjectId || 'p1'
        };
        onSubmit(newTask);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 text-lg">新建工作项</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                </div>
                <form onSubmit={handleSumbit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">标题</label>
                        <input 
                            required 
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">类型</label>
                            <select className="w-full border border-slate-200 rounded-lg px-3 py-2" value={type} onChange={e => setType(e.target.value as TaskType)}>
                                {Object.values(TaskType).map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">优先级</label>
                            <select className="w-full border border-slate-200 rounded-lg px-3 py-2" value={priority} onChange={e => setPriority(e.target.value as Priority)}>
                                {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">负责人</label>
                        <select className="w-full border border-slate-200 rounded-lg px-3 py-2" value={assigneeId} onChange={e => setAssigneeId(e.target.value)}>
                            {MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-2 border border-slate-200 rounded-lg text-slate-600 font-bold hover:bg-slate-50">取消</button>
                        <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">创建</button>
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
        <div className="fixed inset-0 bg-slate-900/10 z-[100] flex items-center justify-end">
            <div 
                className="fixed inset-0 cursor-default" 
                onClick={onClose}
            ></div>
            <div className="bg-white w-[640px] h-full shadow-[-12px_0_40px_rgba(0,0,0,0.08)] flex flex-col animate-in slide-in-from-right duration-300 relative z-10">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">{task.displayId}</span>
                        <h3 className="font-bold text-slate-800">工作项详情</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => onDelete(task.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><XCircle size={24} /></button>
                    </div>
                </div>
                <div className="flex-1 overflow-auto p-8 space-y-8 custom-scrollbar">
                    <div>
                        <input 
                            className="text-2xl font-bold text-slate-800 w-full outline-none border-b border-transparent focus:border-blue-200 pb-2 transition-all"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            onBlur={() => onUpdate({ ...task, title })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-y-6">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">类型</span>
                            <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${task.type === TaskType.Requirement ? 'bg-blue-500' : task.type === TaskType.Defect ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                {task.type}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">优先级</span>
                            <div className="text-sm font-bold text-slate-700">{task.priority}</div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">负责人</span>
                            <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full ${task.assignee.avatarColor} text-white flex items-center justify-center text-[10px] font-bold shadow-sm`}>{task.assignee.name.charAt(0)}</div>
                                <span className="text-sm font-bold text-slate-700">{task.assignee.name}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">截止日期</span>
                            <div className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                <Clock size={14} className="text-slate-400" />
                                {task.dueDate}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-slate-50">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">详细描述</span>
                        <div className="text-sm text-slate-600 bg-slate-50/50 p-5 rounded-2xl min-h-[160px] leading-relaxed border border-slate-100">
                            {task.description || '暂无描述内容'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TaskListView: React.FC<{ tasks: Task[], onTaskClick: (t: Task) => void }> = ({ tasks, onTaskClick }) => {
    const [colWidths, setColWidths] = useState([80, 400, 100, 100, 120, 100]);
    const resizingRef = useRef<{ index: number; startX: number; startWidth: number } | null>(null);

    const onMouseDown = (index: number, e: React.MouseEvent) => {
        resizingRef.current = { index, startX: e.pageX, startWidth: colWidths[index] };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.body.style.cursor = 'col-resize';
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!resizingRef.current) return;
        const { index, startX, startWidth } = resizingRef.current;
        const deltaX = e.pageX - startX;
        const newWidths = [...colWidths];
        newWidths[index] = Math.max(40, startWidth + deltaX);
        setColWidths(newWidths);
    };

    const onMouseUp = () => {
        resizingRef.current = null;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = 'default';
    };

    const columns = ['ID', '标题', '状态', '优先级', '负责人', '截止日期'];

    return (
        <div className="flex-1 overflow-auto bg-white p-4">
            <table className="w-full text-left border-collapse table-fixed">
                <thead>
                    <tr className="border-b border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        {columns.map((col, i) => (
                            <th key={i} className="py-3 px-4 relative group/th truncate" style={{ width: colWidths[i] }}>
                                {col}
                                <div onMouseDown={(e) => onMouseDown(i, e)} className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 z-20" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {tasks.map(task => (
                        <tr key={task.id} onClick={() => onTaskClick(task)} className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors group">
                            <td className="py-4 px-4 text-xs font-mono font-bold text-slate-400 truncate">{task.displayId}</td>
                            <td className="py-4 px-4 font-semibold text-slate-700 group-hover:text-blue-600 truncate">{task.title}</td>
                            <td className="py-4 px-4"><StatusBadge status={task.statusColor.includes('green') ? '已完成' : '进行中'} /></td>
                            <td className="py-4 px-4 text-center">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${task.priority === Priority.High ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-500'}`}>{task.priority || '低'}</span>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-2 truncate">
                                     <div className={`w-5 h-5 rounded-full ${task.assignee?.avatarColor} text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0`}>{task.assignee?.name.slice(0, 1)}</div>
                                     <span className="text-xs font-medium truncate">{task.assignee?.name}</span>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-xs font-mono text-slate-400 truncate">{task.dueDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Added missing TaskTreeView component
const TaskTreeView: React.FC<{ tasks: Task[], onTaskClick: (t: Task) => void }> = ({ tasks, onTaskClick }) => {
    return (
        <div className="flex-1 overflow-auto bg-white p-4">
            <div className="space-y-1">
                {tasks.map(task => (
                    <div key={task.id} onClick={() => onTaskClick(task)} className="flex items-center gap-4 py-3 px-4 border border-transparent hover:border-blue-100 hover:bg-blue-50/30 rounded-xl cursor-pointer transition-all">
                        <ChevronRight size={14} className="text-slate-300" />
                        <span className="text-xs font-mono text-slate-400 w-20">{task.displayId}</span>
                        <span className="text-sm font-bold text-slate-700 truncate flex-1">{task.title}</span>
                        <StatusBadge status={task.statusColor.includes('green') ? '已完成' : '进行中'} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Added missing and exported KanbanBoard component
export const KanbanBoard: React.FC<{
    filters: FilterState;
    viewType: ViewType;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (open: boolean) => void;
    createModalType: TaskType | null;
    setCreateModalType: (type: TaskType | null) => void;
}> = ({ filters, viewType, isCreateModalOpen, setIsCreateModalOpen, createModalType, setCreateModalType }) => {
    const [columns, setColumns] = useState<Column[]>(MOCK_COLUMNS);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const filteredColumns = useMemo(() => {
        return columns.map(col => ({
            ...col,
            tasks: col.tasks.filter(task => {
                if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) && !task.displayId.toLowerCase().includes(filters.search.toLowerCase())) return false;
                if (filters.type && task.type !== filters.type) return false;
                if (filters.priority && task.priority !== filters.priority) return false;
                if (filters.projectId && task.projectId !== filters.projectId) return false;
                if (filters.assigneeId && task.assignee?.id !== filters.assigneeId) return false;
                if (filters.creatorId && task.creatorId !== filters.creatorId) return false;
                if (filters.status && col.title !== filters.status) return false;
                return true;
            })
        }));
    }, [columns, filters]);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const newColumns = [...columns];
        const sourceCol = newColumns.find(c => c.id === source.droppableId)!;
        const destCol = newColumns.find(c => c.id === destination.droppableId)!;
        
        const [movedTask] = sourceCol.tasks.splice(source.index, 1);
        destCol.tasks.splice(destination.index, 0, movedTask);
        
        setColumns(newColumns);
    };

    const handleCreateTask = (task: Task) => {
        const newColumns = [...columns];
        newColumns[0].tasks.unshift(task);
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

    const handleDeleteTask = (id: string) => {
        const newColumns = columns.map(col => ({
            ...col,
            tasks: col.tasks.filter(t => t.id !== id)
        }));
        setColumns(newColumns);
        setSelectedTask(null);
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/30">
            {viewType === 'kanban' ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex-1 flex gap-4 overflow-x-auto p-4 custom-scrollbar">
                        {filteredColumns.map(column => (
                            <Droppable key={column.id} droppableId={column.id}>
                                {(provided) => (
                                    <div 
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="w-80 flex-shrink-0 flex flex-col bg-slate-100/50 rounded-2xl border border-slate-200/60 h-full"
                                    >
                                        <div className="p-4 flex items-center justify-between border-b border-slate-200/30 mb-2">
                                            <div className="flex items-center gap-2">
                                                <Circle size={8} className={column.iconColor} fill="currentColor" />
                                                <span className="font-bold text-slate-700 text-sm">{column.title}</span>
                                                <span className="text-xs text-slate-400 font-bold ml-1">{column.tasks.length}</span>
                                            </div>
                                            <button className="text-slate-400 hover:text-slate-600 transition-colors"><MoreHorizontal size={14}/></button>
                                        </div>
                                        <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
                                            {column.tasks.map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <KanbanCard task={task} onClick={setSelectedTask} onUpdate={handleUpdateTask} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            ) : viewType === 'list' ? (
                <TaskListView tasks={filteredColumns.flatMap(c => c.tasks)} onTaskClick={setSelectedTask} />
            ) : (
                <TaskTreeView tasks={filteredColumns.flatMap(c => c.tasks)} onTaskClick={setSelectedTask} />
            )}

            {isCreateModalOpen && (
                <CreateTaskModal 
                    onClose={() => setIsCreateModalOpen(false)} 
                    onSubmit={handleCreateTask} 
                    defaultType={createModalType} 
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
