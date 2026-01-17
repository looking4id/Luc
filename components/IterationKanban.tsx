
import React from 'react';
import { MOCK_COLUMNS } from '../constants';
import { KanbanCard } from './KanbanCard';
import { Circle, Plus, MoreHorizontal } from './Icons';

export const IterationKanban = ({ sprintId }: { sprintId: string }) => {
  return (
    <div className="flex h-full gap-4 overflow-x-auto p-4 bg-slate-50/50 kanban-scroll">
      {MOCK_COLUMNS.slice(0, 3).map(column => (
        <div key={column.id} className="w-80 flex-shrink-0 flex flex-col h-full bg-slate-100/50 rounded-xl border border-slate-200/60">
          <div className="p-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Circle size={10} className={column.iconColor} fill="currentColor" />
              <span className="font-bold text-slate-700 text-sm">{column.title}</span>
              <span className="bg-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{column.tasks.length}</span>
            </div>
            <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={14} /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-2 custom-scrollbar">
            {column.tasks.map(task => (
              <KanbanCard key={task.id} task={task} onClick={() => {}} onUpdate={() => {}} />
            ))}
            <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-blue-500 hover:border-blue-200 hover:bg-white transition-all flex items-center justify-center gap-1 text-xs font-medium">
              <Plus size={14} /> 添加工作项
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
