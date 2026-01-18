
import React, { useState } from 'react';
import { 
  XCircle, FileText, MoreHorizontal, Target, User, FlaskConical, BookOpen, ListChecks, CheckCircle2,
  ClipboardList, Calendar, Layers
} from '../Icons';
import { StatusBadge } from '../ProjectShared';
import { MOCK_USERS } from '../../constants';
import { TestCase, TestPlan } from './types';

export const TestCaseDetailsDrawer = ({ 
  testCase, onClose, onSave 
}: { 
  testCase: TestCase, onClose: () => void, onSave: (tc: TestCase) => void 
}) => {
  const [editedCase, setEditedCase] = useState<TestCase>({ ...testCase });
  const handleChange = (field: keyof TestCase, value: any) => setEditedCase(prev => ({ ...prev, [field]: value }));

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-end">
      <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-[720px] h-full shadow-[-12px_0_40px_rgba(0,0,0,0.08)] flex flex-col animate-in slide-in-from-right duration-300 relative z-10">
        <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><FileText size={20} /></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{editedCase.id}</span>
              <h3 className="font-black text-slate-800 tracking-tight">测试用例详情</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><MoreHorizontal size={20}/></button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><XCircle size={24} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">用例标题</label>
            <input 
              className="text-2xl font-black text-slate-800 w-full outline-none border-b-2 border-transparent focus:border-pink-200 pb-2 transition-all"
              value={editedCase.title}
              onChange={e => handleChange('title', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Target size={12}/> 优先级</label>
              <select className="w-full text-sm font-bold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 outline-none focus:border-pink-500" value={editedCase.priority} onChange={e => handleChange('priority', e.target.value)}>
                <option value="P0">P0 - 紧急</option><option value="P1">P1 - 高</option><option value="P2">P2 - 中</option><option value="P3">P3 - 低</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><User size={12}/> 维护人</label>
              <select className="w-full text-sm font-bold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 outline-none focus:border-pink-500" value={editedCase.maintainer} onChange={e => handleChange('maintainer', e.target.value)}>
                {MOCK_USERS.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><FlaskConical size={12}/> 评审状态</label>
              <div className="pt-2"><StatusBadge status={editedCase.reviewStatus} /></div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><BookOpen size={14} className="text-pink-500"/> 前置条件</label>
              <textarea className="w-full min-h-[80px] bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm text-slate-600 outline-none focus:border-pink-200 focus:bg-white transition-all leading-relaxed" placeholder="输入测试执行前需要满足的条件..." value={editedCase.precondition || ''} onChange={e => handleChange('precondition', e.target.value)} />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><ListChecks size={14} className="text-pink-500"/> 测试步骤</label>
              <textarea className="w-full min-h-[160px] bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm text-slate-600 outline-none focus:border-pink-200 focus:bg-white transition-all leading-relaxed font-mono" placeholder="1. 步骤说明..." value={editedCase.steps || ''} onChange={e => handleChange('steps', e.target.value)} />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500"/> 预期结果</label>
              <textarea className="w-full min-h-[100px] bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm text-slate-600 outline-none focus:border-pink-200 focus:bg-white transition-all leading-relaxed" placeholder="描述应看到的现象..." value={editedCase.expectedResult || ''} onChange={e => handleChange('expectedResult', e.target.value)} />
            </div>
          </div>
        </div>
        <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-4">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-slate-500 hover:bg-white rounded-xl transition-all">取消</button>
          <button onClick={() => { onSave(editedCase); onClose(); }} className="px-10 py-2.5 bg-pink-500 text-white rounded-xl font-black text-sm hover:bg-pink-600 shadow-xl shadow-pink-100 transition-all active:scale-95">保存更改</button>
        </div>
      </div>
    </div>
  );
};

export const TestPlanDetailsDrawer = ({ 
  plan, onClose, onSave 
}: { 
  plan: TestPlan, onClose: () => void, onSave: (tp: TestPlan) => void 
}) => {
  const [editedPlan, setEditedPlan] = useState<TestPlan>({ ...plan });
  const handleChange = (field: keyof TestPlan, value: any) => setEditedPlan(prev => ({ ...prev, [field]: value }));

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-end">
      <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-[640px] h-full shadow-[-12px_0_40px_rgba(0,0,0,0.08)] flex flex-col animate-in slide-in-from-right duration-300 relative z-10">
        <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><ClipboardList size={20} /></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{editedPlan.id}</span>
              <h3 className="font-black text-slate-800 tracking-tight">测试计划维护</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><XCircle size={24} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">计划名称</label>
            <input 
              className="text-2xl font-black text-slate-800 w-full outline-none border-b-2 border-transparent focus:border-pink-200 pb-2 transition-all"
              value={editedPlan.title}
              onChange={e => handleChange('title', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Calendar size={12}/> 所属迭代</label>
              <select className="w-full text-sm font-bold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 outline-none focus:border-pink-500" value={editedPlan.sprint} onChange={e => handleChange('sprint', e.target.value)}>
                <option value="Sprint 1">Sprint 1</option>
                <option value="Sprint 2">Sprint 2</option>
                <option value="Sprint 3">Sprint 3</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><User size={12}/> 负责人</label>
              <select className="w-full text-sm font-bold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 outline-none focus:border-pink-500" value={editedPlan.owner} onChange={e => handleChange('owner', e.target.value)}>
                {MOCK_USERS.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
             <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Layers size={12}/> 计划状态</label>
              <select className="w-full text-sm font-bold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 outline-none focus:border-pink-500" value={editedPlan.status} onChange={e => handleChange('status', e.target.value)}>
                <option value="未开始">未开始</option>
                <option value="进行中">进行中</option>
                <option value="已完成">已完成</option>
              </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">当前覆盖率</label>
               <div className="pt-2 text-sm font-black text-indigo-600">{editedPlan.coverage}</div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><BookOpen size={14} className="text-pink-500"/> 计划说明</label>
            <textarea 
              className="w-full min-h-[160px] bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm text-slate-600 outline-none focus:border-pink-200 focus:bg-white transition-all leading-relaxed" 
              placeholder="描述本次测试计划的范围、目标和关键事项..." 
              value={editedPlan.description || ''} 
              onChange={e => handleChange('description', e.target.value)} 
            />
          </div>
        </div>
        <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-4">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-slate-500 hover:bg-white rounded-xl transition-all">取消</button>
          <button onClick={() => { onSave(editedPlan); onClose(); }} className="px-10 py-2.5 bg-pink-500 text-white rounded-xl font-black text-sm hover:bg-pink-600 shadow-xl shadow-pink-100 transition-all active:scale-95">保存计划</button>
        </div>
      </div>
    </div>
  );
};

export const TestCreateModal = ({ type, onClose, onSubmit, initialType }: { type: string, onClose: () => void, onSubmit: (data: any) => void, initialType?: string }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('P1');
  const [caseType, setCaseType] = useState(initialType || '功能测试');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = type === '测试用例' ? 'TC' : type === '测试评审' ? 'REV' : type === '测试计划' ? 'PLAN' : 'REP';
    onSubmit({
      id: `${prefix}-${Math.floor(Math.random() * 10000)}`,
      title, priority, maintainer: 'lo', type: caseType, status: '进行中', reviewStatus: '待评审',
      passRate: '0%', total: 0, completed: 0, dueDate: new Date().toISOString().split('T')[0],
      linkedCaseIds: [], results: {}, sprint: 'Sprint 1', coverage: '0%', date: new Date().toISOString().split('T')[0], author: 'lo', owner: 'lo', description: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[110] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-800">新建{type.replace('测试', '')}</h3>
            <p className="text-xs text-slate-400 mt-1">请填写基本信息以初始化</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-600 transition-colors"><XCircle size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">标题</label>
            <input required autoFocus className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-pink-500 focus:ring-4 focus:ring-pink-50 outline-none transition-all" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">优先级/程度</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-500 bg-white" value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="P0">P0 - 紧急</option><option value="P1">P1 - 高</option><option value="P2">P2 - 中</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">分类</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-500 bg-white" value={caseType} onChange={e => setCaseType(e.target.value)}>
                <option value="功能测试">功能测试</option><option value="性能测试">性能测试</option><option value="安全测试">安全测试</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm">取消</button>
            <button type="submit" className="flex-1 py-3 bg-pink-500 text-white rounded-2xl font-black text-sm hover:bg-pink-600 shadow-xl shadow-pink-100 transition-all">确认提交</button>
          </div>
        </form>
      </div>
    </div>
  );
};
