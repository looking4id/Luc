
import React from 'react';
import { Task, Priority } from '../types';
import { Clock, User } from './Icons';

interface KanbanCardProps {
  task: Task;
  onClick: (task: Task) => void;
  onUpdate: (task: Task) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task, onClick }) => {
  const getPriorityStyle = (priority?: Priority) => {
    switch(priority) {
      case Priority.Urgent: return 'text-red-600 bg-red-50 border-red-100';
      case Priority.High: return 'text-orange-600 bg-orange-50 border-orange-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  const getPriorityLabel = (priority?: Priority) => {
    switch(priority) {
      case Priority.Urgent: return '紧急';
      case Priority.High: return '高';
      default: return '普通';
    }
  };

  return (
    <div 
      onClick={() => onClick(task)}
      className="bg-white rounded-lg p-4 mb-3 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer group relative overflow-hidden"
    >
      {/* 侧边装饰条 */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${task.statusColor}`}></div>

      <div className="flex flex-col gap-3">
        <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 leading-normal line-clamp-2">
          {task.title}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-mono font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
            {task.displayId}
          </span>
          <span className={`text-sm font-bold px-1.5 py-0.5 rounded border ${getPriorityStyle(task.priority)}`}>
            {getPriorityLabel(task.priority)}
          </span>
          {task.tags?.map(tag => (
            <span key={tag} className="text-sm px-1.5 py-0.5 rounded bg-blue-50 text-blue-500 font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className={`flex items-center gap-1.5 text-sm ${new Date(task.dueDate) < new Date() ? 'text-red-500' : 'text-slate-400'}`}>
            <Clock size={14} />
            <span className="font-mono">{task.dueDate}</span>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-sm text-slate-500">{task.assignee?.name}</span>
             <div className={`w-7 h-7 rounded-full ${task.assignee?.avatarColor} text-white flex items-center justify-center text-[11px] font-bold shadow-sm`}>
               {task.assignee?.name.slice(0, 1)}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
