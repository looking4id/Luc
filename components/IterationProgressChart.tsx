
import React from 'react';
import { Filter, Download } from './Icons';

export const IterationProgressChart = ({ sprintId }: { sprintId: string }) => {
  // Mock burndown data
  const totalDays = 14;
  const totalWork = 100;
  const idealLine = Array.from({ length: totalDays + 1 }, (_, i) => ({ x: i, y: totalWork - (i * totalWork / totalDays) }));
  const actualLine = [
    { x: 0, y: 100 },
    { x: 1, y: 98 },
    { x: 2, y: 92 },
    { x: 3, y: 88 },
    { x: 4, y: 85 },
    { x: 5, y: 70 },
    { x: 6, y: 68 },
    { x: 7, y: 65 },
    { x: 8, y: 50 },
  ];

  return (
    <div className="p-6 bg-white h-full overflow-auto flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-800">燃尽图 (Burndown Chart)</h3>
          <p className="text-sm text-slate-500">监控剩余工作量随时间的变化情况</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded text-xs text-slate-600 hover:bg-slate-50">
            <Filter size={14} /> 按工作量
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 border border-slate-200 rounded"><Download size={16} /></button>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-100 p-8 flex flex-col">
        <div className="flex-1 relative">
          <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
            {/* Grid Lines */}
            {[0, 25, 50, 75, 100].map(val => (
              <line 
                key={val} 
                x1="0" y1={400 - (val * 4)} x2="1000" y2={400 - (val * 4)} 
                stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4"
              />
            ))}
            
            {/* Ideal Line (Gray) */}
            <path 
              d={`M ${idealLine.map(p => `${p.x * (1000/totalDays)},${400 - (p.y * 4)}`).join(' L ')}`} 
              fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8"
            />
            
            {/* Actual Line (Blue) */}
            <path 
              d={`M ${actualLine.map(p => `${p.x * (1000/totalDays)},${400 - (p.y * 4)}`).join(' L ')}`} 
              fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
              className="drop-shadow-lg"
            />
            
            {/* Points on Actual Line */}
            {actualLine.map((p, i) => (
              <circle 
                key={i} 
                cx={p.x * (1000/totalDays)} cy={400 - (p.y * 4)} r="5" 
                fill="#2563eb" stroke="white" strokeWidth="2"
              />
            ))}
          </svg>
          
          {/* Axis Labels */}
          <div className="absolute top-0 left-0 -ml-8 h-full flex flex-col justify-between text-[10px] text-slate-400 font-bold">
            <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between px-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          {Array.from({ length: totalDays + 1 }, (_, i) => (
            <span key={i}>D{i}</span>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-slate-400 border-dashed border-t-2"></div>
          <span className="text-xs text-slate-500 font-medium">基准线 (Ideal)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-600 rounded"></div>
          <span className="text-xs text-slate-500 font-medium">实际进度 (Actual)</span>
        </div>
      </div>
    </div>
  );
};
