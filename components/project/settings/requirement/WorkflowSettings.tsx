
import React from 'react';
/* Corrected relative path to reach components/Icons.tsx from components/project/settings/requirement/ */
import { Plus, Edit3, Copy, Trash2, Clock, Settings } from '../../../Icons';

export const WorkflowSettings: React.FC = () => {
  const workflows = [
    { name: 'system task work...', mode: '串行模式', desc: '任务类别默认工作流', scope: '任务', time: '2026-01-01 14:01:44', author: 'TAPD system' },
    { name: '系统默认模板', mode: '串行模式', desc: '-', scope: '需求', time: '2026-01-01 14:01:43', author: 'TAPD_SYSTEM' }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 mb-6 shadow-sm">
        <Plus size={14} /> 新建工作流
      </button>

      <div className="border border-slate-100 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase">
            <tr>
              <th className="py-3 px-6">工作流名称 (2)</th>
              <th className="py-3 px-6">工作流模式</th>
              <th className="py-3 px-6">工作流说明</th>
              <th className="py-3 px-6">应用的需求类别</th>
              <th className="py-3 px-6">最后修改时间</th>
              <th className="py-3 px-6">最后修改人</th>
              <th className="py-3 px-6 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-600 divide-y divide-slate-50">
            {workflows.map((w, i) => (
              <tr key={i} className="hover:bg-slate-50/30 group transition-colors">
                <td className="py-4 px-6 font-medium text-slate-800">{w.name}</td>
                <td className="py-4 px-6">{w.mode}</td>
                <td className="py-4 px-6 text-slate-400">{w.desc}</td>
                <td className="py-4 px-6">{w.scope}</td>
                <td className="py-4 px-6 font-mono">{w.time}</td>
                <td className="py-4 px-6">{w.author}</td>
                <td className="py-4 px-6 text-right">
                   <div className="flex justify-end gap-3">
                      <button className="text-slate-300 hover:text-blue-600"><Settings size={16} /></button>
                      <button className="text-slate-300 hover:text-blue-600"><Copy size={16} /></button>
                      <button className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                      <button className="text-slate-300 hover:text-slate-600"><Clock size={16} /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
