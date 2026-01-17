
import React from 'react';
import { Project } from '../../../types';
import { Search, Plus, UserPlus, Filter, MoreHorizontal, Mail, ShieldCheck, Settings } from '../../Icons';
import { MOCK_USERS } from '../../../constants';

export const ProjectMemberManagementView: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 mb-1">成员管理</h2>
          <p className="text-sm text-slate-400 font-medium">管理项目成员及其访问角色</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Mail size={16} /> 批量邀请
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600 shadow-lg shadow-blue-100 transition-all">
            <UserPlus size={16} /> 添加成员
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between mb-6">
        <div className="flex gap-4 flex-1">
          <div className="relative max-w-xs w-full">
            <input 
              type="text" 
              placeholder="搜索成员姓名、工号..." 
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all bg-white"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-all">
            <Filter size={14} /> 筛选
          </button>
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
           共 {MOCK_USERS.length} 位成员
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <th className="py-4 px-8">成员</th>
              <th className="py-4 px-4">角色</th>
              <th className="py-4 px-4">加入时间</th>
              <th className="py-4 px-8 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_USERS.map((user, i) => (
              <tr key={user.id} className="hover:bg-blue-50/20 transition-colors group">
                <td className="py-4 px-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${user.avatarColor} text-white flex items-center justify-center font-black shadow-sm ring-2 ring-white`}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-800">{user.name}</div>
                      <div className="text-xs text-slate-400 font-mono">ID: 3249{i}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border flex items-center gap-1.5 w-fit ${
                    i === 0 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                  }`}>
                    {i === 0 ? <ShieldCheck size={12} /> : null}
                    {i === 0 ? '项目管理员' : '开发人员'}
                  </span>
                </td>
                <td className="py-4 px-4 text-xs font-bold text-slate-400 font-mono">2026-01-01</td>
                <td className="py-4 px-8 text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 shadow-sm transition-all"><Settings size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 shadow-sm transition-all"><MoreHorizontal size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
