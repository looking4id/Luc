
import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2 } from '../common/Icons';

export const OrganizationInfo = () => {
  // 初始数据
  const initialData = {
    name: '敏捷研发中心',
    identifier: 'AGILE_CENTER',
    description: '专注于高效交付与团队协作的研发中心。',
    logo: 'G',
    logoBg: 'bg-blue-600'
  };

  // 状态管理
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const logoBgs = ['bg-blue-600', 'bg-indigo-600', 'bg-emerald-600', 'bg-rose-600', 'bg-amber-600'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (showSuccess) setShowSuccess(false);
  };

  const handleLogoChange = () => {
    const currentIndex = logoBgs.indexOf(formData.logoBg);
    const nextIndex = (currentIndex + 1) % logoBgs.length;
    setFormData(prev => ({ ...prev, logoBg: logoBgs[nextIndex] }));
  };

  const handleReset = () => {
    if (window.confirm('确定要放弃所有修改并重置吗？')) {
      setFormData(initialData);
      setShowSuccess(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // 模拟 API 请求
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      // 3秒后隐藏提示
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-100">组织基本信息</h3>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">组织名称 <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none text-sm bg-slate-50 focus:bg-white transition-all font-bold text-slate-800" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">组织标识符</label>
            <input 
              type="text" 
              value={formData.identifier} 
              disabled 
              className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm bg-slate-100 text-slate-400 font-mono cursor-not-allowed" 
            />
            <p className="text-[10px] text-slate-400 font-medium">标识符由系统自动生成，创建后不可修改</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">组织描述</label>
          <textarea 
            className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none text-sm bg-slate-50 focus:bg-white transition-all h-32 resize-none leading-relaxed" 
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="描述您的组织使命或团队职责..."
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700">组织图标</label>
          <div className="flex items-center gap-6 p-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
             <div className={`w-16 h-16 rounded-2xl ${formData.logoBg} text-white flex items-center justify-center text-3xl font-black shadow-lg transition-all duration-500`}>
               {formData.logo}
             </div>
             <div className="flex flex-col gap-2">
                <div className="flex gap-3">
                    <button 
                      type="button" 
                      onClick={handleLogoChange}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-100 text-xs font-bold transition-all shadow-sm active:scale-95"
                    >
                      更换背景色
                    </button>
                    <button 
                      type="button" 
                      className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg text-xs font-bold transition-all"
                    >
                      删除
                    </button>
                </div>
                <p className="text-[10px] text-slate-400 font-medium italic">建议尺寸: 200x200px, 支持 JPG/PNG/SVG</p>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
              {showSuccess && (
                <div className="flex items-center gap-2 text-emerald-600 animate-in fade-in slide-in-from-left-2 duration-300">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-bold">配置已成功保存</span>
                </div>
              )}
          </div>
          <div className="flex gap-3">
            <button 
              type="button" 
              onClick={handleReset}
              disabled={isSaving}
              className="px-6 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200 disabled:opacity-50"
            >
              重置
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-10 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95 flex items-center gap-2 min-w-[140px] justify-center"
            >
              {isSaving ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>保存中...</span>
                </>
              ) : (
                <span>保存更改</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
