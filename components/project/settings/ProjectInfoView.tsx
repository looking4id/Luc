
import React from 'react';
import { Project } from '../../../types';
import { MoreHorizontal, Box, Users, Clock, HelpCircle } from '../../Icons';

interface ProjectInfoViewProps {
  project: Project;
}

export const ProjectInfoView: React.FC<ProjectInfoViewProps> = ({ project }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-emerald-100 ring-4 ring-emerald-50">
            {project.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">{project.name}</h2>
            <button className="text-sm font-bold text-blue-600 hover:underline">点击编辑项目描述</button>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
          <MoreHorizontal size={18} />
          <span>操作</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Info Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-10 flex items-center gap-3">
                <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div>
                基本信息
            </h3>
            
            <div className="space-y-8">
                <InfoItem label="上级项目" value="新清企业" />
                <InfoItem label="项目成员" value={`${project.memberCount} 位`} />
                <InfoItem label="项目 ID" value="32496737" isMono />
                <InfoItem label="创建时间" value="2026-01-01 14:01" isMono />
                <InfoItem label="项目状态" value="进行中" isStatus />
            </div>
        </div>

        {/* Entry Card */}
        <div className="space-y-8">
            <h3 className="text-lg font-bold text-slate-800 px-2 flex items-center gap-3">
                <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div>
                常用入口
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <QuickEntryCard icon={Box} label="应用管理" color="text-purple-500" bg="bg-purple-50" />
                <QuickEntryCard icon={Users} label="成员管理" color="text-orange-500" bg="bg-orange-50" />
                <QuickEntryCard icon={Clock} label="变更历史" color="text-blue-500" bg="bg-blue-50" />
                <QuickEntryCard icon={HelpCircle} label="帮助中心" color="text-emerald-500" bg="bg-emerald-50" />
            </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, isMono, isStatus }: any) => (
  <div className="flex items-center border-b border-slate-50 pb-4 last:border-0 last:pb-0">
    <span className="w-32 text-slate-400 font-bold uppercase text-[11px] tracking-widest">{label}</span>
    <span className={`text-slate-800 ${isMono ? 'font-mono' : 'font-bold'} ${isStatus ? 'text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100' : ''}`}>
      {value}
    </span>
  </div>
);

const QuickEntryCard = ({ icon: Icon, label, color, bg }: any) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center gap-4 hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group">
    <div className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
      <Icon size={24} />
    </div>
    <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600">{label}</span>
  </div>
);
