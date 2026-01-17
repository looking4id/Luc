
import React, { useState } from 'react';
import { 
  Search, Filter, Plus, ChevronDown, ListFilter, 
  MoreHorizontal, Users, BarChart2, HelpCircle, Bug, 
  Download, UploadCloud, Printer, Settings, Maximize2
} from '../Icons';

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

const MOCK_DEFECTS: Defect[] = [
  { 
    id: '1', 
    title: '【优化】选择“其他银行”时展示“银行名称”', 
    version: '版本1', 
    severity: '严重', 
    priority: '高', 
    status: '接受/处理', 
    handler: '-', 
    creator: 'TAPD', 
    createTime: '2026-01-01 13:55' 
  },
  { 
    id: '2', 
    title: '当银行卡有该张卡的时候，还是能走到一...', 
    version: '版本1', 
    severity: '一般', 
    priority: '中', 
    status: '新', 
    handler: '-', 
    creator: 'TAPD', 
    createTime: '2026-01-01 13:55' 
  },
];

export const DefectList: React.FC = () => {
  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);

  const getSeverityColor = (sev: string) => {
    if (sev === '严重') return 'bg-red-500';
    if (sev === '一般') return 'bg-emerald-500';
    return 'bg-slate-400';
  };

  const getPriorityStyle = (pri: string) => {
    if (pri === '高') return 'bg-red-400 text-white';
    if (pri === '中') return 'bg-emerald-500 text-white';
    return 'bg-slate-400 text-white';
  };

  const getStatusStyle = (status: string) => {
    if (status === '接受/处理') return 'border-blue-500 text-blue-600';
    if (status === '新') return 'border-emerald-500 text-emerald-600';
    return 'border-slate-300 text-slate-500';
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden font-sans">
      {/* 顶部工具栏 - 高度还原原型图 */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 transition-colors shadow-sm">
            <Plus size={16} strokeWidth={2.5} />
            创建
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsMoreActionsOpen(!isMoreActionsOpen)}
              className="px-3 py-1.5 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-1 transition-all"
            >
              更多操作
              <ChevronDown size={14} className={`transition-transform ${isMoreActionsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMoreActionsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsMoreActionsOpen(false)}></div>
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 shadow-xl rounded-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                    <BarChart2 size={14} /> 分布统计
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                    <Search size={14} /> 高级查询
                  </button>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                    <Download size={14} className="rotate-180" /> 导出
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                    <Download size={14} /> 导入
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                    <Printer size={14} /> 打印卡片
                  </button>
                </div>
              </>
            )}
          </div>
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
            共 {MOCK_DEFECTS.length} 个
          </div>
          <button className="p-1 hover:bg-slate-100 rounded">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* 列表表格 */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <tr className="text-slate-400 text-sm font-bold">
              <th className="py-3 px-4 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
              <th className="py-3 px-4 min-w-[300px]">标题</th>
              <th className="py-3 px-4 w-32">发现版本</th>
              <th className="py-3 px-4 w-32">严重程度</th>
              <th className="py-3 px-4 w-32">优先级</th>
              <th className="py-3 px-4 w-32">状态</th>
              <th className="py-3 px-4 w-32">处理人</th>
              <th className="py-3 px-4 w-32">创建人</th>
              <th className="py-3 px-4 w-44">创建时间</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {MOCK_DEFECTS.map((defect) => (
              <tr key={defect.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                <td className="py-3 px-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500 text-white text-[10px] px-1 rounded leading-none py-0.5 font-bold flex-shrink-0">BUG</span>
                    <span className="text-slate-700 hover:text-blue-600 transition-colors truncate" title={defect.title}>
                      {defect.title}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-500">{defect.version}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getSeverityColor(defect.severity)}`}></div>
                    <span className="text-slate-600">{defect.severity}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${getPriorityStyle(defect.priority)}`}>
                    {defect.priority === '高' ? '高' : '中'}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusStyle(defect.status)}`}>
                    {defect.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400">{defect.handler}</td>
                <td className="py-3 px-4 text-slate-700 font-medium">{defect.creator}</td>
                <td className="py-3 px-4 text-slate-500 font-mono">{defect.createTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* 空行填充（可选，为了还原原型图的视觉深度） */}
        <div className="h-full bg-white"></div>
      </div>
    </div>
  );
};
