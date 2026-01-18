
import React, { useState, useMemo } from 'react';
import { 
  CheckSquare, Search, Plus, ArrowLeft, Check, XCircle, ChevronRight, Ban, ListChecks 
} from '../Icons';
import { StatusBadge } from '../ProjectShared';
import { TestCase, TestReview as TestReviewType, ReviewResult } from './types';

const TestReviewExecutionView = ({ 
  review, allTestCases, onBack, onUpdateResult, onUpdateCases
}: { 
  review: TestReviewType, allTestCases: TestCase[], onBack: () => void, 
  onUpdateResult: (reviewId: string, caseId: string, result: ReviewResult) => void,
  onUpdateCases: (reviewId: string, caseIds: string[]) => void
}) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(review.linkedCaseIds);
  const [searchTerm, setSearchTerm] = useState('');
  const linkedCases = useMemo(() => allTestCases.filter(tc => review.linkedCaseIds.includes(tc.id)), [allTestCases, review.linkedCaseIds]);
  const stats = useMemo(() => {
    const total = review.linkedCaseIds.length;
    const completed = Object.values(review.results).filter(r => r !== 'Pending').length;
    const passed = Object.values(review.results).filter(r => r === 'Pass').length;
    return { progress: total > 0 ? Math.round((completed / total) * 100) : 0, passRate: completed > 0 ? Math.round((passed / completed) * 100) : 0 };
  }, [review.results, review.linkedCaseIds]);

  return (
    <div className="absolute inset-0 bg-white z-[100] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="h-16 border-b border-slate-100 flex items-center justify-between px-8 bg-white flex-shrink-0">
        <div className="flex items-center gap-6"><button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-pink-600 transition-all"><ArrowLeft size={20} /></button><div className="h-8 w-px bg-slate-100"></div><div><div className="flex items-center gap-3"><h2 className="text-lg font-black text-slate-800">{review.title}</h2><StatusBadge status={review.status} className="scale-90" /></div><div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">评审执行 • {review.id}</div></div></div>
        <div className="flex items-center gap-4"><div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100"><div className="flex flex-col items-end"><span className="text-[10px] font-black text-slate-400 uppercase leading-none">进度</span><span className="text-sm font-black text-slate-700">{stats.progress}%</span></div><div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-pink-500" style={{ width: `${stats.progress}%` }}></div></div><div className="h-8 w-px bg-slate-200 mx-1"></div><div className="flex flex-col"><span className="text-[10px] font-black text-slate-400 uppercase leading-none">通过率</span><span className="text-sm font-black text-emerald-500">{stats.passRate}%</span></div></div><button onClick={() => setIsSelecting(!isSelecting)} className={`px-5 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${isSelecting ? 'bg-pink-600 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{isSelecting ? <Check size={18} /> : <Plus size={18} />}{isSelecting ? '保存选择' : '管理用例'}</button></div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[400px] border-r border-slate-100 flex flex-col bg-slate-50/30">
          <div className="p-6 border-b border-slate-100 bg-white"><div className="relative"><input type="text" placeholder={isSelecting ? "从库中搜索..." : "在本次评审中搜索..."} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-pink-500 outline-none transition-all" /><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /></div></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {(isSelecting ? allTestCases : linkedCases).filter(tc => tc.title.includes(searchTerm)).map(tc => {
              const result = review.results[tc.id] || 'Pending';
              const isSelected = selectedIds.includes(tc.id);
              return (
                <div key={tc.id} onClick={() => isSelecting && setSelectedIds(prev => isSelected ? prev.filter(i => i !== tc.id) : [...prev, tc.id])} className={`p-4 rounded-2xl border transition-all cursor-pointer group relative ${isSelecting ? (isSelected ? 'bg-pink-50 border-pink-200' : 'bg-white border-slate-200') : (result === 'Pending' ? 'bg-white border-slate-200' : 'bg-slate-100 opacity-80')}`}>
                  <div className="flex justify-between items-start mb-2"><span className="text-[10px] font-mono font-black text-slate-300 uppercase">{tc.id}</span>{isSelecting ? (<div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-pink-500 border-pink-500 text-white' : 'bg-white border-slate-200'}`}>{isSelected && <Check size={12} strokeWidth={4} />}</div>) : (<div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${result === 'Pass' ? 'bg-emerald-500 text-white' : result === 'Fail' ? 'bg-rose-500 text-white' : result === 'Blocked' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-400'}`}>{result === 'Pending' ? '待评审' : result}</div>)}</div>
                  <div className="text-sm font-black text-slate-700 leading-snug group-hover:text-pink-600 transition-colors">{tc.title}</div>
                </div>
              );
            })}
            {isSelecting && <div className="fixed bottom-8 left-8"><button onClick={() => { onUpdateCases(review.id, selectedIds); setIsSelecting(false); }} className="px-8 py-3 bg-pink-600 text-white rounded-2xl font-black shadow-2xl shadow-pink-300 active:scale-95">应用选择 ({selectedIds.length})</button></div>}
          </div>
        </div>
        <div className="flex-1 bg-white overflow-y-auto custom-scrollbar p-12">
          {linkedCases.length === 0 ? (<div className="h-full flex flex-col items-center justify-center text-slate-300"><ListChecks size={64} className="opacity-10 mb-4" /><p className="font-bold">尚未关联任何用例</p><button onClick={() => setIsSelecting(true)} className="mt-4 text-pink-500 font-black hover:underline">去关联用例库</button></div>) : (
            <div className="max-w-4xl mx-auto space-y-12">
              {linkedCases.map(tc => {
                const result = review.results[tc.id] || 'Pending';
                return (
                  <div key={tc.id} className="bg-slate-50/50 border border-slate-100 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all group">
                    <div className="flex justify-between items-start mb-8">
                      <div><div className="flex items-center gap-3 mb-2"><span className="text-xs font-mono font-black text-slate-300">{tc.id}</span><h3 className="text-xl font-black text-slate-800 tracking-tight">{tc.title}</h3></div><div className="flex items-center gap-4"><div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center font-black text-[10px]">{tc.maintainer.charAt(0)}</div><span className="text-xs font-bold text-slate-500">{tc.maintainer}</span></div><div className="w-px h-3 bg-slate-200"></div><span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{tc.type}</span></div></div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => onUpdateResult(review.id, tc.id, 'Pass')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${result === 'Pass' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200 hover:border-emerald-500 hover:text-emerald-500'}`}><Check size={14} strokeWidth={3} /> 通过</button>
                        <button onClick={() => onUpdateResult(review.id, tc.id, 'Fail')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${result === 'Fail' ? 'bg-rose-500 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200 hover:border-rose-500 hover:text-rose-500'}`}><XCircle size={14} strokeWidth={3} /> 失败</button>
                        <button onClick={() => onUpdateResult(review.id, tc.id, 'Blocked')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${result === 'Blocked' ? 'bg-amber-500 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200 hover:border-amber-500 hover:text-amber-500'}`}><Ban size={14} strokeWidth={3} /> 阻塞</button>
                      </div>
                    </div>
                    <div className="space-y-6"><div className="grid grid-cols-2 gap-8"><div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">前置条件</label><div className="text-sm text-slate-600 bg-white border border-slate-100 p-4 rounded-2xl min-h-[60px]">{tc.precondition || '无'}</div></div><div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">预期结果</label><div className="text-sm text-slate-600 bg-white border border-slate-100 p-4 rounded-2xl min-h-[60px]">{tc.expectedResult || '无'}</div></div></div><div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">测试步骤</label><div className="text-sm text-slate-600 bg-white border border-slate-100 p-6 rounded-2xl font-mono whitespace-pre-wrap leading-relaxed">{tc.steps || '未录入步骤'}</div></div></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const TestReview = ({ 
  reviews, allTestCases, onUpdateResult, onUpdateCases, onDelete 
}: { 
  reviews: TestReviewType[], allTestCases: TestCase[], 
  onUpdateResult: (reviewId: string, caseId: string, result: ReviewResult) => void,
  onUpdateCases: (reviewId: string, caseIds: string[]) => void,
  onDelete: (id: string) => void
}) => {
  const [executingReview, setExecutingReview] = useState<TestReviewType | null>(null);

  if (executingReview) {
    const currentRev = reviews.find(r => r.id === executingReview.id) || executingReview;
    return <TestReviewExecutionView review={currentRev} allTestCases={allTestCases} onBack={() => setExecutingReview(null)} onUpdateResult={onUpdateResult} onUpdateCases={onUpdateCases} />;
  }

  return (
    <div className="flex-1 overflow-auto p-8 bg-slate-50/50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map(review => {
          const percentage = Math.round((review.completed / (review.total || 1)) * 100);
          return (
            <div key={review.id} onClick={() => setExecutingReview(review)} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:border-pink-300 transition-all cursor-pointer group relative overflow-hidden active:scale-[0.98]">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"><CheckSquare size={100}/></div>
              <div className="flex justify-between items-start mb-10 relative z-10"><div><h3 className="font-black text-slate-800 text-lg mb-2 group-hover:text-pink-600 transition-colors">{review.title}</h3><div className="flex items-center gap-3"><StatusBadge status={review.status} /><span className="text-[10px] font-mono font-black text-slate-300 uppercase">{review.id}</span></div></div></div>
              <div className="space-y-6 relative z-10"><div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest"><span>通过率: <span className="text-emerald-500">{review.passRate}%</span></span><span>截止: {review.dueDate}</span></div><div className="space-y-2"><div className="flex justify-between text-[11px] font-black text-slate-500"><span>进度 ({review.completed}/{review.total})</span><span>{percentage}%</span></div><div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner"><div className={`h-full rounded-full transition-all duration-1000 ${percentage === 100 ? 'bg-emerald-500' : 'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.3)]'}`} style={{ width: `${percentage}%` }}></div></div></div><div className="pt-6 mt-4 border-t border-slate-50 flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-6 h-6 rounded-lg bg-pink-500 text-white flex items-center justify-center text-[10px] font-black">{review.initiator.charAt(0)}</div><span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">负责人: {review.initiator}</span></div><button className="text-[10px] font-black text-pink-600 uppercase group-hover:underline flex items-center gap-1">开始评审 <ChevronRight size={12} /></button></div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
