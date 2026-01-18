
import React, { useState, useRef } from 'react';
import { 
  Search, Filter, Plus, ChevronDown, ListFilter, 
  MoreHorizontal, BarChart2, Bug, 
  Download, Printer, Maximize2
} from '../Icons';
import { Task, TaskType, Priority } from '../../types';

interface Defect {
  id: string;
  title: string;
  version: string;
  severity: '严重' | '一般' | '低';
  priority: '高' | '中' | '低';
  status: '接受/处理' | '新' | '已解决' | '已关闭';
  handler: string;
  creator: string;
  createTime: string;
}

interface DefectListProps {
  onDefectClick?: (task: Partial<Task>) => void;
}

const MOCK_DEFECTS: Defect[] = [
  { id: '1', title: '【优化】选择“其他银行”时展示“银行名称”', version: '版本1', severity: '严重', priority: '高', status: '接受/处理', handler: '-', creator: 'TAPD', createTime: '2026-01-01 13:55' },
  { id: '2', title: '当银行卡有该张卡的时候，还是能走到一...', version: '版本1', severity: '一般', priority: '中', status: '新', handler: '-', creator: 'TAPD', createTime: '2026-01-01 13:55' },
];

export const DefectList: React.FC<DefectListProps> = ({ onDefectClick }) => {
  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);
  
  // 列宽状态
  const [colWidths, setColWidths] = useState([48, 350, 100, 100, 80, 100, 100, 100, 160]);
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

  const getSeverityColor = (sev: string) => sev === '严重' ? 'bg-red-500' : sev === '一般' ? 'bg-emerald-500' : 'bg-slate-400';
  const getPriorityStyle = (pri: string) => pri === '高' ? 'bg-red-400 text-white' : 'bg-emerald-500 text-white';

  const handleRowClick = (defect: Defect) => {
    if (onDefectClick) {
      onDefectClick({
        id: defect.id,
        displayId: `#BUG-${defect.id}`,
        title: defect.title,
        type: TaskType.Defect,
        priority: defect.priority === '高' ? Priority.High : Priority.Normal,
        statusColor: 'bg-red-500',
        dueDate: '2026-01-10'
      });
    }
  };

  const columns = ['选中', '标题', '版本', '严重程度', '优先级', '状态', '处理人', '创建人', '创建时间'];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden font-sans">
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 shadow-sm">
            <Plus size={16} strokeWidth={2.5} /> 创建
          </button>
          <div className="relative">
             <button onClick={() => setIsMoreActionsOpen(!isMoreActionsOpen)} className="px-3 py-1.5 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-1">
               更多操作 <ChevronDown size={14} className={isMoreActionsOpen ? 'rotate-180' : ''} />
             </button>
          </div>
        </div>
        <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800"><Filter size={14} /> <span>过滤</span></div>
          <div className="text-slate-400">共 {MOCK_DEFECTS.length} 个</div>
          <button className="p-1 hover:bg-slate-100 rounded"><MoreHorizontal size={18} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="bg-white border-b border-slate-200 sticky top-0 z-10 text-slate-400 text-xs font-bold uppercase">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="py-3 px-4 relative group/th" style={{ width: colWidths[i] }}>
                  {col === '选中' ? <input type="checkbox" className="rounded" /> : col}
                  <div onMouseDown={(e) => onMouseDown(i, e)} className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 transition-colors z-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {MOCK_DEFECTS.map((defect) => (
              <tr key={defect.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer" onClick={() => handleRowClick(defect)}>
                <td className="py-3 px-4"><input type="checkbox" className="rounded border-slate-300" onClick={(e) => e.stopPropagation()} /></td>
                <td className="py-3 px-4 truncate">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500 text-white text-[9px] px-1 rounded leading-none py-0.5 font-bold flex-shrink-0">BUG</span>
                    <span className="text-slate-700 hover:text-blue-600 truncate">{defect.title}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-500 truncate">{defect.version}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getSeverityColor(defect.severity)}`}></div>
                    <span className="text-slate-600 truncate">{defect.severity}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${getPriorityStyle(defect.priority)}`}>
                    {defect.priority.charAt(0)}
                  </div>
                </td>
                <td className="py-3 px-4 truncate text-xs">{defect.status}</td>
                <td className="py-3 px-4 text-slate-400 truncate">{defect.handler}</td>
                <td className="py-3 px-4 text-slate-700 truncate">{defect.creator}</td>
                <td className="py-3 px-4 text-slate-500 font-mono truncate">{defect.createTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
