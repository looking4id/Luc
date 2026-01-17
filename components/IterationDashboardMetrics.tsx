
import React from 'react';
import { DonutChart } from './ProjectShared';
import { BarChart2, Activity, Zap, Bug } from './Icons';

export const IterationDashboardMetrics = ({ sprintId }: { sprintId: string }) => {
  return (
    <div className="p-6 h-full overflow-auto space-y-6 bg-slate-50/30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="交付效率" value="84%" trend="+12%" icon={<Zap className="text-yellow-500" />} />
        <MetricCard title="缺陷修复率" value="92%" trend="+5%" icon={<Bug className="text-red-500" />} />
        <MetricCard title="平均提前期" value="4.2d" trend="-1.1d" icon={<Activity className="text-blue-500" />} />
        <MetricCard title="代码评审率" value="78%" trend="+22%" icon={<BarChart2 className="text-purple-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">需求类别分布</h3>
          <div className="h-64 flex items-end justify-around px-4">
            {[
              { label: '功能增强', val: 65, color: 'bg-blue-500' },
              { label: '界面优化', val: 40, color: 'bg-indigo-400' },
              { label: '性能调优', val: 25, color: 'bg-purple-400' },
              { label: '安全性', val: 15, color: 'bg-slate-400' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-3 w-16 group">
                <div className="w-full relative bg-slate-100 rounded-t-lg h-56 overflow-hidden">
                  <div 
                    className={`absolute bottom-0 left-0 right-0 ${item.color} transition-all duration-1000 group-hover:brightness-110`} 
                    style={{ height: `${item.val}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center">
          <h3 className="font-bold text-slate-800 mb-8 self-start">整体健康度</h3>
          <DonutChart percentage={88} color="#22c55e" label="健康指数" />
          <div className="mt-8 space-y-2 w-full">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">风险工作项</span>
              <span className="text-slate-800 font-bold">2</span>
            </div>
             <div className="flex justify-between text-xs">
              <span className="text-slate-500">关键路径阻塞</span>
              <span className="text-slate-800 font-bold">0</span>
            </div>
             <div className="flex justify-between text-xs">
              <span className="text-slate-500">资源饱和度</span>
              <span className="text-slate-800 font-bold">76%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, trend, icon }: any) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {trend}
      </span>
    </div>
    <div className="text-2xl font-black text-slate-800">{value}</div>
    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{title}</div>
  </div>
);
