
import React from 'react';
import { Flag, Plus, Calendar, CheckCircle2, ShieldAlert, Search, MoreHorizontal, BarChart2, Activity, Users, Trash2, Box, Edit3 } from './Icons';
import { StatusBadge } from './ProjectShared';
import { MOCK_USERS } from '../constants';
import { Project } from '../types';

const MOCK_MILESTONES = [
    { id: 1, title: '项目启动会', date: '2025-07-01', status: '已完成', description: '完成项目立项，确定核心团队成员，签署项目章程。' },
    { id: 2, title: '需求规格说明书冻结', date: '2025-07-15', status: '已完成', description: '所有核心需求已确认签字，不再接受重大变更。' },
    { id: 3, title: 'Alpha 版本内部发布', date: '2025-08-10', status: '进行中', description: '完成核心功能开发，进行内部集成测试。' },
    { id: 4, title: 'Beta 版本公测', date: '2025-08-25', status: '未开始', description: '邀请种子用户参与测试，收集反馈。' },
    { id: 5, title: 'V1.0 正式上线', date: '2025-09-10', status: '未开始', description: '全量发布，配合市场推广活动。' },
];

const MOCK_RISKS = [
    { id: 'R-001', title: '第三方支付接口政策变动', probability: '高', impact: '高', status: '处理中', owner: 'lo', strategy: '规避', created: '2025-07-05' },
    { id: 'R-002', title: '服务器并发预估不足', probability: '中', impact: '高', status: '已识别', owner: 'dev01', strategy: '减轻', created: '2025-07-08' },
    { id: 'R-003', title: 'UI设计师临时请假', probability: '低', impact: '中', status: '已关闭', owner: 'pm01', strategy: '接受', created: '2025-07-10' },
    { id: 'R-004', title: '竞品提前上线', probability: '中', impact: '中', status: '已识别', owner: 'pm01', strategy: '转移', created: '2025-07-12' },
];

export const ProjectMilestones = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex flex-col">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Flag size={20} className="text-orange-500" /> 里程碑
            </h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-2">
                <Plus size={16} /> 新建里程碑
            </button>
        </div>
        <div className="flex-1 overflow-auto p-6">
            <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
                {MOCK_MILESTONES.map((m, i) => (
                    <div key={m.id} className="relative pl-6 group">
                        {/* Timeline Node */}
                        <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                            m.status === '已完成' ? 'bg-green-500' :
                            m.status === '进行中' ? 'bg-blue-500' : 'bg-slate-300'
                        }`}></div>
                        
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-slate-800 text-lg">{m.title}</h4>
                                <StatusBadge status={m.status} />
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                <span className="flex items-center gap-1 font-mono">
                                    <Calendar size={14} /> {m.date}
                                </span>
                                {m.status === '已完成' && (
                                    <span className="flex items-center gap-1 text-green-600">
                                        <CheckCircle2 size={14} /> 按期达成
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-slate-600">{m.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const ProjectRisks = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <ShieldAlert size={20} className="text-red-500" /> 风险管理
            </h3>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <input type="text" placeholder="搜索风险..." className="pl-8 pr-4 py-1.5 text-sm border border-slate-300 rounded focus:border-blue-500 outline-none w-64" />
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm flex items-center gap-2">
                    <Plus size={16} /> 登记风险
                </button>
            </div>
        </div>
        <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                        <th className="py-3 px-4 w-24">ID</th>
                        <th className="py-3 px-4">风险标题</th>
                        <th className="py-3 px-4 w-24">可能性</th>
                        <th className="py-3 px-4 w-24">影响程度</th>
                        <th className="py-3 px-4 w-32">应对策略</th>
                        <th className="py-3 px-4 w-24">负责人</th>
                        <th className="py-3 px-4 w-24">状态</th>
                        <th className="py-3 px-4 w-24 text-right">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_RISKS.map(risk => {
                        const isCritical = risk.probability === '高' && risk.impact === '高';
                        return (
                            <tr key={risk.id} className={`border-b border-slate-100 hover:bg-slate-50 group ${isCritical ? 'bg-red-50/30' : ''}`}>
                                <td className="py-3 px-4 text-xs font-mono text-slate-500">{risk.id}</td>
                                <td className="py-3 px-4">
                                    <div className="font-medium text-slate-700 group-hover:text-blue-600 cursor-pointer">{risk.title}</div>
                                    <div className="text-xs text-slate-400 mt-1">创建于: {risk.created}</div>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`text-xs px-2 py-0.5 rounded ${
                                        risk.probability === '高' ? 'bg-red-100 text-red-700' :
                                        risk.probability === '中' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                    }`}>{risk.probability}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`text-xs px-2 py-0.5 rounded ${
                                        risk.impact === '高' ? 'bg-red-100 text-red-700' :
                                        risk.impact === '中' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                    }`}>{risk.impact}</span>
                                </td>
                                <td className="py-3 px-4 text-sm text-slate-600">{risk.strategy}</td>
                                <td className="py-3 px-4 text-sm text-slate-600">{risk.owner}</td>
                                <td className="py-3 px-4"><StatusBadge status={risk.status} /></td>
                                <td className="py-3 px-4 text-right">
                                    <button className="p-1 text-slate-400 hover:text-slate-600">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
);

export const ProjectMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-auto p-1">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BarChart2 size={20} className="text-indigo-500" /> 需求交付周期
            </h3>
            <div className="h-64 flex items-end justify-between px-4 pb-6 border-b border-slate-100 relative">
                {[5, 7, 4, 6, 8, 5, 3].map((h, i) => (
                    <div key={i} className="w-8 bg-indigo-500 rounded-t hover:bg-indigo-600 transition-colors relative group" style={{ height: `${h * 10}%` }}>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{h}天</div>
                    </div>
                ))}
            </div>
             <div className="flex justify-between mt-2 text-xs text-slate-400 px-4">
                <span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span><span>周日</span>
            </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Activity size={20} className="text-green-500" /> 团队吞吐量
            </h3>
            <div className="h-64 flex items-end justify-between px-4 pb-6 border-b border-slate-100 relative">
                {[12, 15, 10, 18, 20, 14, 8].map((h, i) => (
                    <div key={i} className="w-8 bg-green-500 rounded-t hover:bg-green-600 transition-colors relative group" style={{ height: `${h * 4}%` }}>
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{h}个</div>
                    </div>
                ))}
            </div>
             <div className="flex justify-between mt-2 text-xs text-slate-400 px-4">
                <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span>
            </div>
        </div>
        
         <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 md:col-span-2">
             <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2">缺陷密度分布</h3>
             </div>
             <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                 <div className="bg-green-500 w-[60%]" title="低优先级"></div>
                 <div className="bg-yellow-500 w-[25%]" title="中优先级"></div>
                 <div className="bg-orange-500 w-[10%]" title="高优先级"></div>
                 <div className="bg-red-500 w-[5%]" title="紧急"></div>
             </div>
             <div className="flex gap-6 mt-4 text-xs text-slate-500 justify-center">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> 低 (60%)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> 中 (25%)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> 高 (10%)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> 紧急 (5%)</div>
             </div>
         </div>
    </div>
);

export const ProjectMembers = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-6 text-lg">项目成员 (5)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {MOCK_USERS.map(user => (
                 <div key={user.id} className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg hover:border-blue-200 hover:shadow-sm transition-all group">
                     <div className={`w-12 h-12 rounded-full ${user.avatarColor} text-white flex items-center justify-center text-lg font-bold`}>
                         {user.name.substring(0, 1)}
                     </div>
                     <div className="flex-1">
                         <div className="font-bold text-slate-800">{user.name}</div>
                         <div className="text-sm text-slate-500">产品经理 / 管理员</div>
                     </div>
                     <button className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Trash2 size={16} />
                     </button>
                 </div>
             ))}
             <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors">
                 <Plus size={20} />
                 <span>邀请成员</span>
             </div>
        </div>
    </div>
);

export const ProjectSettings = ({ project }: { project: Project }) => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 max-w-3xl">
        <h3 className="font-bold text-slate-800 mb-6 text-lg border-b border-slate-100 pb-4">项目设置</h3>
        
        <div className="space-y-6">
            <div>
                <label className="block text-base font-medium text-slate-700 mb-1">项目名称</label>
                <input type="text" defaultValue={project.name} className="w-full border border-slate-300 rounded px-3 py-2 focus:border-blue-500 outline-none text-base" />
            </div>
            
            <div>
                <label className="block text-base font-medium text-slate-700 mb-1">项目标识 (Key)</label>
                <input type="text" defaultValue={project.code} disabled className="w-full border border-slate-200 bg-slate-50 rounded px-3 py-2 text-slate-500 text-base" />
                <p className="text-sm text-slate-400 mt-1">项目标识创建后不可修改。</p>
            </div>

            <div>
                <label className="block text-base font-medium text-slate-700 mb-1">描述</label>
                <textarea className="w-full border border-slate-300 rounded px-3 py-2 focus:border-blue-500 outline-none h-24 text-base" placeholder="简要描述项目目标..." defaultValue="这是一个示例敏捷开发项目..." />
            </div>

            <div>
                <label className="block text-base font-medium text-slate-700 mb-1">项目负责人</label>
                <select className="w-full border border-slate-300 rounded px-3 py-2 focus:border-blue-500 outline-none text-base">
                    {MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-4">
                 <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">保存更改</button>
                 <button className="px-6 py-2 bg-white border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors">归档项目</button>
            </div>
        </div>
    </div>
);

export const ProjectVersions = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg">发布版本</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">发布新版本</button>
        </div>
        <div className="divide-y divide-slate-100">
             {[
                 { v: '1.2.0', date: '2025-08-10', status: '已发布', desc: '包含多人点餐功能的正式发布' },
                 { v: '1.1.0', date: '2025-07-25', status: '已发布', desc: '基础点餐流程上线' },
                 { v: '1.0.0-beta', date: '2025-07-01', status: '已归档', desc: '内测版本' }
             ].map((ver, i) => (
                 <div key={i} className="p-4 hover:bg-slate-50 flex items-start justify-between">
                     <div className="flex items-start gap-4">
                         <div className="bg-slate-100 p-2 rounded text-slate-500">
                             <Box size={24} />
                         </div>
                         <div>
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="font-bold text-lg text-slate-800">{ver.v}</span>
                                 <StatusBadge status={ver.status === '已发布' ? '已完成' : '已逾期'} />
                             </div>
                             <div className="text-sm text-slate-500">{ver.desc}</div>
                             <div className="text-xs text-slate-400 mt-2 flex items-center gap-4">
                                 <span>发布于: {ver.date}</span>
                                 <span>负责人: lo</span>
                             </div>
                         </div>
                     </div>
                     <div className="flex items-center gap-2">
                         <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit3 size={16} /></button>
                         <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                     </div>
                 </div>
             ))}
        </div>
    </div>
);
