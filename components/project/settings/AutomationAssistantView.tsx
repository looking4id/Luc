
import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, Plus, Search, XCircle, MoreHorizontal, Zap, 
  Filter, PlayCircle, ChevronRight, RefreshCw, CheckCircle2, 
  ToggleRight, ToggleLeft, Settings, Trash2, Clock
} from '../../Icons';
import { AutomationRulePicker } from './AutomationRulePicker';

export const AutomationAssistantView: React.FC = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [hasRules, setHasRules] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // 规则列表数据
  const [rules, setRules] = useState([
    { id: 'R1', title: '当需求更新为 "已实现"，自动关闭关联缺陷', status: true, lastRun: '2小时前', creator: '王亮' },
    { id: 'R2', title: '迭代进度达到 100% 时，自动发送邮件通知产品经理', status: true, lastRun: '昨天', creator: '王亮' },
    { id: 'R3', title: '缺陷被重新打开时，自动打上 "回归不通过" 标签', status: false, lastRun: '3天前', creator: 'Dev 1' },
  ]);

  const handleCreateRule = () => {
    setShowPicker(false);
    setHasRules(true);
    // 触发成功提示
    setShowToast(true);
  };

  // 3秒后自动关闭提示
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const toggleRuleStatus = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, status: !r.status } : r));
  };

  if (showPicker) {
    return <AutomationRulePicker onBack={() => setShowPicker(false)} onSelect={handleCreateRule} />;
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

        <div className="flex-1 flex flex-col items-center justify-center p-20 text-center bg-slate-50/20">
          <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">欢迎来到流程管理助手</h2>
          <p className="text-sm text-slate-400 max-w-lg mb-16 leading-relaxed">
            通过自动化规则，可以将系统功能根据业务规则进行组合，同时支持第三方服务接入与联动，帮助团队简化复杂流程，提高协作效率。
          </p>

          {/* 自动化流程可视化图 */}
          <div className="relative w-full max-w-3xl mb-24 py-12 px-6">
            <div className="flex items-center justify-between relative z-10">
              <StepNode icon={Zap} label="触发器" sub="Trigger" color="bg-blue-600 text-white ring-blue-50" />
              <Connector />
              <StepNode icon={Filter} label="满足条件" sub="Conditions" color="bg-white border-2 border-blue-200 text-blue-500 ring-slate-50" />
              <Connector />
              <StepNode icon={PlayCircle} label="执行动作" sub="Actions" color="bg-emerald-500 text-white ring-emerald-50" />
            </div>
            <svg className="absolute inset-0 w-full h-full -z-0 opacity-10 pointer-events-none" viewBox="0 0 800 200">
                <path d="M 100 100 Q 400 0 700 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-blue-500" />
                <path d="M 100 100 Q 400 200 700 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-emerald-500" />
            </svg>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setShowPicker(true)} className="px-10 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center gap-2">
              <Plus size={18} strokeWidth={3} />
              创建自动化规则
            </button>
            <button className="px-10 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
              查看使用文档
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
     <div className="animate-in fade-in duration-300 flex flex-col h-full">
        {/* 列表头部 */}
        <div className="flex items-center justify-between mb-8">
           <div>
              <h2 className="text-2xl font-black text-slate-800">自动化规则</h2>
              <p className="text-xs text-slate-400 mt-1">当前项目已启用 {rules.filter(r => r.status).length} 条规则</p>
           </div>
           <div className="flex gap-3">
              <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <RefreshCw size={18} />
              </button>
              <button onClick={() => setShowPicker(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95">
                <Plus size={18} strokeWidth={3} /> 创建规则
              </button>
           </div>
        </div>

        {/* 列表搜索过滤栏 */}
        <div className="bg-white border border-slate-200 p-3 rounded-2xl flex items-center gap-4 mb-6 shadow-sm">
            <div className="relative flex-1">
                <input 
                    type="text" 
                    placeholder="按规则名称搜索..." 
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:border-blue-500 outline-none transition-all"
                />
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">
                <Filter size={14} /> 筛选
            </button>
        </div>
        
        {/* 规则卡片网格/列表 */}
        <div className="space-y-4">
           {rules.map((rule, idx) => (
              <div key={rule.id} className={`bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-lg transition-all group ${!rule.status ? 'opacity-70 grayscale-[0.5]' : ''}`}>
                 <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border ${rule.status ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                       {rule.id}
                    </div>
                    <div>
                       <h4 className={`font-bold text-base mb-1.5 ${rule.status ? 'text-slate-800' : 'text-slate-500'}`}>{rule.title}</h4>
                       <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                          <span className="flex items-center gap-1.5"><Clock size={14}/> 上次运行: {rule.lastRun}</span>
                          <span className="w-px h-3 bg-slate-200"></span>
                          <span>创建人: {rule.creator}</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${rule.status ? 'text-emerald-500' : 'text-slate-300'}`}>
                            {rule.status ? 'Enabled' : 'Disabled'}
                        </span>
                        <button 
                            onClick={() => toggleRuleStatus(rule.id)}
                            className={`w-12 h-6 rounded-full relative transition-colors ${rule.status ? 'bg-blue-600' : 'bg-slate-200'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${rule.status ? 'right-1' : 'left-1'}`}></div>
                        </button>
                    </div>
                    <div className="w-px h-10 bg-slate-100"></div>
                    <div className="flex items-center gap-1">
                        <button className="p-2 text-slate-300 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"><Settings size={18}/></button>
                        <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-slate-50 rounded-lg transition-all"><Trash2 size={18}/></button>
                        <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"><MoreHorizontal size={18}/></button>
                    </div>
                 </div>
              </div>
           ))}
        </div>

        {/* 成功反馈 Toast */}
        {showToast && (
            <div className="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right duration-500">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={20} />
                </div>
                <div>
                    <div className="text-sm font-bold">自动化规则创建成功</div>
                    <div className="text-xs text-slate-400">规则已立即生效并开始监听项目事件</div>
                </div>
                <button onClick={() => setShowToast(false)} className="ml-4 text-slate-500 hover:text-white transition-colors">
                    <XCircle size={18} />
                </button>
            </div>
        )}
     </div>
  );
};

// 内部辅助组件
const StepNode = ({ icon: Icon, label, sub, color }: any) => (
  <div className="flex flex-col items-center gap-4 group">
    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500 ring-8 ${color}`}>
      <Icon size={32} strokeWidth={2.5} />
    </div>
    <div className="flex flex-col gap-1">
        <span className="text-sm font-black text-slate-800">{label}</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{sub}</span>
    </div>
  </div>
);

const Connector = () => (
  <div className="flex-1 px-4 flex flex-col items-center">
     <div className="w-full h-0.5 bg-gradient-to-r from-slate-100 via-blue-400 to-slate-100 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
            <ChevronRight size={16} className="text-blue-400" />
        </div>
     </div>
  </div>
);
