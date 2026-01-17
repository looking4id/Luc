
import React from 'react';
import { Project } from '../../../types';
import { Clock, User, Edit3, Plus, Trash2, ChevronRight } from '../../Icons';

export const ProjectHistoryView: React.FC<{ project: Project }> = ({ project }) => {
  const activities = [
    { type: 'update', user: '王亮', action: '修改了项目基本信息', time: '2026-01-15 10:30', detail: '修改了项目描述和截止日期' },
    { type: 'member', user: 'lo', action: '邀请了新成员加入', time: '2026-01-14 15:22', detail: '邀请了 @Dev_Team1 加入后端开发组' },
    { type: 'create', user: '王亮', action: '创建了项目', time: '2026-01-01 14:01', detail: '初始化敏捷开发项目模板' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <h2 className="text-2xl font-black text-slate-800 mb-8">项目变更历史</h2>
      
      <div className="relative border-l-2 border-slate-100 ml-4 space-y-12">
        {activities.map((act, i) => (
          <div key={i} className="relative pl-10 group">
             {/* Timeline dot */}
             <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-4 border-white bg-blue-500 shadow-sm ring-4 ring-blue-50 group-hover:scale-125 transition-transform"></div>
             
             <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                         {act.type === 'update' ? <Edit3 size={14} /> : act.type === 'member' ? <Plus size={14} /> : <Clock size={14} />}
                      </div>
                      <span className="text-sm font-black text-slate-800">{act.user}</span>
                      <span className="text-sm text-slate-500 font-medium">{act.action}</span>
                   </div>
                   <span className="text-xs font-mono text-slate-400 font-bold">{act.time}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 font-medium border border-slate-100">
                   {act.detail}
                </div>
                <div className="mt-4 flex justify-end">
                   <button className="text-[11px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1 hover:underline">
                      查看详情 <ChevronRight size={12} />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
