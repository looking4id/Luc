
import React, { useState } from 'react';
import { 
  FlaskConical, FileText, CheckSquare, ClipboardList, BarChart2, Plus, MoreHorizontal, List, GitMerge 
} from './Icons';
import { TestCaseList } from './testing/TestCaseList';
import { TestCaseMindmap } from './testing/TestCaseMindmap';
import { TestReview } from './testing/TestReview';
import { TestPlan } from './testing/TestPlan';
import { TestReport } from './testing/TestReport';
import { TestCaseDetailsDrawer, TestPlanDetailsDrawer, TestCreateModal } from './testing/SharedComponents';
import { TestCase, TestReview as TestReviewType, TestPlan as TestPlanType, TestReport as TestReportType, ReviewResult } from './testing/types';

export const ProjectTesting = () => {
  const [activeSubItem, setActiveSubItem] = useState('测试用例');
  const [activeTab, setActiveTab] = useState('list');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [quickAddType, setQuickAddType] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [selectedTestPlan, setSelectedTestPlan] = useState<TestPlanType | null>(null);

  // --- 全局核心数据状态 ---
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 'TC-101', title: '【核心】用户注册密码强度校验', version: 'v1.0', reviewStatus: '待评审', type: '功能测试', priority: 'P0', maintainer: 'lo', cited: 2, steps: '1. 输入弱密码\n2. 校验反馈', expectedResult: '提示风险', precondition: '网络通畅', description: '' },
    { id: 'TC-102', title: '移动端扫码支付逻辑测试', version: 'v1.0', reviewStatus: '已评审', type: '功能测试', priority: 'P1', maintainer: 'Dev 1', cited: 1 },
  ]);

  const [testReviews, setTestReviews] = useState<TestReviewType[]>([
    { id: 'REV-001', title: 'V1.0版本核心功能验收评审', status: '进行中', initiator: 'lo', passRate: 50, total: 2, completed: 1, dueDate: '2025-12-30', linkedCaseIds: ['TC-101', 'TC-102'], results: { 'TC-101': 'Pass', 'TC-102': 'Pending' } }
  ]);

  const [testPlans, setTestPlans] = useState<TestPlanType[]>([
    { id: 'PLAN-001', title: '全量回归测试计划', status: '进行中', owner: 'lo', sprint: 'Sprint 1', coverage: '85%', passRate: '92%', description: '本次计划覆盖所有核心支付流程。' }
  ]);

  const [testReports, setTestReports] = useState<TestReportType[]>([
    { id: 'REP-001', title: 'Sprint 1 交付质量报告', type: '迭代报告', date: '2025-12-15', author: 'lo', result: '通过' }
  ]);

  // --- 操作处理器 ---
  const handleUpdateReviewResult = (reviewId: string, caseId: string, result: ReviewResult) => {
    setTestReviews(prev => prev.map(rev => {
      if (rev.id !== reviewId) return rev;
      const newResults = { ...rev.results, [caseId]: result };
      const completed = Object.values(newResults).filter(r => r !== 'Pending').length;
      const passed = Object.values(newResults).filter(r => r === 'Pass').length;
      return { ...rev, results: newResults, completed, passRate: Math.round((passed / (completed || 1)) * 100), status: completed === rev.total ? '已完成' : '进行中' };
    }));
  };

  const handleUpdateReviewCases = (reviewId: string, caseIds: string[]) => {
    setTestReviews(prev => prev.map(rev => rev.id === reviewId ? { ...rev, linkedCaseIds: caseIds, total: caseIds.length } : rev));
  };

  const handleCreateSubmit = (data: any) => {
    if (activeSubItem === '测试用例' || data.id.startsWith('TC')) {
      setTestCases([data, ...testCases]);
    } else if (activeSubItem === '测试评审' || data.id.startsWith('REV')) {
      setTestReviews([data, ...testReviews]);
      setActiveSubItem('测试评审'); // 确保跳转到评审列表页
    } else if (activeSubItem === '测试计划' || data.id.startsWith('PLAN')) {
      setTestPlans([data, ...testPlans]);
      setActiveSubItem('测试计划');
    } else if (activeSubItem === '测试报告' || data.id.startsWith('REP')) {
      setTestReports([data, ...testReports]);
      setActiveSubItem('测试报告');
    }
    setIsCreateModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("确定删除吗？")) return;
    if (id.startsWith('TC')) setTestCases(testCases.filter(i => i.id !== id));
    else if (id.startsWith('REV')) setTestReviews(testReviews.filter(i => i.id !== id));
    else if (id.startsWith('PLAN')) setTestPlans(testPlans.filter(i => i.id !== id));
    else if (id.startsWith('REP')) setTestReports(testReports.filter(i => i.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex overflow-hidden font-sans relative">
      {/* 侧边导航 */}
      <div className="w-56 border-r border-slate-200 flex flex-col flex-shrink-0 bg-slate-50/50">
        <div className="h-14 flex items-center px-6 font-black text-slate-800 gap-3 border-b border-slate-100 bg-white">
          <FlaskConical size={20} className="text-pink-600" /><span className="text-sm tracking-tight uppercase">Quality Management</span>
        </div>
        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {[
            { id: '测试用例', icon: FileText, label: '测试用例库' },
            { id: '测试用例脑图', icon: GitMerge, label: '脑图维护' },
            { id: '测试评审', icon: CheckSquare, label: '评审任务' },
            { id: '测试计划', icon: ClipboardList, label: '执行计划' },
            { id: '测试报告', icon: BarChart2, label: '质量报告' },
          ].map(item => (
            <div 
              key={item.id} 
              onClick={() => setActiveSubItem(item.id)} 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer text-sm transition-all group ${
                activeSubItem === item.id 
                ? 'bg-pink-100/50 text-pink-600 font-bold' 
                : 'text-slate-500 hover:bg-white hover:text-slate-900'
              }`}
            >
              <item.icon size={18} className={activeSubItem === item.id ? 'text-pink-600' : 'text-slate-400 group-hover:text-pink-500'} />
              <span className="tracking-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0 bg-white relative">
        <div className="h-14 border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 bg-white z-20">
          <div className="flex items-center gap-8 h-full">
            <h2 className="text-base font-black text-slate-800 tracking-tight">{activeSubItem}</h2>
            {activeSubItem === '测试用例' && (
              <div className="flex items-center gap-6 h-full pt-1">
                <button onClick={() => setActiveTab('list')} className={`h-full border-b-2 transition-all flex items-center gap-2 font-black text-xs px-2 ${activeTab === 'list' ? 'text-pink-600 border-pink-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}><List size={16} /> 列表视图</button>
                <button onClick={() => setActiveSubItem('测试用例脑图')} className="h-full flex items-center gap-2 font-black text-xs px-2 text-slate-400 hover:text-slate-600"><GitMerge size={16} className="rotate-90" /> 快速脑图</button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setQuickAddType(undefined); setIsCreateModalOpen(true); }} 
              className="bg-pink-500 hover:bg-pink-600 text-white text-[11px] font-black px-5 py-2 rounded-xl flex items-center gap-2 shadow-md transition-all uppercase tracking-widest active:scale-95 shadow-pink-100"
            >
              <Plus size={16} strokeWidth={3} /> 新建
            </button>
            <MoreHorizontal size={18} className="text-slate-300" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative">
          {activeSubItem === '测试用例' && <TestCaseList testCases={testCases} searchQuery={searchQuery} onSearchChange={setSearchQuery} onTestCaseClick={setSelectedTestCase} onDelete={handleDelete} />}
          {activeSubItem === '测试用例脑图' && <TestCaseMindmap testCases={testCases} onNodeClick={setSelectedTestCase} onQuickAdd={(type) => { setQuickAddType(type); setIsCreateModalOpen(true); }} />}
          {activeSubItem === '测试评审' && <TestReview reviews={testReviews} allTestCases={testCases} onUpdateResult={handleUpdateReviewResult} onUpdateCases={handleUpdateReviewCases} onDelete={handleDelete} />}
          {activeSubItem === '测试计划' && <TestPlan plans={testPlans} onDelete={handleDelete} onPlanClick={setSelectedTestPlan} />}
          {activeSubItem === '测试报告' && <TestReport reports={testReports} onDelete={handleDelete} />}
        </div>
      </div>

      {/* 公共交互层 */}
      {isCreateModalOpen && <TestCreateModal type={activeSubItem} onClose={() => setIsCreateModalOpen(false)} onSubmit={handleCreateSubmit} initialType={quickAddType} />}
      {selectedTestCase && <TestCaseDetailsDrawer testCase={selectedTestCase} onClose={() => setSelectedTestCase(null)} onSave={(tc) => setTestCases(prev => prev.map(t => t.id === tc.id ? tc : t))} />}
      {selectedTestPlan && <TestPlanDetailsDrawer plan={selectedTestPlan} onClose={() => setSelectedTestPlan(null)} onSave={(tp) => setTestPlans(prev => prev.map(p => p.id === tp.id ? tp : p))} />}
    </div>
  );
};
