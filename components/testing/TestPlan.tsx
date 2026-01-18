
import React from 'react';
import { Trash2, MoreHorizontal } from '../Icons';
import { StatusBadge } from '../ProjectShared';
import { TestPlan as TestPlanType } from './types';

export const TestPlan = ({ 
  plans, onDelete, onPlanClick
}: { 
  plans: TestPlanType[], onDelete: (id: string) => void, onPlanClick: (plan: TestPlanType) => void
}) => {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/50 text-[10px] text-slate-400 font-black uppercase tracking-widest border-b border-slate-200 sticky top-0 z-10">
          <tr><th className="py-4 px-8 w-32">计划 ID</th><th className="py-4 px-4">计划名称</th><th className="py-4 px-4 w-32">状态</th><th className="py-4 px-32">覆盖/通过率</th><th className="py-4 px-32">关联迭代</th><th className="py-4 px-12 text-right">操作</th></tr>
        </thead>
        <tbody className="text-sm">
          {plans.map(plan => (
            <tr key={plan.id} onClick={() => onPlanClick(plan)} className="border-b border-slate-50 hover:bg-slate-50 group transition-colors cursor-pointer">
              <td className="py-5 px-8 font-mono text-[11px] text-slate-400 font-bold">{plan.id}</td>
              <td className="py-5 px-4 font-black text-slate-700 group-hover:text-pink-600 transition-colors">{plan.title}</td>
              <td className="py-5 px-4"><StatusBadge status={plan.status} /></td>
              <td className="py-5 px-32"><div className="flex flex-col gap-1"><div className="flex justify-between text-[10px] font-bold text-slate-400"><span>Cov: {plan.coverage}</span><span className="text-emerald-500">Pass: {plan.passRate}</span></div><div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: plan.coverage }}></div></div></div></td>
              <td className="py-5 px-32 text-slate-500 font-medium">{plan.sprint}</td>
              <td className="py-5 px-12 text-right"><div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={(e) => { e.stopPropagation(); onDelete(plan.id); }} className="p-1.5 text-slate-400 hover:text-red-500 bg-white rounded-lg shadow-sm"><Trash2 size={14} /></button><button className="p-1.5 text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
