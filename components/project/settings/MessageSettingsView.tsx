
import React, { useState } from 'react';
import { HelpCircle, Trash2 } from '../../Icons';

export const MessageSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('消息通知');

  const sections = [
    { title: '需求通知', event: '创建|更新|状态变更|删除', recipient: '处理人', method: '站内信' },
    { title: '缺陷通知', event: '创建|更新|状态变更|删除', recipient: '处理人', method: '站内信' },
    { title: '依赖关系通知', event: '', recipient: '', method: '', hasHelp: true }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-xl font-bold text-slate-800 mb-6">消息设置</h2>
      
      <div className="flex items-center gap-8 border-b border-slate-200 mb-6">
        {['消息通知', '每日工作提醒', '弹窗公告'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400 mb-10">保留需求的消息通知不会发送给不在需求访问范围内的成员。</p>

      <div className="space-y-12">
        {sections.map(section => (
          <div key={section.title}>
            <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-1.5">
              <div className="w-1 h-3.5 bg-blue-500 rounded-full"></div>
              {section.title}
              {section.hasHelp && <HelpCircle size={14} className="text-slate-300" />}
            </h3>
            
            <div className="border border-slate-100 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[11px] text-slate-400 font-bold uppercase">
                  <tr>
                    <th className="py-3 px-6">事件</th>
                    <th className="py-3 px-6">接收人</th>
                    <th className="py-3 px-6">接收方式</th>
                    <th className="py-3 px-6 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-slate-600">
                  {section.event ? (
                    <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6">{section.event}</td>
                      <td className="py-4 px-6">{section.recipient}</td>
                      <td className="py-4 px-6">{section.method}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-1 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8"></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
