
import React, { useState } from 'react';
import { Plus, LayoutGrid, LayoutList, ChevronLeft, ChevronRight, Search, Filter } from './Icons';

type VersionTab = '版本列表' | '发布计划';

const MOCK_VERSIONS = [
  { id: 'v1', version: '1.2.1', name: '紧急补丁', phase: '开发环境', owner: 'looking4id', date: '2025.11.30 00:00', progress: 0, color: 'bg-[#C01E4B]' },
  { id: 'v2', version: '1.2.0', name: '自助开票功能上线', phase: '生产环境', owner: 'looking4id', date: '2025.11.15 00:00', progress: 100, color: 'bg-[#22C55E]' },
];

export const ProjectVersions = () => {
  const [activeTab, setActiveTab] = useState<VersionTab>('版本列表');

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-6 border-b border-slate-100 flex justify-between items-start bg-white">
        <div>
          <h2 className="text-2xl font-black text-slate-800 mb-6">版本</h2>
          <div className="flex gap-8">
            {(['版本列表', '发布计划'] as VersionTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-bold transition-all relative ${
                  activeTab === tab ? 'text-[#C01E4B]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C01E4B]"></div>}
              </button>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#C01E4B] text-white rounded-lg hover:bg-[#a0183e] text-sm font-bold shadow-lg shadow-pink-100 transition-all active:scale-95">
          <Plus size={18} />
          <span>新建版本</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-[#FBFBFC]">
        {activeTab === '版本列表' ? <VersionListView /> : <VersionPlanView />}
      </div>
    </div>
  );
};

const VersionListView = () => (
  <div className="p-6">
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50/80 border-b border-slate-100">
          <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            <th className="py-4 px-8 w-24">版本号</th>
            <th className="py-4 px-4">版本名称</th>
            <th className="py-4 px-4">阶段</th>
            <th className="py-4 px-4">负责人</th>
            <th className="py-4 px-4">发布时间</th>
            <th className="py-4 px-8 w-64">进度</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {MOCK_VERSIONS.map(v => (
            <tr key={v.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="py-5 px-8">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-sm ${v.color}`}>
                  {v.version}
                </span>
              </td>
              <td className="py-5 px-4 font-bold text-slate-700 text-sm">{v.name}</td>
              <td className="py-5 px-4">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                   <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-300"></div>
                   {v.phase}
                </div>
              </td>
              <td className="py-5 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F28C28] text-white flex items-center justify-center text-[9px] font-black shadow-sm">
                    {v.owner.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-600">{v.owner}</span>
                </div>
              </td>
              <td className="py-5 px-4 text-sm font-mono text-slate-400">{v.date}</td>
              <td className="py-5 px-8">
                <div className="flex items-center gap-3">
                   <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${v.color}`} style={{ width: `${v.progress}%` }}></div>
                   </div>
                   <span className="text-[11px] font-bold text-slate-400 min-w-[30px]">{v.progress}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const VersionPlanView = () => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const calendarDays = [
    { day: 27, muted: true }, { day: 28, muted: true }, { day: 29, muted: true }, { day: 30, muted: true }, { day: 31, muted: true }, { day: 1 }, { day: 2 },
    { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 },
    { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 }, { day: 15, item: MOCK_VERSIONS[1] }, { day: 16 },
    { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 },
    { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30, item: MOCK_VERSIONS[0] }
  ];

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Calendar Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <button className="px-3 py-1.5 border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-50">今天</button>
           <div className="flex items-center gap-4">
              <ChevronLeft size={18} className="text-slate-400 cursor-pointer hover:text-slate-600" />
              <span className="text-base font-black text-slate-800">2025年 11月</span>
              <ChevronRight size={18} className="text-slate-400 cursor-pointer hover:text-slate-600" />
           </div>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
           <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-bold shadow-sm">月</button>
           <button className="px-3 py-1.5 text-slate-500 hover:text-slate-800 text-xs font-bold">周</button>
           <div className="w-px h-4 bg-slate-300 mx-1"></div>
           <LayoutGrid size={16} className="mx-2 text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
          {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(day => (
            <div key={day} className="py-3 px-4 text-[11px] font-black text-slate-400 text-center border-r border-slate-100 last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        
        <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-auto custom-scrollbar">
          {calendarDays.map((d, i) => (
            <div key={i} className={`min-h-[120px] p-2 border-r border-b border-slate-100 relative group hover:bg-slate-50/50 transition-colors ${i % 7 === 6 ? 'border-r-0' : ''}`}>
              <span className={`text-xs font-bold ${d.muted ? 'text-slate-200' : 'text-slate-400'}`}>
                {d.day}
              </span>
              
              {d.item && (
                <div className={`mt-2 p-1.5 rounded border border-transparent hover:border-white shadow-sm flex items-center gap-2 cursor-pointer transition-all ${
                  d.item.id === 'v2' ? 'bg-[#EEFBF3]' : 'bg-[#FFF5F7]'
                }`}>
                   <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold text-white ${d.item.color}`}>
                     {d.item.version}
                   </span>
                   <span className={`text-[10px] font-bold truncate ${d.item.id === 'v2' ? 'text-[#22C55E]' : 'text-[#C01E4B]'}`}>
                     {d.item.name}
                   </span>
                </div>
              )}
              
              <button className="absolute bottom-2 right-2 p-1 text-slate-300 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
