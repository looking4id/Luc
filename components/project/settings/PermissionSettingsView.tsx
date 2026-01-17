
import React, { useState } from 'react';
import { User, Plus, Search, Copy } from '../../Icons';

export const PermissionSettingsView: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState('管理员');
  const [activeTab, setActiveTab] = useState('用户组权限');

  const groups = [
    { name: '管理员', sub: '系统分组', count: 1 },
    { name: '普通成员', sub: '系统分组', count: 0 },
  ];

  const permissionModules = [
    {
      title: '缺陷',
      items: [
        '全部', '创建缺陷', '删除缺陷', '编辑缺陷', '导入缺陷', '导出缺陷', '复制缺陷', '移动缺陷',
        '合并缺陷', '缺陷转需求', '批量流转', '附件上传/关联', '附件下载/预览', '附件删除/解除...', '归档缺陷'
      ],
      checked: [false, true, true, true, true, true, true, true, true, true, true, true, true, true, false]
    },
    {
      title: '需求',
      items: [
        '全部', '创建需求', '删除需求', '编辑需求', '导入需求', '导出需求', '复制需求', '移动需求',
        '批量流转', '设置需求保密', '需求分类管理', '需求排序', '归档需求', '需求转缺陷', '附件删除/解除...', '附件下载/预览',
        '附件上传/关联'
      ],
      checked: [false, true, true, true, true, true, true, true, true, false, true, false, false, false, true, true, true]
    },
    {
      title: '迭代',
      items: [
        '全部', '创建迭代', '删除迭代', '编辑迭代', '导出迭代', '规划迭代', '工作分配', '编辑迭代状态',
        '迭代转测试', '锁定迭代'
      ],
      checked: [false, true, true, true, true, false, true, true, true, false]
    }
  ];

  return (
    <div className="flex h-full animate-in fade-in duration-300">
      {/* Group Sidebar */}
      <div className="w-56 border-r border-slate-200 bg-white flex flex-col flex-shrink-0">
        <div className="p-4 flex items-center justify-between border-b border-slate-50">
          <span className="text-sm font-bold text-slate-800">用户组 <span className="text-slate-400 font-normal">({groups.length})</span></span>
        </div>
        <div className="flex-1 p-3 space-y-2 overflow-y-auto">
          {groups.map(group => (
            <div 
              key={group.name}
              onClick={() => setActiveGroup(group.name)}
              className={`p-3 rounded border transition-all cursor-pointer ${
                activeGroup === group.name ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className={`text-sm font-medium ${activeGroup === group.name ? 'text-blue-600' : 'text-slate-700'}`}>{group.name}</span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400"><User size={10} /> {group.count}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{group.sub}</div>
            </div>
          ))}
          <button className="w-full py-2 text-xs text-slate-400 hover:text-blue-500 flex items-center justify-center gap-1 transition-colors">
            <Plus size={14} /> 添加用户组
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white flex flex-col">
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-slate-800">{activeGroup} <span className="text-slate-400 font-normal text-sm">({groups.find(g => g.name === activeGroup)?.count})</span></h3>
            <div className="flex items-center gap-6 border-slate-200">
              {['用户组权限', '成员管理'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 text-xs font-medium relative ${
                    activeTab === tab ? 'text-blue-600' : 'text-slate-500'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-blue-600"></div>}
                </button>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-1 text-[11px] text-blue-600 border border-blue-200 px-2 py-1 rounded bg-blue-50/50">
            <Copy size={12} /> 复制权限
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="space-y-10">
            {permissionModules.map(module => (
              <div key={module.title} className="border-b border-slate-100 pb-8 last:border-0">
                <h4 className="text-sm font-bold text-slate-700 mb-6">{module.title}</h4>
                <div className="grid grid-cols-4 gap-x-8 gap-y-4">
                  {module.items.map((item, idx) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        defaultChecked={module.checked[idx]} 
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                      />
                      <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/30">
          <button className="px-8 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-100">保存</button>
        </div>
      </div>
    </div>
  );
};
