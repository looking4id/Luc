
import React, { useState } from 'react';
import { Search, Filter, Plus, Trash2, ArrowUpDown, ChevronDown } from './Icons';
import { Project, TaskType, Task } from '../types';
import { StatusBadge, PriorityBadge } from './ProjectShared';

interface WorkItemListProps {
    project: Project;
    type: TaskType;
    tasks: Task[];
    onCreate: () => void;
    onTaskClick: (t: Task) => void;
    onDelete: (taskId: string) => void;
}

export const WorkItemList: React.FC<WorkItemListProps> = ({ type, tasks, onCreate, onTaskClick, onDelete }) => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const displayTasks = tasks.filter(t => 
        t.type === type && (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.displayId.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                 <div className="flex items-center gap-4">
                     <h3 className="font-bold text-slate-800 text-base">{type}列表</h3>
                     <span className="text-slate-400 text-sm font-medium">共 {displayTasks.length} 项</span>
                 </div>
                 
                 <div className="flex items-center gap-3">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="搜索 ID/标题" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 pr-4 py-1.5 text-sm border border-slate-300 rounded-lg focus:border-blue-500 outline-none w-48 bg-white transition-all" 
                        />
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                        <Filter size={14} /> 筛选
                    </button>
                    <button onClick={onCreate} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm">
                        <Plus size={16} className="inline mr-1" /> 新建
                    </button>
                 </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
                        <tr className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                            <th className="py-3 px-6 w-28">ID</th>
                            <th className="py-3 px-4">标题</th>
                            <th className="py-3 px-4 w-32">状态</th>
                            <th className="py-3 px-4 w-40">负责人</th>
                            <th className="py-3 px-4 w-28">优先级</th>
                            <th className="py-3 px-4 w-32">截止日期</th>
                            <th className="py-3 px-4 w-12 text-right pr-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                        {displayTasks.map(task => (
                            <tr key={task.id} className="hover:bg-blue-50/20 transition-colors group cursor-pointer" onClick={() => onTaskClick(task)}>
                                <td className="py-4 px-6 font-mono font-bold text-slate-400">{task.displayId}</td>
                                <td className="py-4 px-4 font-semibold text-slate-800">{task.title}</td>
                                <td className="py-4 px-4"><StatusBadge status="进行中" /></td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-7 h-7 rounded-full ${task.assignee?.avatarColor} text-white flex items-center justify-center text-[11px] font-bold shadow-sm`}>
                                            {task.assignee?.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-slate-700">{task.assignee?.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4"><PriorityBadge priority={task.priority} /></td>
                                <td className="py-4 px-4 font-mono text-slate-500">{task.dueDate}</td>
                                <td className="py-4 px-4 text-right pr-6">
                                    <button onClick={(e) => {e.stopPropagation(); onDelete(task.id);}} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
