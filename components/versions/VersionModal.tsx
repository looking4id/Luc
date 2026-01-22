
import React, { useState, useEffect, useMemo } from 'react';
import { XCircle, Box, Calendar, User, Flag, Plus, Search, Check, FileText, Bug, CheckSquare } from '../Icons';
import { Version, PHASE_COLORS } from './types';
import { MOCK_USERS, MOCK_COLUMNS } from '../../utils/constants';
import { Task, TaskType } from '../../types';

// 标准化样式
const commonInputClass = "w-full text-sm font-bold text-slate-700 bg-slate-50/50 border border-slate-100 rounded-none px-4 py-2.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all";
const commonLabelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5";

// 内部使用的多选选择器组件
const InlineItemPicker = ({ items, selectedIds, onToggle, onClose }: any) => {
    const [q, setQ] = useState('');
    const filtered = items.filter((i: Task) => {
        const query = q.toLowerCase();
        return (i.title || '').toLowerCase().includes(query) || (i.displayId || '').toLowerCase().includes(query);
    });

    return (
        <div className="absolute inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-10">
            <div className="bg-white w-[540px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h4 className="font-bold text-slate-800">关联工作项</h4>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600"><XCircle size={20}/></button>
                </div>
                <div className="p-4 border-b border-slate-50">
                    <div className="relative">
                        <input autoFocus className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-all" placeholder="通过 ID、标题搜索..." value={q} onChange={e => setQ(e.target.value)} />
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {filtered.map((item: Task) => {
                        const isSelected = selectedIds.includes(item.id);
                        return (
                            <div key={item.id} onClick={() => onToggle(item.id)} className={`p-4 rounded-xl cursor-pointer border-2 transition-all flex items-center justify-between group ${isSelected ? 'border-blue-500 bg-blue-50/50' : 'border-transparent hover:bg-slate-50'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${item.type === TaskType.Requirement ? 'bg-blue-500' : item.type === TaskType.Defect ? 'bg-rose-500' : 'bg-emerald-500'}`}>
                                        {item.type === TaskType.Requirement ? <FileText size={16} /> : item.type === TaskType.Defect ? <Bug size={16} /> : <CheckSquare size={16} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono font-bold text-slate-300">{item.displayId}</span>
                                            <span className="text-sm font-bold text-slate-700">{item.title}</span>
                                        </div>
                                        <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{item.type} • {item.assignee?.name}</div>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-200 group-hover:border-blue-300'}`}>
                                    {isSelected && <Check size={14} strokeWidth={4} />}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                    <button onClick={onClose} className="px-8 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 transition-all">确定</button>
                </div>
            </div>
        </div>
    );
};

interface VersionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (v: Version) => void;
  initialData: Version | null;
  defaultDate?: string;
}

export const VersionModal: React.FC<VersionModalProps> = ({ 
  isOpen, onClose, onSave, initialData, defaultDate 
}) => {
  const allAvailableTasks = useMemo(() => MOCK_COLUMNS.flatMap(c => c.tasks), []);
  
  const [formData, setFormData] = useState<Version>({
    id: `v${Date.now()}`,
    version: '',
    name: '',
    phase: '开发环境',
    owner: 'lo',
    date: defaultDate || new Date().toISOString().split('T')[0],
    progress: 0,
    description: '',
    color: 'bg-blue-500'
  });

  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || {
        id: `v${Date.now()}`,
        version: '',
        name: '',
        phase: '开发环境',
        owner: 'lo',
        date: defaultDate || new Date().toISOString().split('T')[0],
        progress: 0,
        description: '',
        color: 'bg-blue-500'
      });
      // 如果有初始描述，暂不处理复杂的双向绑定，主要用于新建或清空
      setSelectedItemIds([]);
    }
  }, [isOpen, initialData, defaultDate]);

  const toggleItemId = (id: string) => {
      setSelectedItemIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectedTasks = useMemo(() => 
    allAvailableTasks.filter(t => selectedItemIds.includes(t.id)), 
    [selectedItemIds, allAvailableTasks]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 将选择的工作项标题合并为最终的摘要内容
    const generatedDesc = selectedTasks.map(t => `[${t.displayId}] ${t.title}`).join('\n');
    onSave({ 
        ...formData, 
        color: PHASE_COLORS[formData.phase],
        description: generatedDesc
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[200] flex items-center justify-center p-4 font-sans text-slate-700">
      <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-2xl w-[800px] max-h-[95vh] flex flex-col animate-in zoom-in-95 duration-300 relative z-10 overflow-hidden border border-white/20">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-lg shadow-lg">
               <Box size={18} strokeWidth={2.5} />
            </div>
            <div>
                <h3 className="font-black text-slate-800 tracking-tight text-base">{initialData ? '编辑版本信息' : '规划新版本'}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Release Planning Entry</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-red-500 transition-colors bg-slate-50 rounded-full hover:bg-red-50">
            <XCircle size={22} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-white">
             
             {/* Row 1: Version ID */}
             <div className="space-y-2">
                <label className={commonLabelClass}>版本编号 (Version Number) <span className="text-red-500">*</span></label>
                <input 
                    required 
                    autoFocus
                    placeholder="例如: V1.2.0-Alpha" 
                    className="text-2xl font-black text-slate-800 w-full outline-none border-b-2 border-slate-100 focus:border-blue-500 pb-3 transition-all placeholder:text-slate-200 bg-transparent" 
                    value={formData.version} 
                    onChange={e => setFormData({ ...formData, version: e.target.value })} 
                />
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                    <label className={commonLabelClass}><Flag size={12}/> 发布阶段</label>
                    <select className={commonInputClass} value={formData.phase} onChange={e => setFormData({ ...formData, phase: e.target.value as any })}>
                        {Object.keys(PHASE_COLORS).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
                <div className="space-y-1">
                    <label className={commonLabelClass}><Calendar size={12}/> 计划发布日期</label>
                    <input type="date" className={commonInputClass} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className={commonLabelClass}>发布名称</label>
                    <input 
                        placeholder="例如: 夏日性能大版本" 
                        className={commonInputClass} 
                        value={formData.name} 
                        onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    />
                </div>
                <div className="space-y-1">
                    <label className={commonLabelClass}><User size={12}/> 负责人</label>
                    <select className={commonInputClass} value={formData.owner} onChange={e => setFormData({ ...formData, owner: e.target.value })}>
                        {MOCK_USERS.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                    </select>
                </div>
            </div>

            {/* 版本摘要: 改为工作项目选择 */}
            <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                    <label className={commonLabelClass}>版本摘要 (根据关联工作项生成)</label>
                    <span className="text-[10px] font-black text-blue-500">已选择 {selectedItemIds.length} 项</span>
                </div>
                <div className="min-h-[160px] p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-wrap gap-3 content-start group hover:border-blue-300 hover:bg-blue-50/20 transition-all">
                    {selectedTasks.map(t => (
                        <div key={t.id} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl shadow-sm animate-in fade-in zoom-in-95 duration-200 group/tag">
                            <div className={`w-2 h-2 rounded-full ${t.type === TaskType.Requirement ? 'bg-blue-500' : 'bg-rose-500'}`}></div>
                            <span className="text-xs font-mono font-bold text-slate-400">{t.displayId}</span>
                            <span className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{t.title}</span>
                            <button 
                                onClick={() => toggleItemId(t.id)}
                                className="ml-1 text-slate-300 hover:text-rose-500 transition-colors"
                            >
                                <XCircle size={16} />
                            </button>
                        </div>
                    ))}
                    <button 
                        type="button"
                        onClick={() => setShowPicker(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-100 text-blue-600 rounded-xl font-bold text-xs hover:border-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                    >
                        <Plus size={16} strokeWidth={3} />
                        选择关联工作项
                    </button>
                </div>
                <p className="text-[11px] text-slate-400 font-medium ml-1 flex items-center gap-1.5 italic">
                    <Box size={12} /> 系统将自动汇总所选工作项的标题作为版本 Release Notes。
                </p>
            </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3 flex-shrink-0">
            <button type="button" onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-slate-500 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200">取消</button>
            <button onClick={handleSubmit} className="px-10 py-2.5 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 uppercase tracking-widest">保存并发布版本</button>
        </div>

        {/* Picker Modal */}
        {showPicker && (
            <InlineItemPicker 
                items={allAvailableTasks}
                selectedIds={selectedItemIds}
                onToggle={toggleItemId}
                onClose={() => setShowPicker(false)}
            />
        )}
      </div>
    </div>
  );
};
