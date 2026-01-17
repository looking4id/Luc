
import React from 'react';
/* Corrected relative path to reach components/Icons.tsx from components/project/settings/requirement/ */
import { Plus, Edit3, Settings, Copy, Box } from '../../../Icons';

export const FieldSettings: React.FC = () => {
  const fields = [
    { name: '优先级', type: '单选下拉列表', system: '是' },
    { name: '标题', type: '单行文本框', system: '是' },
    { name: '详细描述', type: '多行文本框', system: '是' },
    { name: '预计开始', type: '日期', system: '是' },
    { name: '预计结束', type: '日期', system: '是' },
    { name: '预估工时', type: '浮点数类型', system: '是' },
    { name: '处理人', type: '人名输入框', system: '是' },
    { name: '开发人员', type: '人名输入框', system: '是' },
    { name: '分类', type: '单选下拉列表', system: '是' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
            <Plus size={14} /> 新建字段
          </button>
          <span className="text-[11px] text-slate-400 font-medium">最多可以配置50个自定义字段</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-[11px] font-bold text-slate-500 hover:text-blue-600">用量说明</button>
          <button className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-blue-600">
            <Copy size={14} /> 复制字段配置至
          </button>
        </div>
      </div>

      <div className="border border-slate-100 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase">
            <tr>
              <th className="py-3 px-6">字段名 (9)</th>
              <th className="py-3 px-6">字段类型</th>
              <th className="py-3 px-6">系统字段</th>
              <th className="py-3 px-6">操作</th>
              <th className="py-3 px-6 text-right">权限与规则</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-600 divide-y divide-slate-50">
            {fields.map((f, i) => (
              <tr key={i} className="hover:bg-slate-50/30 group transition-colors">
                <td className="py-4 px-6 font-medium text-slate-800">{f.name}</td>
                <td className="py-4 px-6">{f.type}</td>
                <td className="py-4 px-6">{f.system}</td>
                <td className="py-4 px-6">
                   <div className="flex items-center gap-4">
                      <button className="text-slate-300 hover:text-blue-600"><Edit3 size={14} /></button>
                      <button className="text-slate-300 hover:text-blue-600 flex items-center gap-1">
                        <Box size={14} /> <span className="text-[10px]">应用到</span>
                      </button>
                      {i % 3 === 0 && <button className="text-slate-300 hover:text-blue-600"><Copy size={14} /></button>}
                   </div>
                </td>
                <td className="py-4 px-6 text-right">
                   <button className="p-1.5 text-slate-300 hover:text-slate-600 border border-transparent hover:border-slate-200 rounded">
                      <Settings size={14} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
