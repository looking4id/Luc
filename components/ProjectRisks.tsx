
import React, { useState, useRef, useMemo } from 'react';
import { 
  ShieldAlert, Search, Plus, MoreHorizontal, Filter, 
  ChevronDown, XCircle, Trash2, Edit3, Target, User, BookOpen, AlertTriangle, Check
} from './Icons';
import { StatusBadge } from './ProjectShared';
import { Risk } from '../types';
import { MOCK_USERS } from '../constants';

// 风险等级颜色计算
const getLevelStyle = (level: '高' | '中' | '低') => {
    switch (level) {
        case '高': return 'bg-red-50 text-red-600 border-red-100';
        case '中': return 'bg-orange-50 text-orange-600 border-orange-100';
        case '低': return 'bg-green-50 text-green-600 border-green-100';
        default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
};

// 风险维护弹窗组件
const RiskModal = ({ 
    isOpen, onClose, onSave, initialData 
}: { 
    isOpen: boolean, onClose: () => void, onSave: (risk: Risk) => void, initialData?: Risk | null 
}) => {
    const [formData, setFormData] = useState<Partial<Risk>>(
        initialData || {
            title: '',
            probability: '中',
            impact: '中',
            status: '已识别',
            owner: 'lo',
            strategy: '减轻',
            description: ''
        }
    );

    React.useEffect(() => {
        if (isOpen) {
            if (initialData) setFormData(initialData);
            else setFormData({
                title: '',
                probability: '中',
                impact: '中',
                status: '已识别',
                owner: 'lo',
                strategy: '减轻',
                description: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[200] flex items-center justify-center p-4 font-sans text-slate-700">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl animate-in zoom-in-95 duration-200 overflow-hidden border border-white/20">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 text-red-600 rounded-none shadow-inner"><ShieldAlert size={20} /></div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800">{initialData ? '编辑风险信息' : '登记新风险'}</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Risk Maintenance Action</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"><XCircle size={24} /></button>
                </div>
                
                <form className="p-8 space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    onSave({
                        ...formData,
                        id: formData.id || `R-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                        created: formData.created || new Date().toISOString().split('T')[0],
                    } as Risk);
                }}>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">风险标题</label>
                        <input 
                            required 
                            autoFocus
                            className="w-full border border-slate-200 rounded-none px-4 py-3 text-sm focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all bg-slate-50 focus:bg-white font-bold"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                            placeholder="请简述识别到的风险点..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">发生可能性</label>
                            <select 
                                className="w-full border border-slate-200 rounded-none px-4 py-3 text-sm outline-none focus:border-red-500 bg-slate-50 font-bold cursor-pointer"
                                value={formData.probability}
                                onChange={e => setFormData({...formData, probability: e.target.value as any})}
                            >
                                <option value="高">高 (High)</option>
                                <option value="中">中 (Medium)</option>
                                <option value="低">低 (Low)</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">影响程度</label>
                            <select 
                                className="w-full border border-slate-200 rounded-none px-4 py-3 text-sm outline-none focus:border-red-500 bg-slate-50 font-bold cursor-pointer"
                                value={formData.impact}
                                onChange={e => setFormData({...formData, impact: e.target.value as any})}
                            >
                                <option value="高">高 (High)</option>
                                <option value="中">中 (Medium)</option>
                                <option value="低">低 (Low)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">负责人</label>
                            <select 
                                className="w-full border border-slate-200 rounded-none px-4 py-3 text-sm outline-none focus:border-red-500 bg-slate-50 font-bold cursor-pointer"
                                value={formData.owner}
                                onChange={e => setFormData({...formData, owner: e.target.value})}
                            >
                                {MOCK_USERS.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">应对策略</label>
                            <select 
                                className="w-full border border-slate-200 rounded-none px-4 py-3 text-sm outline-none focus:border-red-500 bg-slate-50 font-bold cursor-pointer"
                                value={formData.strategy}
                                onChange={e => setFormData({...formData, strategy: e.target.value})}
                            >
                                <option value="规避">规避 (Avoid)</option>
                                <option value="减轻">减轻 (Mitigate)</option>
                                <option value="接受">接受 (Accept)</option>
                                <option value="转移">转移 (Transfer)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">应对计划与备注</label>
                        <textarea 
                            className="w-full h-28 border border-slate-200 rounded-none px-4 py-3 text-sm focus:border-red-500 outline-none transition-all bg-slate-50 focus:bg-white leading-relaxed resize-none"
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                            placeholder="请描述该风险的具体缓解措施..."
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-none text-slate-500 font-bold text-sm hover:bg-slate-50 transition-colors">取消</button>
                        <button type="submit" className="flex-1 py-3 bg-red-600 text-white rounded-none font-black text-sm hover:bg-red-700 shadow-xl shadow-red-200 transition-all active:scale-95">保存记录</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const ProjectRisks = () => {
    // 状态化的 Mock 数据
    const [risks, setRisks] = useState<Risk[]>([
        { id: 'R-001', title: '第三方支付接口政策变动', probability: '高', impact: '高', status: '处理中', owner: 'lo', strategy: '规避', created: '2025-07-05', description: '由于监管要求，支付网关可能在下月进行迁移。' },
        { id: 'R-002', title: '服务器并发预估不足', probability: '中', impact: '高', status: '已识别', owner: 'Dev 1', strategy: '减轻', created: '2025-07-08' },
        { id: 'R-003', title: 'UI设计师临时请假', probability: '低', impact: '中', status: '已关闭', owner: '产品经理', strategy: '接受', created: '2025-07-10' },
        { id: 'R-004', title: '竞品提前上线', probability: '中', impact: '中', status: '已识别', owner: '产品经理', strategy: '转移', created: '2025-07-12' },
        { id: 'R-005', title: '核心数据库版本升级兼容性', probability: '高', impact: '中', status: '已识别', owner: 'Dev 1', strategy: '减轻', created: '2025-07-14' },
    ]);

    // 交互状态
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [filterProb, setFilterProb] = useState<string>('全部');
    const [filterStatus, setFilterStatus] = useState<string>('全部');
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRisk, setEditingRisk] = useState<Risk | null>(null);

    // 表格拖拽宽度逻辑
    const [colWidths, setColWidths] = useState([48, 280, 100, 100, 120, 120, 100, 100]);
    const resizingRef = useRef<{ index: number; startX: number; startWidth: number } | null>(null);

    const onMouseDown = (index: number, e: React.MouseEvent) => {
        resizingRef.current = { index, startX: e.pageX, startWidth: colWidths[index] };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.body.style.cursor = 'col-resize';
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!resizingRef.current) return;
        const { index, startX, startWidth } = resizingRef.current;
        const deltaX = e.pageX - startX;
        const newWidths = [...colWidths];
        newWidths[index] = Math.max(40, startWidth + deltaX);
        setColWidths(newWidths);
    };

    const onMouseUp = () => {
        resizingRef.current = null;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = 'default';
    };

    // 过滤逻辑
    const filteredRisks = useMemo(() => {
        return risks.filter(r => {
            const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesProb = filterProb === '全部' || r.probability === filterProb;
            const matchesStatus = filterStatus === '全部' || r.status === filterStatus;
            return matchesSearch && matchesProb && matchesStatus;
        });
    }, [risks, searchQuery, filterProb, filterStatus]);

    // 选中逻辑
    const toggleSelectAll = () => {
        if (selectedIds.size === filteredRisks.length && filteredRisks.length > 0) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredRisks.map(r => r.id)));
        }
    };

    const toggleSelectItem = (id: string) => {
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };

    // 核心维护操作：删除与修改
    const handleSave = (risk: Risk) => {
        if (editingRisk) {
            setRisks(prev => prev.map(r => r.id === risk.id ? risk : r));
        } else {
            setRisks(prev => [risk, ...prev]);
        }
        setIsModalOpen(false);
        setEditingRisk(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("⚠️ 确定要从项目中移除该风险记录吗？此操作不可恢复。")) {
            setRisks(prev => prev.filter(r => r.id !== id));
            const next = new Set(selectedIds);
            next.delete(id);
            setSelectedIds(next);
        }
    };

    const handleBatchDelete = () => {
        if (window.confirm(`🔥 确定要删除选中的 ${selectedIds.size} 项风险记录吗？`)) {
            setRisks(prev => prev.filter(r => !selectedIds.has(r.id)));
            setSelectedIds(new Set());
        }
    };

    const handleEdit = (risk: Risk) => {
        setEditingRisk(risk);
        setIsModalOpen(true);
    };

    const clearFilters = () => {
        setFilterProb('全部');
        setFilterStatus('全部');
        setSearchQuery('');
    };

    const isFiltered = filterProb !== '全部' || filterStatus !== '全部' || searchQuery !== '';

    return (
        <div className="flex flex-col h-full bg-white rounded-none shadow-sm border border-slate-200 overflow-hidden font-sans text-slate-700">
            {/* 工具栏区 */}
            <div className="px-6 py-4 flex flex-col gap-4 border-b border-slate-100 flex-shrink-0 bg-slate-50/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {selectedIds.size > 0 ? (
                            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                <span className="text-sm font-black text-red-600 bg-white px-3 py-1.5 rounded-none border border-red-100 shadow-sm">
                                    已选中 {selectedIds.size} 项
                                </span>
                                <button 
                                    onClick={handleBatchDelete}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-none text-sm font-bold hover:bg-red-700 shadow-lg shadow-red-100 transition-all active:scale-95"
                                >
                                    <Trash2 size={16} /> 一键删除
                                </button>
                                <button onClick={() => setSelectedIds(new Set())} className="text-xs font-bold text-slate-400 hover:text-slate-600 underline underline-offset-4">取消选择</button>
                            </div>
                        ) : (
                            <>
                                <button 
                                    onClick={() => { setEditingRisk(null); setIsModalOpen(true); }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-none text-sm font-black flex items-center gap-2 shadow-lg shadow-red-100 transition-all active:scale-95"
                                >
                                    <Plus size={16} strokeWidth={3} /> 登记风险
                                </button>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="输入风险标题关键词搜索..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-none focus:border-red-400 focus:ring-4 focus:ring-red-50 outline-none w-72 bg-white transition-all shadow-sm"
                                    />
                                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                </div>
                            </>
                        )}
                        <button 
                            onClick={() => setShowFilterPanel(!showFilterPanel)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-none text-sm font-bold transition-all border ${showFilterPanel ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'}`}
                        >
                            <Filter size={16} />
                            多维筛选
                            {isFiltered && <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse ml-1"></div>}
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-white border border-slate-100 px-3 py-1 rounded-none shadow-sm">
                            LISTING: {filteredRisks.length} ITEMS
                        </div>
                        <button className="p-2 hover:bg-white border border-transparent hover:border-slate-100 rounded-none text-slate-400 transition-all">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                </div>

                {/* 展开的筛选面板 */}
                {showFilterPanel && (
                    <div className="flex items-center gap-6 p-4 bg-white rounded-none border border-slate-100 shadow-sm animate-in slide-in-from-top-2 duration-300">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter ml-1">可能性</span>
                            <div className="flex bg-slate-50 p-1 rounded-none border border-slate-100">
                                {['全部', '高', '中', '低'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => setFilterProb(opt)}
                                        className={`px-3 py-1 text-xs font-bold rounded-none transition-all ${filterProb === opt ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter ml-1">风险状态</span>
                            <div className="flex bg-slate-50 p-1 rounded-none border border-slate-100">
                                {['全部', '已识别', '处理中', '已关闭'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => setFilterStatus(opt)}
                                        className={`px-3 py-1 text-xs font-bold rounded-none transition-all ${filterStatus === opt ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {isFiltered && (
                            <button 
                                onClick={clearFilters}
                                className="mt-5 ml-auto flex items-center gap-1.5 text-[11px] font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                            >
                                <XCircle size={14} /> 清除全部过滤
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* 数据列表表格区 */}
            <div className="flex-1 overflow-auto custom-scrollbar bg-white">
                <table className="w-full text-left border-collapse table-fixed">
                    <thead className="bg-white border-b border-slate-200 sticky top-0 z-10 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <tr>
                            {['选中', '风险项', '可能性', '影响度', '应对策略', '责任人', '状态', '维护操作'].map((col, i) => (
                                <th key={i} className="py-4 px-4 relative group/th truncate" style={{ width: colWidths[i] }}>
                                    {col === '选中' ? (
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                className="rounded border-slate-300 w-4 h-4 accent-red-600 cursor-pointer" 
                                                checked={filteredRisks.length > 0 && selectedIds.size === filteredRisks.length}
                                                onChange={toggleSelectAll}
                                            />
                                        </div>
                                    ) : col}
                                    {i < 7 && (
                                        <div 
                                            onMouseDown={(e) => onMouseDown(i, e)} 
                                            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-red-400 z-20" 
                                        />
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-50">
                        {filteredRisks.map(risk => {
                            const isHighRisk = risk.probability === '高' && risk.impact === '高';
                            const isSelected = selectedIds.has(risk.id);
                            return (
                                <tr 
                                    key={risk.id} 
                                    className={`hover:bg-red-50/10 transition-all group ${isSelected ? 'bg-blue-50/40 shadow-inner' : isHighRisk ? 'bg-red-50/20' : ''}`}
                                >
                                    <td className="py-5 px-4" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center gap-3">
                                            <input 
                                                type="checkbox" 
                                                className="rounded border-slate-300 w-4 h-4 accent-red-600 cursor-pointer" 
                                                checked={isSelected}
                                                onChange={() => toggleSelectItem(risk.id)}
                                            />
                                            {isHighRisk && !isSelected && <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></div>}
                                        </div>
                                    </td>
                                    <td className="py-5 px-4 truncate">
                                        <div className="flex flex-col gap-0.5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-mono font-black text-slate-300 bg-slate-100 px-1 rounded-none">{risk.id}</span>
                                                <span 
                                                    onClick={() => handleEdit(risk)}
                                                    className={`font-bold transition-colors truncate cursor-pointer hover:underline ${isSelected ? 'text-blue-600' : 'text-slate-800 group-hover:text-red-600'}`}
                                                >
                                                    {risk.title}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-medium ml-12">由系统识别于 {risk.created}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-4">
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-none border uppercase tracking-tighter ${getLevelStyle(risk.probability)}`}>{risk.probability}</span>
                                    </td>
                                    <td className="py-5 px-4">
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-none border uppercase tracking-tighter ${getLevelStyle(risk.impact)}`}>{risk.impact}</span>
                                    </td>
                                    <td className="py-5 px-4">
                                        <div className="flex items-center gap-2 text-slate-600 text-xs font-bold truncate">
                                            <Target size={12} className="text-slate-300" />
                                            {risk.strategy}
                                        </div>
                                    </td>
                                    <td className="py-5 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-[10px] font-black shadow-sm`}>
                                                {risk.owner.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-bold text-slate-600 truncate">{risk.owner}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-4"><StatusBadge status={risk.status} /></td>
                                    <td className="py-5 px-4 text-right">
                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                            <button 
                                                onClick={() => handleEdit(risk)}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-none shadow-sm border border-transparent hover:border-slate-100"
                                                title="查看/编辑详情"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(risk.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-none shadow-sm border border-transparent hover:border-slate-100"
                                                title="永久删除"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {filteredRisks.length === 0 && (
                            <tr>
                                <td colSpan={8} className="py-48 text-center text-slate-300">
                                    <div className="flex flex-col items-center gap-4 scale-110 animate-in fade-in zoom-in duration-500">
                                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 border border-slate-100">
                                            <ShieldAlert size={48} strokeWidth={1} />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-black text-slate-400 uppercase tracking-widest">No Risk Records Found</p>
                                            <p className="text-xs text-slate-300 font-medium italic">所有的项目风险均已排除或已关闭</p>
                                            <button onClick={clearFilters} className="text-red-500 text-xs font-bold hover:underline mt-4 block">清除当前过滤条件</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 弹窗组件 */}
            <RiskModal 
                isOpen={isModalOpen} 
                onClose={() => { setIsModalOpen(false); setEditingRisk(null); }} 
                onSave={handleSave} 
                initialData={editingRisk}
            />
        </div>
    );
};
