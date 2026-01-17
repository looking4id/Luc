
import React, { useEffect, useState } from 'react';
import { 
  LayoutGrid, Plus, RefreshCw, Maximize2, MoreHorizontal, 
  Code2, Star, CheckCircle2, Clock, Activity, Target, Layers, 
  Briefcase, Calendar, ChevronRight, BarChart2, XCircle
} from './Icons';
import { WorkbenchService } from '../services/api';
import { WorkbenchData, Task, Project } from '../types';

interface WorkbenchProps {
  onProjectSelect?: (project: Project) => void;
}

const WorkbenchHeader = ({ user, onAddClick }: { user: string; onAddClick: () => void }) => {
  return (
    <div className="flex items-center justify-between mb-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold text-slate-800">晚上好，{user}!</div>
        <div className="text-sm text-slate-500">祝你今天工作愉快</div>
      </div>
      <button 
        onClick={onAddClick}
        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white border border-blue-600 rounded text-sm hover:bg-blue-700 shadow-sm transition-colors"
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
  headerAction?: React.ReactNode;
  count?: number;
  className?: string;
  onRemove?: () => void;
}> = ({ title, icon, children, headerAction, count, className, onRemove }) => {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow ${className}`}>
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white flex-shrink-0">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
          {icon}
          <span>{title}</span>
          {count !== undefined && <span className="text-slate-400 font-normal ml-1">({count})</span>}
        </div>
        <div className="flex items-center gap-2 text-slate-400">
           {headerAction}
           <RefreshCw size={14} className="cursor-pointer hover:text-slate-600" />
           <Maximize2 size={14} className="cursor-pointer hover:text-slate-600" />
           {onRemove ? (
             <XCircle size={14} className="cursor-pointer hover:text-red-600" onClick={onRemove} title="移除组件" />
           ) : (
             <MoreHorizontal size={14} className="cursor-pointer hover:text-slate-600" />
           )}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, icon: Icon }: any) => (
  <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex items-center gap-4">
    <div className={`w-10 h-10 rounded-full ${color} text-white flex items-center justify-center`}>
      <Icon size={20} />
    </div>
    <div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  </div>
);

const AddWidgetModal = ({ 
  isOpen, 
  onClose, 
  widgets, 
  visibleWidgets, 
  onToggle 
}: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-in fade-in">
        <div className="bg-white rounded-lg shadow-xl w-[400px] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">添加/管理组件</h3>
                <button onClick={onClose}><XCircle size={20} className="text-slate-400 hover:text-slate-600" /></button>
            </div>
            <div className="p-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {widgets.map((w: any) => (
                    <div 
                        key={w.id} 
                        onClick={() => onToggle(w.id)}
                        className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer group transition-colors m-1"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 text-slate-500 rounded group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm transition-all">
                                <w.icon size={18} />
                            </div>
                            <span className="text-sm font-medium text-slate-700">{w.title}</span>
                        </div>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${visibleWidgets[w.id] ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                            {visibleWidgets[w.id] && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                    </div>
                ))}
            </div>
             <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <button onClick={onClose} className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm">
                    完成
                </button>
            </div>
        </div>
    </div>
  );
};

const PerformanceChart = () => (
    <div className="h-full w-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
             <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                     <span className="text-xs text-slate-500">完成率</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                     <span className="text-xs text-slate-500">目标值</span>
                 </div>
             </div>
             <select className="text-xs border border-slate-200 rounded px-2 py-1 outline-none">
                 <option>最近30天</option>
                 <option>最近7天</option>
             </select>
        </div>
        <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2">
            {[45, 60, 75, 50, 80, 95, 70, 65, 85, 90, 60, 75].map((h, i) => (
                <div key={i} className="w-full h-full bg-slate-100 rounded-t relative group overflow-hidden">
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t transition-all duration-1000 ease-out group-hover:bg-blue-600"
                        style={{ height: `${h}%` }}
                    ></div>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {h}%
                    </div>
                </div>
            ))}
        </div>
        <div className="flex justify-between px-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
            <span>1月</span>
            <span>2月</span>
            <span>3月</span>
            <span>4月</span>
            <span>5月</span>
            <span>6月</span>
            <span>7月</span>
            <span>8月</span>
            <span>9月</span>
            <span>10月</span>
            <span>11月</span>
            <span>12月</span>
        </div>
    </div>
);

const WIDGET_REGISTRY = [
    { id: 'projects', title: '我的项目', column: 'left', icon: LayoutGrid },
    { id: 'tasks', title: '我的工作项', column: 'left', icon: Target },
    { id: 'performance', title: '效能趋势', column: 'left', icon: BarChart2 },
    { id: 'activities', title: '动态', column: 'right', icon: Activity },
    { id: 'calendar', title: '日历', column: 'right', icon: Calendar },
];

export const Workbench: React.FC<WorkbenchProps> = ({ onProjectSelect }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WorkbenchData | null>(null);
  
  const [visibleWidgets, setVisibleWidgets] = useState<Record<string, boolean>>({
      'stats': true,
      'projects': true,
      'tasks': true,
      'activities': true,
      'calendar': true,
      'performance': false 
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await WorkbenchService.getData('u1');
        if (response.code === 0) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch workbench data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleWidget = (id: string) => {
      setVisibleWidgets(prev => ({
          ...prev,
          [id]: !prev[id]
      }));
  };

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <RefreshCw size={32} className="animate-spin text-blue-500" />
          <span className="text-slate-500 text-sm">加载工作台数据...</span>
        </div>
      </div>
    );
  }

  const renderWidget = (id: string) => {
      const commonProps = {
          onRemove: () => toggleWidget(id)
      };

      switch (id) {
          case 'projects':
              return (
                <WidgetWrapper key={id} title="我的项目" icon={<LayoutGrid size={16} />} count={data.projects.length} className="h-[340px]" {...commonProps}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {data.projects.map(p => (
                        <div 
                            key={p.id} 
                            onClick={() => onProjectSelect && onProjectSelect(p)}
                            className="p-3 bg-slate-50 rounded border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group relative"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded bg-white border border-slate-100 ${p.iconColor}`}>
                                    <Code2 size={16} />
                                </div>
                                <span className="font-semibold text-slate-700 text-sm">{p.name}</span>
                                </div>
                                {p.isStar && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                            </div>
                            <div className="flex items-center justify-between text-xs text-slate-500 mt-3">
                                <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                {p.statusLabel}
                                </div>
                                <span>{p.type}</span>
                            </div>
                        </div>
                        ))}
                        <div className="border border-dashed border-slate-300 rounded flex items-center justify-center p-3 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors gap-1 min-h-[90px]">
                        <Plus size={16} />
                        <span className="text-sm font-medium">创建新项目</span>
                        </div>
                    </div>
                </WidgetWrapper>
              );
          case 'tasks':
              return (
                <WidgetWrapper key={id} title="我的工作项" icon={<Target size={16} />} count={data.myTasks.length} className="flex-1 min-h-[400px]" {...commonProps}>
                    <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100 text-xs text-slate-400">
                        <th className="py-2 font-medium">标题</th>
                        <th className="py-2 font-medium w-24">状态</th>
                        <th className="py-2 font-medium w-24">优先级</th>
                        <th className="py-2 font-medium w-32">截止日期</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.myTasks.map(task => (
                        <tr key={task.id} className="border-b border-slate-50 hover:bg-slate-50 group cursor-pointer">
                            <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                                <div className={`w-1 h-8 rounded-full ${task.statusColor}`}></div>
                                <div>
                                    <div className="text-sm text-slate-700 font-medium group-hover:text-blue-600 line-clamp-1">{task.title}</div>
                                    <div className="text-[10px] text-slate-400 font-mono">{task.displayId}</div>
                                </div>
                            </div>
                            </td>
                            <td className="py-3 text-xs">
                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded">处理中</span>
                            </td>
                            <td className="py-3">
                                <span className={`text-xs px-2 py-1 rounded ${
                                    task.priority === 'Urgent' ? 'bg-red-50 text-red-600' : 
                                    task.priority === 'High' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-600'
                                }`}>
                                {task.priority}
                                </span>
                            </td>
                            <td className="py-3 text-xs text-slate-500">
                                {task.dueDate}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                    {data.myTasks.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <Briefcase size={32} className="mb-2 opacity-50" />
                        <span className="text-sm">暂无待办任务</span>
                    </div>
                    )}
                </WidgetWrapper>
              );
          case 'performance':
              return (
                  <WidgetWrapper key={id} title="效能趋势" icon={<BarChart2 size={16} />} className="h-[300px]" {...commonProps}>
                      <PerformanceChart />
                  </WidgetWrapper>
              );
          case 'activities':
              return (
                <WidgetWrapper key={id} title="动态" icon={<Activity size={16} />} className="h-[400px]" {...commonProps}>
                    <div className="space-y-4">
                    {data.activities.map(act => (
                        <div key={act.id} className="flex gap-3 relative pb-4 border-l border-slate-100 pl-4 last:border-0">
                        <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-200 ring-4 ring-white"></div>
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 ${act.user.avatarColor} text-white flex items-center justify-center text-xs font-bold`}>
                            {act.user.name.slice(0, 1)}
                        </div>
                        <div>
                            <div className="text-sm text-slate-700">
                                <span className="font-semibold">{act.user.name}</span>
                                <span className="mx-1 text-slate-500">{act.action}</span>
                                <span className="text-blue-600 hover:underline cursor-pointer">{act.target}</span>
                            </div>
                            <div className="text-xs text-slate-400 mt-1">{act.time}</div>
                        </div>
                        </div>
                    ))}
                    </div>
                </WidgetWrapper>
              );
          case 'calendar':
              return (
                <WidgetWrapper key={id} title="日历" icon={<Calendar size={16} />} className="h-[400px]" {...commonProps}>
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-slate-700">2025年 8月</span>
                        <div className="flex gap-1 text-slate-400">
                            <ChevronRight className="rotate-180 cursor-pointer hover:text-slate-600" size={16} />
                            <ChevronRight className="cursor-pointer hover:text-slate-600" size={16} />
                        </div>
                        </div>
                        <div className="grid grid-cols-7 text-center text-xs text-slate-400 mb-2">
                        <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
                        </div>
                        <div className="grid grid-cols-7 text-center gap-y-4 text-sm text-slate-600">
                        <div className="text-slate-300">28</div><div className="text-slate-300">29</div><div className="text-slate-300">30</div>
                        <div>1</div><div>2</div><div>3</div><div>4</div>
                        <div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div>
                        <div>12</div><div>13</div><div>14</div><div className="bg-blue-600 text-white rounded-full w-6 h-6 mx-auto flex items-center justify-center">15</div><div>16</div><div>17</div><div>18</div>
                        <div>19</div><div>20</div><div>21</div><div>22</div><div>23</div><div>24</div><div>25</div>
                        </div>
                        
                        <div className="mt-6 border-t border-slate-100 pt-4">
                            <div className="text-xs font-semibold text-slate-500 mb-2">今日日程</div>
                            <div className="bg-blue-50 border-l-2 border-blue-500 p-2 text-xs text-blue-700 mb-2 rounded-r">
                            09:00 晨会
                            </div>
                            <div className="bg-orange-50 border-l-2 border-orange-500 p-2 text-xs text-orange-700 rounded-r">
                            14:00 需求评审
                            </div>
                        </div>
                    </div>
                </WidgetWrapper>
              );
          default:
              return null;
      }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 custom-scrollbar">
      <WorkbenchHeader user="lo" onAddClick={() => setIsAddModalOpen(true)} />
      
      {/* Stats Row */}
      {visibleWidgets.stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 relative group">
            <StatCard label="我的待办" value={data.stats.todo} color="bg-blue-500" icon={Layers} />
            <StatCard label="本周已完成" value={data.stats.done} color="bg-green-500" icon={CheckCircle2} />
            <StatCard label="已逾期" value={data.stats.overdue} color="bg-red-500" icon={Clock} />
            <StatCard label="效能指数" value={data.stats.efficiency} color="bg-purple-500" icon={Activity} />
            {/* Optional remove for stats? Keeping it simple for now */}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Projects & Tasks & Performance) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
            {WIDGET_REGISTRY.filter(w => w.column === 'left' && visibleWidgets[w.id]).map(w => renderWidget(w.id))}
        </div>

        {/* Right Column (Activity & Calendar) */}
        <div className="flex flex-col gap-6">
            {WIDGET_REGISTRY.filter(w => w.column === 'right' && visibleWidgets[w.id]).map(w => renderWidget(w.id))}
        </div>
      </div>

      <AddWidgetModal 
         isOpen={isAddModalOpen} 
         onClose={() => setIsAddModalOpen(false)}
         widgets={WIDGET_REGISTRY}
         visibleWidgets={visibleWidgets}
         onToggle={toggleWidget}
      />
    </div>
  );
};
