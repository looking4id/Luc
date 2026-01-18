
import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Filter, Plus, ChevronDown, ListFilter, 
  MoreHorizontal, Maximize2, ChevronRight, AlertTriangle,
  FolderTree, LayoutGrid
} from '../Icons';
import { Task, TaskType, Priority } from '../../types';

interface Requirement {
  id: string;
  title: string;
  type: 'EPIC' | 'STORY';
  priority: Priority;
  iteration: string;
  status: string;
  hasWarning?: boolean;
  children?: Requirement[];
  level: number;
  isExpanded?: boolean;
}

interface RequirementListProps {
  onRequirementClick?: (task: Partial<Task>) => void;
}

const MOCK_REQUIREMENTS: Requirement[] = [
  { id: '1000039', title: '核心业务中台构建', type: 'EPIC', priority: Priority.High, iteration: '-', status: '规划中', level: 0, isExpanded: true, children: [
    { id: '1000040', title: '用户中心模块开发', type: 'STORY', priority: Priority.Normal, iteration: 'Sprint 1', status: '开发中', level: 1 },
    { id: '1000041', title: '权限校验子系统', type: 'STORY', priority: Priority.High, iteration: 'Sprint 1', status: '开发中', level: 1 },
  ]},
  { id: '1000002', title: '数据统计分析系统', type: 'EPIC', priority: Priority.High, iteration: '【存款产品】...', status: '规划中', level: 0 },
  { id: '1000001', title: '移动端体验优化', type: 'EPIC', priority: Priority.High, iteration: '-', status: '规划中', hasWarning: true, level: 0 },
  { 
    id: '1000004', 
    title: '金融应用（社交、保险、分期）', 
    type: 'EPIC', 
    priority: Priority.High, 
    iteration: '-', 
    status: '规划中', 
    hasWarning: true, 
    level: 0,
    isExpanded: true,
    children: [
      { id: '1000010', title: '保险业务在线投保流程', type: 'STORY', priority: Priority.High, iteration: '【金融与应用...', status: '规划中', hasWarning: true, level: 1 },
    ]
  },
  { 
    id: '1000003', 
    title: '支付安全升级', 
    type: 'EPIC', 
    priority: Priority.High, 
    iteration: '-', 
    status: '规划中', 
    hasWarning: true, 
    level: 0,
    isExpanded: true,
    children: [
      { id: '1000009', title: '系统底层安全加固', type: 'STORY', priority: Priority.Normal, iteration: '【支付安全】...', status: '规划中', hasWarning: true, level: 1 },
      { id: '1000008', title: '实时反欺诈风控模型', type: 'STORY', priority: Priority.High, iteration: '【支付安全】...', status: '规划中', level: 1 },
      { id: '1000018', title: '全链路安全合规自查', type: 'STORY', priority: Priority.Normal, iteration: '【支付安全】...', status: '规划中', level: 1 },
    ]
  },
];

export const RequirementList: React.FC<RequirementListProps> = ({ onRequirementClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('所有的');
  
  // 列宽状态
  const [colWidths, setColWidths] = useState([48, 120, 500, 100, 150, 100]);
  const resizingRef = useRef<{ index: number; startX: number; startWidth: number } | null>(null);

  const onMouseDown = (index: number, e: React.MouseEvent) => {
    resizingRef.current = {
      index,
      startX: e.pageX,
      startWidth: colWidths[index],
    };
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

  const categories = [
    { name: '所有的', count: 21 },
    { name: '未分类', count: 1 },
    { name: '产品需求', count: 0 },
    { name: '技术需求', count: 0 },
    { name: '交易平台', count: 6 },
    { name: '清算平台', count: 3 },
  ];

  const handleRowClick = (req: Requirement) => {
    if (onRequirementClick) {
      onRequirementClick({
        id: req.id,
        displayId: `#REQ-${req.id}`,
        title: req.title,
        type: TaskType.Requirement,
        priority: req.priority,
        statusColor: 'bg-blue-500',
        dueDate: '2026-01-15'
      });
    }
  };

  const renderRequirementRow = (req: Requirement) => {
    return (
      <tr 
        key={req.id} 
        className={`hover:bg-slate-50/80 transition-colors group cursor-pointer border-b border-slate-50 ${req.level > 0 ? 'bg-slate-50/20' : ''}`} 
        onClick={() => handleRowClick(req)}
      >
        <td className="py-3 px-4 text-center"><input type="checkbox" className="rounded border-slate-300" onClick={(e) => e.stopPropagation()} /></td>
        <td className="py-3 px-4 font-mono text-slate-500 font-bold truncate text-[11px]">{req.id}</td>
        <td className="py-3 px-4 truncate relative">
          <div className="flex items-center gap-1.5" style={{ paddingLeft: `${req.level * 28}px` }}>
            {/* 树状层级连线逻辑 */}
            {req.level > 0 && (
              <>
                <div className="absolute top-0 w-px bg-slate-200" style={{ left: `${(req.level * 28) - 14}px`, height: '50%' }}></div>
                <div className="absolute w-3.5 h-px bg-slate-200" style={{ left: `${(req.level * 28) - 14}px`, top: '50%' }}></div>
              </>
            )}
            
            {req.children ? (
              <div className={`p-0.5 rounded hover:bg-slate-200 transition-colors ${req.isExpanded ? 'bg-slate-100' : ''}`}>
                <ChevronRight size={14} className={`text-slate-500 transition-transform ${req.isExpanded ? 'rotate-90' : ''}`} />
              </div>
            ) : (
              <div className="w-4 h-4 flex items-center justify-center">
                 <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              </div>
            )}
            
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-black text-white leading-none shadow-sm ${req.type === 'EPIC' ? 'bg-purple-500' : 'bg-blue-500'}`}>
              {req.type}
            </span>
            <span className={`text-slate-700 font-semibold truncate group-hover:text-blue-600 transition-colors ${req.level === 0 ? 'text-sm' : 'text-xs'}`}>
              {req.title}
            </span>
          </div>
        </td>
        <td className="py-3 px-4">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
            req.priority === Priority.High ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
          }`}>{req.priority}</span>
        </td>
        <td className="py-3 px-4 text-slate-400 truncate text-xs font-medium">{req.iteration}</td>
        <td className="py-3 px-4">
          <span className="px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black">{req.status}</span>
        </td>
      </tr>
    );
  };

  const renderRequirements = (reqs: Requirement[]) => {
    // Fix: Changed JSX.Element[] to React.ReactNode[] to avoid namespace error
    let elements: React.ReactNode[] = [];
    reqs.forEach(req => {
      elements.push(renderRequirementRow(req));
      if (req.isExpanded && req.children) {
        elements.push(...req.children.map(child => renderRequirementRow(child)));
      }
    });
    return elements;
  };

  return (
    <div className="flex h-full bg-white -m-6 overflow-hidden">
      <div className={`transition-all duration-300 border-r border-slate-200 bg-white flex flex-col flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
        <div className="p-4 flex items-center justify-between border-b border-slate-100 flex-shrink-0 h-12">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <LayoutGrid size={14} className="text-slate-400" />
            <span className="tracking-tight">分类视图</span>
          </div>
          <Search size={16} className="text-slate-400 cursor-pointer hover:text-blue-500 transition-colors" />
        </div>
        <div className="flex-1 overflow-y-auto py-2 px-1 custom-scrollbar">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-sm mb-0.5 transition-all group ${
                activeCategory === cat.name ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 truncate pr-2">
                {idx === 0 ? <ChevronDown size={14} className={activeCategory === cat.name ? 'text-blue-500' : 'text-slate-400'} /> : <div className="w-3.5" />}
                <span className="truncate">{cat.name}</span>
              </div>
              <span className={`text-[10px] font-black px-1.5 rounded-full ${activeCategory === cat.name ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                {cat.count > 0 ? cat.count : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-0 z-20">
         <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-500 shadow-sm transition-all z-30"
         >
           <ChevronRight size={14} className={isSidebarOpen ? 'rotate-180' : ''} />
         </button>
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/10">
        <div className="px-4 py-3 bg-white flex items-center justify-between border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-100 active:scale-95">
              <Plus size={16} strokeWidth={2.5} />
              创建需求
            </button>
            <button className="px-3 py-1.5 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-1 transition-colors">
              批量处理
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>
          <div className="flex items-center gap-6 text-slate-500 text-sm font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800 transition-colors">
              <Filter size={14} className="opacity-70" />
              <span className="text-xs">过滤</span>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">TOTAL: 21</div>
            <button className="p-1 hover:bg-slate-100 rounded transition-colors text-slate-400">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-white custom-scrollbar">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="bg-white border-b border-slate-200 sticky top-0 z-10 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                {[
                  { label: '', width: colWidths[0] },
                  { label: 'ID', width: colWidths[1] },
                  { label: '需求标题', width: colWidths[2] },
                  { label: '优先级', width: colWidths[3] },
                  { label: '所属迭代', width: colWidths[4] },
                  { label: '当前状态', width: colWidths[5] }
                ].map((col, i) => (
                  <th key={i} className="py-3 px-4 relative group/th" style={{ width: col.width }}>
                    {col.label}
                    <div 
                      onMouseDown={(e) => onMouseDown(i, e)}
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 group-active/th:bg-blue-600 transition-colors z-20"
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              {renderRequirements(MOCK_REQUIREMENTS)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
