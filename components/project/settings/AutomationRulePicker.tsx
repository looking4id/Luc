
import React, { useState } from 'react';
import { HelpCircle, Plus, Search, XCircle } from '../../Icons';

export const AutomationRulePicker: React.FC<{ onBack: () => void, onSelect: () => void }> = ({ onBack, onSelect }) => {
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = ['全部', '同步变更', '进度跟进', '事务分配', '通知', '源码'];
  
  const templates = [
    { title: '所有子需求流转到结束状态，父需求自动流转到 “已实现”', tags: ['需求', '同步变更'] },
    { title: '迭代中的全部需求流转至 “已实现”，迭代自动关闭', tags: ['需求', '同步变更'] },
    { title: '父需求的 “预计结束” 自动获取子需求的最晚 “预计结束” 时间', tags: ['需求', '同步变更'] },
    { title: '创建需求 自动填写预计开始和结束时间', tags: ['需求', '同步变更'] },
    { title: '当需求超过 “预计结束” 时间且仍未完成，邮件发送确认提醒', tags: ['需求', '进度跟进', '通知'] },
    { title: '超期14天内 需求交付风险，邮件 每日提醒', tags: ['需求', '进度跟进', '通知'] },
    { title: '当需求 “预计结束” 时间剩余1天且仍未完成，邮件发送催办提醒', tags: ['需求', '进度跟进', '通知'] },
    { title: '当需求 “处理人” 发生变更且 “开发人员” 未分配时，自动填充需求 “开发人员” 为处理人', tags: ['需求', '事务分配'] },
    { title: '当需求流转至 “实现中” 且 “处理人” 未分配时自动填充需求 “处理人”', tags: ['需求', '事务分配'] },
    { title: '当前迭代需求产品验收，邮件消息推送提醒', tags: ['需求', '通知'] },
    { title: '超期7天内未处理缺陷，邮件每日提醒', tags: ['缺陷', '通知', '进度跟进'] },
  ];

  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto custom-scrollbar animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between z-10">
        <h2 className="text-lg font-black text-slate-800">添加自动化规则</h2>
        <div className="flex items-center gap-6">
          <button className="text-[11px] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1">
            <HelpCircle size={14} /> 帮助文档
          </button>
          <button onClick={onBack} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
            <XCircle size={24} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-10">
        {/* Categories */}
        <div className="flex items-center gap-8 mb-10 border-b border-slate-50">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeCategory === cat ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat}
              {activeCategory === cat && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Custom Creation Card */}
          <div 
            onClick={onSelect}
            className="border-2 border-dashed border-blue-200 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-blue-50 hover:border-blue-400 cursor-pointer transition-all group aspect-video"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
               <Plus size={24} strokeWidth={3} />
            </div>
            <span className="text-sm font-black text-blue-600">直接创建</span>
          </div>

          {/* Template Cards */}
          {templates.map((tpl, idx) => (
            <div 
              key={idx} 
              onClick={onSelect}
              className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col justify-between hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 cursor-pointer transition-all aspect-video group"
            >
              <p className="text-sm font-bold text-slate-700 leading-relaxed mb-4 group-hover:text-blue-700 transition-colors">
                {tpl.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {tpl.tags.map(tag => (
                  <span key={tag} className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                    tag === '需求' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    tag === '缺陷' ? 'bg-red-50 text-red-600 border-red-100' :
                    'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
