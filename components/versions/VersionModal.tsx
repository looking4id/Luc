
import React, { useState, useEffect } from 'react';
import { XCircle } from '../Icons';
import { Version, PHASE_COLORS } from './types';
import { MOCK_USERS } from '../../constants';

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
    }
  }, [isOpen, initialData, defaultDate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[150] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-800">{initialData ? '编辑版本' : '新建版本'}</h3>
            <p className="text-xs text-slate-400 mt-1">定义发布里程碑与环境节点</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-600 transition-colors"><XCircle size={24} /></button>
        </div>
        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onSave({ ...formData, color: PHASE_COLORS[formData.phase] }); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">版本号</label>
              <input required placeholder="1.0.0" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all" value={formData.version} onChange={e => setFormData({ ...formData, version: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">所属阶段</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 bg-white" value={formData.phase} onChange={e => setFormData({ ...formData, phase: e.target.value as any })}>
                {Object.keys(PHASE_COLORS).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">版本名称</label>
            <input required placeholder="输入简短描述" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">负责人</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 bg-white" value={formData.owner} onChange={e => setFormData({ ...formData, owner: e.target.value })}>
                {MOCK_USERS.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">发布日期</label>
              <input type="date" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 outline-none transition-all" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm">取消</button>
            <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all">确认提交</button>
          </div>
        </form>
      </div>
    </div>
  );
};
