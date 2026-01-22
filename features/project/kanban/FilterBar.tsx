
import React, { useState } from 'react';
import { Search, ChevronDown, ListFilter, ArrowUpDown, Plus, Calendar, XCircle, CheckCircle2, LayoutGrid, LayoutList, FolderTree } from '../../../components/common/Icons';
import { MOCK_USERS, MOCK_PROJECTS, MOCK_COLUMNS } from '../../../utils/constants';
import { TaskType, Priority, FilterState, ViewType } from '../../../types';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  viewType: ViewType;
  setViewType: (view: ViewType) => void;
  onTriggerCreate: (type: TaskType) => void;
  /* Add onSaveView optional property to match App.tsx usage */
  onSaveView?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, viewType, setViewType, onTriggerCreate }) => {
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isNewDropdownOpen, setIsNewDropdownOpen] = useState(false);
  
  // Local state for date inputs before applying
  const [tempDateRange, setTempDateRange] = useState<{start: string, end: string} | null>(null);

  const closeAllDropdowns = () => {
    setIsAssigneeOpen(false);
    setIsTypeOpen(false);
    setIsPriorityOpen(false);
    setIsDateOpen(false);
    setIsProjectOpen(false);
    setIsStatusOpen(false);
    setIsNewDropdownOpen(false);
  };

  const handleAssigneeSelect = (id: string) => {
    setFilters(prev => ({
        ...prev,
        assigneeId: prev.assigneeId === id ? null : id
    }));
    closeAllDropdowns();
  };

  const handleTypeSelect = (type: TaskType) => {
    setFilters(prev => ({
        ...prev,
        type: prev.type === type ? null : type
    }));
    closeAllDropdowns();
  };

  const handlePrioritySelect = (priority: Priority) => {
    setFilters(prev => ({
        ...prev,
        priority: prev.priority === priority ? null : priority
    }));
    closeAllDropdowns();
  };

  const handleProjectSelect = (projectId: string) => {
    setFilters(prev => ({
        ...prev,
        projectId: prev.projectId === projectId ? null : projectId
    }));
    closeAllDropdowns();
  };

  const handleStatusSelect = (statusTitle: string) => {
    setFilters(prev => ({
        ...prev,
        status: prev.status === statusTitle ? null : statusTitle
    }));
    closeAllDropdowns();
  };

  const handleDatePreset = (preset: 'today' | 'tomorrow' | 'thisWeek' | 'nextWeek') => {
      const today = new Date();
      const start = new Date();
      const end = new Date();
      
      if (preset === 'today') {
          // start/end already today
      } else if (preset === 'tomorrow') {
          start.setDate(today.getDate() + 1);
          end.setDate(today.getDate() + 1);
      } else if (preset === 'thisWeek') {
          const day = today.getDay(); // 0 is Sunday
          const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
          start.setDate(diff);
          end.setDate(start.getDate() + 6);
      } else if (preset === 'nextWeek') {
          const day = today.getDay();
          const diff = today.getDate() - day + (day === 0 ? -6 : 1) + 7;
          start.setDate(diff);
          end.setDate(start.getDate() + 6);
      }

      const formatDate = (d: Date) => d.toISOString().split('T')[0];
      const newRange = { start: formatDate(start), end: formatDate(end) };
      
      setTempDateRange(newRange);
      setFilters(prev => ({ ...prev, dateRange: newRange }));
      closeAllDropdowns();
  };

  const handleDateConfirm = () => {
    if (tempDateRange) {
        setFilters(prev => ({ ...prev, dateRange: tempDateRange }));
        closeAllDropdowns();
    }
  };

  const handleClearFilters = () => {
      setFilters({
          search: '',
          assigneeId: null,
          type: null,
          priority: null,
          dateRange: null,
          projectId: null,
          status: null,
          creatorId: null
      });
      setTempDateRange(null);
  };

  const selectedAssignee = MOCK_USERS.find(u => u.id === filters.assigneeId);
  const selectedProject = MOCK_PROJECTS.find(p => p.id === filters.projectId);
  
  const getDateLabel = () => {
      if (!filters.dateRange) return '截止日期';
      if (filters.dateRange.start === filters.dateRange.end) return filters.dateRange.start;
      return `${filters.dateRange.start} - ${filters.dateRange.end}`;
  };

  const hasActiveFilters = Boolean(
      filters.search || 
      filters.assigneeId || 
      filters.type || 
      filters.priority || 
      filters.dateRange || 
      filters.projectId || 
      filters.status ||
      filters.creatorId
  );

  const getNewButtonLabel = () => {
      return '新建';
  };

  return (
    <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between flex-shrink-0 relative z-20">
      <div className="flex items-center gap-2">
        <div className="relative">
          <input 
            type="text" 
            placeholder="输入关键词" 
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="pl-3 pr-8 py-1.5 text-sm border border-slate-300 rounded hover:border-slate-400 focus:outline-none focus:border-blue-500 w-40 transition-colors"
          />
          <Search size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        
        {/* Dropdowns */}
        <div className="flex gap-2">
            {/* Project Filter */}
            <div className="relative">
                <button 
                    onClick={() => { closeAllDropdowns(); setIsProjectOpen(!isProjectOpen); }}
                    className={`flex items-center gap-1 px-4 py-2 border border-dashed rounded text-sm transition-colors ${
                        filters.projectId ? 'bg-blue-50 text-blue-500 border-blue-200 font-medium' : 'bg-white border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400'
                    }`}
                >
                    <span>{selectedProject ? selectedProject.name : '项目'}</span>
                    <ChevronDown size={14} />
                </button>
                 {isProjectOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                        {MOCK_PROJECTS.map(project => (
                             <button
                                key={project.id}
                                onClick={() => handleProjectSelect(project.id)}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                            >
                                <span className="truncate">{project.name}</span>
                                {filters.projectId === project.id && <CheckCircle2 size={14} className="text-blue-500 flex-shrink-0" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Assignee Filter */}
            <div className="relative">
                <button 
                    onClick={() => { closeAllDropdowns(); setIsAssigneeOpen(!isAssigneeOpen); }}
                    className={`flex items-center gap-1 px-4 py-2 border border-dashed rounded text-sm transition-colors ${
                        filters.assigneeId ? 'bg-blue-50 text-blue-500 border-blue-200 font-medium' : 'bg-white border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400'
                    }`}
                >
                    <span>{selectedAssignee ? selectedAssignee.name : '负责人'}</span>
                    <ChevronDown size={14} />
                </button>
                {isAssigneeOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                        {MOCK_USERS.map(user => (
                            <button
                                key={user.id}
                                onClick={() => handleAssigneeSelect(user.id)}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                                <div className={`w-5 h-5 rounded-full ${user.avatarColor} text-white flex items-center justify-center text-[10px]`}>
                                    {user.name.slice(0, 1)}
                                </div>
                                <span className="flex-1">{user.name}</span>
                                {filters.assigneeId === user.id && <CheckCircle2 size={14} className="text-blue-500" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Type Filter */}
            <div className="relative">
                <button 
                    onClick={() => { closeAllDropdowns(); setIsTypeOpen(!isTypeOpen); }}
                    className={`flex items-center gap-1 px-4 py-2 border border-dashed rounded text-sm transition-colors ${
                        filters.type ? 'bg-blue-50 text-blue-500 border-blue-200 font-medium' : 'bg-white border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400'
                    }`}
                >
                    <span>{filters.type || '类型'}</span>
                    <ChevronDown size={14} />
                </button>
                {isTypeOpen && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                        {Object.values(TaskType).map(type => (
                             <button
                                key={type}
                                onClick={() => handleTypeSelect(type)}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                            >
                                <span>{type}</span>
                                {filters.type === type && <CheckCircle2 size={14} className="text-blue-500" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Priority Filter */}
            <div className="relative">
                <button 
                    onClick={() => { closeAllDropdowns(); setIsPriorityOpen(!isPriorityOpen); }}
                    className={`flex items-center gap-1 px-4 py-2 border border-dashed rounded text-sm transition-colors ${
                        filters.priority ? 'bg-blue-50 text-blue-500 border-blue-200 font-medium' : 'bg-white border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400'
                    }`}
                >
                    <span>{filters.priority || '优先级'}</span>
                    <ChevronDown size={14} />
                </button>
                {isPriorityOpen && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                        {Object.values(Priority).map(p => (
                             <button
                                key={p}
                                onClick={() => handlePrioritySelect(p)}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                            >
                                <span>{p}</span>
                                {filters.priority === p && <CheckCircle2 size={14} className="text-blue-500" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Date Filter */}
            <div className="relative">
                 <button 
                    onClick={() => { closeAllDropdowns(); setIsDateOpen(!isDateOpen); }}
                    className={`flex items-center gap-1 px-4 py-2 border border-dashed rounded text-sm transition-colors ${
                        filters.dateRange ? 'bg-blue-50 text-blue-500 border-blue-200 font-medium' : 'bg-white border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400'
                    }`}
                >
                    <Calendar size={14} />
                    <span>{getDateLabel()}</span>
                    <ChevronDown size={14} />
                </button>
                {isDateOpen && (
                     <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <button onClick={() => handleDatePreset('today')} className="px-3 py-2 text-sm text-slate-600 bg-slate-50 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 rounded border border-slate-200 transition-colors">今天截止</button>
                            <button onClick={() => handleDatePreset('tomorrow')} className="px-3 py-2 text-sm text-slate-600 bg-slate-50 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 rounded border border-slate-200 transition-colors">明天截止</button>
                            <button onClick={() => handleDatePreset('thisWeek')} className="px-3 py-2 text-sm text-slate-600 bg-slate-50 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 rounded border border-slate-200 transition-colors">本周</button>
                            <button onClick={() => handleDatePreset('nextWeek')} className="px-3 py-2 text-sm text-slate-600 bg-slate-50 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 rounded border border-slate-200 transition-colors">下周</button>
                        </div>
                        <div className="space-y-3 pt-3 border-t border-slate-100">
                             <div className="grid grid-cols-2 gap-2">
                                 <div>
                                     <label className="text-xs text-slate-400 mb-1 block">开始日期</label>
                                     <input 
                                        type="date" 
                                        className="w-full text-xs border border-slate-200 rounded px-2 py-1 focus:border-blue-400 outline-none"
                                        onChange={(e) => setTempDateRange(prev => ({ start: e.target.value, end: prev?.end || e.target.value }))}
                                     />
                                 </div>
                                 <div>
                                     <label className="text-xs text-slate-400 mb-1 block">结束日期</label>
                                     <input 
                                        type="date" 
                                        className="w-full text-xs border border-slate-200 rounded px-2 py-1 focus:border-blue-400 outline-none"
                                        onChange={(e) => setTempDateRange(prev => ({ start: prev?.start || e.target.value, end: e.target.value }))}
                                     />
                                 </div>
                             </div>
                             <div className="flex justify-end pt-2">
                                 <button 
                                    onClick={handleDateConfirm}
                                    disabled={!tempDateRange}
                                    className="px-4 py-2 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                 >
                                     应用筛选
                                 </button>
                             </div>
                        </div>
                     </div>
                )}
            </div>

            {/* Status Filter */}
            <div className="relative">
                <button 
                    onClick={() => { closeAllDropdowns(); setIsStatusOpen(!isStatusOpen); }}
                    className={`flex items-center gap-1 px-4 py-2 border border-dashed rounded text-sm transition-colors ${
                        filters.status ? 'bg-blue-50 text-blue-500 border-blue-200 font-medium' : 'bg-white border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400'
                    }`}
                >
                    <span>{filters.status || '状态'}</span>
                    <ChevronDown size={14} />
                </button>
                {isStatusOpen && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                        {MOCK_COLUMNS.map(col => (
                             <button
                                key={col.id}
                                onClick={() => handleStatusSelect(col.title)}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                            >
                                <span>{col.title}</span>
                                {filters.status === col.title && <CheckCircle2 size={14} className="text-blue-500" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

             {/* Clear Filters */}
             {hasActiveFilters && (
                <>
                    <div className="w-px h-6 bg-slate-200 mx-1"></div>
                    <button onClick={handleClearFilters} className="flex items-center gap-1 text-slate-500 hover:text-red-500 text-sm transition-colors px-4 py-2 rounded">
                        <XCircle size={14} />
                        <span>清除筛选</span>
                    </button>
                </>
             )}
        </div>
      </div>
      
      <div className="flex items-center gap-3 text-slate-400">
         <div className="flex items-center bg-slate-100 rounded p-0.5">
             <button 
                onClick={() => setViewType('kanban')}
                className={`p-1 rounded transition-colors ${viewType === 'kanban' ? 'bg-white text-blue-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                title="看板视图"
             >
                 <LayoutGrid size={16} />
             </button>
             <button 
                onClick={() => setViewType('list')}
                className={`p-1 rounded transition-colors ${viewType === 'list' ? 'bg-white text-blue-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                title="平铺列表"
             >
                 <LayoutList size={16} />
             </button>
             <button 
                onClick={() => setViewType('tree')}
                className={`p-1 rounded transition-colors ${viewType === 'tree' ? 'bg-white text-blue-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                title="树状列表"
             >
                 <FolderTree size={16} />
             </button>
         </div>
         
         <div className="w-px h-4 bg-slate-200"></div>
         <div className="px-2 py-1 hover:bg-slate-100 rounded cursor-pointer" title="排序">
             <ArrowUpDown size={16} />
         </div>
         
         {/* New Button with Dropdown */}
         <div className="relative">
             <button 
                onClick={() => { closeAllDropdowns(); setIsNewDropdownOpen(!isNewDropdownOpen); }}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded flex items-center gap-1 transition-colors shadow-sm"
             >
                 <Plus size={16} />
                 <span>{getNewButtonLabel()}</span>
                 <ChevronDown size={14} className={`ml-1 transition-transform ${isNewDropdownOpen ? '-rotate-180' : ''}`} />
             </button>
             {isNewDropdownOpen && (
                 <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                     <button
                        onClick={() => { onTriggerCreate(TaskType.Requirement); setIsNewDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                     >
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        新建需求
                     </button>
                     <button
                        onClick={() => { onTriggerCreate(TaskType.Task); setIsNewDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                     >
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        新建任务
                     </button>
                     <button
                        onClick={() => { onTriggerCreate(TaskType.Defect); setIsNewDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                     >
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        新建缺陷
                     </button>
                 </div>
             )}
         </div>

         <button className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm px-4 py-2 rounded transition-colors shadow-sm flex items-center gap-2">
             里程碑
         </button>
      </div>
    </div>
  );
};
