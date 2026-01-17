
import React from 'react';
import { Search, Plus, GitBranch, Clock, Code2, Star, MoreHorizontal, RefreshCw, GitPullRequest } from './Icons';

export const CodeManagement = () => {
  const repos = [
    { name: 'frontend-main-app', lang: 'TypeScript', branch: 'master', commits: 1240, updated: '2小时前', color: 'bg-blue-500' },
    { name: 'backend-api-service', lang: 'Go', branch: 'dev', commits: 856, updated: '5分钟前', color: 'bg-cyan-500' },
    { name: 'data-pipeline-utils', lang: 'Python', branch: 'main', commits: 210, updated: '3天前', color: 'bg-yellow-500' },
    { name: 'infra-terraform-config', lang: 'HCL', branch: 'production', commits: 45, updated: '1周前', color: 'bg-purple-500' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
        <h2 className="text-xl font-bold text-slate-800">代码管理</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all shadow-sm">
            <Plus size={16} /> 创建仓库
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="代码总量" value="2.4M" unit="Lines" trend="+12%" />
          <StatCard title="本周提交" value="428" unit="Commits" trend="+5%" />
          <StatCard title="活跃仓库" value="12" unit="Repos" trend="0" />
          <StatCard title="待评审MR" value="8" unit="Items" trend="-2" />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-700 text-sm">代码仓库</span>
              <div className="relative">
                <input type="text" placeholder="搜索仓库..." className="pl-8 pr-4 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 w-48" />
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-slate-400 hover:text-slate-600"><RefreshCw size={16} /></button>
              <button className="p-1.5 text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-4 px-6">仓库名称</th>
                <th className="py-4 px-4">语言</th>
                <th className="py-4 px-4">默认分支</th>
                <th className="py-4 px-4">提交总数</th>
                <th className="py-4 px-4">最后更新</th>
                <th className="py-4 px-6 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {repos.map((repo, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${repo.color} text-white`}>
                        <Code2 size={18} />
                      </div>
                      <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{repo.name}</span>
                      <Star size={14} className="text-slate-300 hover:text-yellow-400" />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-500">{repo.lang}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded w-fit">
                      <GitBranch size={12} /> {repo.branch}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm font-mono text-slate-600">{repo.commits}</td>
                  <td className="py-4 px-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock size={14} /> {repo.updated}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-400 hover:text-blue-600 font-medium text-xs">查看详情</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, unit, trend }: any) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-black text-slate-800">{value}</span>
      <span className="text-xs text-slate-400">{unit}</span>
    </div>
    <div className={`text-[10px] font-bold mt-2 ${trend.startsWith('+') ? 'text-green-600' : trend === '0' ? 'text-slate-400' : 'text-red-500'}`}>
      {trend !== '0' && (trend.startsWith('+') ? '↑ ' : '↓ ')}
      {trend === '0' ? '持平' : trend}
      <span className="text-slate-300 ml-1 font-normal">较上周</span>
    </div>
  </div>
);
