
import React from 'react';
/* Corrected relative path to reach components/Icons.tsx from components/project/settings/requirement/ */
/* Added missing Box and Plus icons, and removed unused Save, Send, Image icons from import */
import { ChevronLeft, Trash2, LayoutList, Target, FileText, Link, Bold, Italic, Underline, Maximize2, Box, Plus } from '../../../Icons';

export const TemplateEditor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full bg-slate-50/30 p-8 animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-[12px] text-slate-400 mb-6 font-medium">
        <span className="hover:text-blue-600 cursor-pointer" onClick={onBack}>需求</span>
        <ChevronLeft className="rotate-180" size={12} />
        <span className="hover:text-blue-600 cursor-pointer">创建页面模板</span>
        <ChevronLeft className="rotate-180" size={12} />
        <span className="text-slate-800 font-bold">编辑创建页面模板</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-black text-slate-800 mb-10">编辑创建页模板</h2>

        <div className="space-y-10">
          {/* Template Name */}
          <div className="space-y-4">
            <div className="flex items-center gap-1 text-sm font-black text-slate-800">
              <div className="w-1 h-4 bg-blue-500 rounded-full mr-1"></div>
              模板名称 <span className="text-red-500">*</span>
            </div>
            <div className="relative">
              <input 
                type="text" 
                defaultValue="系统默认模板" 
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 outline-none text-sm bg-slate-50/50 focus:bg-white transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-300 font-bold">至多50字符</span>
            </div>
          </div>

          {/* Template Content */}
          <div className="space-y-4">
            <div className="flex items-center gap-1 text-sm font-black text-slate-800">
              <div className="w-1 h-4 bg-blue-500 rounded-full mr-1"></div>
              模板内容
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">标题</label>
                <div className="relative">
                  <input type="text" placeholder="至多50字符" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">详细描述</label>
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  {/* Mock Toolbar */}
                  <div className="bg-slate-50/80 px-4 py-2 flex items-center gap-4 border-b border-slate-100 flex-wrap">
                    <div className="flex items-center gap-1.5 border-r border-slate-200 pr-4">
                      {/* Imported Box icon */}
                      <button className="p-1.5 text-slate-500 hover:bg-white rounded hover:shadow-sm"><Box size={14}/></button>
                      <button className="p-1.5 text-slate-500 hover:bg-white rounded hover:shadow-sm"><Target size={14}/></button>
                      {/* Imported Plus icon */}
                      <button className="flex items-center gap-1 p-1.5 text-xs font-bold text-slate-600 hover:bg-white rounded"><Plus size={14}/> 插入</button>
                    </div>
                    <div className="flex items-center gap-1.5 border-r border-slate-200 pr-4">
                      <button className="text-xs font-bold text-slate-600 px-2 py-1 hover:bg-white rounded">正文</button>
                      <button className="text-xs font-bold text-slate-600 px-2 py-1 hover:bg-white rounded">苹果蓝方</button>
                      <button className="text-xs font-bold text-slate-600 px-2 py-1 hover:bg-white rounded">14px</button>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-500 hover:bg-white rounded"><Bold size={14}/></button>
                      <button className="p-1.5 text-slate-500 hover:bg-white rounded"><Italic size={14}/></button>
                      <button className="p-1.5 text-slate-500 hover:bg-white rounded"><Underline size={14}/></button>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                       <button className="p-1.5 text-slate-500 hover:bg-white rounded"><Maximize2 size={14}/></button>
                    </div>
                  </div>
                  
                  {/* Mock Editor Area */}
                  <div className="p-8 min-h-[300px] text-sm leading-relaxed text-slate-700 bg-white">
                    <p className="font-bold text-slate-900 mb-4">【用户故事 (User Story)】</p>
                    <p className="mb-2"><span className="text-red-600 font-bold">作为 ...</span></p>
                    <p className="mb-2"><span className="text-red-600 font-bold">我希望 ...</span></p>
                    <p className="mb-8"><span className="text-red-600 font-bold">以便 ...</span></p>
                    
                    <p className="font-bold text-slate-900 mb-4">【验收标准】</p>
                    <div className="w-4 h-4 border border-slate-300 rounded mb-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex gap-3">
          <button className="px-6 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 transition-all">保存并更新</button>
          <button className="px-10 py-2.5 bg-blue-500 text-white rounded-xl font-bold text-sm hover:bg-blue-600 shadow-lg shadow-blue-100 transition-all">提交</button>
          <button onClick={onBack} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">取消</button>
        </div>
      </div>
    </div>
  );
};
