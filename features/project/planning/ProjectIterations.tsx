
import React, { useState, useMemo } from 'react';
import { 
  MoreHorizontal, Plus, Layers, Link, Lock, Edit3, Printer, 
  Share2, Settings, CheckCircle2, Maximize2, Users, Calendar, 
  Search, ChevronRight, Filter, Clock, XCircle, Box, Repeat, Bold, Italic, Underline,
  LayoutList, ChevronDown, Zap, Ban, LayoutGrid
} from '../../../components/common/Icons';
import { StatusBadge, StatRing } from '../../../components/common/ProjectShared';
import { MOCK_USERS, MOCK_COLUMNS } from '../../../utils/constants';

import { IterationList } from './IterationList';
import { IterationKanban } from './IterationKanban';
import { IterationMemberTracking } from './IterationMemberTracking';
import { IterationWorkHourReport } from './IterationWorkHourReport';
import { IterationProgressChart } from './IterationProgressChart';
import { IterationDashboardMetrics } from './IterationDashboardMetrics';

// 高保真新建迭代弹窗 (还原原型图样式)
const CreateIterationModal = ({ onClose, onSubmit }: { onClose: () => void, onSubmit: (data: any) => void }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    return (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[200] flex items-center justify-center p-4 font-sans text-slate-700">
            <div className="bg-white rounded-lg shadow-2xl w-[900px] max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/20">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white flex-shrink-0">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">新建迭代计划</h3>
                    <div className="flex items-center gap-4">
                        <button className="text-[11px] text-slate-400 font-black hover:text-slate-600 flex items-center gap-1 uppercase tracking-widest">More <ChevronDown size={12}/></button>
                        <button onClick={onClose} className="p-1 text-slate-300 hover:text-slate-600 transition-colors"><XCircle size={24} /></button>
                    </div>
                </div>

                <form className="flex-1 overflow-y-auto custom-scrollbar p-12 space-y-12" onSubmit={(e) => { e.preventDefault(); onSubmit({ title, start, end }); }}>
                    {/* 元数据栏 */}
                    <div className="flex items-center gap-10 py-3 px-6 bg-slate-50/80 rounded border border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                         <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"><LayoutList size={14} className="text-slate-300"/> 业务类型: <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1 leading-none">迭代 <ChevronDown size={10}/></span></div>
                         <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"><Zap size={14} className="text-slate-300"/> 应用模板: <span className="text-slate-700 flex items-center gap-1 leading-none font-black uppercase">平台中心标准迭代模板 <ChevronDown size={10}/></span></div>
                    </div>

                    {/* 标题 */}
                    <div className="flex items-start gap-8">
                        <label className="text-sm font-black text-slate-800 w-32 pt-3 whitespace-nowrap flex items-center gap-2 uppercase tracking-widest">
                            <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                            标题 <span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1 relative flex items-center group">
                            <input 
                                required autoFocus
                                placeholder="请输入迭代名称 (例如: 【途强在线】Web V4.0.0)"
                                className="w-full bg-slate-50/50 border border-slate-200 rounded px-6 py-4 text-base font-black outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-200"
                                value={title} onChange={e => setTitle(e.target.value)}
                            />
                            <div className="absolute right-4 p-2 bg-blue-50 text-blue-500 rounded border border-blue-100 shadow-sm opacity-50 group-hover:opacity-100 transition-opacity">
                                <Box size={18} strokeWidth={3}/>
                            </div>
                        </div>
                    </div>

                    {/* 时间设置 */}
                    <div className="flex items-start gap-8">
                        <label className="text-sm font-black text-slate-800 w-32 pt-3 whitespace-nowrap flex items-center gap-2 uppercase tracking-widest">
                            <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                            排期时间 <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-6 flex-1">
                            <div className="relative flex-1">
                                <input type="date" required className="w-full bg-slate-50/50 border border-slate-200 rounded px-6 py-3 text-sm font-bold text-slate-700 focus:border-blue-500 focus:bg-white outline-none transition-all" value={start} onChange={e => setStart(e.target.value)} />
                                <Calendar size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                            </div>
                            <span className="text-slate-200 font-black">-</span>
                            <div className="relative flex-1">
                                <input type="date" required className="w-full bg-slate-50/50 border border-slate-200 rounded px-6 py-3 text-sm font-bold text-slate-700 focus:border-blue-500 focus:bg-white outline-none transition-all" value={end} onChange={e => setEnd(e.target.value)} />
                                <Calendar size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* 目标编辑器 */}
                    <div className="flex items-start gap-8">
                        <label className="text-sm font-black text-slate-800 w-32 pt-3 whitespace-nowrap flex items-center gap-2 uppercase tracking-widest">
                            <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                            核心目标
                        </label>
                        <div className="flex-1 border border-slate-200 rounded overflow-hidden flex flex-col h-64 shadow-sm bg-white focus-within:border-blue-400 transition-colors">
                            <div className="bg-slate-50/80 px-6 py-2.5 border-b border-slate-100 flex items-center gap-6 flex-wrap">
                                <div className="flex items-center gap-2 border-r border-slate-200 pr-6">
                                    <button type="button" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all"><Box size={14}/></button>
                                    <button type="button" className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded transition-all rotate-45"><Ban size={14}/></button>
                                    <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-slate-500 hover:text-blue-600 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all uppercase tracking-widest"><Plus size={14} strokeWidth={3}/> 插入</button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button type="button" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all"><Bold size={14}/></button>
                                    <button type="button" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all"><Italic size={14}/></button>
                                    <button type="button" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all"><Underline size={14}/></button>
                                </div>
                                <button type="button" className="ml-auto p-2 text-slate-300 hover:text-slate-800 transition-colors"><Maximize2 size={16}/></button>
                            </div>
                            <textarea className="flex-1 p-8 text-sm font-medium text-slate-600 outline-none resize-none placeholder:text-slate-300 leading-relaxed custom-scrollbar" placeholder="在此输入本次迭代需要达成的关键业务目标..."></textarea>
                        </div>
                    </div>
                </form>

                {/* 底部操作 */}
                <div className="px-10 py-6 border-t border-slate-100 bg-white flex justify-end gap-4 flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                    <button onClick={onClose} type="button" className="px-4 py-2 bg-white border border-slate-200 text-slate-400 rounded text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all uppercase tracking-widest">取消</button>
                    <button onClick={() => onSubmit({})} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-bold flex items-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95 uppercase tracking-widest">确认创建</button>
                </div>
            </div>
        </div>
    );
};

const MOCK_SPRINTS = [
  { id: 'sp1', name: 'Sprint 1: 基础框架搭建', status: '已完成', progress: 100, start: '2025/07/01', end: '2025/07/14', requirementCount: 8, defectCount: 2 },
  { id: 'sp2', name: '【买家应用】迭代2: 核心业务流程', status: '进行中', progress: 45, start: '2025/12/08', end: '2025/12/19', requirementCount: 12, defectCount: 4 },
  { id: 'sp3', name: 'Sprint 3: 报表与性能优化', status: '未开始', progress: 0, start: '2025/12/20', end: '2026/01/05', requirementCount: 15, defectCount: 0 },
  { id: 'sp4', name: 'Sprint 4: 自动化测试集成', status: '未开始', progress: 0, start: '2026/01/06', end: '2026/01/20', requirementCount: 10, defectCount: 0 },
];

const IterationDashboard = ({ sprint }: { sprint: any }) => {
    const tabs = ['概览', '列表', '看板', '成员任务跟踪', '工时报告', '进度图', '仪表盘'];
    const [activeTab, setActiveTab] = useState('概览');

    const renderTabContent = () => {
        switch (activeTab) {
            case '列表': return <IterationList sprintId={sprint.id} />;
            case '看板': return <IterationKanban sprintId={sprint.id} />;
            case '成员任务跟踪': return <IterationMemberTracking sprintId={sprint.id} />;
            case '工时报告': return <IterationWorkHourReport sprintId={sprint.id} />;
            case '进度图': return <IterationProgressChart sprintId={sprint.id} />;
            case '仪表盘': return <IterationDashboardMetrics sprintId={sprint.id} />;
            case '概览':
            default:
                return (
                    <div className="p-10 space-y-10 overflow-y-auto h-full custom-scrollbar bg-slate-50/20">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCardWidget title="延期工作项" value="0" />
                            <StatCardWidget title="未完成需求" value={sprint.requirementCount - Math.floor(sprint.requirementCount * (sprint.progress/100))} color="text-blue-600" />
                            <StatCardWidget title="状态停滞项 (>3d)" value="2" color="text-amber-500" />
                            <StatCardWidget title="迭代总进度" value={`${sprint.progress}%`} color="text-emerald-600" />
                        </div>

                        {/* Timeline & Progress (High Fidelity Restoration) */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white rounded p-10 border border-slate-200 shadow-sm group hover:shadow-xl transition-all duration-500">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="font-black text-slate-800 text-lg tracking-tight uppercase">排期关键节点图</h3>
                                    <button className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">Edit Schedule</button>
                                </div>
                                <div className="relative flex items-center justify-between px-16 py-8">
                                    <div className="absolute left-[15%] right-[15%] h-1.5 bg-slate-100 top-1/2 -translate-y-1/2 rounded-full shadow-inner">
                                        <div 
                                            className="h-full bg-blue-500 transition-all duration-1000 shadow-[0_0_12px_rgba(59,130,246,0.6)] rounded-full" 
                                            style={{ width: `${sprint.status === '已完成' ? '100' : sprint.status === '进行中' ? '50' : '0'}%` }}
                                        ></div>
                                    </div>
                                    
                                    <MilestoneNode active={sprint.status !== '未开始'} label="计划开始" date={sprint.start} icon={Calendar} />
                                    <MilestoneNode active={sprint.status === '已完成'} label="计划发布" date={sprint.end} icon={CheckCircle2} isLast />
                                </div>
                            </div>

                            <div className="bg-white rounded p-10 border border-slate-200 shadow-sm group hover:shadow-xl transition-all duration-500">
                                <h3 className="font-black text-slate-800 text-lg mb-6 tracking-tight uppercase">迭代核心目标</h3>
                                <div className="bg-slate-50 border border-slate-100 rounded p-6 text-sm font-medium text-slate-600 min-h-[140px] leading-relaxed italic shadow-inner">
                                    {sprint.id === 'sp2' ? '“完成买家应用主要业务逻辑开发，包括核心下单、聚合支付接入及退款闭环流程。”' : '暂无详细迭代目标说明。'}
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            {/* Iteration Header (High Fidelity Restoration) */}
            <div className="bg-white border-b border-slate-100 px-10 pt-8 pb-0 flex-shrink-0 z-20">
                <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-6">
                        <div className="bg-blue-600 text-white p-4 rounded shadow-xl shadow-blue-100 ring-4 ring-blue-50">
                             <Layers size={32} strokeWidth={2.5}/>
                        </div>
                        <div>
                             <div className="flex items-center gap-4 mb-2">
                                 <h2 className="text-2xl font-black text-slate-800 tracking-tight">{sprint.name}</h2>
                                 <div className="flex items-center gap-2">
                                    <Link size={18} className="text-slate-300 hover:text-blue-500 cursor-pointer transition-colors" />
                                    <Lock size={18} className="text-slate-300" />
                                 </div>
                             </div>
                             <div className="flex items-center gap-6 text-[11px] font-black text-slate-400 uppercase tracking-widest font-mono">
                                 <span className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded border border-slate-100"><Calendar size={14} className="text-slate-300"/> {sprint.start} ~ {sprint.end}</span>
                                 <span className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-100"><Clock size={14} /> 剩余 5 天</span>
                             </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-slate-50 p-1 rounded gap-1">
                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all" title="编辑详情"><Edit3 size={20} /></button>
                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all" title="导出打印"><Printer size={20} /></button>
                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all" title="外部分享"><Share2 size={20} /></button>
                        </div>
                        <div className="w-px h-10 bg-slate-100 mx-2"></div>
                        <button className={`px-4 py-2 rounded text-sm font-black transition-all flex items-center gap-2 uppercase tracking-widest shadow-lg ${
                            sprint.status === '进行中' 
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100 active:scale-95' 
                            : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                        }`}>
                            {sprint.status === '进行中' ? '完成迭代' : '开启迭代'}
                        </button>
                        <button className="p-3 text-slate-300 hover:text-slate-800 transition-colors"><Settings size={22} /></button>
                    </div>
                </div>

                <div className="flex items-center gap-10">
                    {tabs.map(tab => (
                        <div 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 cursor-pointer text-sm font-black transition-all relative uppercase tracking-widest ${
                                activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-800 hover:translate-y-[-1px]'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded shadow-[0_2px_8px_rgba(37,99,235,0.4)] animate-in slide-in-from-left-2 duration-300"></div>}
                        </div>
                    ))}
                    <div className="ml-auto flex items-center gap-4 mb-4">
                        <button className="text-[11px] font-black text-slate-400 hover:text-blue-600 flex items-center gap-2 uppercase tracking-widest transition-colors"><Plus size={16} strokeWidth={3}/> 添加自定义视图</button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
                {renderTabContent()}
            </div>
        </div>
    );
};

const StatCardWidget = ({ title, value, color = "text-slate-800" }: any) => (
    <div className="bg-white rounded p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default group">
        <div className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-6 group-hover:text-blue-500 transition-colors">{title}</div>
        <div className="flex justify-center items-center h-24">
            <div className={`text-5xl font-black ${color} tracking-tighter tabular-nums drop-shadow-sm`}>{value}</div>
        </div>
    </div>
);

const MilestoneNode = ({ active, label, date, icon: Icon, isLast }: any) => (
    <div className="relative z-10 flex flex-col items-center gap-4 group/node">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-4 transition-all duration-500 group-hover/node:scale-110 ${
            active 
            ? 'bg-blue-600 text-white border-blue-100 shadow-blue-200' 
            : 'bg-white text-slate-200 border-slate-100 shadow-none grayscale opacity-40'
        }`}>
            <Icon size={24} strokeWidth={2.5}/>
        </div>
        <div className="text-center">
            <div className={`font-black text-sm transition-colors ${active ? 'text-slate-800' : 'text-slate-300'}`}>{label}</div>
            <div className={`text-[11px] font-mono font-bold mt-1 tracking-tight ${active ? 'text-blue-500' : 'text-slate-200'}`}>{date}</div>
        </div>
    </div>
);

export const ProjectIterations = () => {
    const [selectedSprintId, setSelectedSprintId] = useState('sp2');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const selectedSprint = MOCK_SPRINTS.find(s => s.id === selectedSprintId) || MOCK_SPRINTS[1];
    
    // Use useMemo to sort and filter sprints
    const filteredSprints = useMemo(() => {
        return MOCK_SPRINTS
            .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()); // Sort descending by start date
    }, [searchQuery]);

    return (
        <div className="flex h-full bg-white -m-6 overflow-hidden">
            {/* Sidebar */}
            <div className={`transition-all duration-300 border-r border-slate-200 bg-white flex flex-col flex-shrink-0 ${isSidebarOpen ? 'w-80' : 'w-0'}`}>
                {/* Sidebar Header matching RequirementList */}
                <div className="p-4 flex items-center justify-between border-b border-slate-100 flex-shrink-0 h-14">
                    <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                        <Layers size={16} className="text-slate-400" />
                        <span className="tracking-tight">迭代列表</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <button onClick={() => setIsCreateModalOpen(true)} className="p-1 hover:bg-slate-100 rounded text-blue-600 transition-colors"><Plus size={16} /></button>
                         <Search size={16} className="text-slate-400 cursor-pointer hover:text-blue-500 transition-colors" />
                    </div>
                </div>
                
                {/* Search & Filter in Sidebar */}
                <div className="p-3 border-b border-slate-50 flex flex-col gap-3">
                     <div className="relative">
                        <input 
                            type="text" 
                            placeholder="搜索迭代..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-8 pr-4 py-2 text-xs border border-slate-200 rounded focus:outline-none focus:border-blue-500 bg-slate-50 transition-all focus:bg-white"
                        />
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-all flex items-center justify-center gap-1">
                            <Filter size={12} /> 状态
                        </button>
                        <button className="flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-all flex items-center justify-center gap-1">
                             时间
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                    {filteredSprints.map(sprint => {
                        const isActive = selectedSprintId === sprint.id;
                        return (
                            <div 
                                key={sprint.id}
                                onClick={() => setSelectedSprintId(sprint.id)}
                                className={`p-4 rounded cursor-pointer transition-all border group relative overflow-hidden ${
                                    isActive 
                                    ? 'bg-blue-50 border-blue-200 shadow-sm' 
                                    : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-100'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`font-black text-sm line-clamp-1 ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>
                                        {sprint.name}
                                    </div>
                                    <StatusBadge status={sprint.status} className="scale-75 origin-top-right"/>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className={`text-[10px] flex items-center gap-2 font-mono font-bold uppercase tracking-tighter ${isActive ? 'text-blue-400' : 'text-slate-400'}`}>
                                        <Calendar size={12} /> {sprint.start} - {sprint.end}
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <div className={`flex-1 h-1 rounded-full overflow-hidden ${isActive ? 'bg-blue-200' : 'bg-slate-100'}`}>
                                            <div 
                                                className={`h-full transition-all duration-1000 ${isActive ? 'bg-blue-600' : 'bg-slate-300'}`} 
                                                style={{ width: `${sprint.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-[10px] font-black tabular-nums ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>{sprint.progress}%</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Sidebar Collapse Button */}
            <div className="relative w-0 z-20">
                 <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-12 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-400 hover:text-blue-500 shadow-sm transition-all z-30"
                 >
                   <ChevronRight size={14} className={isSidebarOpen ? 'rotate-180' : ''} />
                 </button>
            </div>

            {/* Right Side: Sprint Dashboard (High Fidelity Restoration) */}
            <div className="flex-1 overflow-hidden bg-slate-50/10 flex flex-col min-w-0">
                <IterationDashboard sprint={selectedSprint} />
            </div>

            {/* Modals */}
            {isCreateModalOpen && <CreateIterationModal onClose={() => setIsCreateModalOpen(false)} onSubmit={() => setIsCreateModalOpen(false)} />}
        </div>
    );
};
