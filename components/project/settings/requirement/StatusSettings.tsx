
import React from 'react';
/* Corrected relative path to reach components/Icons.tsx from components/project/settings/requirement/ */
import { Plus, Edit3, Trash2, HelpCircle } from '../../../Icons';

export const StatusSettings: React.FC = () => {
  const statuses = [
    { name: '规划中', workflow: '系统默认模板', color: 'bg-green-500' },
    { name: '开发中', workflow: '系统默认模板', color: 'bg-blue-500' },
    { name: '已实现', workflow: '系统默认模板', color: 'bg-slate-400' },
    { name: '已拒绝', workflow: '系统默认模板', color: 'bg-slate-400' },
    { name: '产品体验', workflow: '系统默认模板', color: 'bg-blue-500' },
    { name: '测试中', workflow: '系统默认模板', color: 'bg-blue-500' },
    { name: '未开始', workflow: 'system task workflow', color: 'bg-green-500' },
    { name: '进行中', workflow: 'system task workflow', color: 'bg-blue-500' },
    { name: '已完成', workflow: 'system task workflow', color: 'bg-slate-400' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="flex items-center gap-4 mb-6">
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
          <Plus size={14} /> 新建状态
        </button>
        <span className="text-[11px] text-slate-400 font-medium">当需求列表进行状态排序时，将按这里的状态顺序</span>
      </div>

      <div className="border border-slate-100 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase">
            <tr>
              <th className="py-3 px-6">状态名称 (9)</th>
              <th className="py-3 px-6">已应用工作流</th>
              <th className="py-3 px-6 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-600 divide-y divide-slate-50">
            {statuses.map((s, i) => (
              <tr key={i} className="hover:bg-slate-50/30 group transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${s.color}`}></div>
                    <span className="font-medium text-slate-800">{s.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer">
                    {s.workflow} <HelpCircle size={12} className="text-slate-300" />
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                   <div className="flex justify-end gap-4">
                      <button className="text-slate-300 hover:text-blue-600"><Edit3 size={16} /></button>
                      <button className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
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
