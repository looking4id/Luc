
import React from 'react';
import { MetricSummary } from '../types';

interface MetricCardProps {
  metric: MetricSummary;
  icon: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, icon, onClick }) => {
  const isPositive = metric.trend > 0;
  
  return (
    <div 
      className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl hover:bg-slate-800 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-slate-900 rounded-lg group-hover:scale-110 transition-transform">
          <i className={`fas ${icon} text-blue-400 text-xl`}></i>
        </div>
        <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          <i className={`fas fa-caret-${isPositive ? 'up' : 'down'} mr-1`}></i>
          {Math.abs(metric.trend)}%
        </div>
      </div>
      <div>
        <p className="text-slate-400 text-sm mb-1">{metric.label}</p>
        <h3 className="text-2xl font-bold">
          {metric.value}
          <span className="text-sm font-normal text-slate-500 ml-1">{metric.unit}</span>
        </h3>
      </div>
    </div>
  );
};
