
import React from 'react';
import { Search, Bell, HelpCircle, Plus, AiIcon } from './Icons';
import { TaskType } from '../types';

interface TopHeaderProps {
  selectedType: TaskType | null;
  onTypeChange: (type: TaskType | null) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ selectedType, onTypeChange }) => {
  const tabs = [
    { label: '所有', value: null },
    { label: '需求', value: TaskType.Requirement },
    { label: '任务', value: TaskType.Task },
    { label: '缺陷', value: TaskType.Defect }
  ];

  return (
    <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm flex-shrink-0 z-10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-4">
        <div className="text-slate-800 font-bold text-sm flex items-center gap-2">
          <span>工作项</span>
        </div>
        <div className="flex space-x-6 text-sm font-medium text-slate-500 ml-6">
            {tabs.map(tab => (
              <button 
                key={tab.label}
                onClick={() => onTypeChange(tab.value)}
                className={`px-1 py-4 -mb-4 transition-colors ${
                    selectedType === tab.value 
                    ? 'text-red-600 border-b-2 border-red-600 font-medium' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
        </div>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-4">
         <div className="relative">
             <input 
                type="text" 
                placeholder="搜索..." 
                className="pl-3 pr-8 py-1.5 text-sm border border-slate-300 rounded-md bg-slate-50 w-48 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
             />
             <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-[12px] border border-slate-200 rounded px-1">/</span>
         </div>
         
         <div className="flex items-center gap-3 text-slate-500">
             <div className="relative cursor-pointer hover:text-slate-700">
                 <Bell size={20} />
                 <span className="absolute -top-1 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </div>
             <div className="cursor-pointer hover:scale-105 transition-transform">
                <AiIcon />
             </div>
             <div className="cursor-pointer hover:text-slate-700">
                 <HelpCircle size={20} />
             </div>
             <div className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-slate-400 text-slate-400">
                 <Plus size={18} />
             </div>
             <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center text-[12px] font-bold border-2 border-white shadow-sm cursor-pointer">
                 Lo
             </div>
         </div>
      </div>
    </div>
  );
};
