
import React from 'react';
import { Search, Plus, Users, MoreHorizontal, Filter, ShieldAlert, Mail, UserCheck } from './Icons';
import { MOCK_USERS } from '../constants';

export const MemberManagement = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <Users size={24} className="text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">成员管理</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium transition-all">
            <Mail size={16} /> 批量邀请
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all shadow-sm">
            <Plus size={16} /> 添加成员
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-auto space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="text-sm font-bold text-slate-400 uppercase">当前成员</div>
              <div className="text-2xl font-black text-slate-800">{MOCK_USERS.length}</div>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-bold text-slate-400 uppercase">管理员</div>
              <div className="text-2xl font-black text-slate-800">2</div>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-bold text-slate-400 uppercase">待激活</div>
              <div className="text-2xl font-black text-slate-800">1</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input type="text" placeholder="搜索姓名/账号..." className="pl-8 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 w-56" />
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              <Filter size={14} /> 筛选
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                <th className="py-4 px-6 w-12"><input type="checkbox" className="rounded" /></th>
                <th className="py-4 px-4">姓名</th>
                <th className="py-4 px-4">账号/邮箱</th>
                <th className="py-4 px-4">角色</th>
                <th className="py-4 px-4">部门</th>
                <th className="py-4 px-4">最后登录</th>
                <th className="py-4 px-6 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {MOCK_USERS.map((user, i) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6"><input type="checkbox" className="rounded text-blue-600" /></td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${user.avatarColor} text-white flex items-center justify-center font-bold shadow-sm`}>
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700">{user.name}</span>
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-tighter">Joined 2024</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-500">{user.name.toLowerCase()}@example.com</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      i === 0 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                    }`}>
                      {i === 0 ? 'Admin' : 'Developer'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-medium">技术部 / 前端组</td>
                  <td className="py-4 px-4 text-slate-400 font-mono">2025-08-15 14:22</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="设置权限"><ShieldAlert size={14} /></button>
                      <button className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded" title="移交工作"><UserCheck size={14} /></button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600"><MoreHorizontal size={14} /></button>
                    </div>
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
