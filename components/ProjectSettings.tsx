
import React, { useState } from 'react';
import { Project } from '../types';
import { 
  Search, FileText, Users, Box, Bell, Zap, ShieldAlert, 
  Link, MoreHorizontal, Trash2, Clock, Settings,
  User, Lock, LayoutList, Code2, HelpCircle
} from './Icons';

// Sub-page Imports
import { ProjectInfoView } from './project/settings/ProjectInfoView';
import { ProjectGuideView } from './project/settings/ProjectGuideView';
import { MemberManagementView } from './project/settings/MemberManagementView';
import { PermissionSettingsView } from './project/settings/PermissionSettingsView';
import { AppSettingsView } from './project/settings/AppSettingsView';
import { MessageSettingsView } from './project/settings/MessageSettingsView';
import { ReportSettingsView } from './project/settings/ReportSettingsView';
import { AutomationAssistantView } from './project/settings/AutomationAssistantView';
import { TapdRobotView } from './project/settings/TapdRobotView';
import { OpenPlatformView } from './project/settings/OpenPlatformView';
import { DevOpsView } from './project/settings/DevOpsView';
import { OtherSettingsView } from './project/settings/OtherSettingsView';
import { ProjectHistoryView } from './project/settings/ProjectHistoryView';
import { ArchiveManagementView } from './project/settings/ArchiveManagementView';
import { RecycleBinView } from './project/settings/RecycleBinView';

interface ProjectSettingsProps {
  project: Project;
}

export const ProjectSettings: React.FC<ProjectSettingsProps> = ({ project }) => {
  const [activeSubTab, setActiveSubTab] = useState('项目信息');

  const sidebarGroups = [
    {
      title: '基本信息',
      icon: FileText,
      items: ['项目信息', '项目指引']
    },
    {
      title: '成员与权限',
      icon: User,
      items: ['成员管理', '权限设置']
    },
    {
      title: '应用管理',
      icon: Box,
      items: ['应用设置']
    },
    {
      title: '消息与报告',
      icon: Bell,
      items: ['消息设置', '报告设置']
    },
    {
      title: '智能化',
      icon: Zap,
      items: ['自动化助手', 'TAPD企微机器人']
    },
    {
      title: '开放与集成',
      icon: Link,
      items: ['开放平台', 'DevOps']
    },
    {
      title: '更多',
      icon: MoreHorizontal,
      items: ['其他设置', '项目变更历史', '归档管理', '回收站', '退出此项目']
    }
  ];

  const renderContent = () => {
    switch (activeSubTab) {
      case '项目信息': return <ProjectInfoView project={project} />;
      case '项目指引': return <ProjectGuideView />;
      case '成员管理': return <MemberManagementView />;
      case '权限设置': return <PermissionSettingsView />;
      case '应用设置': return <AppSettingsView />;
      case '消息设置': return <MessageSettingsView />;
      case '报告设置': return <ReportSettingsView />;
      case '自动化助手': return <AutomationAssistantView />;
      case 'TAPD企微机器人': return <TapdRobotView />;
      case '开放平台': return <OpenPlatformView />;
      case 'DevOps': return <DevOpsView />;
      case '其他设置': return <OtherSettingsView />;
      case '项目变更历史': return <ProjectHistoryView project={project} />;
      case '归档管理': return <ArchiveManagementView />;
      case '回收站': return <RecycleBinView />;
      case '退出此项目':
        return (
          <div className="max-w-2xl bg-red-50 border border-red-100 rounded-2xl p-8 animate-in zoom-in-95 duration-300">
            <h3 className="text-xl font-black text-red-800 mb-4">退出项目确认</h3>
            <p className="text-red-700 mb-6 text-sm">您确定要退出项目 "{project.name}" 吗？退出后您将失去对该项目所有资源的访问权限。该操作不会影响其他项目成员。</p>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-200">确认退出</button>
              <button onClick={() => setActiveSubTab('项目信息')} className="px-6 py-2 bg-white border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50">再想想</button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm -m-1">
      {/* Settings Sidebar */}
      <div className="w-64 border-r border-slate-200 bg-[#fbfcfd] flex flex-col flex-shrink-0">
        <div className="p-4 bg-white border-b border-slate-100 flex-shrink-0">
           <h3 className="text-sm font-black text-slate-800 mb-4 px-2">项目设置</h3>
           <div className="relative">
              <input 
                type="text" 
                placeholder="请输入搜索内容(Ctrl+K)" 
                className="w-full pl-3 pr-8 py-2 text-[11px] border border-slate-200 rounded bg-slate-50 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              <Search size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
           </div>
        </div>

        <div className="flex-1 py-4 px-2 space-y-5 overflow-y-auto no-scrollbar">
          {sidebarGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <div className="flex items-center gap-2 px-3 py-1 text-slate-400">
                <group.icon size={12} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-widest">{group.title}</span>
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <div
                    key={item}
                    onClick={() => setActiveSubTab(item)}
                    className={`px-8 py-2 rounded-lg cursor-pointer text-sm transition-all whitespace-nowrap overflow-hidden text-ellipsis ${
                      activeSubTab === item 
                        ? 'bg-blue-50 text-blue-600 font-black' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                    title={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
        <div className={`${activeSubTab === '权限设置' ? 'h-full' : 'p-10 max-w-7xl mx-auto w-full'}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
