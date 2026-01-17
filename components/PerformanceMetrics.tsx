
import React from 'react';
import { BarChart2, Activity, Zap, Bug, TrendingUp, TrendingDown, Clock, Filter, Calendar } from './Icons';
import { DonutChart } from './ProjectShared';

export const PerformanceMetrics = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <BarChart2 size={24} className="text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">效能度量</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <button className="px-3 py-1.5 text-xs font-bold bg-white text-blue-600 rounded-md shadow-sm">研发交付</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">缺陷质量</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">代码效能</button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 text-xs font-medium">
            <Calendar size={14} /> 最近30天
          </button>
          <button className="p-1.5 border border-slate-200 rounded-lg"><Filter size={16} className="text-slate-400" /></button>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricWidget title="交付周期" value="4.5d" trend="-1.2d" status="good" icon={Clock} />
          <MetricWidget title="吞吐量" value="128" trend="+15%" status="good" icon={Zap} />
          <MetricWidget title="缺陷密度" value="0.2" trend="+0.05" status="bad" icon={Bug} />
          <MetricWidget title="活跃度" value="92%" trend="+4%" status="good" icon={Activity} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-slate-800">需求交付趋势</h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 计划值</div>
                 <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase"><div className="w-2 h-2 rounded-full bg-slate-200"></div> 实际值</div>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between px-4 pb-4">
              {[45, 60, 55, 75, 80, 70, 85, 90, 82, 95].map((v, i) => (
                <div key={i} className="flex-1 max-w-[40px] flex flex-col items-center gap-3 group relative">
                   <div className="w-full bg-slate-100 rounded-t-lg h-56 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-1000 group-hover:brightness-110" style={{ height: `${v}%` }}></div>
                   </div>
                   <span className="text-[10px] font-bold text-slate-400">08-{i+10}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-8">资源饱和度</h3>
            <div className="flex flex-col items-center py-4">
              <DonutChart percentage={78} color="#3b82f6" label="当前总负载" />
              <div className="mt-8 space-y-4 w-full">
                <ProgressItem label="后端开发" val={85} color="bg-cyan-500" />
                <ProgressItem label="前端开发" val={62} color="bg-blue-500" />
                <ProgressItem label="测试工程师" val={92} color="bg-indigo-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricWidget = ({ title, value, trend, status, icon: Icon }: any) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
    <div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</div>
      <div className="text-2xl font-black text-slate-800">{value}</div>
      <div className={`text-[10px] font-bold mt-1 flex items-center gap-1 ${status === 'good' ? 'text-green-600' : 'text-red-500'}`}>
        {status === 'good' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {trend}
      </div>
    </div>
    <div className={`p-3 rounded-lg ${status === 'good' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
      <Icon size={20} />
    </div>
  </div>
);

const ProgressItem = ({ label, val, color }: any) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase">
      <span>{label}</span>
      <span>{val}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${val}%` }}></div>
    </div>
  </div>
);
