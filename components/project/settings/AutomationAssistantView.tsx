
import React, { useState } from 'react';
import { HelpCircle, Plus, Search, XCircle, MoreHorizontal } from '../../Icons';
import { AutomationRulePicker } from './AutomationRulePicker';

export const AutomationAssistantView: React.FC = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [hasRules, setHasRules] = useState(false); // Toggle to show empty state vs list

  if (showPicker) {
    return <AutomationRulePicker onBack={() => setShowPicker(false)} onSelect={() => { setShowPicker(false); setHasRules(true); }} />;
  }

  if (!hasRules) {
    return (
      <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-400">
        <div className="px-10 py-4 flex items-center justify-between border-b border-slate-50">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 pb-3 -mb-4">自动化规则</h2>
          </div>
          <button className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1">
            <HelpCircle size={14} /> 使用指引
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
          <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">欢迎来到流程管理助手</h2>
          <p className="text-sm text-slate-400 max-w-lg mb-16 leading-relaxed">
            通过自动化规则，可以将TAPD功能根据业务规则进行组合，同时支持第三方服务接入与联动，帮助团队简化复杂流程，提高协作效率。
          </p>

          <div className="relative w-full max-w-3xl mb-24">
            <img 
              src="https://img.tapd.cn/statics/20210817/automation_intro_new.png" 
              alt="Automation Flow" 
              className="w-full h-auto opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-around px-10">
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-bold text-slate-600 mt-20">触发</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-bold text-slate-600 mt-20">满足条件</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-bold text-slate-600 mt-20">执行动作</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setShowPicker(true)} className="px-10 py-3 bg-blue-500 text-white rounded-xl font-bold text-sm hover:bg-blue-600 shadow-xl shadow-blue-100 transition-all active:scale-95">
              创建自动化规则
            </button>
            <button className="px-10 py-3 bg-white border border-blue-200 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all">
              查看使用文档
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Rule List View (Placeholder mockup matching prototypes)
  return (
     <div className="animate-in fade-in duration-300">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-black text-slate-800">自动化规则</h2>
           <button onClick={() => setShowPicker(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl font-bold text-sm hover:bg-blue-600 shadow-lg shadow-blue-100">
              <Plus size={16} /> 创建规则
           </button>
        </div>
        
        <div className="space-y-4">
           {[1, 2].map(i => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black">
                       R{i}
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-800 mb-1">当需求更新为 "已实现"，自动关闭关联缺陷</h4>
                       <p className="text-xs text-slate-400">已启用 • 上次运行于 2小时前</p>
                    </div>
                 </div>
                 <button className="p-2 text-slate-300 hover:text-slate-600"><MoreHorizontal size={20}/></button>
              </div>
           ))}
        </div>
     </div>
  );
};
