
import React, { useState } from 'react';
import { Flag, Plus, Calendar, CheckCircle2, Search, Filter, MoreHorizontal, Circle } from './Icons';
import { StatusBadge } from './ProjectShared';

const MOCK_MILESTONES = [
  { id: 1, title: '创建新项目', subtitle: '完成项目立项与团队组建', date: '2025-12-11', status: '已完成', owner: 'looking4id', ownerColor: 'bg-purple-500' },
  { id: 2, title: '邀请同事加入项目', subtitle: '完成核心开发人员入驻', date: '2025-12-18', status: '已完成', owner: 'looking4id', ownerColor: 'bg-purple-500' },
  { id: 3, title: '在项目中管理需求池', subtitle: '完成首批需求梳理与评审', date: '2025-12-25', status: '未开始', owner: 'pm01', ownerColor: 'bg-indigo-500' },
  { id: 4, title: '通过数据报表进行项目复盘', subtitle: 'Sprint 1 结束后的数据分析', date: '2026-01-01', status: '未开始', owner: 'looking4id', ownerColor: 'bg-purple-500' },
  { id: 5, title: '完成一次迭代交付', subtitle: 'V1.0 版本正式上线', date: '2026-01-01', status: '未开始', owner: 'dev01', ownerColor: 'bg-blue-500' },
];

export const ProjectMilestones = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-black text-slate-800 mb-1">里程碑</h2>
          <p className="text-sm text-slate-400 font-medium tracking-tight">关键时间节点与阶段性目标管理</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95">
          <Plus size={18} />
          <span>新建里程碑</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Horizontal Timeline Header */}
        <div className="px-10 py-12 bg-slate-50/30 border-b border-slate-100 overflow-x-auto no-scrollbar">
          <div className="min-w-[900px] relative">
            {/* Main Line */}
            <div className="absolute top-[11px] left-[5%] right-[5%] h-1 bg-slate-200 rounded-full"></div>
            
            <div className="flex justify-between items-start relative z-10">
              {MOCK_MILESTONES.map((m, i) => (
                <div key={m.id} className="flex flex-col items-center w-1/5 group">
                  {/* Dot */}
                  <div className={`w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-transform group-hover:scale-110 mb-3 ${
                    m.status === '已完成' ? 'bg-blue-500' : 'bg-slate-300'
                  }`}>
                    {m.status === '已完成' && <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>}
                  </div>
                  
                  {/* Date & Labels */}
                  <div className="text-center space-y-1">
                    <div className={`text-[11px] font-mono font-bold tracking-wider ${m.status === '已完成' ? 'text-blue-500' : 'text-slate-400'}`}>
                      {m.date}
                    </div>
                    <div className="text-sm font-black text-slate-800">{m.title}</div>
                    <div className="text-[10px] text-slate-400 font-medium max-w-[120px] mx-auto leading-tight">
                      {m.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-4 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <input 
              type="text" 
              placeholder="搜索里程碑..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-slate-50/50 transition-all"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium shadow-sm bg-white">
            <Filter size={16} />
            <span>状态</span>
          </button>
        </div>

        {/* Milestone Table */}
        <div className="px-6 pb-6">
          <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="py-4 px-6">名称</th>
                  <th className="py-4 px-4">状态</th>
                  <th className="py-4 px-4">负责人</th>
                  <th className="py-4 px-4">计划完成时间</th>
                  <th className="py-4 px-6 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_MILESTONES.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/50 group transition-colors">
                    <td className="py-5 px-6 font-bold text-slate-700 text-sm">{m.title}</td>
                    <td className="py-5 px-4">
                      <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 w-fit ${
                        m.status === '已完成' 
                        ? 'bg-green-50 text-green-600 border-green-100' 
                        : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                        {m.status === '已完成' ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                        {m.status}
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full ${m.ownerColor} text-white flex items-center justify-center text-[10px] font-black shadow-sm`}>
                          {m.owner.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-slate-600">{m.owner}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-sm font-mono text-slate-400 font-medium">{m.date}</td>
                    <td className="py-5 px-6 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 opacity-0 group-hover:opacity-100 transition-all">
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
    </div>
  );
};
