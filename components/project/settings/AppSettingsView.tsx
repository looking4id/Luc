
import React, { useState } from 'react';
import { Plus, LayoutGrid, FileText, Bug, Repeat, Settings, Box, LayoutList, Target, Code2, Map, Users, MoreHorizontal } from '../../Icons';
import { RequirementDetailSettings } from './requirement/RequirementDetailSettings';

export const AppSettingsView: React.FC = () => {
  const [drillDownApp, setDrillDownApp] = useState<string | null>(null);

  if (drillDownApp === '需求') {
    return <RequirementDetailSettings onBack={() => setDrillDownApp(null)} />;
  }

  const sections = [
    {
      title: '计划与跟踪',
      apps: [
        { name: '需求', icon: Target, iconColor: 'bg-blue-500', settings: ['字段设置', '公共模板库', '状态设置', '公共工作流', '启用设置'], main: true },
        { name: '缺陷', icon: Bug, iconColor: 'bg-red-500', settings: ['字段设置', '模板&布局', '工作流', '启用设置'] },
        { name: '迭代', icon: Repeat, iconColor: 'bg-cyan-500', settings: ['字段', '模板&布局', '启用设置'] },
        { name: '故事墙', icon: LayoutList, iconColor: 'bg-gray-500', isToggle: true },
        { name: '甘特图', icon: Box, iconColor: 'bg-gray-500', isToggle: true, settings: ['配色规则', '日期显示设置'] },
        { name: '发布评审', icon: Users, iconColor: 'bg-gray-500', isToggle: true, settings: ['字段设置', '要素设置', '活动设置', '流程设置'] },
        { name: '路线图', icon: Map, iconColor: 'bg-gray-500', isToggle: true }
      ]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-800">应用设置</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus size={16} /> 创建应用
          </button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
            <LayoutGrid size={16} /> 导航布局
          </button>
        </div>
      </div>

      {sections.map(section => (
        <div key={section.title} className="mb-10">
          <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
            {section.title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.apps.map(app => (
              <div key={app.name} className={`bg-white border border-slate-200 rounded-xl p-6 ${app.main ? 'md:col-span-2' : ''} shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${app.iconColor} text-white flex items-center justify-center shadow-md`}>
                      <app.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{app.name}</h4>
                    </div>
                  </div>
                  {app.isToggle ? (
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  ) : (
                    <button className="p-1 text-slate-300 hover:text-slate-600"><MoreHorizontal size={18} /></button>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  {app.settings?.map((s, idx) => (
                    <React.Fragment key={s}>
                      <button 
                        onClick={() => app.name === '需求' && setDrillDownApp('需求')}
                        className="text-[11px] font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                      >
                        {s === '设置' ? <Settings size={14} /> : null}
                        {s === '字段设置' || s === '字段' ? <FileText size={14} /> : null}
                        {s === '状态设置' ? <Repeat size={14} /> : null}
                        {s}
                      </button>
                      {idx < (app.settings?.length || 0) - 1 && <div className="w-1.5 h-1.5 rounded-full bg-slate-100"></div>}
                    </React.Fragment>
                  ))}
                </div>

                {app.name === '需求' && (
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 border border-slate-100 rounded-lg bg-slate-50/50 flex items-center justify-center gap-2 cursor-pointer hover:border-blue-200 transition-all text-slate-400 text-xs font-bold">
                       <Plus size={14} /> 需求类别
                    </div>
                    <div 
                      onClick={() => setDrillDownApp('需求')}
                      className="p-4 border border-slate-100 rounded-lg bg-white flex items-center justify-between cursor-pointer hover:border-blue-200 transition-all"
                    >
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">S</div>
                         <span className="text-sm font-bold text-slate-700">需求</span>
                       </div>
                       <button className="text-[11px] font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1">
                          <Settings size={12} /> 设置
                       </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
