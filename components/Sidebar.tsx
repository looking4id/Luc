
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
  Plus
} from './Icons';
import { SavedView } from '../types';

interface MainSidebarProps {
  activeItem: string;
  onSelectItem: (item: string) => void;
}

export const MainSidebar: React.FC<MainSidebarProps> = ({ activeItem, onSelectItem }) => {
  const menuItems = [
    { icon: LayoutGrid, label: '工作台' },
    { icon: BookOpen, label: '项目' },
    { icon: ClipboardList, label: '工作项' },
    { icon: Code2, label: '代码' },
    { icon: BookOpen, label: '知识库' },
    { icon: Share2, label: '内源' },
    { icon: Users, label: '成员' },
    { icon: BarChart2, label: '效能度量' },
    { icon: Settings, label: '设置' },
  ];

  return (
    <div className="w-16 bg-slate-50 border-r border-slate-200 flex flex-col items-center py-4 z-20 flex-shrink-0">
      <div className="mb-6">
        <GLogo />
      </div>
      <nav className="flex-1 flex flex-col gap-4 w-full">
        {menuItems.map((item, index) => {
          const isActive = activeItem === item.label;
          return (
            <div
              key={index}
              onClick={() => onSelectItem(item.label)}
              className={`flex flex-col items-center justify-center w-full py-2 cursor-pointer transition-colors group relative ${
                isActive ? 'text-red-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600 rounded-r-full" />
              )}
              <div className={`p-2 rounded-lg ${isActive ? 'bg-red-50' : 'group-hover:bg-slate-100'}`}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
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
    <div className="w-60 bg-gray-50/50 border-r border-slate-200 flex flex-col flex-shrink-0 h-full">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-2 font-semibold text-slate-700">
          <span>视图</span>
          <span className="text-red-500">📌</span>
        </div>
      </div>

      {/* Accordion Menu */}
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        {/* System Views */}
        <div className="mb-2">
            <div 
              className="px-4 py-2 flex items-center justify-between text-slate-500 hover:bg-slate-100 cursor-pointer text-sm select-none"
              onClick={() => setIsSystemOpen(!isSystemOpen)}
            >
                <span className="font-medium text-slate-600">系统视图</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isSystemOpen ? '' : '-rotate-90'}`} />
            </div>
            {isSystemOpen && (
              <div className="mt-1">
                  {systemViews.map(view => (
                    <div 
                      key={view}
                      onClick={() => onViewSelect(view)}
                      className={`px-8 py-2 text-sm cursor-pointer transition-colors border-r-2 ${
                        activeView === view 
                          ? 'text-red-600 bg-red-50 font-medium border-red-600' 
                          : 'text-slate-600 hover:bg-slate-100 border-transparent'
                      }`}
                    >
                      {view}
                    </div>
                  ))}
              </div>
            )}
        </div>

        {/* Individual Views */}
         <div className="mb-2">
            <div 
              className="px-4 py-2 flex items-center justify-between text-slate-500 hover:bg-slate-100 cursor-pointer text-sm group select-none"
              onClick={() => setIsPersonalOpen(!isPersonalOpen)}
            >
                <span className="font-medium text-slate-600">个人视图</span>
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
              <div className="mt-1">
                  {customViews.map(view => (
                    <div 
                      key={view.name}
                      onClick={() => onViewSelect(view.name)}
                      className={`px-8 py-2 text-sm cursor-pointer transition-colors border-r-2 ${
                        activeView === view.name
                          ? 'text-red-600 bg-red-50 font-medium border-red-600'
                          : 'text-slate-600 hover:bg-slate-100 border-transparent'
                      }`}
                    >
                      {view.name}
                    </div>
                  ))}
                  {customViews.length === 0 && (
                     <div className="px-8 py-1 text-xs text-slate-400 italic">暂无个人视图</div>
                  )}
              </div>
            )}
        </div>
        
         <div className="mb-2">
            <div 
              className="px-4 py-2 flex items-center justify-between text-slate-500 hover:bg-slate-100 cursor-pointer text-sm group select-none"
              onClick={() => setIsPublicOpen(!isPublicOpen)}
            >
                <span className="font-medium text-slate-600">公共视图</span>
                <div className="flex items-center gap-2">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ListFilter size={14} />
                        <Plus size={14} />
                    </div>
                     <ChevronDown size={14} className={`transition-transform duration-200 ${isPublicOpen ? '' : '-rotate-90'}`} />
                </div>
            </div>
             {isPublicOpen && (
               <div className="mt-1">
                  <div 
                    onClick={() => onViewSelect('区域内暂无视图')}
                    className={`px-8 py-2 text-sm cursor-pointer transition-colors border-r-2 ${
                      activeView === '区域内暂无视图'
                        ? 'text-red-600 bg-red-50 font-medium border-red-600'
                        : 'text-slate-600 hover:bg-slate-100 border-transparent'
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
