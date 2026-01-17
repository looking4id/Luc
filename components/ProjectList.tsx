
import React from 'react';
import { 
  Search, Bell, HelpCircle, Plus, AiIcon, LayoutGrid, Filter, 
  ArrowUpDown, MoreHorizontal, ChevronDown, Code2, Users, Star
} from './Icons';
import { MOCK_PROJECTS } from '../constants';
import { Project } from '../types';

interface ProjectListProps {
  onProjectClick?: (project: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ onProjectClick }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50/30 flex-1 overflow-hidden">
      {/* Top Header */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-10">
        <h1 className="text-lg font-bold text-slate-800">项目中心</h1>

        <div className="flex items-center gap-4">
           <div className="relative group">
               <input 
                  type="text" 
                  placeholder="全局搜索..." 
                  className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg bg-slate-50 w-56 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none"
               />
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
           </div>
           
           <div className="flex items-center gap-4 border-l border-slate-100 pl-4">
               <AiIcon />
               <Bell size={18} className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
               <HelpCircle size={18} className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
               <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-blue-100 cursor-pointer">
                   Lo
               </div>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8 custom-scrollbar">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-baseline gap-3">
               <h2 className="text-2xl font-bold text-slate-800 tracking-tight">全部项目</h2>
               <span className="text-sm font-medium text-slate-400">({MOCK_PROJECTS.length})</span>
            </div>
            <div className="flex items-center gap-3">
               <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-bold shadow-sm transition-all">
                  项目拓扑
               </button>
               <button className="px-5 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 shadow-lg shadow-rose-100 flex items-center gap-2 transition-all active:scale-95">
                  <Plus size={16} />
                  新建项目
               </button>
            </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between mb-6 shadow-sm">
             <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
                     <span>开始</span>
                     <ChevronDown size={14} className="text-slate-300" />
                 </button>
                 <div className="relative">
                     <input 
                        type="text" 
                        placeholder="输入项目名或关键字" 
                        className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg w-64 outline-none focus:border-blue-400 transition-all"
                     />
                     <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 </div>
                 <button className="text-sm font-bold text-slate-400 hover:text-blue-600 px-2">清空</button>
             </div>

             <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5 text-sm font-bold text-slate-500 cursor-pointer hover:text-slate-800">
                     <Filter size={14} />
                     <span>筛选</span>
                 </div>
                 <ArrowUpDown size={14} className="text-slate-300 cursor-pointer hover:text-slate-800" />
                 <LayoutGrid size={14} className="text-slate-300 cursor-pointer hover:text-slate-800" />
             </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
             <table className="w-full text-left">
                 <thead>
                     <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-400 text-sm font-bold uppercase tracking-widest">
                         <th className="py-4 px-6 w-4"></th>
                         <th className="py-4 px-4 w-28">编号</th>
                         <th className="py-4 px-4">项目名称</th>
                         <th className="py-4 px-4 w-40 text-center">活跃度</th>
                         <th className="py-4 px-4 w-28">状态</th>
                         <th className="py-4 px-4 w-28">负责人</th>
                         <th className="py-4 px-4 w-20 text-center">成员</th>
                         <th className="py-4 px-6 text-right">操作</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 text-sm">
                     {MOCK_PROJECTS.map((project) => (
                         <tr 
                             key={project.id} 
                             className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                             onClick={() => onProjectClick && onProjectClick(project)}
                         >
                             <td className="py-5 px-6">
                                 <div className={`w-1 h-10 rounded-full ${project.id === 'p1' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                             </td>
                             <td className="py-5 px-4 font-mono text-slate-400 font-bold">{project.code}</td>
                             <td className="py-5 px-4">
                                 <div className="flex items-center gap-3">
                                     <div className={`p-2 rounded-xl bg-slate-50 group-hover:bg-white transition-colors shadow-sm ${project.iconColor}`}>
                                        <Code2 size={20} />
                                     </div>
                                     <div className="flex flex-col">
                                         <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{project.name}</span>
                                         <span className="text-[11px] font-medium text-slate-400 uppercase tracking-tighter mt-0.5">{project.type}</span>
                                     </div>
                                     {project.isStar && <Star size={14} className="text-amber-400 fill-amber-400" />}
                                 </div>
                             </td>
                             <td className="py-5 px-4">
                                 <svg width="100" height="24" className="mx-auto overflow-visible">
                                     <polyline 
                                        fill="none" 
                                        stroke="#3b82f6" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        points={project.activityTrend.map((val, idx) => `${idx * 10},${24 - val * 2}`).join(' ')} 
                                     />
                                 </svg>
                             </td>
                             <td className="py-5 px-4">
                                 <span className="px-2 py-0.5 rounded-md border border-blue-100 text-blue-600 font-bold bg-blue-50/50 uppercase">
                                     {project.statusLabel}
                                 </span>
                             </td>
                             <td className="py-5 px-4">
                                 <div className="flex items-center gap-2">
                                     <div className={`w-6 h-6 rounded-lg ${project.manager.avatarColor} text-white flex items-center justify-center text-[10px] font-bold shadow-sm`}>
                                         {project.manager.name.substring(0, 2)}
                                     </div>
                                     <span className="font-bold text-slate-600">{project.manager.name}</span>
                                 </div>
                             </td>
                             <td className="py-5 px-4 text-center">
                                 <span className="font-bold text-slate-400 flex items-center justify-center gap-1">
                                    <Users size={14} /> {project.memberCount}
                                 </span>
                             </td>
                             <td className="py-5 px-6 text-right">
                                 <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                     <MoreHorizontal size={18} />
                                 </button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
        </div>
      </div>
    </div>
  );
};
