
import React, { useState } from 'react';
import { Search, Filter, Settings, PlayCircle, Edit3, Trash2, MoreHorizontal, CheckSquare, BarChart2, FlaskConical, FileText, ClipboardList, Plus, ChevronRight } from './Icons';
import { StatusBadge } from './ProjectShared';

const MOCK_TEST_CASES = [
  { id: 'CUMR1', title: '【示例数据】注册时提示密码强度不足', version: '版本 1', reviewStatus: '待评审', type: '功能测试', priority: 'P0', maintainer: 'lo', cited: 0 },
  { id: 'CUMR3', title: '【示例数据】注册时校验用户名重复', version: '版本 1', reviewStatus: '待评审', type: '功能测试', priority: 'P0', maintainer: 'lo', cited: 0 },
  { id: 'CUMR6', title: '【示例数据】未登录状态浏览受限页面', version: '版本 1', reviewStatus: '待评审', type: '功能测试', priority: 'P1', maintainer: 'lo', cited: 0 },
  { id: 'CUMR2', title: '【示例数据】注册页面查看协议链接', version: '版本 1', reviewStatus: '待评审', type: '功能测试', priority: 'P1', maintainer: 'lo', cited: 0 },
  { id: 'CUMR4', title: '【示例数据】登录时记住密码功能', version: '版本 1', reviewStatus: '待评审', type: '功能测试', priority: 'P2', maintainer: 'lo', cited: 0 },
  { id: 'CUMR5', title: '【示例数据】正常进入商城', version: '版本 1', reviewStatus: '待评审', type: '功能测试', priority: 'P3', maintainer: 'lo', cited: 0 },
];

const MOCK_REVIEWS = [
  { id: 'REV-001', title: 'V1.0版本功能验收评审', status: '进行中', initiator: 'lo', passRate: 60, total: 20, completed: 12, dueDate: '2025-08-15' },
  { id: 'REV-002', title: '支付模块专项评审', status: '未开始', initiator: 'qa01', passRate: 0, total: 15, completed: 0, dueDate: '2025-08-20' },
  { id: 'REV-003', title: 'Sprint1 冒烟测试评审', status: '已完成', initiator: 'lo', passRate: 95, total: 30, completed: 30, dueDate: '2025-08-01' },
];

const MOCK_PLANS = [
  { id: 'PLAN-001', title: 'V1.0 全量回归测试计划', status: '进行中', owner: 'qa01', sprint: 'Sprint 1', coverage: '85%', passRate: '92%' },
  { id: 'PLAN-002', title: '支付接口自动化测试', status: '未开始', owner: 'dev01', sprint: 'Sprint 2', coverage: '0%', passRate: '-' },
  { id: 'PLAN-003', title: '小程序兼容性测试', status: '已完成', owner: 'qa02', sprint: 'Sprint 1', coverage: '100%', passRate: '98%' },
];

const MOCK_REPORTS = [
  { id: 'REP-001', title: 'Sprint 1 测试总结报告', type: '迭代报告', date: '2025-08-14', author: 'qa01', result: '通过' },
  { id: 'REP-002', title: 'V0.9 性能压测报告', type: '专项报告', date: '2025-08-01', author: 'dev01', result: 'Warning' },
  { id: 'REP-003', title: '支付模块安全测试报告', type: '安全报告', date: '2025-07-28', author: 'sec01', result: '通过' },
];

const TestCaseView = () => (
    <>
         {/* Toolbar */}
         <div className="h-12 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50/30 flex-shrink-0">
             <div className="flex items-center gap-3">
                 <span className="text-sm text-slate-500">共有 {MOCK_TEST_CASES.length} 项</span>
                 <div className="relative">
                     <input 
                        type="text" 
                        placeholder="搜索..." 
                        className="pl-8 pr-4 py-1 text-sm border border-slate-300 rounded bg-white w-64 focus:outline-none focus:border-pink-500 transition-colors"
                     />
                     <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                 </div>
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-600">
                 <button className="flex items-center gap-1 hover:text-slate-900">
                     <Filter size={14} />
                     <span>筛选</span>
                 </button>
                 <button className="flex items-center gap-1 hover:text-slate-900">
                     <Settings size={14} />
                     <span>设置</span>
                 </button>
             </div>
         </div>

         {/* Table */}
         <div className="flex-1 overflow-auto">
             <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-50 text-sm text-slate-500 font-semibold border-b border-slate-200 sticky top-0 z-10">
                     <tr>
                         <th className="py-3 px-6 w-32">ID</th>
                         <th className="py-3 px-4">标题</th>
                         <th className="py-3 px-4 w-24">版本</th>
                         <th className="py-3 px-4 w-40">评审状态</th>
                         <th className="py-3 px-4 w-24">类型</th>
                         <th className="py-3 px-4 w-24">优先级</th>
                         <th className="py-3 px-4 w-32">维护人</th>
                         <th className="py-3 px-4 w-20 text-center">被引用数</th>
                         <th className="py-3 px-4 w-24 text-center">操作</th>
                     </tr>
                 </thead>
                 <tbody className="text-sm">
                     {MOCK_TEST_CASES.map(tc => {
                         let priorityClass = 'text-slate-500 border-slate-200 bg-slate-50';
                         if (tc.priority === 'P0') priorityClass = 'text-red-600 border-red-200 bg-red-50';
                         if (tc.priority === 'P1') priorityClass = 'text-orange-500 border-orange-200 bg-orange-50';
                         if (tc.priority === 'P2') priorityClass = 'text-yellow-600 border-yellow-200 bg-yellow-50';
                         if (tc.priority === 'P3') priorityClass = 'text-slate-500 border-slate-200 bg-slate-50';

                         return (
                            <tr key={tc.id} className="border-b border-slate-100 hover:bg-slate-50 group transition-colors">
                                <td className="py-3 px-6">
                                    <span className="font-mono text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                                        {tc.id}
                                    </span>
                                </td>
                                <td className="py-3 px-4 font-medium text-slate-800 hover:text-pink-600 cursor-pointer transition-colors max-w-xs truncate" title={tc.title}>
                                    {tc.title}
                                </td>
                                <td className="py-3 px-4 text-slate-500">{tc.version}</td>
                                <td className="py-3 px-4 text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-2 h-2 rounded-full ${tc.reviewStatus === '待评审' ? 'bg-slate-300' : 'bg-green-500'}`}></div>
                                        {tc.reviewStatus}
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-slate-500">{tc.type}</td>
                                <td className="py-3 px-4">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${priorityClass}`}>
                                        {tc.priority}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-yellow-500 text-white flex items-center justify-center text-[10px] font-bold">
                                            Lo
                                        </div>
                                        <span className="text-slate-600">{tc.maintainer}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-center text-slate-500">{tc.cited}</td>
                                <td className="py-3 px-4 text-center">
                                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="执行用例">
                                            <PlayCircle size={14} />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="编辑">
                                            <Edit3 size={14} />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="删除">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                         );
                     })}
                 </tbody>
             </table>
         </div>
    </>
);

const TestReviewView = () => (
    <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_REVIEWS.map(review => {
                const percentage = Math.round((review.completed / review.total) * 100);
                return (
                    <div key={review.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1" title={review.title}>{review.title}</h3>
                                <StatusBadge status={review.status} />
                            </div>
                            <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18} /></button>
                        </div>
                        <div className="space-y-4">
                             <div className="flex justify-between text-sm text-slate-500">
                                 <span>通过率: <span className="text-slate-800 font-medium">{review.passRate}%</span></span>
                                 <span>截止: {review.dueDate}</span>
                             </div>
                             <div>
                                 <div className="flex justify-between text-xs text-slate-500 mb-1">
                                     <span>评审进度 ({review.completed}/{review.total})</span>
                                     <span>{percentage}%</span>
                                 </div>
                                 <div className="w-full bg-slate-100 rounded-full h-2">
                                     <div 
                                        className={`h-2 rounded-full transition-all ${percentage === 100 ? 'bg-green-500' : 'bg-blue-600'}`} 
                                        style={{ width: `${percentage}%` }}
                                     ></div>
                                 </div>
                             </div>
                             <div className="pt-4 border-t border-slate-50 flex items-center gap-2">
                                 <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                     {review.initiator.slice(0, 1).toUpperCase()}
                                 </div>
                                 <span className="text-xs text-slate-500">发起人: {review.initiator}</span>
                             </div>
                        </div>
                    </div>
                )
            })}
             <div className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 cursor-pointer min-h-[200px] transition-colors">
                 <Plus size={32} className="mb-2" />
                 <span className="text-sm">发起新评审</span>
             </div>
        </div>
    </div>
);

const TestPlanView = () => (
    <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-sm text-slate-500 font-semibold border-b border-slate-200 sticky top-0 z-10">
                <tr>
                    <th className="py-3 px-6 w-32">计划编号</th>
                    <th className="py-3 px-4">计划名称</th>
                    <th className="py-3 px-4 w-32">状态</th>
                    <th className="py-3 px-4 w-32">覆盖率</th>
                    <th className="py-3 px-4 w-32">通过率</th>
                    <th className="py-3 px-4 w-32">关联迭代</th>
                    <th className="py-3 px-4 w-32">负责人</th>
                    <th className="py-3 px-4 w-12 text-right">操作</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {MOCK_PLANS.map(plan => (
                    <tr key={plan.id} className="border-b border-slate-100 hover:bg-slate-50 group transition-colors">
                        <td className="py-4 px-6 font-mono text-xs text-slate-500">{plan.id}</td>
                        <td className="py-4 px-4 font-medium text-slate-800 hover:text-pink-600 cursor-pointer">{plan.title}</td>
                        <td className="py-4 px-4"><StatusBadge status={plan.status} /></td>
                        <td className="py-4 px-4 text-slate-600">{plan.coverage}</td>
                        <td className="py-4 px-4 font-medium text-green-600">{plan.passRate}</td>
                        <td className="py-4 px-4 text-slate-500">{plan.sprint}</td>
                        <td className="py-4 px-4 text-slate-500">{plan.owner}</td>
                        <td className="py-4 px-4 text-right">
                             <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const TestReportView = () => (
    <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
            {MOCK_REPORTS.map(report => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded flex items-center justify-center">
                            <BarChart2 size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-800 mb-1 text-sm">{report.title}</div>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{report.type}</span>
                                <span>创建于: {report.date}</span>
                                <span>作者: {report.author}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <div className="text-xs text-slate-500 mb-1">结论</div>
                            <StatusBadge status={report.result} />
                        </div>
                        <ChevronRight size={20} className="text-slate-300" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const ProjectTesting = () => {
  const [activeSubItem, setActiveSubItem] = useState('测试用例');
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'mindmap'

  const subSidebarItems = [
      { id: '测试用例', icon: FileText, label: '测试用例' },
      { id: '测试评审', icon: CheckSquare, label: '测试评审' },
      { id: '测试计划', icon: ClipboardList, label: '测试计划' },
      { id: '测试报告', icon: BarChart2, label: '测试报告' },
  ];

  const renderContent = () => {
      switch (activeSubItem) {
          case '测试用例': return <TestCaseView />;
          case '测试评审': return <TestReviewView />;
          case '测试计划': return <TestPlanView />;
          case '测试报告': return <TestReportView />;
          default: return <TestCaseView />;
      }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex overflow-hidden font-sans">
        {/* Secondary Sidebar (Test Management) */}
        <div className="w-48 border-r border-slate-200 flex flex-col flex-shrink-0 bg-slate-50/50">
            <div className="h-12 flex items-center px-4 font-bold text-slate-800 gap-2 border-b border-slate-100 bg-white">
                <FlaskConical size={18} className="text-pink-600" />
                <span className="text-sm">测试管理</span>
            </div>
            <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
                {subSidebarItems.map(item => (
                    <div 
                        key={item.id}
                        onClick={() => setActiveSubItem(item.id)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm transition-colors ${
                            activeSubItem === item.id 
                            ? 'bg-pink-50 text-pink-700 font-medium' 
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                    >
                        <item.icon size={16} className={activeSubItem === item.id ? 'text-pink-600' : 'text-slate-400'} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
             {/* Header */}
             <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
                 <div className="flex items-center gap-6">
                     <h2 className="text-sm font-bold text-slate-800">{activeSubItem}</h2>
                     {activeSubItem === '测试用例' && (
                        <div className="flex items-center gap-4 text-sm">
                            <button 
                                onClick={() => setActiveTab('list')}
                                className={`pb-4 -mb-4 transition-colors ${activeTab === 'list' ? 'text-pink-600 border-b-2 border-pink-600 font-medium' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                列表
                            </button>
                            <button 
                                onClick={() => setActiveTab('mindmap')}
                                className={`pb-4 -mb-4 transition-colors ${activeTab === 'mindmap' ? 'text-pink-600 border-b-2 border-pink-600 font-medium' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                脑图
                            </button>
                        </div>
                     )}
                 </div>
                 <div className="flex items-center gap-2">
                     <button className="bg-red-800 hover:bg-red-900 text-white text-sm px-3 py-1.5 rounded flex items-center gap-1 shadow-sm transition-colors">
                         <Plus size={16} />
                         <span>新建{activeSubItem.replace('测试', '')}</span>
                     </button>
                     <button className="p-1.5 border border-slate-300 rounded hover:bg-slate-50 text-slate-600">
                         <MoreHorizontal size={16} />
                     </button>
                 </div>
             </div>

             {/* Dynamic Content */}
             {renderContent()}
        </div>
    </div>
  );
};
