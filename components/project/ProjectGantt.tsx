
import React, { useState, useRef } from 'react';
import { 
  ChevronDown, Plus, Edit3, Filter, HelpCircle, 
  MoreHorizontal, ChevronRight, Calendar,
  Flag, ListFilter
} from '../Icons';
import { Priority } from '../../types';

interface GanttTask {
  id: string;
  title: string;
  type: 'MILESTONE' | 'STORY' | 'QUICK_ADD';
  handler: string;
  priority: Priority | null;
  start: string;
  end: string;
  level: number;
  isExpanded?: boolean;
}

const MOCK_GANTT_DATA: GanttTask[] = [
  { id: 'm1', title: '里程碑', type: 'MILESTONE', handler: '', priority: null, start: '', end: '', level: 0 },
  { id: 'q1', title: '快速创建', type: 'QUICK_ADD', handler: '', priority: null, start: '', end: '', level: 0 },
  { id: 's1', title: '【示例】校园小拍买家应用', type: 'STORY', handler: '-', priority: Priority.High, start: '-', end: '-', level: 0, isExpanded: true },
  { id: 's2', title: '【示例】商品订单管理', type: 'STORY', handler: '-', priority: Priority.High, start: '-', end: '-', level: 1, isExpanded: true },
  { id: 's3', title: '【示例】订单撤销', type: 'STORY', handler: '-', priority: Priority.Normal, start: '-', end: '-', level: 2 },
  { id: 's4', title: '【示例】我的订单查看', type: 'STORY', handler: '-', priority: Priority.High, start: '-', end: '-', level: 2 },
  { id: 's5', title: '【示例】商品竞价/购买', type: 'STORY', handler: '-', priority: Priority.Normal, start: '-', end: '-', level: 1 },
];

export const ProjectGantt: React.FC = () => {
  const [viewType, setViewType] = useState('所有的');
  
  // 列宽状态
  const [colWidths, setColWidths] = useState([48, 250, 80, 80, 100, 100]);
  const resizingRef = useRef<{ index: number; startX: number; startWidth: number } | null>(null);

  const onMouseDown = (index: number, e: React.MouseEvent) => {
    resizingRef.current = { index, startX: e.pageX, startWidth: colWidths[index] };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'col-resize';
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
  };

  const getPriorityStyle = (priority: Priority | null) => {
    switch (priority) {
      case Priority.High: return 'bg-red-400 text-white';
      case Priority.Normal: return 'bg-emerald-500 text-white';
      case Priority.Low: return 'bg-slate-400 text-white';
      default: return 'bg-slate-100 text-slate-400';
    }
  };

  const timelineDates = [{ day: '25', week: '六' }, { day: '26', week: '日' }, { day: '27', week: '一' }, { day: '28', week: '二' }, { day: '29', week: '三' }];

  return (
    <div className="flex flex-col h-full bg-white -m-6 overflow-hidden">
      <div className="h-12 border-b border-slate-200 flex items-center justify-between px-4 bg-white flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-slate-200 rounded px-2 py-1 bg-slate-50 text-sm text-slate-600 cursor-pointer">
            <span>{viewType}</span> <ChevronDown size={14} className="ml-1 opacity-60" />
          </div>
          <button className="p-1 text-blue-600"><Plus size={18} strokeWidth={2.5} /></button>
          <div className="flex items-center gap-2 text-sm text-slate-400"><Calendar size={16} /> <span>项目选择</span></div>
        </div>
        <div className="flex items-center gap-4 text-slate-500 text-sm">
           <Filter size={14} /> <span>过滤</span> <MoreHorizontal size={18} />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* 左侧任务列表区 */}
        <div style={{ width: colWidths.reduce((a, b) => a + b, 0) }} className="border-r border-slate-200 flex flex-col flex-shrink-0 bg-white z-10 shadow-sm transition-[width] duration-75">
          <div className="flex bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-shrink-0">
             {[
               { label: '', width: colWidths[0] },
               { label: '标题', width: colWidths[1] },
               { label: '处理人', width: colWidths[2] },
               { label: '优先级', width: colWidths[3] },
               { label: '预计开始', width: colWidths[4] },
               { label: '预计结束', width: colWidths[5] }
             ].map((col, i) => (
               <div key={i} className="py-3 px-2 border-r border-slate-100 relative group/th truncate" style={{ width: col.width }}>
                 {col.label}
                 <div onMouseDown={(e) => onMouseDown(i, e)} className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 z-20" />
               </div>
             ))}
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {MOCK_GANTT_DATA.map((task) => (
              <div key={task.id} className="flex border-b border-slate-50 hover:bg-blue-50/30 h-[40px] items-center text-xs">
                <div style={{ width: colWidths[0] }} className="text-center flex-shrink-0"><input type="checkbox" className="rounded" /></div>
                <div style={{ width: colWidths[1] }} className="px-2 truncate flex items-center gap-1 overflow-hidden">
                  <div style={{ marginLeft: `${task.level * 16}px` }} className="flex items-center gap-1 truncate">
                    {task.type === 'MILESTONE' ? <Flag size={10} className="text-blue-600" /> : <ChevronRight size={12} className="text-slate-300" />}
                    <span className="truncate">{task.title}</span>
                  </div>
                </div>
                <div style={{ width: colWidths[2] }} className="px-2 text-center text-slate-400 truncate flex-shrink-0">{task.handler || '-'}</div>
                <div style={{ width: colWidths[3] }} className="px-2 text-center flex-shrink-0 flex justify-center">
                  {task.priority && <span className={`px-1 rounded text-[9px] font-bold min-w-[30px] ${getPriorityStyle(task.priority)}`}>{task.priority}</span>}
                </div>
                <div style={{ width: colWidths[4] }} className="px-2 text-center text-slate-300 flex-shrink-0">-</div>
                <div style={{ width: colWidths[5] }} className="px-2 text-center text-slate-300 flex-shrink-0">-</div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧时间轴区 */}
        <div className="flex-1 overflow-x-auto bg-white custom-scrollbar">
           <div className="min-w-full inline-block">
             <div className="flex border-b border-slate-200 bg-white h-[52px]">
               {timelineDates.map((date, i) => (
                 <div key={i} className="flex-1 min-w-[80px] border-r border-slate-100 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold text-slate-400">{date.day}</span>
                    <span className="text-[10px] text-slate-300">{date.week}</span>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
