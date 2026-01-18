
import React from 'react';
import { BarChart2, Trash2, ChevronRight, Clock, User } from '../Icons';
import { StatusBadge } from '../ProjectShared';
import { TestReport as TestReportType } from './types';

export const TestReport = ({ 
  reports, onDelete 
}: { 
  reports: TestReportType[], onDelete: (id: string) => void 
}) => {
  return (
    <div className="flex-1 overflow-auto p-8 bg-slate-50/50">
      <div className="space-y-4 max-w-5xl mx-auto">
        {reports.map(report => (
          <div key={report.id} className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-xl hover:border-pink-200 transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-pink-500">
            <div className="flex items-center gap-6"><div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"><BarChart2 size={24} /></div><div><div className="font-black text-slate-800 mb-1.5 text-base">{report.title}</div><div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-100 text-slate-500">{report.type}</span><span className="flex items-center gap-1"><Clock size={12}/> {report.date}</span><span className="flex items-center gap-1"><User size={12}/> {report.author}</span></div></div></div>
            <div className="flex items-center gap-8"><div className="text-right"><div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1.5">结论报告</div><StatusBadge status={report.result} /></div><div className="flex gap-2"><button onClick={(e) => {e.stopPropagation(); onDelete(report.id);}} className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={18}/></button><ChevronRight size={20} className="text-slate-200 group-hover:text-pink-500 transition-colors" /></div></div>
          </div>
        ))}
        {reports.length === 0 && (<div className="flex flex-col items-center justify-center py-20 text-slate-300"><BarChart2 size={48} className="opacity-20 mb-4" /><p className="text-sm font-bold">暂无报告数据</p></div>)}
      </div>
    </div>
  );
};
