import React, { useState } from 'react';
import {
  LayoutGrid, ClipboardList, Code2, BookOpen, Users, BarChart2, Settings, 
  ChevronDown, GLogo, ListFilter, Plus, ChevronLeft, ChevronRight, Search,
  Briefcase
} from '../common/Icons';
import { SavedView } from '../../types';

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
    { icon: BarChart2, label: '效能度量' },
    { icon: Settings, label: '设置' },
  ];

  return (
    <div className={`${isExpanded ? 'w-60' : 'w-16'} bg-slate-900 border-r border-slate-800 flex flex-col py-6 z-20 flex-shrink-0 transition-all duration-300 relative`}>
      <button onClick={() => setIsExpanded(!isExpanded)} className="absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 shadow-sm z-50 cursor-pointer transition-all hover:scale-110 rounded-full">
        {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      <div className={`mb-10 px-6 ${isExpanded ? 'flex items-center gap-3' : 'flex justify-center'}`}>
        <div className="text-blue-500">
           <GLogo />
        </div>
        {isExpanded && <span className="text-white font-bold text-lg tracking-tight">LUK 协作</span>}
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item, index) => {
          const isActive = activeItem === item.label;
          return (
            <div
              key={index}
              onClick={() => onSelectItem(item.label)}
              className={`flex items-center cursor-pointer transition-all duration-200 rounded-lg ${isExpanded ? 'px-4 py-3 gap-3' : 'justify-center py-3'} ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
              title={!isExpanded ? item.label : ''}
            >
              <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              {isExpanded && <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>}
            </div>
          );
        })}
      </nav>
      
      <div className="px-6 mt-auto">
         {isExpanded && <div className="text-xs text-slate-600 font-medium">v2.4.0 Enterprise</div>}
      </div>
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
      <div className="h-14 flex items-center px-5 border-b border-slate-200 bg-white">
        <span className="font-semibold text-slate-700 text-sm">视图选择</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <div className="mb-6">
          <div className="px-5 py-2 flex items-center justify-between text-xs font-semibold text-slate-400 cursor-pointer hover:text-slate-600" onClick={() => setIsSystemOpen(!isSystemOpen)}>
            <span>系统视图</span>
            <ChevronDown size={14} className={`transition-transform ${isSystemOpen ? '' : '-rotate-90'}`} />
          </div>
          {isSystemOpen && (
            <div className="mt-1 space-y-0.5">
              {systemViews.map(view => (
                <div 
                    key={view} 
                    onClick={() => onViewSelect(view)} 
                    className={`px-5 py-2 text-sm cursor-pointer border-r-2 transition-all rounded ${
                        activeView === view 
                        ? 'text-blue-600 bg-white border-blue-600 font-medium' 
                        : 'text-slate-600 hover:bg-slate-100 border-transparent font-normal'
                    }`}
                >
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