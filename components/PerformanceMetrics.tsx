
import React, { useState } from 'react';
import { 
  BarChart2, Activity, Zap, Bug, TrendingUp, Clock, Filter, Calendar, 
  Target, Code2, PlayCircle, Box, LayoutGrid, Download, Layers,
  ChevronDown, Monitor, Cpu, Globe, ArrowUpRight, HelpCircle, FileText, 
  CheckCircle2, AlertTriangle, ShieldCheck, Settings, Edit3, Users, User,
  TrendingDown, Briefcase, Smile, FlaskConical, PieChart, ShieldAlert,
  BarChart, History, MousePointer2
} from './common/Icons';
import { GlobalRightControls } from './layout/GlobalRightControls';
import { User as UserType } from '../types/index';

// --- 高还原可视化原子组件 ---

const SectionHeader = ({ title, icon: Icon, extra }: { title: string; icon: any; extra?: React.ReactNode }) => (
    <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
            <Icon size={20} className="text-slate-400" />
            <h3 className="text-lg font-bold text-slate-800 tracking-tight italic uppercase">{title}</h3>
        </div>
        {extra}
    </div>
);

const MetricCardBase = ({ title, value, unit, subLabel, trend, children }: any) => (
    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all group relative">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500">{title}</span>
                <HelpCircle size={12} className="text-slate-300 cursor-help" />
            </div>
            <ArrowUpRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
        </div>
        <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-3xl font-black text-slate-800 tabular-nums tracking-tighter">{value}</span>
            <span className="text-xs font-bold text-slate-400">{unit}</span>
        </div>
        {subLabel && (
            <div className="flex items-center gap-2">
                <div className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${trend?.startsWith('▲') || trend?.includes('高于') || trend?.includes('健康') || trend?.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {trend}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{subLabel}</span>
            </div>
        )}
        <div className="mt-4">{children}</div>
    </div>
);

const HorizontalStayBar = () => (
    <div className="space-y-4">
        <div className="flex h-5 w-full rounded-md overflow-hidden bg-slate-100 shadow-inner">
            <div className="bg-indigo-400 w-[15%]" title="待开发"></div>
            <div className="bg-emerald-400 w-[45%]" title="开发中"></div>
            <div className="bg-amber-400 w-[10%]" title="开发完成"></div>
            <div className="bg-rose-400 w-[8%]" title="测试中"></div>
            <div className="bg-blue-400 w-[12%]" title="测试完成"></div>
            <div className="bg-slate-400 w-[10%]" title="UAT"></div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
                { label: '待开发', color: 'bg-indigo-400' },
                { label: '开发中', color: 'bg-emerald-400' },
                { label: '开发完成', color: 'bg-amber-400' },
                { label: '测试中', color: 'bg-rose-400' },
                { label: '测试完成', color: 'bg-blue-400' },
                { label: 'UAT', color: 'bg-slate-400' },
            ].map(i => (
                <div key={i.label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-sm ${i.color}`}></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{i.label}</span>
                </div>
            ))}
        </div>
    </div>
);

const PipelineCard = ({ title, successRate, fixTime, total, fail, status, quality }: any) => (
    <div className="bg-white border border-slate-200 rounded-xl p-6 relative overflow-hidden group hover:border-blue-400 transition-all shadow-sm">
        <div className="absolute top-0 right-0">
            <div className={`px-4 py-1 text-[10px] font-black text-white uppercase tracking-widest ${status === 'RISK' ? 'bg-rose-500' : 'bg-amber-500'}`}>
                {status}
            </div>
        </div>
        <div className="flex items-center justify-between mb-8">
            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-tight">{title}</h4>
            <Settings size={14} className="text-slate-300" />
        </div>
        <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
                <div className="text-3xl font-black text-rose-500 tabular-nums">{successRate}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">构建成功率</div>
            </div>
            <div>
                <div className="text-3xl font-black text-slate-800 tabular-nums">{fixTime}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">平均修复时长</div>
            </div>
        </div>
        <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <span>运行统计</span>
                <div className="h-px bg-slate-100 flex-1 mx-3"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-3 border border-slate-100">
                    <Layers size={14} className="text-blue-500" />
                    <div><div className="text-sm font-black text-slate-700">{total}</div><div className="text-[9px] text-slate-400">运行总数</div></div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-3 border border-slate-100">
                    <AlertTriangle size={14} className="text-rose-500" />
                    <div><div className="text-sm font-black text-slate-700">{fail}</div><div className="text-[9px] text-slate-400">失败次数</div></div>
                </div>
            </div>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                <span>质量看板</span>
                <div className="h-px bg-slate-100 flex-1 mx-3"></div>
            </div>
            <div className="flex gap-2">
                {quality.map((q: any) => (
                    <div key={q.label} className="flex-1 bg-slate-50 p-2 rounded-lg border border-slate-100 text-center hover:bg-white hover:shadow-inner transition-colors">
                        <div className="text-xs font-black text-slate-800">{q.val}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{q.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const MemberWorkloadBar = ({ name, role, val, color }: any) => (
    <div className="group">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border border-slate-200">{name.charAt(0)}</div>
                <span className="text-xs font-bold text-slate-700">{name} <span className="text-[10px] font-normal text-slate-400">/ {role}</span></span>
            </div>
            <span className="text-xs font-black text-slate-500">{val}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div 
                className={`h-full ${color} transition-all duration-1000 ease-out group-hover:brightness-110`} 
                style={{ width: `${val}%` }}
            ></div>
        </div>
    </div>
);

// --- 主页面组件 ---

export const PerformanceMetrics: React.FC<{ user?: UserType | null; onLogout?: () => void; onGoHome?: () => void; }> = ({ user, onLogout, onGoHome }) => {
  const [activeView, setActiveView] = useState<'iteration' | 'monthly'>('iteration');

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] overflow-hidden font-sans text-slate-700">
      {/* 顶部导航 */}
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md"><BarChart2 size={24} /></div>
          <div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight leading-none uppercase italic">研发效能治理平台</h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 inline-block">DEVOPS INSIGHT PRO</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button 
                    onClick={() => setActiveView('iteration')}
                    className={`px-5 py-1.5 text-[11px] font-black rounded-xl uppercase tracking-widest transition-all ${activeView === 'iteration' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                    迭代看板
                </button>
                <button 
                    onClick={() => setActiveView('monthly')}
                    className={`px-5 py-1.5 text-[11px] font-black rounded-xl uppercase tracking-widest transition-all ${activeView === 'monthly' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                    月度看板
                </button>
            </div>
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">
                    <Edit3 size={14} /> 布局
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 shadow-lg shadow-slate-200">
                    <Download size={14} /> 导出
                </button>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <GlobalRightControls user={user} onLogout={onLogout} onGoHome={onGoHome} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-[1600px] mx-auto py-10 px-10 space-y-12 pb-32">
            
            {activeView === 'iteration' ? (
                /* --- 迭代看板全量视图 --- */
                <div className="animate-in fade-in duration-500 space-y-12">
                    {/* 1. 需求管理区块 */}
                    <section>
                        <SectionHeader title="需求管理" icon={Layers} />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <MetricCardBase title="平均需求研发周期" value="10.2" unit="天" trend="▼ 低于合格区间 5.2天" subLabel="较上迭代" >
                                <div className="flex justify-between items-center text-xs font-bold pt-2 border-t border-slate-50 text-slate-400">
                                    <span>开发: 8.2天</span><span>测试: 2天</span>
                                </div>
                            </MetricCardBase>
                            <MetricCardBase title="迭代研发完成率" value="84.2" unit="%" trend="▼ 低于标准 0.8%" subLabel="本月累计" >
                                <div className="flex justify-between items-center text-xs font-bold pt-2 border-t border-slate-50 text-slate-400">
                                    <span>完成: 48个</span><span className="text-rose-500">延期: 23个</span>
                                </div>
                            </MetricCardBase>
                            <MetricCardBase title="需求浮动比例" value="47.4" unit="%" trend="新增需求显著增加" subLabel="异常提醒" >
                                <div className="flex justify-between items-center text-xs font-bold pt-2 border-t border-slate-50 text-slate-400">
                                    <span>新增: 27个</span><span>变更: 0个</span>
                                </div>
                            </MetricCardBase>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                                <h4 className="text-sm font-bold text-slate-800 mb-8">需求状态停留时长</h4>
                                <HorizontalStayBar />
                            </div>
                            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                                <h4 className="text-sm font-bold text-slate-800 mb-4">需求研发进度趋势</h4>
                                <svg className="w-full h-32" viewBox="0 0 400 100">
                                    <path d="M0,50 Q100,20 200,60 T400,80" fill="none" stroke="#3b82f6" strokeWidth="3" />
                                    <circle cx="100" cy="35" r="4" fill="#3b82f6" />
                                    <circle cx="200" cy="60" r="4" fill="#3b82f6" />
                                    <path d="M0,80 L400,80" stroke="#f1f5f9" strokeDasharray="4" />
                                </svg>
                            </div>
                            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                                <h4 className="text-sm font-bold text-slate-800 mb-4">需求交付分布</h4>
                                <svg className="w-full h-32" viewBox="0 0 400 100">
                                    <path d="M0,80 Q100,10 200,40 T400,80 Z" fill="#3b82f6" opacity="0.1" />
                                    <path d="M0,80 Q100,40 200,60 T400,80 Z" fill="#10b981" opacity="0.1" />
                                    <path d="M0,80 Q100,10 200,40 T400,80" fill="none" stroke="#3b82f6" strokeWidth="2" />
                                </svg>
                            </div>
                        </div>
                    </section>

                    {/* 2. 研发质量区块 */}
                    <section>
                        <SectionHeader title="研发质量" icon={ShieldCheck} />
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <MetricCardBase title="缺陷关闭周期" value="3.8" unit="d" trend="▲ 处于健康区间" />
                            <MetricCardBase title="缺陷关闭率" value="100" unit="%" trend="▲ 高于标准 10%" />
                            <MetricCardBase title="Churn (代码波动)" value="12.5" unit="k行" trend="▲ 上涨 8%" />
                            <MetricCardBase title="圈复杂度" value="10.8" unit="avg" trend="▼ 下降 2.4%" />
                        </div>
                    </section>

                    {/* --- [新增] 测试与缺陷深度分析区块 --- */}
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <SectionHeader title="测试与缺陷深度分析" icon={FlaskConical} extra={<button className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">Detail Report</button>} />
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                            <MetricCardBase title="累计发现缺陷" value="248" unit="个" trend="+12.4%" subLabel="较上迭代" />
                            <MetricCardBase title="缺陷修复率" value="92.5" unit="%" trend="▲ 状态良好" subLabel="已修复/总数" />
                            <MetricCardBase title="用例通过率" value="98.1" unit="%" trend="▲ 高于基准 3%" subLabel="核心链路" />
                            <MetricCardBase title="Reopen 率" value="1.4" unit="%" trend="▼ 下降 0.5%" subLabel="修复质量" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* 用例执行分布 - 饼图 */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                                <h4 className="text-sm font-bold text-slate-800 mb-8 flex items-center gap-2"><PieChart size={16} className="text-pink-500"/> 用例执行分布</h4>
                                <div className="flex items-center justify-around h-48">
                                    <div className="relative w-40 h-40">
                                        <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                                            <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="75 100" />
                                            <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#f43f5e" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="-75" />
                                            <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#e2e8f0" strokeWidth="4" strokeDasharray="10 100" strokeDashoffset="-90" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-black text-slate-800">1.2k</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Cases</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 通过 (75%)</div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><div className="w-2 h-2 rounded-full bg-rose-500"></div> 失败 (15%)</div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><div className="w-2 h-2 rounded-full bg-slate-200"></div> 未执行 (10%)</div>
                                    </div>
                                </div>
                            </div>
                            {/* 缺陷发现/修复趋势 - 折线图 */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2"><TrendingUp size={16} className="text-blue-500"/> 发现 vs 修复趋势</h4>
                                    <div className="flex gap-4 text-[10px] font-black uppercase">
                                        <span className="flex items-center gap-1 text-blue-500"><div className="w-2 h-0.5 bg-blue-500"></div> 发现</span>
                                        <span className="flex items-center gap-1 text-emerald-500"><div className="w-2 h-0.5 bg-emerald-500"></div> 修复</span>
                                    </div>
                                </div>
                                <div className="h-48 w-full relative">
                                    <svg className="w-full h-full" viewBox="0 0 200 80">
                                        {/* Grid Lines */}
                                        <line x1="0" y1="20" x2="200" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                                        <line x1="0" y1="40" x2="200" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                                        <line x1="0" y1="60" x2="200" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                                        {/* Lines */}
                                        <path d="M0,60 Q25,40 50,45 T100,20 T150,35 T200,10" fill="none" stroke="#3b82f6" strokeWidth="2" />
                                        <path d="M0,70 Q25,50 50,55 T100,30 T150,45 T200,20" fill="none" stroke="#10b981" strokeWidth="2" />
                                    </svg>
                                    <div className="flex justify-between text-[8px] font-black text-slate-300 mt-2 uppercase"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
                                </div>
                            </div>
                            {/* 缺陷严重程度分布 - 柱状图 */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                                <h4 className="text-sm font-bold text-slate-800 mb-8 flex items-center gap-2"><ShieldAlert size={16} className="text-amber-500"/> 缺陷严重程度分布</h4>
                                <div className="h-48 flex items-end justify-between px-4 pb-4">
                                    {[
                                        { label: '致命', val: 12, color: 'bg-rose-600' },
                                        { label: '严重', val: 45, color: 'bg-orange-500' },
                                        { label: '一般', val: 120, color: 'bg-blue-500' },
                                        { label: '提示', val: 30, color: 'bg-slate-400' }
                                    ].map(item => (
                                        <div key={item.label} className="flex flex-col items-center gap-3 w-12 group">
                                            <div className="w-full relative bg-slate-50 rounded-t h-40 overflow-hidden">
                                                <div 
                                                    className={`absolute bottom-0 left-0 right-0 ${item.color} transition-all duration-1000 group-hover:brightness-110 shadow-sm`} 
                                                    style={{ height: `${(item.val / 130) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. 交付效率区块 */}
                    <section>
                        <SectionHeader title="交付效率" icon={Zap} />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <PipelineCard 
                                title="构建流水线 (BUILD)" successRate="62.8%" fixTime="21.1h" total="137" fail="51" status="RISK" 
                                quality={[{label:'覆盖率', val:'81.3%'}, {label:'密度', val:'0.45'}, {label:'通过率', val:'99.8%'}]}
                            />
                            <PipelineCard 
                                title="集成流水线 (INTEGRATION)" successRate="83.3%" fixTime="4.3h" total="120" fail="20" status="WARNING" 
                                quality={[{label:'覆盖率', val:'85.0%'}, {label:'密度', val:'0.32'}, {label:'通过率', val:'100%'}]}
                            />
                            <PipelineCard 
                                title="部署流水线 (DEPLOY)" successRate="80.6%" fixTime="3.5h" total="98" fail="19" status="WARNING" 
                                quality={[{label:'覆盖率', val:'88.2%'}, {label:'密度', val:'0.28'}, {label:'通过率', val:'99.9%'}]}
                            />
                        </div>
                    </section>

                    {/* 4. 静态扫描 & 自动化测试 */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                             <SectionHeader title="静态扫描 & 自动化测试" icon={ShieldCheck} />
                             <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-slate-400">当前项目:</span>
                                <div className="bg-white border border-slate-200 px-4 py-1.5 rounded-lg flex items-center gap-2 text-sm font-bold text-blue-600 cursor-pointer">
                                    esop-hkcorp-service-v1 <ChevronDown size={14} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 font-mono">Last Scan: 03-11 15:24</span>
                             </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-3 bg-[#1e293b] text-white rounded-xl p-8 shadow-xl">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10">代码规模</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><div className="text-4xl font-black tabular-nums tracking-tighter">30k</div><div className="text-[10px] font-bold text-slate-500 mt-2">有效行数</div></div>
                                    <div><div className="text-4xl font-black text-rose-500 tabular-nums tracking-tighter">28%</div><div className="text-[10px] font-bold text-slate-500 mt-2">重复度</div></div>
                                </div>
                                <div className="mt-12 text-[10px] font-bold text-slate-600 flex justify-between"><span>Classes: 334</span><span>Comments: 3.1%</span></div>
                            </div>
                            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10 self-start">SONAR 质量门禁</h4>
                                <div className="flex-1 flex items-center justify-between w-full px-4">
                                    {['可靠性', '安全性', '维护性'].map(label => (
                                        <div key={label} className="text-center">
                                            <div className="text-6xl font-black text-emerald-500 mb-3 drop-shadow-sm">A</div>
                                            <div className="text-[10px] font-bold text-slate-400">{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-8">
                                <div className="flex items-center justify-between mb-8"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">自动化测试</h4><HelpCircle size={14} className="text-slate-300" /></div>
                                <div className="flex items-baseline gap-2 mb-8"><span className="text-5xl font-black text-slate-800">942</span><span className="text-xs font-bold text-slate-400 uppercase">case</span></div>
                                <div className="text-emerald-500 text-xs font-bold mb-8 flex items-center gap-1"><TrendingUp size={14} /> 增长 5.2%</div>
                                <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4"><div><div className="text-sm font-black text-slate-800">98.4%</div><div className="text-[10px] text-slate-400">通过率</div></div><div><div className="text-sm font-black text-slate-800">68%</div><div className="text-[10px] text-slate-400">覆盖率</div></div></div>
                            </div>
                            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-8 relative overflow-hidden">
                                <div className="flex items-center justify-between mb-6"><h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">单测覆盖率</h4><span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-black">+3.1%</span></div>
                                <div className="flex items-baseline gap-2 mb-4"><span className="text-3xl font-black text-blue-600">81.3%</span><span className="text-[10px] font-bold text-slate-400 uppercase">Overall</span></div>
                                <svg className="w-full h-24" viewBox="0 0 200 60"><path d="M0,50 Q50,45 100,48 T200,42" fill="none" stroke="#3b82f6" strokeWidth="3" /><path d="M0,50 Q50,45 100,48 T200,42 V60 H0 Z" fill="url(#blueGrad)" opacity="0.1" /><defs><linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="transparent" /></linearGradient></defs></svg>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                /* --- 月度看板视图 --- */
                <div className="animate-in slide-in-from-right duration-500 space-y-12">
                    {/* A. 独立的人力资源统计区块 */}
                    <section>
                        <SectionHeader title="人力资源效能统计" icon={Users} extra={<span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded">统计周期: 2025-08-01 ~ 2025-08-31</span>} />
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-4 grid grid-cols-1 gap-6">
                                <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Clock size={80} /></div>
                                    <div className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">月度累计投入工时</div>
                                    <div className="flex items-baseline gap-2 mb-6"><span className="text-4xl font-black">2,840</span><span className="text-sm font-bold opacity-60">Man-Hours</span></div>
                                    <div className="flex items-center gap-4 pt-6 border-t border-white/10"><div><div className="text-sm font-bold">128h</div><div className="text-[9px] opacity-60 uppercase">人均工时</div></div><div className="w-px h-8 bg-white/10"></div><div><div className="text-sm font-bold text-emerald-300">+4.2%</div><div className="text-[9px] opacity-60 uppercase">环比增长</div></div></div>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">角色投入分布</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-xs"><span className="flex items-center gap-2 font-bold text-slate-600"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 业务开发</span><span className="font-mono text-slate-400">65% (1846h)</span></div>
                                        <div className="flex justify-between items-center text-xs"><span className="flex items-center gap-2 font-bold text-slate-600"><div className="w-2 h-2 rounded-full bg-purple-500"></div> 架构运维</span><span className="font-mono text-slate-400">15% (426h)</span></div>
                                        <div className="flex justify-between items-center text-xs"><span className="flex items-center gap-2 font-bold text-slate-600"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 测试保障</span><span className="font-mono text-slate-400">20% (568h)</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                                <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-10">成员月度负载饱和度 (Top 8)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                    <MemberWorkloadBar name="王亮" role="Backend" val={92} color="bg-rose-500" /><MemberWorkloadBar name="Lo" role="Frontend" val={88} color="bg-orange-400" />
                                    <MemberWorkloadBar name="Dev 1" role="Backend" val={76} color="bg-blue-500" /><MemberWorkloadBar name="QA Tester" role="QA" val={95} color="bg-rose-600" />
                                    <MemberWorkloadBar name="Designer" role="UI/UX" val={62} color="bg-emerald-500" /><MemberWorkloadBar name="Dev 3" role="Frontend" val={81} color="bg-blue-400" />
                                    <MemberWorkloadBar name="Dev 4" role="Infra" val={45} color="bg-slate-300" /><MemberWorkloadBar name="PM lo" role="Product" val={70} color="bg-indigo-400" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* B. 月度交付与价值流汇总 */}
                    <section>
                        <SectionHeader title="月度交付与价值流" icon={TrendingUp} />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <MetricCardBase title="需求交付总量" value="42" unit="个" trend="+15%" subLabel="较上月累计" />
                            <MetricCardBase title="需求按时交付率" value="92.8" unit="%" trend="▲ 处于高位" subLabel="本月达标" />
                            <MetricCardBase title="平均需求前置时间" value="4.5" unit="d" trend="-1.2d" subLabel="交付加速" />
                            <MetricCardBase title="研发吞吐速率 (Velocity)" value="1,240" unit="pts" trend="+20%" subLabel="效能提升" />
                        </div>
                    </section>

                    {/* --- [增强] 质量月报看板区块 --- */}
                    <section>
                        <SectionHeader title="质量月报看板" icon={ShieldCheck} />
                        {/* 顶排质量核心指标 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <MetricCardBase title="平均故障修复时间 (MTTR)" value="2.4" unit="h" trend="▼ 下降 15.2%" subLabel="响应加速" />
                            <MetricCardBase title="缺陷逃逸率 (Leakage)" value="0.21" unit="%" trend="▼ 下降 0.05%" subLabel="拦截提升" />
                            <MetricCardBase title="缺陷删除率 (DRE)" value="98.5" unit="%" trend="▲ 处于健康区间" subLabel="上线前消除" />
                            <MetricCardBase title="线上严重故障数" value="0" unit="个" trend="▲ 环比持平" subLabel="稳定性优异" />
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* MTTR 趋势图 */}
                            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2"><Clock size={16} className="text-indigo-500"/> MTTR (平均修复时长) 月度趋势</h4>
                                    <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 border border-slate-100 rounded">Unit: Hours</span>
                                </div>
                                <div className="h-64 w-full relative">
                                    <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                                        <path d="M0,150 L100,120 L200,140 L300,80 L400,100 L500,40 L600,60 L700,30 L800,50" fill="none" stroke="#6366f1" strokeWidth="3" />
                                        <path d="M0,150 L100,120 L200,140 L300,80 L400,100 L500,40 L600,60 L700,30 L800,50 V200 H0 Z" fill="#6366f1" opacity="0.05" />
                                        {/* Horizontal guides */}
                                        <line x1="0" y1="50" x2="800" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                                        <line x1="0" y1="100" x2="800" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                                        <line x1="0" y1="150" x2="800" y2="150" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                                    </svg>
                                    <div className="flex justify-between text-[10px] font-black text-slate-300 mt-4 uppercase tracking-widest px-2">
                                        <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 质量分布卡片 */}
                            <div className="lg:col-span-4 space-y-6">
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Globe size={14}/> 线上故障分级统计</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-600">P0 (致命)</span><span className="text-xs font-black text-slate-400">0</span></div>
                                        <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-rose-500" style={{width:'0%'}}></div></div>
                                        <div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-600">P1 (严重)</span><span className="text-xs font-black text-slate-400">2</span></div>
                                        <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-orange-400" style={{width:'15%'}}></div></div>
                                        <div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-600">P2 (一般)</span><span className="text-xs font-black text-slate-800">12</span></div>
                                        <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{width:'65%'}}></div></div>
                                    </div>
                                </div>
                                <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Smile size={60}/></div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">团队健康指数自评</h4>
                                    <div className="text-4xl font-black mb-4">4.8 <span className="text-sm font-bold opacity-60">/ 5.0</span></div>
                                    <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                                        <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></div>
                                        <span className="text-[10px] font-bold uppercase opacity-80">成员协作满意度极高</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
      </div>
      
      <style>{`
          .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #e2e8f0 !important;
          }
          .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
          }
      `}</style>
    </div>
  );
};
