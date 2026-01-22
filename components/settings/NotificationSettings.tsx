
import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Monitor, CheckCircle2, RefreshCw } from '../Icons';

export const NotificationSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // 定义配置结构
  const groups = [
    { 
      id: 'work_item',
      title: '工作项通知', 
      items: ['我负责的工作项有更新', '我关注的工作项被提及', '工作项状态发生变更', '工作项即将到期'] 
    },
    { 
      id: 'code',
      title: '代码与评审', 
      items: ['收到新的代码评审请求', '代码评审通过或被驳回', '代码仓库有新的提交', '流水线构建失败'] 
    },
    { 
      id: 'system',
      title: '系统通知', 
      items: ['组织成员变更', '项目状态全局变更', '安全审计报警', '账单与财务提醒'] 
    }
  ];

  // 初始化所有开关状态 (默认部分开启)
  const [settings, setSettings] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    groups.forEach(group => {
      group.items.forEach(item => {
        initialState[`${group.id}_${item}_web`] = true;
        initialState[`${group.id}_${item}_email`] = !item.includes('变更');
        initialState[`${group.id}_${item}_sms`] = item.includes('到期') || item.includes('报警');
      });
    });
    return initialState;
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // 模拟 API 保存过程
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-center gap-4">
         <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Bell size={24} />
         </div>
         <div>
            <h3 className="font-bold text-blue-900 text-base">通知偏好设置</h3>
            <p className="text-sm text-blue-700 opacity-80">在这里配置您接收消息的方式，确保不会错过重要工作进展。</p>
         </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/80 border-b border-slate-100 sticky top-0 z-10">
            <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <th className="py-4 px-8">通知事件</th>
              <th className="py-4 px-4 text-center w-24">
                <div className="flex flex-col items-center gap-1">
                   <Monitor size={14} /> 站内信
                </div>
              </th>
              <th className="py-4 px-4 text-center w-24">
                <div className="flex flex-col items-center gap-1">
                   <Mail size={14} /> 邮件
                </div>
              </th>
              <th className="py-4 px-4 text-center w-24">
                <div className="flex flex-col items-center gap-1">
                   <Smartphone size={14} /> 短信
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {groups.map(group => (
              <React.Fragment key={group.id}>
                <tr className="bg-slate-50/30">
                  <td colSpan={4} className="py-2.5 px-8 text-[10px] font-black text-blue-600 uppercase tracking-widest border-y border-slate-100">
                    {group.title}
                  </td>
                </tr>
                {group.items.map(item => (
                  <tr key={item} className="hover:bg-blue-50/20 transition-all group">
                    <td className="py-4 px-8 text-sm text-slate-700 font-bold group-hover:text-blue-700 transition-colors">{item}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        <input 
                            type="checkbox" 
                            checked={settings[`${group.id}_${item}_web`]} 
                            onChange={() => handleToggle(`${group.id}_${item}_web`)}
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all hover:scale-110" 
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        <input 
                            type="checkbox" 
                            checked={settings[`${group.id}_${item}_email`]} 
                            onChange={() => handleToggle(`${group.id}_${item}_email`)}
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all hover:scale-110" 
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        <input 
                            type="checkbox" 
                            checked={settings[`${group.id}_${item}_sms`]} 
                            onChange={() => handleToggle(`${group.id}_${item}_sms`)}
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all hover:scale-110" 
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end pt-4">
         <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`px-10 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-black shadow-xl shadow-blue-100 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
         >
           {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
           {isSaving ? '正在同步配置...' : '保存更改'}
         </button>
      </div>

      {/* 成功反馈 Toast */}
      {showToast && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 duration-500">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                 <CheckCircle2 size={20} />
              </div>
              <div className="flex flex-col">
                  <span className="text-sm font-bold">偏好设置已更新</span>
                  <span className="text-xs opacity-60">通知配置已成功下发至消息网关</span>
              </div>
          </div>
      )}
    </div>
  );
};
