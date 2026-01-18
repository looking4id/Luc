
import React from 'react';
import { 
  MoreHorizontal, Zap, Maximize2, Activity, Target, 
  CheckCircle2, Clock, AlertTriangle, TrendingUp, Flag, 
  Users, Layers, FileText, ChevronRight
} from './Icons';
import { Project } from '../types';
import { DonutChart, StatusBadge } from './ProjectShared';

interface ProjectOverviewProps {
  project: Project;
  onIterationClick?: () => void;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project, onIterationClick }) => {
  return (
    <div className="space-y-6">
      {/* 第一行：核心概览与健康度 */}
      <div className="grid grid-cols-12 gap-6">
        {/* 项目健康度 */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-emerald-500 rounded-full"></div>
                    项目健康度
                </h3>
                <MoreHorizontal size={18} className="text-slate-400 cursor-pointer" />
            </div>
            
            <div className="relative mb-6">
                <DonutChart percentage={85} color="#10b981" label="综合评分" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">风险项</div>
                    <div className="text-xl font-bold text-rose-500">2</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">延期率</div>
                    <div className="text-xl font-bold text-orange-500">4.5%</div>
                </div>
            </div>
        </div>

        {/* 报表分析 - 柱状图 */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div>
                    成员负载分析
                </h3>
                <div className="flex items-center gap-4 text-sm font-bold">
                    <span className="text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer">需求</span>
                    <span className="text-slate-400 hover:text-slate-600 cursor-pointer">缺陷</span>
                    <span className="text-slate-400 hover:text-slate-600 cursor-pointer">任务</span>
                </div>
            </div>
            
            <div className="h-56 flex items-end justify-around px-4 pb-4 relative">
                <div className="absolute inset-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none opacity-40">
                    {[20, 15, 10, 5, 0].map(v => (
                        <div key={v} className="border-b border-slate-100 w-full h-0 flex items-center">
                            <span className="text-xs text-slate-300 -ml-8">{v}</span>
                        </div>
                    ))}
                </div>

                {[
                    { user: '王亮', val: 18, color: 'bg-blue-500' },
                    { user: 'Dev 1', val: 12, color: 'bg-indigo-400' },
                    { user: '测试', val: 8, color: 'bg-cyan-400' },
                    { user: '产品', val: 5, color: 'bg-slate-400' },
                    { user: 'UI', val: 7, color: 'bg-purple-400' }
                ].map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 z-10 w-10 group">
                        <div className="w-full bg-slate-50 rounded-t-md h-44 relative overflow-hidden">
                            <div 
                                style={{ height: `${(d.val / 20) * 100}%` }} 
                                className={`absolute bottom-0 left-0 right-0 ${d.color} transition-all duration-1000 group-hover:brightness-110 shadow-sm`}
                            ></div>
                        </div>
                        <span className="text-xs font-bold text-slate-500">{d.user}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 第二行：交付进度与状态分布 */}
      <div className="grid grid-cols-12 gap-6">
        {/* 迭代看板预览 */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-orange-500 rounded-full"></div>
                    当前迭代
                </h3>
                <button onClick={onIterationClick} className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:underline">
                    查看全部迭代 <ChevronRight size={14} />
                </button>
            </div>
            <div className="p-6">
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-100">Sp</div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 mb-1">Sprint 1: 核心业务流程闭环</h4>
                                <div className="flex items-center gap-3">
                                    <StatusBadge status="进行中" />
                                    <span className="text-xs text-slate-400 font-mono">12.01 - 12.14</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="text-sm font-black text-slate-700">76%</div>
                             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">总体进度</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                         <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: '76%' }}></div>
                         </div>
                         <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                                {[1,2,3].map(i => (
                                    <div key={i} className={`w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold`}>{i}</div>
                                ))}
                            </div>
                            <div className="flex gap-6 text-xs font-bold text-slate-500">
                                <span>需求: 12/15</span>
                                <span>缺陷: 2/5</span>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 状态分布图 */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <div className="w-1.5 h-5 bg-purple-500 rounded-full"></div>
                工作项状态分布
            </h3>
            <div className="space-y-6 mt-10">
                <StatusRow label="已发布" count={42} color="bg-emerald-500" total={100} />
                <StatusRow label="测试中" count={28} color="bg-blue-500" total={100} />
                <StatusRow label="开发中" count={15} color="bg-indigo-400" total={100} />
                <StatusRow label="规划中" count={15} color="bg-slate-300" total={100} />
            </div>
        </div>
      </div>

      {/* 第三行：交付速度与里程碑 */}
      <div className="grid grid-cols-12 gap-6">
        {/* 团队交付速度 (SVG 线图) */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                    交付速度趋势
                </h3>
                <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                    <TrendingUp size={14} />
                    <span>提升 15%</span>
                </div>
            </div>
            
            <div className="h-48 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                    <path 
                        d="M0,150 Q100,120 200,140 T400,80 T600,100 T800,40" 
                        fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" 
                    />
                    <path 
                        d="M0,150 Q100,120 200,140 T400,80 T600,100 T800,40 V200 H0 Z" 
                        fill="url(#gradient)" opacity="0.1" 
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#fff" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                    <span>Iteration 1</span>
                    <span>Iteration 2</span>
                    <span>Iteration 3</span>
                    <span>Iteration 4</span>
                    <span>Iteration 5</span>
                    <span>Iteration 6</span>
                </div>
            </div>
        </div>

        {/* 里程碑路线图 */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <div className="w-1.5 h-5 bg-rose-500 rounded-full"></div>
                关键里程碑
            </h3>
            <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                <MilestoneItem label="项目启动会" date="2025.12.01" status="done" />
                <MilestoneItem label="核心功能内测" date="2025.12.15" status="active" />
                <MilestoneItem label="Beta 1.0 发布" date="2026.01.10" status="todo" />
                <MilestoneItem label="正式版上线" date="2026.02.01" status="todo" />
            </div>
        </div>
      </div>
    </div>
  );
};

const StatusRow = ({ label, count, color, total }: any) => (
    <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-slate-500">
            <span>{label}</span>
            <span>{count}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
                className={`h-full ${color} transition-all duration-1000 ease-out shadow-sm`} 
                style={{ width: `${count}%` }}
            ></div>
        </div>
    </div>
);

const MilestoneItem = ({ label, date, status }: any) => (
    <div className="flex items-center gap-6 pl-8 relative">
        <div className={`absolute left-0 w-5 h-5 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-transform hover:scale-125 ${
            status === 'done' ? 'bg-emerald-500' : status === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'
        }`}>
            {status === 'done' && <CheckCircle2 size={10} className="text-white" />}
        </div>
        <div className="flex-1 min-w-0">
            <div className={`text-sm font-bold truncate ${status === 'done' ? 'text-slate-400' : 'text-slate-700'}`}>{label}</div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">{date}</div>
        </div>
        <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
            status === 'done' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 
            status === 'active' ? 'text-blue-600 bg-blue-50 border-blue-100' : 
            'text-slate-400 bg-slate-50 border-slate-100'
        }`}>
            {status === 'done' ? '已达成' : status === 'active' ? '进行中' : '计划中'}
        </div>
    </div>
);
