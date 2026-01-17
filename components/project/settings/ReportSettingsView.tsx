
import React, { useState } from 'react';
import { Plus } from '../../Icons';

export const ReportSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('项目报告模板');
  const [activeSubTab, setActiveSubTab] = useState('项目报告模板');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-xl font-bold text-slate-800 mb-6">报告设置</h2>
      
      <div className="flex items-center gap-8 border-b border-slate-200 mb-6">
        {['项目报告模板', '定时报告模板'].map(tab => (
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

      <div className="bg-slate-100/50 p-1.5 rounded-lg w-fit mb-8 flex gap-1">
        {['项目报告模板', '项目转测试模板', '测试报告模板'].map(sub => (
          <button
            key={sub}
            onClick={() => setActiveSubTab(sub)}
            className={`px-4 py-1.5 text-xs font-bold rounded transition-all ${
              activeSubTab === sub ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      <button className="flex items-center gap-1.5 px-4 py-1.5 border border-slate-300 rounded text-sm text-slate-700 hover:bg-slate-50 mb-6">
        <Plus size={16} /> 新建项目报告模板
      </button>

      <div className="border border-slate-100 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-[11px] text-slate-400 font-bold uppercase border-b border-slate-100">
            <tr>
              <th className="py-3 px-8">模板名称</th>
              <th className="py-3 px-6">创建人</th>
              <th className="py-3 px-6">创建时间</th>
              <th className="py-3 px-6">最后修改人</th>
              <th className="py-3 px-6">修改时间</th>
              <th className="py-3 px-6 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-600">
            <tr>
              <td colSpan={6} className="py-32 text-center text-slate-300">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
