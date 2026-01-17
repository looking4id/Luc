
import React from 'react';

export const EnableSettings: React.FC = () => {
  const sections = [
    {
      title: '需求创建',
      items: [
        { title: '创建子需求继承父需求信息', sub: '创建子需求时自动继承父需求的字段与状态信息', link: '配置规则', enabled: false },
        { title: '导入需求根据模板校验必填字段', enabled: false, hasToggle: true },
        { title: '状态已结束的父需求允许创建子需求', enabled: false, hasToggle: true },
      ]
    },
    {
      title: '需求复制',
      items: [
        { title: '复制需求到本项目时校验模板', sub: '当需求复制到本项目时必须按模板必填字段填写。', enabled: false, hasToggle: true },
        { title: '复制/关联需求时，默认同步指定字段', enabled: false, hasToggle: true },
      ]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400 space-y-10">
      {sections.map(section => (
        <div key={section.title}>
          <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
            {section.title}
          </h3>
          <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
            {section.items.map((item, idx) => (
              <div key={idx} className="p-8 border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[15px] font-black text-slate-800">{item.title}</span>
                  {item.hasToggle && (
                    <div className={`w-11 h-5 rounded-full relative cursor-pointer transition-colors ${item.enabled ? 'bg-blue-500' : 'bg-slate-200'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${item.enabled ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  )}
                </div>
                {item.sub && (
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                    {item.sub} {item.link && <button className="text-blue-600 hover:underline font-bold ml-1">{item.link}</button>}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
