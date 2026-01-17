
import React, { useState } from 'react';
import { Search, Filter, Plus, Trash2, ListFilter, ArrowUpDown, ChevronDown } from './Icons';
import { Project, TaskType, Task, Priority } from '../types';
import { StatusBadge, PriorityBadge } from './ProjectShared';

interface WorkItemListProps {
    project: Project;
    type: TaskType;
    tasks: Task[];
    onCreate: () => void;
    onTaskClick: (t: Task) => void;
    onDelete: (taskId: string) => void;
}

export const WorkItemList: React.FC<WorkItemListProps> = ({ project, type, tasks, onCreate, onTaskClick, onDelete }) => {
    const [searchQuery, setSearchQuery] = useState('');
    
    // Filter tasks from passed props based on project and type
    const displayTasks = tasks.filter(t => {
        const matchesProject = t.projectId === project.id;
        const matchesType = t.type === type;
        const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              t.displayId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesProject && matchesType && matchesSearch;
    });

    const getStatusColor = (statusColor: string) => {
        if (statusColor === 'bg-green-500') return '已完成';
        if (statusColor === 'bg-blue-600' || statusColor === 'bg-blue-500') return '进行中';
        if (statusColor === 'bg-gray-400' || statusColor === 'bg-gray-300') return '待处理';
        return '已拒绝';
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
            {/* Toolbar Area */}
            <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                 <div className="flex items-center gap-4">
                     <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        {type === TaskType.Requirement ? <span className="w-2 h-5 bg-blue-500 rounded-full"></span> : 
                         type === TaskType.Defect ? <span className="w-2 h-5 bg-red-500 rounded-full"></span> : 
                         <span className="w-2 h-5 bg-green-500 rounded-full"></span>}
                        {type}列表
                     </h3>
                     <div className="h-4 w-px bg-slate-200"></div>
                     <span className="text-slate-400 text-sm font-medium">共 {displayTasks.length} 项</span>
                 </div>
                 
                 <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="输入ID或标题搜索..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 pr-4 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-64 bg-white transition-all" 
                        />
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                        <Filter size={14} /> 
                        <span>筛选</span>
                    </button>
                    
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                        <ArrowUpDown size={14} />
                    </button>

                    <button 
                        onClick={onCreate}
                        className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm shadow-sm transition-all active:scale-95 ml-2"
                    >
                        <Plus size={16} /> 
                        <span>新建{type}</span>
                    </button>
                 </div>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/80 sticky top-0 z-10">
                        <tr className="border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                            <th className="py-3 px-6 w-10"><input type="checkbox" className="rounded text-blue-600" /></th>
                            <th className="py-3 px-4 w-28">ID</th>
                            <th className="py-3 px-4">标题</th>
                            <th className="py-3 px-4 w-32">状态</th>
                            <th className="py-3 px-4 w-40">负责人</th>
                            <th className="py-3 px-4 w-28">优先级</th>
                            <th className="py-3 px-4 w-32">截止日期</th>
                            <th className="py-3 px-4 w-20 text-right pr-6">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayTasks.map(task => (
                            <tr key={task.id} className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors group cursor-pointer" onClick={() => onTaskClick(task)}>
                                <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                                    <input type="checkbox" className="rounded text-blue-600" />
                                </td>
                                <td className="py-4 px-4 text-xs font-mono font-bold text-slate-400">{task.displayId}</td>
                                <td className="py-4 px-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[14px] font-semibold text-slate-700 group-hover:text-blue-600 transition-colors leading-snug">
                                            {task.title}
                                        </div>
                                        {task.tags && task.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {task.tags.map(tag => (
                                                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold uppercase">{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <StatusBadge status={getStatusColor(task.statusColor)} />
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        {task.assignee ? (
                                            <>
                                                <div className={`w-6 h-6 rounded-full ${task.assignee.avatarColor} text-white flex items-center justify-center text-[10px] font-black shadow-sm`}>
                                                    {task.assignee.name.substring(0, 1)}
                                                </div>
                                                <span className="text-sm text-slate-600 font-medium">{task.assignee.name}</span>
                                            </>
                                        ) : <span className="text-slate-400 text-xs italic">未分配</span>}
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <PriorityBadge priority={task.priority} />
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`text-[13px] font-mono ${new Date(task.dueDate) < new Date() && task.statusColor !== 'bg-green-500' ? 'text-red-500 font-bold' : 'text-slate-500'}`}>
                                        {task.dueDate}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-right pr-6" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => onDelete(task.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="删除"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                            <ChevronDown size={16} className="-rotate-90" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {displayTasks.length === 0 && (
                             <tr>
                                 <td colSpan={8} className="py-24 text-center">
                                     <div className="flex flex-col items-center justify-center text-slate-400">
                                         <ListFilter size={48} className="mb-4 opacity-10" />
                                         <p className="text-lg font-medium">暂无数据</p>
                                         <p className="text-sm">没有找到匹配的{type}，点击右侧按钮新建</p>
                                         <button 
                                            onClick={onCreate}
                                            className="mt-4 text-blue-600 hover:underline text-sm font-bold"
                                         >
                                             立刻新建一个
                                         </button>
                                     </div>
                                 </td>
                             </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination / Summary Footer */}
            <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/80">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>当前显示: {displayTasks.length} 条</span>
                    <div className="h-3 w-px bg-slate-200"></div>
                    <div className="flex items-center gap-2">
                        每页显示 
                        <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-blue-600">
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-1.5 border border-slate-300 rounded-lg bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                        上一页
                    </button>
                    <div className="flex items-center gap-1 px-2">
                        <span className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-200">1</span>
                        <span className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 text-slate-500 rounded-lg text-xs font-bold transition-colors cursor-pointer">2</span>
                    </div>
                    <button className="px-4 py-1.5 border border-slate-300 rounded-lg bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                        下一页
                    </button>
                </div>
            </div>
        </div>
    );
};
