
import React from 'react';
import { Search, Filter, Plus, MoreHorizontal } from './Icons';
import { StatusBadge, PriorityBadge } from './ProjectShared';
import { MOCK_COLUMNS } from '../constants';
import { TaskType } from '../types';

export const IterationList = ({ sprintId }: { sprintId: string }) => {
  const allTasks = MOCK_COLUMNS.flatMap(c => c.tasks);
  
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索工作项..." 
              className="pl-8 pr-4 py-1.5 text-sm border border-slate-300 rounded bg-white w-64 focus:outline-none focus:border-blue-500"
            />
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={14} /> 筛选
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">规划工作项</button>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 border border-slate-200 rounded bg-white"><MoreHorizontal size={16} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white sticky top-0 z-10">
            <tr className="border-b border-slate-100 text-slate-400 text-sm font-bold uppercase tracking-wider">
              <th className="py-3 px-6 w-32">ID</th>
              <th className="py-3 px-4">标题</th>
              <th className="py-3 px-4 w-32">状态</th>
              <th className="py-3 px-4 w-32">负责人</th>
              <th className="py-3 px-4 w-24">优先级</th>
              <th className="py-3 px-4 w-32">截止日期</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {allTasks.slice(0, 10).map((task, idx) => (
              <tr key={task.id} className="border-b border-slate-50 hover:bg-slate-50 group cursor-pointer transition-colors">
                <td className="py-3 px-6 font-mono text-slate-400">{task.displayId}</td>
                <td className="py-3 px-4 font-medium text-slate-700 group-hover:text-blue-600">{task.title}</td>
                <td className="py-3 px-4"><StatusBadge status={idx % 2 === 0 ? '进行中' : '已完成'} /></td>
                <td className="py-3 px-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${task.assignee.avatarColor} text-white flex items-center justify-center text-[10px] font-bold`}>
                      {task.assignee.name.charAt(0)}
                    </div>
                    {task.assignee.name}
                  </div>
                </td>
                <td className="py-3 px-4"><PriorityBadge priority={task.priority} /></td>
                <td className="py-3 px-4 text-slate-400 font-mono">{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
