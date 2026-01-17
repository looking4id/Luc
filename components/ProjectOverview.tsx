
import React from 'react';
import { MoreHorizontal, Zap, Maximize2 } from './Icons';
import { Project } from '../types';
import { DonutChart } from './ProjectShared';

export const ProjectOverview: React.FC<{ project: Project }> = ({ project }) => (
    <div className="grid grid-cols-12 gap-6">
        {/* Row 1: Project Info & Charts */}
        <div className="col-span-12 md:col-span-4 bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
                    项目信息
                </h3>
                <MoreHorizontal size={16} className="text-slate-400 cursor-pointer" />
            </div>
            
            <div className="flex justify-around mb-8">
                <DonutChart percentage={16} color="#ef4444" label="工作项完成率" />
                <DonutChart percentage={0} color="#22c55e" label="工作项延误率" />
                <DonutChart percentage={100} color="#3b82f6" label="工作项类型" />
            </div>

            <div className="space-y-5 text-[15px]">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-slate-500">项目负责人:</span>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center">L</div>
                        <span className="font-medium text-slate-700">lo</span>
                    </div>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-slate-500">项目编号:</span>
                    <span className="font-mono text-slate-700">{project.code}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-500">项目状态:</span>
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-medium border border-blue-100">进行中</span>
                </div>
            </div>
        </div>

        <div className="col-span-12 md:col-span-8 bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
                    报表分析
                </h3>
                <div className="flex items-center gap-6 text-sm">
                    <span className="text-red-600 font-medium border-b-2 border-red-600 pb-1 cursor-pointer">成员负荷</span>
                    <span className="text-slate-500 hover:text-slate-800 cursor-pointer">团队速度</span>
                    <span className="text-slate-500 hover:text-slate-800 cursor-pointer">燃尽图</span>
                    <span className="text-slate-500 hover:text-slate-800 cursor-pointer">累计趋势</span>
                    <Zap size={16} className="text-slate-400 ml-4 cursor-pointer" />
                </div>
            </div>
            
            <div className="h-64 flex items-end justify-around px-8 pb-4 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 top-0 bottom-8 px-8 flex flex-col justify-between pointer-events-none">
                        {[16, 12, 8, 4, 0].map(v => (
                            <div key={v} className="border-b border-slate-100 w-full h-0 flex items-center">
                                <span className="text-xs text-slate-300 -ml-6">{v}</span>
                            </div>
                        ))}
                </div>

                {/* Bars */}
                {[
                    { user: 'lo', task: 12, defect: 4 },
                    { user: 'dev01', task: 8, defect: 2 },
                    { user: 'qa01', task: 5, defect: 8 },
                    { user: 'pm01', task: 15, defect: 0 }
                ].map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 z-10 w-12 group">
                        <div className="w-full flex flex-col-reverse h-56 justify-end relative">
                            <div style={{ height: `${d.task * 5}%` }} className="w-full bg-blue-500 rounded-t-sm relative group-hover:opacity-90 transition-opacity"></div>
                            <div style={{ height: `${d.defect * 5}%` }} className="w-full bg-red-500 rounded-t-sm relative group-hover:opacity-90 transition-opacity"></div>
                        </div>
                        <span className="text-xs text-slate-500">{d.user}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-slate-500">任务</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-slate-500">缺陷</span>
                </div>
            </div>
        </div>

        {/* Row 2: Sprint */}
        <div className="col-span-12 bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
                    迭代
                </h3>
                <div className="flex items-center gap-2 text-slate-400">
                        <Maximize2 size={14} className="cursor-pointer" />
                        <MoreHorizontal size={16} className="cursor-pointer" />
                </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-5 flex items-center justify-between border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xl">Sp</div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-800 text-base">Sprint1: 功能优化</span>
                                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded border border-blue-200">进行中</span>
                            </div>
                            <div className="text-sm text-slate-500 mt-1">修复微信小程序在线点餐系统所存在的缺陷...</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-16">
                        <div className="text-center">
                            <div className="text-xs text-slate-500 mb-1">需求数</div>
                            <div className="font-bold text-slate-800 text-base">5</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-slate-500 mb-1">总缺陷</div>
                            <div className="font-bold text-slate-800 text-base">3</div>
                        </div>
                        <div className="flex flex-col items-end min-w-[140px]">
                            <div className="flex justify-between w-full text-xs text-slate-500 mb-1">
                                <span>时间进度</span>
                                <span>工作项进度 &nbsp; 4/18</span>
                            </div>
                            <div className="text-xs font-mono text-slate-700 mb-2">2025.12.01 - 2025.12.14</div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                <div className="w-[22%] h-full bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
);
