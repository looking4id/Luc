
import React from 'react';
import { Priority } from '../types';

export const DonutChart = ({ percentage, color, label }: { percentage: number; color: string; label: string }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="transform -rotate-90 w-full h-full">
          <circle cx="40" cy="40" r={radius} stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-base font-bold text-slate-700">{percentage}%</span>
      </div>
      <span className="text-xs font-medium text-slate-500 mt-2">{label}</span>
    </div>
  );
};

export const StatRing = ({ total, label, colorClass, subLabel }: { total: number, label: string, colorClass: string, subLabel: string }) => {
    return (
        <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[5px] border-slate-100"></div>
                 {total > 0 && (
                     <div className={`absolute inset-0 rounded-full border-[5px] border-transparent border-t-${colorClass} border-r-${colorClass} rotate-45`}></div>
                 )}
                 <div className="text-xl font-bold text-slate-800 z-10">{total}</div>
            </div>
            <div>
                 <div className="font-bold text-sm text-slate-800">{label}</div>
                 <div className="text-[11px] text-slate-400 mt-0.5">{subLabel}</div>
            </div>
        </div>
    );
};

export const StatusBadge = ({ status }: { status: string }) => {
    let colorClass = 'bg-slate-100 text-slate-600 border-slate-200';
    if (['进行中', '处理中', '开启', 'Open'].includes(status)) colorClass = 'bg-blue-50 text-blue-600 border-blue-100';
    if (['已完成', '已关闭', '通过', 'Merged'].includes(status)) colorClass = 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if (['已逾期', '失败', 'Warning', 'Failed'].includes(status)) colorClass = 'bg-rose-50 text-rose-600 border-rose-100';
    if (['未开始', '已识别'].includes(status)) colorClass = 'bg-slate-50 text-slate-500 border-slate-200';
    
    return (
        <span className={`text-[11px] px-2 py-0.5 rounded-md border font-bold ${colorClass}`}>
            {status}
        </span>
    );
};

export const PriorityBadge = ({ priority }: { priority?: Priority }) => {
    if (priority === Priority.Urgent) {
      return <span className="text-[11px] px-2 py-0.5 rounded-md border border-rose-100 text-rose-600 bg-rose-50 font-bold">紧急</span>;
    }
    if (priority === Priority.High) {
      return <span className="text-[11px] px-2 py-0.5 rounded-md border border-orange-100 text-orange-600 bg-orange-50 font-bold">高</span>;
    }
    return <span className="text-[11px] px-2 py-0.5 rounded-md border border-slate-200 text-slate-500 bg-slate-50 font-bold">普通</span>;
};
