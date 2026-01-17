
import React, { useState } from 'react';
import { 
  MoreHorizontal, Plus, Layers, Link, Lock, Edit3, Printer, 
  Share2, Settings, CheckCircle2, Maximize2, Users, Calendar, 
  Search, ChevronRight, Filter, Clock
} from './Icons';
import { StatusBadge, StatRing } from './ProjectShared';

// Import sub-components
import { IterationList } from './IterationList';
import { IterationKanban } from './IterationKanban';
import { IterationMemberTracking } from './IterationMemberTracking';
import { IterationWorkHourReport } from './IterationWorkHourReport';
import { IterationProgressChart } from './IterationProgressChart';
import { IterationDashboardMetrics } from './IterationDashboardMetrics';

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
                    <div className="p-6 space-y-6 overflow-y-auto h-full custom-scrollbar">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                                <div className="font-bold text-slate-800 text-sm mb-4">延期工作项</div>
                                <div className="flex justify-center">
                                    <div className="w-20 h-20 rounded-full border-[6px] border-slate-100 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-slate-800">0</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
                                <div className="font-bold text-slate-800 text-sm mb-4">未完成需求</div>
                                <div className="flex justify-center">
                                    <StatRing total={sprint.requirementCount - Math.floor(sprint.requirementCount * (sprint.progress/100))} label="" colorClass="blue-500" subLabel="" />
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                                <div className="font-bold text-slate-800 text-sm mb-4">状态停滞项 (>3d)</div>
                                <div className="flex justify-center">
                                    <div className="w-20 h-20 rounded-full border-[6px] border-slate-100 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-slate-800">2</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm">
                                <div className="font-bold text-slate-800 text-sm mb-4">迭代总进度</div>
                                <div className="flex justify-center">
                                    <StatRing total={sprint.progress} label={`${sprint.progress}%`} colorClass="green-500" subLabel="" />
                                </div>
                            </div>
                        </div>

                        {/* Timeline & Progress */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-slate-800 text-sm">关键时间节点</h3>
                                    <button className="text-xs text-blue-600 hover:underline">编辑节点</button>
                                </div>
                                <div className="relative flex items-center justify-between px-12 py-4">
                                    <div className="absolute left-[15%] right-[15%] h-0.5 bg-slate-100 top-1/2 -translate-y-1/2">
                                        <div 
                                            className="h-full bg-blue-500 transition-all duration-1000" 
                                            style={{ width: `${sprint.status === '已完成' ? '100' : sprint.status === '进行中' ? '50' : '0'}%` }}
                                        ></div>
                                    </div>
                                    
                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 ${sprint.status !== '未开始' ? 'bg-blue-500 text-white border-blue-400' : 'bg-white text-slate-300 border-slate-200'}`}>
                                            <Calendar size={16} />
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-slate-700 text-xs">计划开始</div>
                                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{sprint.start}</div>
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 ${sprint.status === '已完成' ? 'bg-green-500 text-white border-green-400' : 'bg-white text-slate-300 border-slate-200'}`}>
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-slate-700 text-xs">计划发布</div>
                                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{sprint.end}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-800 text-sm mb-4">迭代目标</h3>
                                <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 min-h-[100px]">
                                    {sprint.id === 'sp2' ? '完成买家应用主要业务逻辑开发，包括下单、支付及退款流程。' : '暂无详细迭代目标说明。'}
                                </div>
                            </div>
                        </div>

                        {/* Scope & Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="font-bold text-slate-800 text-sm">工作项分布</h3>
                                    <button className="text-slate-400 hover:text-slate-600"><Maximize2 size={14}/></button>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                                            <span className="flex items-center gap-1"><Layers size={12} className="text-blue-500"/> 需求 ({sprint.requirementCount})</span>
                                            <span>{Math.floor(sprint.progress)}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${sprint.progress}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                                            <span className="flex items-center gap-1"><Settings size={12} className="text-red-500"/> 缺陷 ({sprint.defectCount})</span>
                                            <span>{sprint.status === '已完成' ? '100%' : '25%'}</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${sprint.status === '已完成' ? '100' : '25'}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="font-bold text-slate-800 text-sm">成员贡献度</h3>
                                    <Users size={16} className="text-slate-400" />
                                </div>
                                <div className="p-4">
                                    <div className="space-y-3">
                                        {[
                                            { name: 'lo', task: 12, color: 'bg-yellow-500' },
                                            { name: 'Dev 1', task: 8, color: 'bg-blue-500' },
                                            { name: '测试工程师', task: 5, color: 'bg-green-500' }
                                        ].map(user => (
                                            <div key={user.name} className="flex items-center gap-3">
                                                <div className={`w-6 h-6 rounded-full ${user.color} text-white flex items-center justify-center text-[10px] font-bold`}>{user.name.charAt(0)}</div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                                        <span>{user.name}</span>
                                                        <span>{user.task} 项</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                        <div className={`h-full ${user.color} opacity-80`} style={{ width: `${(user.task / 25) * 100}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
            {/* Iteration Header */}
            <div className="bg-white border-b border-slate-200 px-6 pt-5 pb-0 shadow-sm flex-shrink-0">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-600 text-white p-2 rounded-lg shadow-sm">
                             <Layers size={24} />
                        </div>
                        <div>
                             <div className="flex items-center gap-2 mb-1">
                                 <h2 className="text-xl font-bold text-slate-800">{sprint.name}</h2>
                                 <Link size={14} className="text-slate-400 hover:text-blue-500 cursor-pointer" />
                                 <Lock size={14} className="text-slate-400" />
                             </div>
                             <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                                 <span className="flex items-center gap-1"><Calendar size={12} /> {sprint.start} ~ {sprint.end}</span>
                                 <span className="flex items-center gap-1"><Clock size={12} /> 剩余 5 天</span>
                             </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded" title="编辑"><Edit3 size={18} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded" title="打印"><Printer size={18} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded" title="分享"><Share2 size={18} /></button>
                        <div className="w-px h-6 bg-slate-200 mx-1"></div>
                        <button className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                            sprint.status === '进行中' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-blue-500 text-blue-500 hover:bg-blue-50'
                        }`}>
                            {sprint.status === '进行中' ? '完成迭代' : '开启迭代'}
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded"><Settings size={18} /></button>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {tabs.map(tab => (
                        <div 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 cursor-pointer text-sm font-medium border-b-2 transition-colors ${
                                activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            {tab}
                        </div>
                    ))}
                    <div className="ml-auto flex items-center gap-3 mb-2">
                        <button className="text-slate-400 hover:text-blue-600 flex items-center gap-1 text-sm"><Plus size={16} /> 添加视图</button>
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

export const ProjectIterations = () => {
    const [selectedSprintId, setSelectedSprintId] = useState('sp2');
    const [searchQuery, setSearchQuery] = useState('');

    const selectedSprint = MOCK_SPRINTS.find(s => s.id === selectedSprintId) || MOCK_SPRINTS[1];
    const filteredSprints = MOCK_SPRINTS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex overflow-hidden -m-1">
            {/* Left Sidebar: Iteration List */}
            <div className="w-72 border-r border-slate-200 flex flex-col flex-shrink-0 bg-slate-50/30">
                <div className="p-4 border-b border-slate-200 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                             迭代列表
                             <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-normal">{MOCK_SPRINTS.length}</span>
                        </h3>
                        <button className="p-1 hover:bg-slate-100 rounded text-blue-600 transition-colors" title="新建迭代">
                            <Plus size={18} />
                        </button>
                    </div>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="搜索迭代..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-8 pr-4 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 bg-slate-50 transition-all"
                        />
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex-1 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors flex items-center justify-center gap-1">
                            <Filter size={12} /> 状态
                        </button>
                        <button className="flex-1 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors flex items-center justify-center gap-1">
                             更多排序
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                    {filteredSprints.map(sprint => {
                        const isActive = selectedSprintId === sprint.id;
                        return (
                            <div 
                                key={sprint.id}
                                onClick={() => setSelectedSprintId(sprint.id)}
                                className={`p-3 rounded-lg cursor-pointer transition-all border group ${
                                    isActive 
                                    ? 'bg-blue-600 border-blue-600 shadow-md shadow-blue-200 text-white' 
                                    : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-sm text-slate-700'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`font-bold text-sm line-clamp-2 leading-snug ${isActive ? 'text-white' : 'text-slate-800'}`}>
                                        {sprint.name}
                                    </div>
                                    {!isActive && <StatusBadge status={sprint.status} />}
                                </div>
                                
                                <div className="space-y-2">
                                    <div className={`text-[10px] flex items-center gap-1 font-mono ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                        <Calendar size={10} /> {sprint.start} - {sprint.end}
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <div className={`flex-1 h-1 rounded-full overflow-hidden ${isActive ? 'bg-blue-400/50' : 'bg-slate-100'}`}>
                                            <div 
                                                className={`h-full transition-all duration-500 ${isActive ? 'bg-white' : 'bg-blue-500'}`} 
                                                style={{ width: `${sprint.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-[10px] font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>{sprint.progress}%</span>
                                    </div>

                                    <div className={`flex items-center justify-between text-[10px] pt-1 ${isActive ? 'text-blue-50' : 'text-slate-500'}`}>
                                        <div className="flex items-center gap-3">
                                            <span>需求: {sprint.requirementCount}</span>
                                            <span>缺陷: {sprint.defectCount}</span>
                                        </div>
                                        <ChevronRight size={14} className={`transition-transform ${isActive ? 'translate-x-1' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {filteredSprints.length === 0 && (
                        <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-2">
                             <Search size={32} className="opacity-20" />
                             <span className="text-xs">未找到相关迭代</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Sprint Dashboard */}
            <div className="flex-1 overflow-hidden">
                <IterationDashboard sprint={selectedSprint} />
            </div>
        </div>
    );
};
