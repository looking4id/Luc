
import React from 'react';
import { Box, Zap, Construction } from 'lucide-react';

export const SettingsTemplateView: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] animate-in fade-in zoom-in-95 duration-500">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 animate-pulse">
           <Box size={48} strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center text-orange-500 shadow-lg">
           <Zap size={20} fill="currentColor" />
        </div>
      </div>
      
      <h2 className="text-2xl font-black text-slate-800 mb-3">{title}</h2>
      <div className="flex flex-col items-center text-center max-w-sm">
        <p className="text-slate-400 font-medium mb-6">该功能模块正在进行高保真还原与系统升级中。我们将很快为您呈现更完善的项目管理体验。</p>
        
        <div className="grid grid-cols-2 gap-4 w-full">
           <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">预计上线</div>
              <div className="text-sm font-bold text-slate-700">2026-Q1</div>
           </div>
           <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">开发状态</div>
              <div className="text-sm font-bold text-blue-600 flex items-center justify-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></div>
                 进行中
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
