
import React, { useState } from 'react';
import { 
  ChevronDown, Plus, Edit3, Filter, HelpCircle, 
  MoreHorizontal, ChevronRight, LayoutGrid, Calendar,
  Flag, ListFilter
} from '../Icons';

interface GanttTask {
  id: string;
  title: string;
  type: 'MILESTONE' | 'STORY' | 'QUICK_ADD';
  handler: string;
  priority: 'High' | 'Middle' | 'Low' | 'Nice To Have' | null;
  start: string;
  end: string;
  level: number;
  isExpanded?: boolean;
}

const MOCK_GANTT_DATA: GanttTask[] = [
  { id: 'm1', title: '里程碑', type: 'MILESTONE', handler: '', priority: null, start: '', end: '', level: 0 },
  { id: 'q1', title: '快速创建', type: 'QUICK_ADD', handler: '', priority: null, start: '', end: '', level: 0 },
  { id: 's1', title: '【示例】校园小拍买家应用', type: 'STORY', handler: '-', priority: 'High', start: '-', end: '-', level: 0, isExpanded: true },
  { id: 's2', title: '【示例】商品订单管理', type: 'STORY', handler: '-', priority: 'High', start: '-', end: '-', level: 1, isExpanded: true },
  { id: 's3', title: '【示例】订单撤销', type: 'STORY', handler: '-', priority: 'Middle', start: '-', end: '-', level: 2 },
  { id: 's4', title: '【示例】我的订单查看', type: 'STORY', handler: '-', priority: 'High', start: '-', end: '-', level: 2 },
  { id: 's5', title: '【示例】商品竞价/购买', type: 'STORY', handler: '-', priority: 'Middle', start: '-', end: '-', level: 1 },
  { id: 's6', title: '【示例】分支主题', type: 'STORY', handler: '-', priority: 'Nice To Have', start: '-', end: '-', level: 1 },
  { id: 's7', title: '【示例】个人中心', type: 'STORY', handler: '-', priority: 'Low', start: '-', end: '-', level: 1 },
  { id: 's8', title: '【示例】商品评价', type: 'STORY', handler: '-', priority: 'Middle', start: '-', end: '-', level: 1 },
  { id: 's9', title: '【示例】商品支付', type: 'STORY', handler: '-', priority: 'Middle', start: '-', end: '-', level: 1 },
  { id: 's10', title: '【示例】校园小拍卖家应用', type: 'STORY', handler: '-', priority: 'Middle', start: '-', end: '-', level: 0 },
  { id: 's11', title: '【示例】个人中心', type: 'STORY', handler: '-', priority: 'Middle', start: '-', end: '-', level: 1 },
  { id: 's12', title: '【示例】订单管理', type: 'STORY', handler: '-', priority: 'High', start: '-', end: '-', level: 0 },
  { id: 's13', title: '【示例】订单退款', type: 'STORY', handler: '-', priority: 'Middle', start: '-', end: '-', level: 1 },
];

export const ProjectGantt: React.FC = () => {
  const [viewType, setViewType] = useState('所有的');
  const [timeScale, setTimeScale] = useState('周');

  const getPriorityStyle = (priority: string | null) => {
    switch (priority) {
      case 'High': return 'bg-red-400 text-white';
      case 'Middle': return 'bg-emerald-500 text-white';
      case 'Low': return 'bg-slate-400 text-white';
      case 'Nice To Have': return 'bg-slate-500 text-white';
      default: return 'bg-slate-100 text-slate-400';
    }
  };

  // 生成模拟日期刻度 (25-28)
  const timelineDates = [
    { day: '25', week: '六' },
    { day: '26', week: '日' },
    { day: '27', week: '一' },
    { day: '28', week: '二' },
    { day: '29', week: '三' },
    { day: '30', week: '四' },
  ];

  return (
    <div className="flex flex-col h-full bg-white -m-6 overflow-hidden">
      {/* 顶部工具栏 - 高度还原原型 */}
      <div className="h-12 border-b border-slate-200 flex items-center justify-between px-4 bg-white flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-slate-200 rounded px-2 py-1 bg-slate-50 text-sm text-slate-600 hover:bg-white transition-all cursor-pointer">
            <span>{viewType}</span>
            <ChevronDown size={14} className="ml-1 opacity-60" />
          </div>
          <button className="p-1 hover:bg-slate-100 rounded text-blue-600">
            <Plus size={18} strokeWidth={2.5} />
          </button>
          <div className="h-6 w-px bg-slate-200 mx-1"></div>
          <div className="flex items-center gap-2 text-sm">
             <Calendar size={16} className="text-slate-400" />
             <span className="text-slate-400">项目选择</span>
             <div className="flex items-center gap-1 border border-slate-200 rounded px-2 py-1 min-w-[120px] justify-between cursor-pointer hover:border-blue-300">
                <span className="text-slate-700">CICD</span>
                <ChevronDown size={14} className="text-slate-400" />
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600">
            <Edit3 size={14} />
            <span>编辑模式</span>
          </button>
          <button className="px-3 py-1 border border-slate-200 rounded text-xs font-medium text-slate-600 bg-white hover:bg-slate-50">
            今日
          </button>
          <div className="flex items-center border border-slate-200 rounded overflow-hidden">
            <button className="px-3 py-1 text-xs font-medium border-r border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
              {timeScale}
            </button>
            <button className="px-1.5 py-1 bg-white hover:bg-slate-50">
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>
          <div className="flex items-center gap-1 text-sm text-slate-500 cursor-pointer hover:text-slate-800">
             <ListFilter size={14} className="opacity-70" />
             <span>分组: 按工作项查看</span>
          </div>
          <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800">
             <Filter size={14} className="opacity-70" />
             <span>过滤</span>
          </button>
          <span className="text-sm text-slate-400">共 16 个</span>
          <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800">
             <HelpCircle size={16} />
             <span>帮助</span>
          </button>
          <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
             <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* 主视图区域 */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* 左侧表格部分 */}
        <div className="w-[600px] border-r border-slate-200 flex flex-col flex-shrink-0 bg-white z-10 shadow-sm">
          <div className="flex bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest flex-shrink-0">
            <div className="w-12 py-3 text-center border-r border-slate-100"><input type="checkbox" className="rounded" /></div>
            <div className="flex-1 py-3 px-4 border-r border-slate-100">
              <div className="flex items-center gap-2">
                <ChevronDown size={12} className="opacity-50" />
                标题
              </div>
            </div>
            <div className="w-24 py-3 px-4 border-r border-slate-100 text-center">处理人</div>
            <div className="w-20 py-3 px-4 border-r border-slate-100 text-center">优先级</div>
            <div className="w-24 py-3 px-4 border-r border-slate-100 text-center bg-blue-50/50 text-blue-500 relative">
              预计开始
              <div className="absolute right-1 top-1/2 -translate-y-1/2"><ListFilter size={10} /></div>
            </div>
            <div className="w-24 py-3 px-4 text-center">预计结束</div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
            {MOCK_GANTT_DATA.map((task, idx) => (
              <div key={task.id} className="flex border-b border-slate-50 hover:bg-blue-50/30 transition-colors h-[40px] items-center text-sm group">
                <div className="w-12 text-center flex-shrink-0"><input type="checkbox" className="rounded" /></div>
                <div className="flex-1 px-4 truncate flex items-center gap-2 overflow-hidden">
                  <div style={{ marginLeft: `${task.level * 20}px` }} className="flex items-center gap-2">
                    {task.type === 'MILESTONE' ? (
                       <div className="bg-blue-600 text-white p-1 rounded-sm rotate-45 scale-75">
                         <Flag size={12} className="-rotate-45" />
                       </div>
                    ) : task.type === 'QUICK_ADD' ? (
                      <Plus size={14} className="text-slate-400" />
                    ) : (
                      <ChevronRight size={14} className={`text-slate-300 transition-transform ${task.isExpanded ? 'rotate-90' : ''}`} />
                    )}
                    
                    {task.type === 'STORY' && (
                       <span className="bg-blue-500 text-white text-[9px] px-1 rounded leading-none py-0.5 font-bold flex-shrink-0">STORY</span>
                    )}
                    
                    <span className={`${task.type === 'MILESTONE' ? 'font-bold text-slate-800' : 'text-slate-700'} truncate ${task.type === 'QUICK_ADD' ? 'text-slate-300' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                </div>
                <div className="w-24 px-4 text-center text-slate-400 flex-shrink-0">{task.handler || '-'}</div>
                <div className="w-20 px-4 text-center flex-shrink-0 flex justify-center">
                  {task.priority && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold min-w-[40px] text-center ${getPriorityStyle(task.priority)}`}>
                      {task.priority}
                    </span>
                  )}
                  {!task.priority && task.type === 'STORY' && <span className="text-slate-300">-</span>}
                </div>
                <div className="w-24 px-4 text-center text-slate-300 flex-shrink-0">-</div>
                <div className="w-24 px-4 text-center text-slate-300 flex-shrink-0">-</div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧时间轴刻度部分 */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden bg-white custom-scrollbar">
           <div className="min-w-full inline-block">
             {/* 日期头部 */}
             <div className="flex border-b border-slate-200 bg-white flex-shrink-0 h-[52px]">
               <div className="sticky left-0 bg-white border-r border-slate-100 w-12 flex flex-col items-center justify-center text-slate-300 text-[10px] font-bold">
                 2025
               </div>
               {timelineDates.map((date, i) => (
                 <div key={i} className={`flex-1 min-w-[80px] border-r border-slate-100 flex flex-col items-center justify-center ${i === 1 ? 'bg-blue-50/20' : ''}`}>
                    <span className="text-sm font-bold text-slate-400">{date.day}</span>
                    <span className="text-[10px] text-slate-300 font-medium">{date.week}</span>
                 </div>
               ))}
             </div>
             
             {/* 背景网格线 */}
             <div className="relative h-full">
               <div className="absolute inset-0 flex">
                  {timelineDates.map((_, i) => (
                    <div key={i} className={`flex-1 min-w-[80px] border-r border-slate-50 h-screen ${i === 1 ? 'bg-slate-50/30' : ''}`}></div>
                  ))}
               </div>
               {/* 这里将来可以渲染甘特图的条形图 */}
             </div>
           </div>
        </div>

        {/* 分栏拖拽手柄模拟 */}
        <div className="absolute left-[600px] top-0 bottom-0 w-6 flex flex-col items-center justify-center cursor-ew-resize z-20 pointer-events-none">
           <div className="w-6 h-6 bg-slate-400/50 rounded-full flex items-center justify-center text-white pointer-events-auto">
             <ChevronRight size={14} className="rotate-180" />
           </div>
        </div>
      </div>
    </div>
  );
};
