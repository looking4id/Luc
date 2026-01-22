
import React from 'react';
import { MetricSummary } from '../../types/index';
import { TrendingUp, TrendingDown } from '../common/Icons';

interface MetricCardProps {
  metric: MetricSummary;
  icon: React.ElementType;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, icon: Icon, onClick }) => {
  const isUp = metric.trend > 0;
  const isGoodTrend = metric.isPositiveBetter ? isUp : !isUp;
  const trendColor = metric.trend === 0 ? 'text-slate-400' : isGoodTrend ? 'text-emerald-600' : 'text-rose-600';
  const glowColor = isGoodTrend ? 'group-hover:border-emerald-200' : 'group-hover:border-rose-200';

  return (
    <div 
      className={`bg-white border border-slate-200 p-6 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden ${glowColor}`}
      onClick={onClick}
    >
      {/* 背景装饰图标 - 浅色模式下更淡 */}
      <div className="absolute -right-4 -bottom-4 text-slate-100 opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500">
          <Icon size={100} strokeWidth={1.5} />
      </div>

      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner border border-slate-100">
          <Icon size={22} />
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-100 text-[11px] font-black uppercase tracking-tighter shadow-sm ${trendColor}`}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(metric.trend)}%
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 group-hover:text-blue-600 transition-colors">{metric.label}</p>
        <h3 className="text-3xl font-black text-slate-800 tabular-nums tracking-tighter">
          {metric.value}
          <span className="text-xs font-bold text-slate-300 ml-2 uppercase tracking-widest">{metric.unit}</span>
        </h3>
      </div>
      
      {/* 底部装饰线 */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
    </div>
  );
};
