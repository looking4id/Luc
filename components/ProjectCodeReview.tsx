
import React from 'react';
import { GitPullRequest, Plus, MoreHorizontal } from './Icons';

export const ProjectCodeReview = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <GitPullRequest size={20} className="text-purple-500" /> 代码评审
            </h3>
             <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-2">
                <Plus size={16} /> 发起评审
            </button>
        </div>
        <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                        <th className="py-3 px-4 w-24">ID</th>
                        <th className="py-3 px-4">标题</th>
                        <th className="py-3 px-4 w-32">状态</th>
                        <th className="py-3 px-4 w-32">发起人</th>
                        <th className="py-3 px-4 w-32">评审人</th>
                        <th className="py-3 px-4 w-40">更新时间</th>
                        <th className="py-3 px-4 w-20 text-right">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { id: 'MR-101', title: 'feat: add user login api', status: 'Open', author: 'lo', reviewer: 'dev01', time: '10分钟前' },
                        { id: 'MR-100', title: 'fix: payment callback error', status: 'Merged', author: 'dev01', reviewer: 'lo', time: '2小时前' },
                        { id: 'MR-99', title: 'docs: update readme', status: 'Merged', author: 'pm01', reviewer: 'lo', time: '1天前' },
                    ].map(mr => (
                        <tr key={mr.id} className="border-b border-slate-100 hover:bg-slate-50 group">
                            <td className="py-3 px-4 text-xs font-mono text-slate-500">{mr.id}</td>
                            <td className="py-3 px-4">
                                <div className="font-medium text-slate-700 hover:text-blue-600 cursor-pointer">{mr.title}</div>
                            </td>
                            <td className="py-3 px-4">
                                <span className={`text-xs px-2 py-0.5 rounded border ${
                                    mr.status === 'Open' ? 'bg-green-50 text-green-600 border-green-200' : 
                                    'bg-purple-50 text-purple-600 border-purple-200'
                                }`}>{mr.status}</span>
                            </td>
                             <td className="py-3 px-4 text-sm text-slate-600">{mr.author}</td>
                             <td className="py-3 px-4 text-sm text-slate-600">{mr.reviewer}</td>
                             <td className="py-3 px-4 text-sm text-slate-500">{mr.time}</td>
                             <td className="py-3 px-4 text-right">
                                <button className="p-1 text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
