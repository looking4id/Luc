
import React, { useState } from 'react';
import { 
  Search, Filter, Plus, ChevronDown, ListFilter, 
  MoreHorizontal, Maximize2, ChevronRight, AlertTriangle,
  FolderTree, LayoutGrid
} from '../Icons';

interface Requirement {
  id: string;
  title: string;
  type: 'EPIC' | 'STORY';
  priority: 'High' | 'Middle';
  iteration: string;
  status: string;
  hasWarning?: boolean;
  children?: Requirement[];
  level: number;
  isExpanded?: boolean;
}

const MOCK_REQUIREMENTS: Requirement[] = [
  { id: '1000039', title: '测试需求', type: 'STORY', priority: 'Middle', iteration: '-', status: '规划中', level: 0 },
  { id: '1000002', title: '数据中心', type: 'EPIC', priority: 'High', iteration: '【存款产品】...', status: '规划中', level: 0 },
  { id: '1000001', title: '用户平台开发', type: 'EPIC', priority: 'High', iteration: '-', status: '规划中', hasWarning: true, level: 0 },
  { 
    id: '1000004', 
    title: '金融应用（社交、保险、分期）', 
    type: 'EPIC', 
    priority: 'High', 
    iteration: '-', 
    status: '规划中', 
    hasWarning: true, 
    level: 0,
    isExpanded: true,
    children: [
      { id: '1000010', title: '金融应用-保险', type: 'STORY', priority: 'High', iteration: '【金融与应用...', status: '规划中', hasWarning: true, level: 1 },
    ]
  },
  { 
    id: '1000003', 
    title: '支付安全', 
    type: 'EPIC', 
    priority: 'High', 
    iteration: '-', 
    status: '规划中', 
    hasWarning: true, 
    level: 0,
    isExpanded: true,
    children: [
      { id: '1000009', title: '支付安全-系统安全加固', type: 'STORY', priority: 'Middle', iteration: '【支付安全】...', status: '规划中', hasWarning: true, level: 1 },
      { id: '1000008', title: '支付安全-反欺诈风控', type: 'STORY', priority: 'High', iteration: '【支付安全】...', status: '规划中', level: 1 },
      { id: '1000018', title: '支付安全-安全技术合规', type: 'STORY', priority: 'Middle', iteration: '【支付安全】...', status: '规划中', level: 1 },
    ]
  },
  { 
    id: '1000006', 
    title: '清算平台', 
    type: 'EPIC', 
    priority: 'High', 
    iteration: '-', 
    status: '规划中', 
    level: 0,
    isExpanded: true,
    children: [
      { id: '1000014', title: '清算平台-合规处理', type: 'STORY', priority: 'High', iteration: '【存款产品】...', status: '规划中', level: 1 },
      { id: '1000017', title: '清算平台-结算收入', type: 'STORY', priority: 'High', iteration: '【存款产品】...', status: '规划中', level: 1 },
    ]
  },
  { id: '1000005', title: '交易平台', type: 'EPIC', priority: 'High', iteration: '-', status: '规划中', level: 0 },
];

export const RequirementList: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('所有的');

  const categories = [
    { name: '所有的', count: 21 },
    { name: '未分类', count: 1 },
    { name: '产品需求', count: 0 },
    { name: '技术需求', count: 0 },
    { name: '交易平台', count: 6 },
    { name: '清算平台', count: 3 },
    { name: '支付安全', count: 4 },
    { name: '用户平台开发', count: 1 },
    { name: '金融应用（社交、...', count: 0, isFull: '金融应用（社交、保险、分期）' },
    { name: '商业运营（审...', count: 0 },
  ];

  return (
    <div className="flex h-full bg-white -m-6 overflow-hidden">
      {/* 左侧分类侧边栏 */}
      <div className={`transition-all duration-300 border-r border-slate-200 bg-white flex flex-col flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
        <div className="p-4 flex items-center justify-between border-b border-slate-100 flex-shrink-0 h-12">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <LayoutGrid size={14} className="text-slate-400" />
            <span>分类</span>
          </div>
          <Search size={16} className="text-slate-400 cursor-pointer hover:text-blue-500" />
        </div>
        <div className="flex-1 overflow-y-auto py-2 px-1 custom-scrollbar">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-sm mb-0.5 transition-all group ${
                activeCategory === cat.name ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 truncate pr-2">
                {idx === 0 ? <ChevronDown size={14} /> : <div className="w-3.5" />}
                <span className="truncate" title={cat.isFull || cat.name}>{cat.name}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">{cat.count > 0 ? cat.count : ''}</span>
              {activeCategory === cat.name && idx > 0 && <MoreHorizontal size={14} className="ml-1 opacity-40 group-hover:opacity-100" />}
            </div>
          ))}
        </div>
      </div>

      {/* 收缩按钮占位 */}
      <div className="relative w-0 z-20">
         <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-300 hover:text-blue-500 shadow-sm transition-all"
         >
           <ChevronRight size={14} className={isSidebarOpen ? 'rotate-180' : ''} />
         </button>
      </div>

      {/* 主体内容区 */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/30">
        {/* 工具栏 */}
        <div className="px-4 py-3 bg-white flex items-center justify-between border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 transition-colors shadow-sm">
              <Plus size={16} strokeWidth={2.5} />
              创建
            </button>
            <button className="px-3 py-1.5 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-1">
              更多操作
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>

          <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
              <Maximize2 size={14} className="opacity-70" />
              <span>视图: 所有的</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
              <ListFilter size={14} className="opacity-70" />
              <span>分组: 无分组</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
              <Filter size={14} className="opacity-70" />
              <span>过滤</span>
            </div>
            <div className="text-slate-400">
              共 21 个
            </div>
            <button className="p-1 hover:bg-slate-100 rounded">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* 树状表格 */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white border-b border-slate-100 sticky top-0 z-10 text-slate-400 text-sm font-bold">
              <tr>
                <th className="py-3 px-4 w-12 text-center"><input type="checkbox" className="rounded border-slate-300" /></th>
                <th className="py-3 px-4 w-32">ID</th>
                <th className="py-3 px-4 min-w-[400px]">标题 (21)</th>
                <th className="py-3 px-4 w-32">优先级</th>
                <th className="py-3 px-4 w-40">迭代</th>
                <th className="py-3 px-4 w-32">状态</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* 快速创建行 */}
              <tr className="border-b border-slate-50">
                 <td></td>
                 <td></td>
                 <td colSpan={4} className="py-2.5 px-10 text-slate-300 text-sm">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 w-fit">
                      <Plus size={14} /> 快速创建
                    </div>
                 </td>
              </tr>
              
              {MOCK_REQUIREMENTS.map((req) => (
                <React.Fragment key={req.id}>
                  <tr className="hover:bg-slate-50/80 transition-colors group cursor-pointer border-b border-slate-50">
                    <td className="py-3 px-4 text-center">
                      <input type="checkbox" className="rounded border-slate-300" onClick={(e) => e.stopPropagation()} />
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 font-bold">{req.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2" style={{ paddingLeft: `${req.level * 24}px` }}>
                        {req.children ? (
                           <ChevronRight size={14} className={`text-slate-400 transition-transform ${req.isExpanded ? 'rotate-90' : ''}`} />
                        ) : (
                          <div className="w-3.5" />
                        )}
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold text-white leading-none ${req.type === 'EPIC' ? 'bg-purple-400' : 'bg-blue-500'}`}>
                          {req.type}
                        </span>
                        <span className="text-slate-700 hover:text-blue-600 transition-colors truncate">
                          {req.title}
                        </span>
                        {req.hasWarning && <AlertTriangle size={14} className="text-orange-400" />}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded text-xs font-bold text-white min-w-[60px] inline-block text-center ${
                        req.priority === 'High' ? 'bg-red-400' : 'bg-emerald-500'
                      }`}>
                        {req.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 truncate max-w-[120px]" title={req.iteration}>
                      {req.iteration}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full border border-emerald-500 text-emerald-500 text-xs font-bold">
                        {req.status}
                      </span>
                    </td>
                  </tr>

                  {req.isExpanded && req.children?.map(child => (
                    <tr key={child.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer border-b border-slate-50">
                      <td className="py-3 px-4 text-center">
                        <input type="checkbox" className="rounded border-slate-300" onClick={(e) => e.stopPropagation()} />
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500 font-bold">{child.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2" style={{ paddingLeft: `${child.level * 24 + 14}px` }}>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold text-white leading-none ${child.type === 'EPIC' ? 'bg-purple-400' : 'bg-blue-500'}`}>
                            {child.type}
                          </span>
                          <span className="text-slate-700 hover:text-blue-600 transition-colors truncate">
                            {child.title}
                          </span>
                          {child.hasWarning && <AlertTriangle size={14} className="text-orange-400" />}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded text-xs font-bold text-white min-w-[60px] inline-block text-center ${
                          child.priority === 'High' ? 'bg-red-400' : 'bg-emerald-500'
                        }`}>
                          {child.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 truncate max-w-[120px]">
                        {child.iteration}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 rounded-full border border-emerald-500 text-emerald-500 text-xs font-bold">
                          {child.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
