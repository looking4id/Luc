
import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, ChevronDown, Copy } from '../../Icons';

export const MemberManagementView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('项目成员');

  const members = [
    { name: '王亮', realName: '王亮', dept: '新清企业', gender: '--', position: '--', email: 'looking4id@163.com', group: '管理员', joinDate: '2026-01-01', status: '正常' }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-xl font-bold text-slate-800 mb-6">成员管理</h2>
      
      <div className="flex items-center gap-8 border-b border-slate-200 mb-6">
        {['项目成员', '待审批'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center gap-1.5 px-4 py-1.5 border border-slate-300 rounded text-sm text-slate-700 hover:bg-slate-50">
          <Plus size={16} /> 添加成员
        </button>
        <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800">
          <Copy size={14} /> 复制配置
        </button>
      </div>

      <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-t-lg flex items-center gap-8 text-xs font-medium text-slate-500">
        <span className="text-blue-600 font-bold border-b border-blue-600 pb-0.5">所有 (1)</span>
        <span className="cursor-pointer hover:text-slate-800">管理员 (1)</span>
        <span className="cursor-pointer hover:text-slate-800">普通成员 (0)</span>
      </div>

      <div className="p-3 border-x border-slate-100 bg-white grid grid-cols-12 gap-3">
        <div className="col-span-2 relative">
          <input type="text" placeholder="昵称 所有" className="w-full pl-3 pr-8 py-1.5 border border-slate-200 rounded text-[11px] focus:outline-none focus:border-blue-500" />
        </div>
        <div className="col-span-2 relative">
          <button className="w-full px-3 py-1.5 border border-slate-200 rounded text-[11px] text-left text-slate-500 flex items-center justify-between">
            状态 所有 <ChevronDown size={12} />
          </button>
        </div>
        <div className="col-span-2 relative">
          <input type="text" placeholder="邮箱 所有" className="w-full pl-3 pr-8 py-1.5 border border-slate-200 rounded text-[11px] focus:outline-none focus:border-blue-500" />
        </div>
        <div className="col-span-3 relative">
          <button className="w-full px-3 py-1.5 border border-slate-200 rounded text-[11px] text-left text-slate-500 flex items-center justify-between">
            加入项目时间 开始时间 -> 结束时间 <ChevronDown size={12} />
          </button>
        </div>
        <div className="col-span-2 relative">
          <button className="w-full px-3 py-1.5 border border-slate-200 rounded text-[11px] text-left text-slate-500 flex items-center justify-between">
            组织架构 所有 <ChevronDown size={12} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-100">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead className="bg-slate-50/30 text-[11px] text-slate-400 font-medium">
            <tr className="border-b border-slate-100">
              <th className="py-3 px-4 w-10"><input type="checkbox" className="rounded border-slate-300" /></th>
              <th className="py-3 px-4">成员昵称</th>
              <th className="py-3 px-4">真实姓名</th>
              <th className="py-3 px-4">部门</th>
              <th className="py-3 px-4">性别</th>
              <th className="py-3 px-4">职位</th>
              <th className="py-3 px-4">邮箱</th>
              <th className="py-3 px-4">用户组</th>
              <th className="py-3 px-4">加入项目时间</th>
              <th className="py-3 px-4">状态</th>
            </tr>
          </thead>
          <tbody className="text-[12px] text-slate-600">
            {members.map((m, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-4 px-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px]">王</div>
                    {m.name}
                  </div>
                </td>
                <td className="py-4 px-4">{m.realName}</td>
                <td className="py-4 px-4 text-center">{m.dept}</td>
                <td className="py-4 px-4 text-center">{m.gender}</td>
                <td className="py-4 px-4 text-center">{m.position}</td>
                <td className="py-4 px-4">{m.email}</td>
                <td className="py-4 px-4">{m.group}</td>
                <td className="py-4 px-4">{m.joinDate}</td>
                <td className="py-4 px-4">{m.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
