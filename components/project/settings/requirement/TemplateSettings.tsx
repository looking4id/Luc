
import React from 'react';
/* Corrected relative path to reach components/Icons.tsx from components/project/settings/requirement/ */
import { Plus, Edit3, Copy, Trash2, Clock } from '../../../Icons';

export const TemplateSettings: React.FC<{ onEdit: () => void }> = ({ onEdit }) => {
  const templates = [
    { name: '系统默认模板', scope: '需求' },
    { name: '任务默认模板', scope: '任务' }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <button 
        onClick={onEdit}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 mb-6 shadow-sm"
      >
        <Plus size={14} /> 新建创建页模板
      </button>

      <div className="border border-slate-100 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase">
            <tr>
              <th className="py-3 px-6 w-10"><input type="checkbox" className="rounded" /></th>
              <th className="py-3 px-6">模板名称 (2)</th>
              <th className="py-3 px-6">应用的需求类别</th>
              <th className="py-3 px-6 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-600 divide-y divide-slate-50">
            {templates.map((t, i) => (
              <tr key={i} className="hover:bg-slate-50/30 group transition-colors">
                <td className="py-4 px-6"><input type="checkbox" className="rounded" /></td>
                <td className="py-4 px-6 font-medium text-slate-800">{t.name}</td>
                <td className="py-4 px-6">{t.scope}</td>
                <td className="py-4 px-6 text-right">
                   <div className="flex justify-end gap-4">
                      <button onClick={onEdit} className="text-slate-300 hover:text-blue-600"><Edit3 size={16} /></button>
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
