
import React from 'react';
import { Priority, Severity } from '../types';
import { Circle, PlayCircle, CheckCircle2, XCircle, Clock, AlertTriangle } from './Icons';

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
        <span className="absolute text-sm font-bold text-slate-700">{percentage}%</span>
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
                 <div className="text-xs text-slate-400 mt-0.5">{subLabel}</div>
            </div>
        </div>
    );
};

export const StatusBadge = ({ status, className = "" }: { status: string, className?: string }) => {
    let colorClass = 'bg-slate-100 text-slate-600 border-slate-200';
    let Icon = Circle;

    if (['进行中', '处理中', '开启', 'Open', '开发中', '测试中'].includes(status)) {
        colorClass = 'bg-blue-50 text-blue-600 border-blue-100';
        Icon = PlayCircle;
    } else if (['已完成', '已关闭', '通过', 'Merged', '已实现'].includes(status)) {
        colorClass = 'bg-emerald-50 text-emerald-600 border-emerald-100';
        Icon = CheckCircle2;
    } else if (['已逾期', '失败', 'Warning', 'Failed', '紧急'].includes(status)) {
        colorClass = 'bg-rose-50 text-rose-600 border-rose-100';
        Icon = AlertTriangle;
    } else if (['未开始', '已识别', '规划中'].includes(status)) {
        colorClass = 'bg-slate-50 text-slate-500 border-slate-200';
        Icon = Clock;
    } else if (['已拒绝', '已取消'].includes(status)) {
        colorClass = 'bg-slate-100 text-slate-400 border-slate-200 opacity-70';
        Icon = XCircle;
    }
    
    return (
        <span className={`inline-flex items-center gap-2 text-xs px-2 py-1 rounded-lg border font-bold transition-all ${colorClass} ${className}`}>
            <Icon size={12} strokeWidth={2} />
            <span className="tracking-tight">{status}</span>
        </span>
    );
};

export const PriorityBadge = ({ priority }: { priority?: Priority }) => {
    const baseClass = "inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-md border font-bold";
    if (priority === Priority.High) {
      return <span className={`${baseClass} border-rose-100 text-rose-600 bg-rose-50`}>
        <div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div>
        高
      </span>;
    }
    if (priority === Priority.Normal) {
      return <span className={`${baseClass} border-orange-100 text-orange-600 bg-orange-50`}>
        <div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div>
        中
      </span>;
    }
    return <span className={`${baseClass} border-slate-200 text-slate-500 bg-slate-50`}>
      <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
      低
    </span>;
};

export const SeverityBadge = ({ severity }: { severity?: Severity }) => {
    const baseClass = "inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded uppercase font-black tracking-tight";
    switch (severity) {
        case Severity.Critical:
            return <span className={`${baseClass} bg-red-600 text-white shadow-sm shadow-red-200 animate-pulse`}>致命</span>;
        case Severity.Major:
            return <span className={`${baseClass} bg-orange-500 text-white shadow-sm shadow-orange-100`}>严重</span>;
        case Severity.Normal:
            return <span className={`${baseClass} bg-blue-500 text-white shadow-sm shadow-blue-100`}>一般</span>;
        case Severity.Minor:
            return <span className={`${baseClass} bg-slate-100 text-slate-400 border border-slate-200`}>提示</span>;
        default:
            return <span className={`${baseClass} bg-slate-50 text-slate-400`}>-</span>;
    }
};
