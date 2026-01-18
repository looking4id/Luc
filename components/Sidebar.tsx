
import React, { useState } from 'react';
import {
  LayoutGrid, ClipboardList, Code2, BookOpen, Users, BarChart2, Settings, 
  ChevronDown, GLogo, ListFilter, Plus, ChevronLeft, ChevronRight, Search,
  Briefcase
} from './Icons';
import { SavedView } from '../types';

interface MainSidebarProps {
  activeItem: string;
  onSelectItem: (item: string) => void;
}

export const MainSidebar: React.FC<MainSidebarProps> = ({ activeItem, onSelectItem }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { icon: LayoutGrid, label: '工作台' },
    { icon: Briefcase, label: '项目' },
    { icon: ClipboardList, label: '工作项' },
    { icon: Code2, label: '代码' },
    { icon: BookOpen, label: '知识库' },
    { icon: Users, label: '成员' },
    { icon: BarChart2, label: '效能度量' },
    { icon: Settings, label: '设置' },
  ];

  return (
    <div className={`${isExpanded ? 'w-56' : 'w-16'} bg-[#0f172a] border-r border-slate-800 flex flex-col py-6 z-20 flex-shrink-0 transition-all duration-300 relative shadow-2xl`}>
      <button onClick={() => setIsExpanded(!isExpanded)} className="absolute -right-3 top-10 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-blue-600 shadow-sm z-50 cursor-pointer transition-all">
        {isExpanded ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
      </button>

      <div className={`mb-8 px-4 ${isExpanded ? 'flex items-center gap-3' : 'flex justify-center'}`}>
        <GLogo />
        {isExpanded && <span className="text-white font-bold text-sm tracking-tight truncate">G-Project</span>}
      </div>

      <nav className="flex-1 px-2.5 space-y-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item, index) => {
          const isActive = activeItem === item.label;
          return (
            <div
              key={index}
              onClick={() => onSelectItem(item.label)}
              className={`flex items-center cursor-pointer rounded-xl transition-all duration-300 ${isExpanded ? 'px-3 py-2.5 gap-3' : 'justify-center py-3.5'} ${isActive ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/25 scale-105' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'}`}
              title={!isExpanded ? item.label : ''}
            >
              <item.icon size={isExpanded ? 18 : 20} strokeWidth={isActive ? 2 : 1.5} />
              {isExpanded && <span className="text-sm font-bold tracking-wide">{item.label}</span>}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

interface SecondarySidebarProps {
  activeView: string;
  onViewSelect: (viewName: string) => void;
  customViews: SavedView[];
  onAddView: () => void;
}

export const SecondarySidebar: React.FC<SecondarySidebarProps> = ({ 
  activeView, onViewSelect, customViews, onAddView
}) => {
  const [isSystemOpen, setIsSystemOpen] = useState(true);
  const systemViews = ['全部工作项', '我负责的', '我创建的', '我参与的'];

  return (
    <div className="w-56 bg-slate-50 border-r border-slate-200 flex flex-col flex-shrink-0 h-full">
      <div className="h-14 flex items-center px-5 border-b border-slate-200 bg-white/80 backdrop-blur">
        <span className="font-bold text-slate-800 text-sm">视图选择</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <div className="mb-6">
          <div className="px-5 py-2 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-600" onClick={() => setIsSystemOpen(!isSystemOpen)}>
            <span>系统视图</span>
            <ChevronDown size={12} className={isSystemOpen ? 'opacity-40' : '-rotate-90 opacity-40'} />
          </div>
          {isSystemOpen && (
            <div className="mt-1">
              {systemViews.map(view => (
                <div key={view} onClick={() => onViewSelect(view)} className={`px-5 py-2.5 text-sm cursor-pointer border-r-4 transition-all ${activeView === view ? 'text-blue-600 bg-blue-50 border-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-100 border-transparent'}`}>
                  {view}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
