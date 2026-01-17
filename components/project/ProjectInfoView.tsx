
import React from 'react';
import { Project } from '../../types';
import { MoreHorizontal, Box, Users, Clock, HelpCircle, User } from '../Icons';

interface ProjectInfoViewProps {
  project: Project;
}

export const ProjectInfoView: React.FC<ProjectInfoViewProps> = ({ project }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-green-100">
            {project.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">{project.name}</h2>
            <button className="text-sm text-slate-400 hover:text-blue-500 transition-colors">点击添加项目描述</button>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-1.5 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50 transition-all">
          <MoreHorizontal size={16} />
          <span>操作</span>
        </button>
      </div>

      {/* Basic Info Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-8 shadow-sm">
        <h3 className="text-base font-black text-slate-800 mb-8 flex items-center gap-2">
          <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
          基本信息
        </h3>
        
        <div className="grid grid-cols-2 gap-y-6 text-sm">
          <InfoItem label="上级项目" value="新清企业" />
          <InfoItem label="项目成员" value={project.memberCount.toString()} />
          <InfoItem label="项目ID" value="32496737" isMono />
          <InfoItem label="创建人" value="王亮" />
          <InfoItem label="开始时间" value="--" />
          <InfoItem label="结束时间" value="--" />
          <InfoItem label="创建时间" value="2026-01-01 14:01:39" isMono />
          <InfoItem label="项目状态" value="进行中" isStatus />
        </div>
      </div>

      {/* Quick Entry Section */}
      <div className="mb-8">
        <h3 className="text-base font-black text-slate-800 mb-6 flex items-center gap-2">
          <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
          常用入口
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <QuickEntryCard icon={Box} label="应用管理" color="text-purple-500" bg="bg-purple-50" />
          <QuickEntryCard icon={Users} label="成员管理" color="text-orange-500" bg="bg-orange-50" />
          <QuickEntryCard icon={Clock} label="项目变更历史" color="text-blue-500" bg="bg-blue-50" />
          <QuickEntryCard icon={HelpCircle} label="帮助中心" color="text-green-500" bg="bg-green-50" />
        </div>
      </div>

      {/* Project Admins Section */}
      <div>
        <h3 className="text-base font-black text-slate-800 mb-6 flex items-center gap-2">
          <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
          项目管理员
        </h3>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
                王
             </div>
             <span className="text-sm font-bold text-slate-700">王亮</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, isMono, isStatus }: any) => (
  <div className="flex items-center">
    <span className="w-24 text-slate-400 font-medium">{label}</span>
    <span className={`text-slate-700 ${isMono ? 'font-mono' : 'font-bold'} ${isStatus ? 'text-blue-500' : ''}`}>
      {value}
    </span>
  </div>
);

const QuickEntryCard = ({ icon: Icon, label, color, bg }: any) => (
  <div className="bg-white border border-slate-100 rounded-xl p-6 flex items-center gap-4 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
    <div className={`w-10 h-10 rounded-lg ${bg} ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
      <Icon size={20} />
    </div>
    <span className="text-sm font-black text-slate-700">{label}</span>
  </div>
);
