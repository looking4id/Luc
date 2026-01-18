
import React, { useState, useRef } from 'react';
import { 
  ShieldAlert, Search, Plus, MoreHorizontal, Filter, 
  ChevronDown, ListFilter, Maximize2 
} from './Icons';
import { StatusBadge } from './ProjectShared';

const MOCK_RISKS = [
    { id: 'R-001', title: '第三方支付接口政策变动', probability: '高', impact: '高', status: '处理中', owner: 'looking4id', strategy: '规避', created: '2025-07-05' },
    { id: 'R-002', title: '服务器并发预估不足', probability: '中', impact: '高', status: '已识别', owner: 'dev01', strategy: '减轻', created: '2025-07-08' },
    { id: 'R-003', title: 'UI设计师临时请假', probability: '低', impact: '中', status: '已关闭', owner: 'pm01', strategy: '接受', created: '2025-07-10' },
    { id: 'R-004', title: '竞品提前上线', probability: '中', impact: '中', status: '已识别', owner: 'pm01', strategy: '转移', created: '2025-07-12' },
];

export const ProjectRisks = () => {
  // 列宽状态管理
  const [colWidths, setColWidths] = useState([48, 300, 100, 100, 120, 100, 100, 80]);
  const resizingRef = useRef<{ index: number; startX: number; startWidth: number } | null>(null);

  const onMouseDown = (index: number, e: React.MouseEvent) => {
    resizingRef.current = { index, startX: e.pageX, startWidth: colWidths[index] };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!resizingRef.current) return;
    const { index, startX, startWidth } = resizingRef.current;
    const deltaX = e.pageX - startX;
    const newWidths = [...colWidths];
    newWidths[index] = Math.max(40, startWidth + deltaX);
    setColWidths(newWidths);
  };

  const onMouseUp = () => {
    resizingRef.current = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  };

  const columns = ['选中', '风险标题', '可能性', '影响程度', '应对策略', '负责人', '状态', '操作'];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden font-sans">
      {/* 工具栏：对齐 DefectList 风格 */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 shadow-sm transition-colors active:scale-95">
            <Plus size={16} strokeWidth={2.5} /> 登记风险
          </button>
          <div className="relative">
             <button className="px-3 py-1.5 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-1 transition-colors">
               批量操作 <ChevronDown size={14} className="text-slate-400" />
             </button>
          </div>
        </div>
        <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800 transition-colors">
            <Search size={14} /> <span>搜索</span>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800 transition-colors">
            <Filter size={14} /> <span>过滤</span>
          </div>
          <div className="text-slate-400">共 {MOCK_RISKS.length} 个</div>
          <button className="p-1 hover:bg-slate-100 rounded transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* 表格区：对齐 DefectList 风格 */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="bg-white border-b border-slate-200 sticky top-0 z-10 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="py-3 px-4 relative group/th truncate" style={{ width: colWidths[i] }}>
                  {col === '选中' ? <input type="checkbox" className="rounded border-slate-300" /> : col}
                  {i < columns.length - 1 && (
                    <div 
                      onMouseDown={(e) => onMouseDown(i, e)} 
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 group-active/th:bg-blue-600 transition-colors z-20" 
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {MOCK_RISKS.map(risk => {
                const isCritical = risk.probability === '高' && risk.impact === '高';
                return (
                    <tr key={risk.id} className={`hover:bg-slate-50 transition-colors group cursor-pointer ${isCritical ? 'bg-red-50/40' : ''}`}>
                        <td className="py-3 px-4"><input type="checkbox" className="rounded border-slate-300" onClick={(e) => e.stopPropagation()} /></td>
                        <td className="py-3 px-4 truncate">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-1 rounded leading-none py-0.5">{risk.id}</span>
                                    <span className="text-slate-700 font-semibold group-hover:text-blue-600 transition-colors truncate">{risk.title}</span>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-0.5 ml-14">创建于 {risk.created}</span>
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                risk.probability === '高' ? 'bg-red-50 text-red-600 border-red-100' :
                                risk.probability === '中' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                                'bg-green-50 text-green-600 border-green-100'
                            }`}>{risk.probability}</span>
                        </td>
                        <td className="py-3 px-4">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                risk.impact === '高' ? 'bg-red-50 text-red-600 border-red-100' :
                                risk.impact === '中' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                                'bg-green-50 text-green-600 border-green-100'
                            }`}>{risk.impact}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 truncate">{risk.strategy}</td>
                        <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                                    {risk.owner.slice(0, 1).toUpperCase()}
                                </div>
                                <span className="text-slate-600 truncate font-medium">{risk.owner}</span>
                            </div>
                        </td>
                        <td className="py-3 px-4"><StatusBadge status={risk.status} /></td>
                        <td className="py-3 px-4 text-right">
                             <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded shadow-sm border border-transparent hover:border-slate-100">
                                    <MoreHorizontal size={16} />
                                </button>
                             </div>
                        </td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
