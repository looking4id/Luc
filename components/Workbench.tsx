
import React from 'react';
import { 
  Sun, Plus, RefreshCw, Maximize2, MoreHorizontal, ChevronRight, ChevronDown, 
  Search, Box, Users, Code2, ClipboardList, Star, GitPullRequest, LayoutGrid, 
  FileEdit, FileText, Target, Layers, Activity, HelpCircle, Bell, AiIcon
} from './Icons';
import { MOCK_PROJECTS, MOCK_USERS } from '../constants';
import { TaskType, Priority } from '../types';

const WorkbenchHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold text-slate-800">晚上好，looking4id!</div>
      </div>
      <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-300 rounded text-sm text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
        <Plus size={16} />
        <span>添加组件</span>
      </button>
    </div>
  );
};

const WidgetWrapper: React.FC<{ 
  title: string; 
  icon?: React.ReactNode; 
  children: React.ReactNode; 
  headerAction?: React.ReactNode;
  count?: number;
}> = ({ title, icon, children, headerAction, count }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
          {icon}
          <span>{title}</span>
          {count !== undefined && <span className="text-slate-400 font-normal ml-1">({count})</span>}
        </div>
        <div className="flex items-center gap-2 text-slate-400">
           {headerAction}
           <RefreshCw size={14} className="cursor-pointer hover:text-slate-600" />
           <Maximize2 size={14} className="cursor-pointer hover:text-slate-600" />
           <MoreHorizontal size={14} className="cursor-pointer hover:text-slate-600" />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
};

// --- Widgets ---

const MyProjectsWidget = () => {
  return (
    <WidgetWrapper title="我的项目" icon={<LayoutGrid size={16} />} count={MOCK_PROJECTS.length}>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MOCK_PROJECTS.map(p => (
            <div key={p.id} className="p-3 bg-slate-50 rounded border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group">
               <div className="flex justify-between items-start mb-2">
                  <div className="