
import React from 'react';
import { Search, Filter, Edit3, Trash2 } from '../Icons';
import { StatusBadge, PriorityBadge } from '../ProjectShared';
import { TestCase } from './types';

export const TestCaseList = ({ 
  testCases, 
  searchQuery, 
  onSearchChange, 
  onTestCaseClick, 
  onDelete 
}: { 
  testCases: TestCase[], 
  searchQuery: string, 
  onSearchChange: (q: string) => void,
  onTestCaseClick: (tc: TestCase) => void,
  onDelete: (id: string) => void
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="h-12 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50/30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">共有 {testCases.length} 项</span>
          <div className="relative">
            <input type="text" placeholder="搜索用例标题/ID..." value={searchQuery} onChange={e => onSearchChange(e.target.value)} className="pl-8 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg bg-white w-64 focus:outline-none focus:border-pink-500 transition-all" />
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
        <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 border border-transparent hover:border-slate-200 px-2 py-1 rounded transition-all">
          <Filter size={14} /> 筛选
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white text-[10px] text-slate-400 font-black uppercase tracking-widest border-b border-slate-100 sticky top-0 z-10">
            <tr><th className="py-4 px-8 w-32">用例 ID</th><th className="py-4 px-4">标题</th><th className="py-4 px-4 w-32">状态</th><th className="py-4 px-4 w-24">优先级</th><th className="py-4 px-4 w-32">维护人</th><th className="py-4 px-12 text-right">操作</th></tr>
          </thead>
          <tbody className="text-sm">
            {testCases.filter(t => t.title.includes(searchQuery)).map(tc => (
              <tr key={tc.id} onClick={() => onTestCaseClick(tc)} className="border-b border-slate-50 hover:bg-slate-50/80 group transition-colors cursor-pointer">
                <td className="py-5 px-8 font-mono text-[11px] text-slate-400 font-black">{tc.id}</td>
                <td className="py-5 px-4 font-black text-slate-700 group-hover:text-pink-600 transition-colors truncate">{tc.title}</td>
                <td className="py-5 px-4"><StatusBadge status={tc.reviewStatus} /></td>
                <td className="py-5 px-4"><PriorityBadge priority={tc.priority as any} /></td>
                <td className="py-5 px-4"><div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-black">{tc.maintainer.charAt(0)}</div><span className="text-slate-600 font-bold">{tc.maintainer}</span></div></td>
                <td className="py-5 px-12 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 bg-white rounded-lg shadow-sm"><Edit3 size={14} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(tc.id); }} className="p-1.5 text-slate-400 hover:text-red-600 bg-white rounded-lg shadow-sm"><Trash2 size={14} /></button>
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
