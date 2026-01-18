
import React, { useState, useRef, useMemo } from 'react';
import { 
  Search, Filter, Plus, ChevronDown, 
  MoreHorizontal, Trash2, Edit3, Bug
} from '../Icons';
import { Task, TaskType, Priority, Severity } from '../../types';
import { StatusBadge, PriorityBadge, SeverityBadge } from '../ProjectShared';

interface DefectListProps {
  tasks: Task[];
  onCreate: () => void;
  onDefectClick: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const DefectList: React.FC<DefectListProps> = ({ tasks, onCreate, onDefectClick, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 过滤出当前项目的缺陷类型并支持搜索
  const defects = useMemo(() => {
    return tasks.filter(t => 
      t.type === TaskType.Defect && 
      (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.displayId.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [tasks, searchQuery]);

  // 列宽状态管理
  const [colWidths, setColWidths] = useState([48, 100, 380, 110, 110, 110, 120, 110, 80]);
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

  const columns = ['选中', 'ID', '缺陷标题', '当前状态', '优先级', '严重程度', '发现环境', '处理人', '操作'];

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden font-sans -m-6">
      {/* 增强型工具栏 */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 flex-shrink-0 bg-slate-50/30">
        <div className="flex items-center gap-4">
          <button 
            onClick={onCreate}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-black flex items-center gap-2 shadow-lg shadow-red-100 transition-all active:scale-95"
          >
            <Plus size={16} strokeWidth={3} /> 创建缺陷
          </button>
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索缺陷 ID 或标题关键词..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:border-red-400 outline-none w-72 bg-white transition-all shadow-sm"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
        <div className="flex items-center gap-6 text-slate-500 text-sm font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800 transition-colors">
            <Filter size={16} /> <span>过滤</span>
          </div>
          <div className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">TOTAL: {defects.length}</div>
          <button className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-400">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* 交互式表格区 */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-white">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="bg-white border-b border-slate-200 sticky top-0 z-10 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="py-4 px-4 relative group/th truncate" style={{ width: colWidths[i] }}>
                  {col === '选中' ? <input type="checkbox" className="rounded border-slate-300" /> : col}
                  {i < columns.length - 1 && (
                    <div 
                      onMouseDown={(e) => onMouseDown(i, e)} 
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-red-400 group-active/th:bg-red-600 transition-colors z-20" 
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {defects.map((defect) => (
              <tr 
                key={defect.id} 
                className="hover:bg-red-50/10 transition-colors group cursor-pointer" 
                onClick={() => onDefectClick(defect)}
              >
                <td className="py-4 px-4"><input type="checkbox" className="rounded border-slate-300" onClick={(e) => e.stopPropagation()} /></td>
                <td className="py-4 px-4 font-mono font-black text-slate-400 text-[11px] truncate">{defect.displayId}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 truncate">
                    <span className="bg-red-500 text-white text-[9px] px-1 rounded leading-none py-0.5 font-black flex-shrink-0">BUG</span>
                    <span className="text-slate-800 font-bold group-hover:text-red-600 transition-colors truncate">{defect.title}</span>
                  </div>
                </td>
                <td className="py-4 px-4"><StatusBadge status={defect.statusColor.includes('green') ? '已关闭' : '处理中'} /></td>
                <td className="py-4 px-4"><PriorityBadge priority={defect.priority} /></td>
                <td className="py-4 px-4"><SeverityBadge severity={defect.severity} /></td>
                <td className="py-4 px-4"><span className="text-xs font-bold text-slate-500">{defect.environment || '-'}</span></td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 truncate">
                    <div className={`w-6 h-6 rounded-full ${defect.assignee.avatarColor} text-white flex items-center justify-center text-[10px] font-black shadow-sm`}>
                      {defect.assignee.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-600 truncate">{defect.assignee.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDefectClick(defect); }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDelete(defect.id); }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {defects.length === 0 && (
              <tr>
                <td colSpan={9} className="py-32 text-center text-slate-300 font-bold">
                   <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <Bug size={40} strokeWidth={1} />
                      </div>
                      <p>未发现匹配的缺陷记录</p>
                      <button onClick={onCreate} className="text-red-500 hover:underline text-sm font-black">立即登记第一个缺陷</button>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
