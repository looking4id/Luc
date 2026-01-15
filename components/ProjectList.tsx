import React from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Plus, 
  AiIcon, 
  LayoutGrid, 
  Filter, 
  ArrowUpDown, 
  Maximize2,
  MoreHorizontal,
  ChevronDown,
  Code2,
  Users,
  Box,
  Star,
  Activity
} from './Icons';
import { MOCK_PROJECTS } from '../constants';
import { Project } from '../types';

export const ProjectList: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white flex-1 overflow-hidden">
      {/* Top Global Header (Specific to Project View based on screenshot) */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm flex-shrink-0 z-10">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 text-slate-700 font-bold text-lg">
             <span>项目</span>
           </div>
           <div className="flex items-center gap-2">
              <a href="#" className="text-sm text-blue-600 hover:underline">升级到付费版</a>
              <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded">双十一年度特惠</span>
           </div>
        </div>

        {/* Utilities */}
        <div className="flex items-center gap-4">
           <div className="relative">
               <input 
                  type="text" 
                  placeholder="搜索..." 
                  className="pl-3 pr-8 py-1.5 text-sm border border-slate-300 rounded-md bg-white w-56 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
               />
               <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs border border-slate-200 rounded px-1">/</span>
           </div>
           
           <div className="flex items-center gap-3 text-slate-500">
               <div className="relative cursor-pointer hover:text-slate-700">
                   <Bell size={20} />
                   <span className="absolute -top-1 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
               </div>
               <div className="cursor-pointer hover:scale-105 transition-transform">
                  <AiIcon />
               </div>
               <div className="cursor-pointer hover:text-slate-700">
                   <HelpCircle size={20} />
               </div>
               <div className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-slate-400 text-slate-400">
                   <Plus size={18} />
               </div>
               <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm cursor-pointer">
                   Lo
               </div>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
            <div>
               <h1 className="text-2xl font-bold text-slate-800 mb-2">项目</h1>
               <div className="text-sm text-slate-500">全部项目 ({MOCK_PROJECTS.length})</div>
            </div>
            <div className="flex items-center gap-3">
               <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50 text-sm">
                  项目拓扑图
               </button>
               <button className="px-3 py-1.5 bg-red-700 text-white rounded hover:bg-red-800 text-sm flex items-center gap-1 shadow-sm">
                  <Plus size={16} />
                  新建项目
               </button>
            </div>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-slate-50/50 p-2 rounded-lg border border-slate-200 flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                 {/* Status Dropdown */}
                 <div className="relative group">
                     <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded text-sm text-slate-700 hover:border-slate-300">
                         <span className="font-medium">开始</span>
                         <ChevronDown size={14} className="text-slate-400" />
                     </button>
                 </div>
                 
                 {/* Manager Dropdown */}
                 <div className="relative group">
                     <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded text-sm text-slate-500 hover:text-slate-700 hover:border-slate-300">
                         <span>项目负责人</span>
                         <ChevronDown size={14} className="text-slate-400" />
                     </button>
                 </div>

                 {/* Type Dropdown */}
                 <div className="relative group">
                     <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded text-sm text-slate-500 hover:text-slate-700 hover:border-slate-300">
                         <span>项目类型</span>
                         <ChevronDown size={14} className="text-slate-400" />
                     </button>
                 </div>

                 {/* Search Input */}
                 <div className="relative">
                     <input 
                        type="text" 
                        placeholder="请输入关键字" 
                        className="pl-3 pr-8 py-1.5 text-sm border border-slate-200 rounded w-48 focus:outline-none focus:border-blue-500"
                     />
                     <Search size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
                 </div>

                 <button className="text-sm text-slate-500 hover:text-slate-700 px-2">清空</button>
             </div>

             <div className="flex items-center gap-4 text-slate-500 text-sm">
                 <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                     <span>请选择视图</span>
                     <ChevronDown size={14} />
                 </div>
                 <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                     <Filter size={14} />
                     <span>筛选</span>
                     <span className="bg-slate-200 text-xs px-1.5 rounded-full">1</span>
                 </div>
                 <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                     <ArrowUpDown size={14} />
                 </div>
                 <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                     <span>导出</span>
                 </div>
             </div>
        </div>

        {/* Project Table */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
             <table className="w-full text-left">
                 <thead>
                     <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold">
                         <th className="py-3 px-4 w-10"></th>
                         <th className="py-3 px-4">项目编号</th>
                         <th className="py-3 px-4">项目名称</th>
                         <th className="py-3 px-4 w-40">活跃趋势</th>
                         <th className="py-3 px-4">项目状态</th>
                         <th className="py-3 px-4">项目类型</th>
                         <th className="py-3 px-4">成员数量</th>
                         <th className="py-3 px-4">项目负责人</th>
                         <th className="py-3 px-4">仓库数量</th>
                         <th className="py-3 px-4 text-right">操作</th>
                     </tr>
                 </thead>
                 <tbody>
                     {MOCK_PROJECTS.map((project) => (
                         <tr key={project.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                             <td className="py-4 px-4 text-center">
                                 <div className={`w-1.5 h-10 -my-2 rounded-r ${project.id === 'p1' ? 'bg-green-500' : ''}`}></div>
                             </td>
                             <td className="py-4 px-4 text-sm text-slate-600">{project.code}</td>
                             <td className="py-4 px-4">
                                 <div className="flex items-center gap-2">
                                     <div className={`p-1.5 rounded bg-opacity-10 ${project.iconColor.replace('text-', 'bg-')}`}>
                                        <Code2 size={18} className={project.iconColor} />
                                     </div>
                                     <span className="text-sm font-medium text-slate-800">{project.name}</span>
                                     {project.isStar && <Star size={14} className="text-slate-400 fill-slate-100" />}
                                 </div>
                             </td>
                             <td className="py-4 px-4">
                                 {/* Simple Sparkline SVG */}
                                 <svg width="100" height="30" className="stroke-blue-400 fill-none stroke-2">
                                     <polyline points={project.activityTrend.map((val, idx) => `${idx * 10},${30 - val * 3}`).join(' ')} />
                                 </svg>
                             </td>
                             <td className="py-4 px-4">
                                 <span className="inline-block px-2 py-0.5 rounded border border-blue-200 text-blue-600 text-xs bg-blue-50">
                                     {project.statusLabel}
                                 </span>
                             </td>
                             <td className="py-4 px-4 text-sm text-slate-600">{project.type}</td>
                             <td className="py-4 px-4 text-sm text-slate-600 flex items-center gap-1">
                                 <Users size={14} className="text-slate-400" />
                                 {project.memberCount}
                             </td>
                             <td className="py-4 px-4">
                                 <div className="flex items-center gap-2">
                                     <div className={`w-6 h-6 rounded-full ${project.manager.avatarColor} text-white flex items-center justify-center text-xs font-bold`}>
                                         {project.manager.name.substring(0, 2)}
                                     </div>
                                     <span className="text-sm text-slate-700">{project.manager.name}</span>
                                 </div>
                             </td>
                             <td className="py-4 px-4 text-sm text-slate-600 flex items-center gap-1">
                                 <Code2 size={14} className="text-slate-400" />
                                 {project.repoCount}
                             </td>
                             <td className="py-4 px-4 text-right">
                                 <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
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