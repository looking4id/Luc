import React from 'react';
import { Task, Priority, TaskType } from '../types';
import { Clock, Users } from './Icons';

interface KanbanCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task, onClick }) => {
  const getPriorityBadge = (priority?: Priority) => {
    if (priority === Priority.Urgent) {
      return <span className="text-[10px] px-1 py-0.5 rounded border border-red-200 text-red-600 bg-red-50 font-medium">紧急</span>;
    }
    if (priority === Priority.High) {
      return <span className="text-[10px] px-1 py-0.5 rounded border border-orange-200 text-orange-500 bg-orange-50 font-medium">高</span>;
    }
    return null;
  };

  const getTagBadge = (tag: string) => (
    <span className="text-[10px] px-1 py-0.5 rounded bg-blue-400 text-white font-medium">{tag}</span>
  );

  return (
    <div 
      onClick={() => onClick(task)}
      className="bg-white rounded p-3 mb-2 shadow-sm border border-slate-200 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-400 hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden group cursor-pointer"
    >
      {/* Left Status Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${task.statusColor}`}></div>

      <div className="pl-2">
        {/* Title */}
        <div 
          className="text-sm text-slate-700 font-medium leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2"
          title={task.title}
        >
          {task.title}
        </div>

        {/* Metadata Row 1: ID, Type, Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs text-slate-400 font-mono bg-slate-100 px-1 rounded">{task.displayId}</span>
          <span className="text-xs text-slate-500">[{task.type}]</span>
          {getPriorityBadge(task.priority)}
          {task.tags?.map(tag => <React.Fragment key={tag}>{getTagBadge(tag)}</React.Fragment>)}
        </div>

        {/* Progress Bar (if applicable) */}
        {typeof task.progress === 'number' && (
          <div className="mb-2">
            <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
              <span>进度</span>
              <span>{task.progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${task.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Footer: Date & Assignee */}
        <div className="flex items-center justify-between mt-1">
           {task.dueDate ? (
             <div className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <Clock size={12} />
                <span>{task.dueDate}</span>
             </div>
           ) : <div />}
           
           <div className="flex items-center gap-2">
               <span className="text-xs text-slate-400">{task.assignee?.name || '未分配'}</span>
               {task.assignee ? (
                   <div className={`w-5 h-5 rounded-full ${task.assignee.avatarColor} text-white flex items-center justify-center text-[10px] border border-white shadow-sm`}>
                       {task.assignee.name.slice(0, 2)}
                   </div>
               ) : (
                   <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] border border-slate-200 shadow-sm">
                       <Users size={12} />
                   </div>
               )}
           </div>
        </div>
      </div>
    </div>
  );
};