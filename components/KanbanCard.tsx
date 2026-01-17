import React, { useState, useEffect, useRef } from 'react';
import { Task, Priority, TaskType } from '../types';
import { Clock, Users, Calendar } from './Icons';

interface KanbanCardProps {
  task: Task;
  onClick: (task: Task) => void;
  onUpdate: (task: Task) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task, onClick, onUpdate }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(task.title);
  const titleInputRef = useRef<HTMLTextAreaElement>(null);

  // Sync state if prop updates externally
  useEffect(() => {
    setTitleValue(task.title);
  }, [task.title]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
        titleInputRef.current.focus();
        // Adjust height
        titleInputRef.current.style.height = 'auto';
        titleInputRef.current.style.height = titleInputRef.current.scrollHeight + 'px';
    }
  }, [isEditingTitle]);

  const handleTitleSave = () => {
      setIsEditingTitle(false);
      if (titleValue.trim() !== task.title) {
          onUpdate({ ...task, title: titleValue });
      }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          e.preventDefault(); // Prevent newline
          handleTitleSave();
      }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ ...task, dueDate: e.target.value });
  };

  const handlePriorityClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      // Cycle priorities for quick edit: Urgent -> High -> Normal -> Urgent
      let nextPriority = Priority.Normal;
      if (task.priority === Priority.Urgent) nextPriority = Priority.High;
      else if (task.priority === Priority.High) nextPriority = Priority.Normal;
      else nextPriority = Priority.Urgent;
      
      onUpdate({ ...task, priority: nextPriority });
  };

  const getPriorityBadge = (priority?: Priority) => {
    if (priority === Priority.Urgent) {
      return (
          <span 
            onClick={handlePriorityClick}
            className="text-[10px] px-1 py-0.5 rounded border border-red-200 text-red-600 bg-red-50 font-medium cursor-pointer hover:bg-red-100 transition-colors select-none"
            title="点击切换优先级"
          >
              紧急
          </span>
      );
    }
    if (priority === Priority.High) {
      return (
        <span 
            onClick={handlePriorityClick}
            className="text-[10px] px-1 py-0.5 rounded border border-orange-200 text-orange-500 bg-orange-50 font-medium cursor-pointer hover:bg-orange-100 transition-colors select-none"
            title="点击切换优先级"
        >
            高
        </span>
      );
    }
    return (
        <span 
            onClick={handlePriorityClick}
            className="text-[10px] px-1 py-0.5 rounded border border-slate-200 text-slate-500 bg-slate-50 font-medium cursor-pointer hover:bg-slate-100 transition-colors select-none"
            title="点击切换优先级"
        >
            普通
        </span>
    );
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
        {/* Title Area */}
        <div className="mb-2 min-h-[1.25rem]">
            {isEditingTitle ? (
                <textarea
                    ref={titleInputRef}
                    value={titleValue}
                    onChange={(e) => {
                        setTitleValue(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    onBlur={handleTitleSave}
                    onKeyDown={handleKeyDown}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full text-sm text-slate-700 font-medium leading-snug bg-blue-50 border border-blue-300 rounded p-1 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none overflow-hidden"
                    rows={1}
                />
            ) : (
                <div 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEditingTitle(true);
                    }}
                    className="text-sm text-slate-700 font-medium leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 hover:bg-slate-50 rounded -ml-1 pl-1 border border-transparent hover:border-slate-200"
                    title="点击编辑标题"
                >
                    {task.title}
                </div>
            )}
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
        <div className="flex items-center justify-between mt-1 h-5">
           {/* Date Picker Trigger */}
           <div 
                className="flex items-center gap-1 text-xs text-slate-500 font-medium hover:bg-slate-100 px-1 py-0.5 rounded -ml-1 transition-colors relative group/date"
                onClick={(e) => e.stopPropagation()}
           >
                <Clock size={12} className={task.dueDate ? "text-slate-400" : "text-slate-300"} />
                <span className={!task.dueDate ? 'text-slate-400' : (new Date(task.dueDate) < new Date() ? 'text-red-500' : '')}>
                    {task.dueDate || '无截止日期'}
                </span>
                {/* Invisible Date Input Overlay */}
                <input 
                    type="date"
                    value={task.dueDate}
                    onChange={handleDateChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    onClick={(e) => e.stopPropagation()}
                />
           </div>
           
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