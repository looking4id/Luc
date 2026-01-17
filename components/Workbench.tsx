
import React, { useEffect, useState } from 'react';
import { 
  LayoutGrid, Plus, RefreshCw, Maximize2, MoreHorizontal, 
  Code2, Star, CheckCircle2, Clock, Activity, Target, Layers, 
  Briefcase, Calendar, ChevronRight, BarChart2, XCircle
} from './Icons';
import { WorkbenchService } from '../services/api';
import { WorkbenchData, Project } from '../types';
import { StatusBadge } from './ProjectShared';

interface WorkbenchProps {
  onProjectSelect?: (project: Project) => void;
}

const WorkbenchHeader = ({ user, onAddClick }: { user: string; onAddClick: () => void }) => {
  return (
    <div className="flex items-center justify-between mb-8 flex-shrink-0">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">下午好，{user}</h2>
        <p className="text-sm text-slate-500">祝你今天工作愉快</p>
      </div>
      <button 
        onClick={onAddClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95"
      >
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
  count?: number;
  className?: string;
  onRemove?: () => void;
}> = ({ title, icon, children, count, className, onRemove }) => {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 ${className}`}>
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white flex-shrink-0">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
          <span className="text-blue-500">{icon}</span>
          <span>{title}</span>
          {count !== undefined && <span className="text-slate-400 font-medium text-xs ml-1">({count})</span>}
        </div>
        <div className="flex items-center gap-3 text-slate-300">
           <RefreshCw size={14} className="cursor-pointer hover:text-slate-600 transition-colors" />
           <Maximize2 size={14} className="cursor-pointer hover:text-slate-600 transition-colors" />
           <MoreHorizontal size={14} className="cursor-pointer hover:text-slate-600 transition-colors" />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-5 custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, icon: Icon }: any) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-5 hover:border-blue-300 transition-all group">
    <div className={`w-12 h-12 rounded-xl ${color} text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
      <Icon size={24} />
    </div>
    <div>
      <div className="text-2xl font-bold text-slate-800 leading-none mb-1.5">{value}</div>
      <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{label}</div>
    </div>
  </div>
);

export const Workbench: React.FC<WorkbenchProps> = ({ onProjectSelect }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WorkbenchData | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await WorkbenchService.getData('u1');
        if (response.code === 0) setData(response.data);
      } catch (error) {
        console.error("Failed to fetch workbench data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <RefreshCw size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/50 p-8 custom-scrollbar">
      <WorkbenchHeader user="lo" onAddClick={() => setIsAddModalOpen(true)} />
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="我的待办" value={data.stats.todo} color="bg-blue-500 shadow-blue-100" icon={Layers} />
          <StatCard label="本周完成" value={data.stats.done} color="bg-emerald-500 shadow-emerald-100" icon={CheckCircle2} />
          <StatCard label="已逾期" value={data.stats.overdue} color="bg-rose-500 shadow-rose-100" icon={Clock} />
          <StatCard label="效能指数" value={data.stats.efficiency} color="bg-indigo-500 shadow-indigo-100" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col */}
        <div className="lg:col-span-8 flex flex-col gap-8">
            <WidgetWrapper title="我的项目" icon={<LayoutGrid size={16} />} count={data.projects.length}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.projects.map(p => (
                        <div 
                            key={p.id} 
                            onClick={() => onProjectSelect && onProjectSelect(p)}
                            className="p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group relative"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors ${p.iconColor}`}>
                                        <Code2 size={20} />
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm group-hover:text-blue-600 transition-colors">{p.name}</span>
                                </div>
                                {p.isStar && <Star size={14} className="text-amber-400 fill-amber-400" />}
                            </div>
                            <div className="flex items-center justify-between text-sm font-bold text-slate-400 mt-2">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    {p.statusLabel}
                                </div>
                                <span className="uppercase tracking-tighter">{p.type}</span>
                            </div>
                        </div>
                    ))}
                    <div className="border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center p-4 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all gap-2 min-h-[100px]">
                        <Plus size={18} />
                        <span className="text-sm font-bold">创建新项目</span>
                    </div>
                </div>
            </WidgetWrapper>

            <WidgetWrapper title="我的待办事项" icon={<Target size={16} />} count={data.myTasks.length}>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100 text-sm font-bold text-slate-400 uppercase tracking-widest">
                            <th className="pb-3 px-2">事项标题</th>
                            <th className="pb-3 w-28">状态</th>
                            <th className="pb-3 w-24 text-right">截止日期</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {data.myTasks.map(task => (
                        <tr key={task.id} className="hover:bg-slate-50/50 group cursor-pointer transition-colors">
                            <td className="py-4 px-2">
                                <div className="flex flex-col gap-0.5">
                                    <div className="text-sm text-slate-700 font-bold group-hover:text-blue-600 transition-colors line-clamp-1">{task.title}</div>
                                    <div className="text-sm text-slate-400 font-mono tracking-tighter">{task.displayId}</div>
                                </div>
                            </td>
                            <td className="py-4">
                                <StatusBadge status="处理中" />
                            </td>
                            <td className="py-4 text-sm font-mono text-slate-400 text-right">
                                {task.dueDate}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </WidgetWrapper>
        </div>

        {/* Right Col */}
        <div className="lg:col-span-4 flex flex-col gap-8">
            <WidgetWrapper title="最近动态" icon={<Activity size={16} />}>
                <div className="space-y-6">
                    {data.activities.map(act => (
                        <div key={act.id} className="flex gap-4 relative">
                            <div className={`w-9 h-9 rounded-xl flex-shrink-0 ${act.user.avatarColor} text-white flex items-center justify-center text-sm font-bold shadow-sm`}>
                                {act.user.name.slice(0, 1)}
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <div className="text-sm text-slate-600 leading-relaxed">
                                    <span className="font-bold text-slate-800">{act.user.name}</span>
                                    <span className="mx-1 text-slate-400">{act.action}</span>
                                    <span className="font-bold text-blue-600 hover:underline cursor-pointer">{act.target}</span>
                                </div>
                                <div className="text-sm font-bold text-slate-300 uppercase tracking-wider">{act.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </WidgetWrapper>

            <WidgetWrapper title="日历日程" icon={<Calendar size={16} />}>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">2025年 8月</span>
                        <div className="flex gap-2">
                            <button className="p-1 hover:bg-slate-100 rounded transition-colors"><ChevronRight size={14} className="rotate-180 text-slate-400" /></button>
                            <button className="p-1 hover:bg-slate-100 rounded transition-colors"><ChevronRight size={14} className="text-slate-400" /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 text-center text-sm font-bold text-slate-300 mb-2 uppercase tracking-widest">
                        <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
                    </div>
                    <div className="grid grid-cols-7 text-center gap-y-4 text-sm font-bold text-slate-600">
                        <div className="text-slate-200">28</div><div className="text-slate-200">29</div><div className="text-slate-200">30</div>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(d => <div key={d}>{d}</div>)}
                        <div className="bg-blue-600 text-white rounded-lg w-7 h-7 mx-auto flex items-center justify-center shadow-lg shadow-blue-100">15</div>
                        {[16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map(d => <div key={d}>{d}</div>)}
                    </div>
                </div>
            </WidgetWrapper>
        </div>
      </div>
    </div>
  );
};
