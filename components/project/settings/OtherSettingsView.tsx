
import React, { useState } from 'react';

export const OtherSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('可启用的功能模块');

  const settings = [
    { title: '启用工时花费', sub: 'radio', options: ['人时', '人天'], enabled: true },
    { title: '启用快速创建需求、缺陷', sub: 'radio', options: ['行内创建', '弹窗创建'], enabled: true },
    { title: '启用水印功能', sub: 'text', text: '开启后将在需求、缺陷、任务、wiki、文档页面添加带有用户名样样的水印', enabled: false },
    { title: '父子工作项排期时间联动设置', sub: 'text', text: '限制子需求排期范围不可超过父需求或根据子需求排期自动计算父需求排期', enabled: false },
    { title: '启用延期提醒标识', enabled: true },
    { title: '允许删除自己创建的业务单', enabled: true },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-xl font-bold text-slate-800 mb-6">其他设置</h2>
      
      <div className="flex items-center gap-8 border-b border-slate-200 mb-8">
        {['可启用的功能模块', '项目公共参数设置', '项目系统视图设置', '工作日设置'].map(tab => (
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

      <div className="max-w-3xl space-y-2 border border-slate-100 rounded-xl overflow-hidden shadow-sm">
        {settings.map((s, idx) => (
          <div key={idx} className="p-8 border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[15px] font-black text-slate-800">{s.title}</span>
              <div className={`w-11 h-5 rounded-full relative cursor-pointer transition-colors ${s.enabled ? 'bg-blue-500' : 'bg-slate-200'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${s.enabled ? 'right-0.5' : 'left-0.5'}`}></div>
              </div>
            </div>
            {s.sub === 'radio' && (
              <div className="flex gap-8">
                {s.options?.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name={s.title} defaultChecked={opt === s.options?.[0]} className="w-4 h-4 border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            )}
            {s.sub === 'text' && (
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">{s.text}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
