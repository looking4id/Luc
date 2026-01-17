import React, { useState } from 'react';
import {
  LayoutGrid,
  ClipboardList,
  Code2,
  BookOpen,
  Share2,
  Users,
  BarChart2,
  Settings,
  ChevronDown,
  GLogo,
  ListFilter,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search
} from './Icons';
import { SavedView } from '../types';

interface MainSidebarProps {
  activeItem: string;
  onSelectItem: (item: string) => void;
}

export const MainSidebar: React.FC<MainSidebarProps> = ({ activeItem, onSelectItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { icon: LayoutGrid, label: '工作台' },
    { icon: BookOpen, label: '项目' },
    { icon: ClipboardList, label: '工作项' },
    { icon: Code2, label: '代码' },
    { icon: BookOpen, label: '知识库' },
    { icon: Users, label: '成员' },
    { icon: BarChart2, label: '效能度量' },
    { icon: Settings, label: '设置' },
  ];

  return (
    <div 
      className={`${
        isExpanded ? 'w-60 items-start' : 'w-16 items-center'
      } bg-[#0f172a] border-r border-[#1e293b] flex flex-col py-5 z-20 flex-shrink-0 shadow-xl transition-all duration-300 relative`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-12 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-blue-600 shadow-sm z-50 cursor-pointer hover:shadow-md transition-all"
        title={isExpanded ? "收起菜单" : "展开菜单"}
      >
        {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Logo */}
      <div className={`mb-6 px-4 flex items-center ${isExpanded ? 'justify-start gap-3 w-full' : 'justify-center'}`}>
        <GLogo />
        {isExpanded && (
           <span className="text-white font-bold text-lg tracking-tight animate-in fade-in duration-200 whitespace-nowrap overflow-hidden">
               G-Project
           </span>
        )}
      </div>

      {/* Search (Expanded Only) */}
      {isExpanded && (
          <div className="px-3 mb-4 w-full animate-in fade-in slide-in-from-left-2 duration-200">
              <div className="bg-slate-800/50 border border-slate-700 rounded-md flex items-center px-2 py-1.5 text-slate-400 focus-within:border-blue-500 focus-within:bg-slate-800 transition-colors">
                  <Search size={14} />
                  <input 
                      type="text" 
                      placeholder="搜索..." 
                      className="bg-transparent border-none outline-none text-xs ml-2 text-slate-200 w-full placeholder:text-slate-500"
                  />
              </div>
          </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1 w-full px-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
        {menuItems.map((item, index) => {
          const isActive = activeItem === item.label;
          return (
            <div
              key={index}
              onClick={() => onSelectItem(item.label)}
              className={`
                 flex items-center cursor-pointer group rounded-lg transition-all duration-200
                 ${isExpanded ? 'px-3 py-2.5 gap-3 w-full' : 'flex-col justify-center py-2.5 px-0 w-full'}
                 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
              `}
              title={!isExpanded ? item.label : ''}
            >
              <div className={isExpanded ? '' : 'p-0.5'}>
                 <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isExpanded ? '' : 'mb-1'} />
              </div>
              
              {isExpanded ? (
                  <span className={`text-sm font-medium whitespace-nowrap ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {item.label}
                  </span>
              ) : (
                  <span className={`text-[10px] font-medium scale-90 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-400'}`}>
                      {item.label}
                  </span>
              )}
            </div>
          );
        })}

        {/* Recent Spaces (Expanded Only) */}
        {isExpanded && (
            <div className="mt-6 px-3 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100 border-t border-slate-800/50 pt-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">
                    <span>最近访问空间</span>
                    <Plus size={12} className="cursor-pointer hover:text-slate-300" />
                </div>
                <div className="space-y-1">
                    {['信贷系统', 'CICD', 'DevOps'].map(space => (
                        <div key={space} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer text-sm transition-colors">
                            <div className={`w-2 h-2 rounded ${space === '信贷系统' ? 'bg-yellow-500' : space === 'CICD' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                            <span>{space}</span>
                        </div>
                    ))}
                     <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-300 cursor-pointer text-sm transition-colors">
                        <ChevronRight size={14} />
                        <span>我参与的</span>
                    </div>
                </div>
            </div>
        )}
      </nav>
      
      {/* Footer */}
      <div className={`mt-auto mb-4 w-full px-3 ${isExpanded ? '' : 'flex justify-center'}`}>
         {isExpanded ? (
             <div className="flex items-center gap-3 px-2 py-2 rounded hover:bg-slate-800 cursor-pointer text-slate-400 hover:text-slate-200 transition-colors">
                 <Settings size={18} />
                 <span className="text-sm">公司管理</span>
             </div>
         ) : (
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 text-xs hover:bg-slate-700 cursor-pointer transition-colors" title="设置">
                <Settings size={18} />
            </div>
         )}
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
  activeView, 
  onViewSelect,
  customViews,
  onAddView
}) => {
  const [isSystemOpen, setIsSystemOpen] = useState(true);
  const [isPersonalOpen, setIsPersonalOpen] = useState(true);
  const [isPublicOpen, setIsPublicOpen] = useState(true);

  const systemViews = [
    '全部工作项',
    '我负责的',
    '我创建的',
    '我参与的',
    '父级工作项'
  ];

  return (
    <div className="w-60 bg-[#f8fafc] border-r border-slate-200 flex flex-col flex-shrink-0 h-full">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-100 flex-shrink-0 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 font-semibold text-slate-700">
          <span>视图</span>
          <span className="text-blue-500 text-xs bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">Pin</span>
        </div>
      </div>

      {/* Accordion Menu */}
      <div className="flex-1 overflow-y-auto py-3 custom-scrollbar">
        {/* System Views */}
        <div className="mb-4">
            <div 
              className="px-4 py-1.5 flex items-center justify-between text-slate-500 hover:text-slate-800 cursor-pointer text-sm select-none transition-colors"
              onClick={() => setIsSystemOpen(!isSystemOpen)}
            >
                <span className="font-bold text-xs uppercase tracking-wider text-slate-400">系统视图</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isSystemOpen ? '' : '-rotate-90'}`} />
            </div>
            {isSystemOpen && (
              <div className="mt-1 space-y-0.5">
                  {systemViews.map(view => (
                    <div 
                      key={view}
                      onClick={() => onViewSelect(view)}
                      className={`px-6 py-2 text-sm cursor-pointer transition-all border-l-[3px] ${
                        activeView === view 
                          ? 'text-blue-700 bg-blue-50/80 font-medium border-blue-600' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-transparent'
                      }`}
                    >
                      {view}
                    </div>
                  ))}
              </div>
            )}
        </div>

        {/* Individual Views */}
         <div className="mb-4">
            <div 
              className="px-4 py-1.5 flex items-center justify-between text-slate-500 hover:text-slate-800 cursor-pointer text-sm group select-none transition-colors"
              onClick={() => setIsPersonalOpen(!isPersonalOpen)}
            >
                <span className="font-bold text-xs uppercase tracking-wider text-slate-400">个人视图</span>
                <div className="flex items-center gap-2">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ListFilter size={14} />
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddView();
                          }}
                          className="hover:text-blue-600 hover:bg-blue-100 rounded"
                          title="新增视图"
                        >
                          <Plus size={14} />
                        </div>
                    </div>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isPersonalOpen ? '' : '-rotate-90'}`} />
                </div>
            </div>
            {isPersonalOpen && (
              <div className="mt-1 space-y-0.5">
                  {customViews.map(view => (
                    <div 
                      key={view.name}
                      onClick={() => onViewSelect(view.name)}
                      className={`px-6 py-2 text-sm cursor-pointer transition-all border-l-[3px] ${
                        activeView === view.name
                          ? 'text-blue-700 bg-blue-50/80 font-medium border-blue-600'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-transparent'
                      }`}
                    >
                      {view.name}
                    </div>
                  ))}
                  {customViews.length === 0 && (
                     <div className="px-6 py-1 text-xs text-slate-400 italic">暂无个人视图</div>
                  )}
              </div>
            )}
        </div>
        
         <div className="mb-4">
            <div 
              className="px-4 py-1.5 flex items-center justify-between text-slate-500 hover:text-slate-800 cursor-pointer text-sm group select-none transition-colors"
              onClick={() => setIsPublicOpen(!isPublicOpen)}
            >
                <span className="font-bold text-xs uppercase tracking-wider text-slate-400">公共视图</span>
                <div className="flex items-center gap-2">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ListFilter size={14} />
                        <Plus size={14} />
                    </div>
                     <ChevronDown size={14} className={`transition-transform duration-200 ${isPublicOpen ? '' : '-rotate-90'}`} />
                </div>
            </div>
             {isPublicOpen && (
               <div className="mt-1 space-y-0.5">
                  <div 
                    onClick={() => onViewSelect('区域内暂无视图')}
                    className={`px-6 py-2 text-sm cursor-pointer transition-all border-l-[3px] ${
                      activeView === '区域内暂无视图'
                        ? 'text-blue-700 bg-blue-50/80 font-medium border-blue-600'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-transparent'
                    }`}
                  >
                    区域内暂无视图
                  </div>
              </div>
             )}
        </div>
      </div>
    </div>
  );
};
