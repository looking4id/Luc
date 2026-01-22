
import React, { useState, useMemo } from 'react';
// Added missing icon imports: Edit3, ShieldAlert, and CheckCircle2
import { Search, Plus, Filter, MoreHorizontal, ChevronDown, Copy, XCircle, Check, UserCheck, ShieldCheck, Mail, UserPlus, Trash2, Edit3, ShieldAlert, CheckCircle2 } from '../../Icons';
import { MOCK_USERS } from '../../../utils/constants';

// --- 内部组件：添加成员弹窗 ---
const AddMemberModal = ({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (user: any) => void }) => {
    const [selectedUserId, setSelectedUserId] = useState('');
    const [role, setRole] = useState('开发人员');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = MOCK_USERS.find(u => u.id === selectedUserId);
        if (user) {
            onAdd({ ...user, group: role, joinDate: new Date().toISOString().split('T')[0], status: '正常' });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-800">添加项目成员</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                </div>
                <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">选择组织内用户</label>
                        <select 
                            required
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none bg-slate-50 font-bold"
                            value={selectedUserId}
                            onChange={e => setSelectedUserId(e.target.value)}
                        >
                            <option value="">请选择用户</option>
                            {MOCK_USERS.map(u => (
                                <option key={u.id} value={u.id}>{u.name} ({u.name.toLowerCase()}@example.com)</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">项目角色</label>
                        <select 
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 bg-slate-50 font-bold"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        >
                            <option value="开发人员">开发人员</option>
                            <option value="测试人员">测试人员</option>
                            <option value="产品经理">产品经理</option>
                            <option value="管理员">管理员</option>
                        </select>
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">取消</button>
                        <button type="submit" disabled={!selectedUserId} className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg disabled:opacity-50 transition-all active:scale-95">确定添加</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- 主组件 ---
export const MemberManagementView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('项目成员');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // 核心成员数据
  const [members, setMembers] = useState([
    { id: 'u1', name: '王亮', realName: '王亮', dept: '研发中心', gender: '男', position: '架构师', email: 'looking4id@163.com', group: '管理员', joinDate: '2026-01-01', status: '正常', avatarColor: 'bg-blue-600' }
  ]);

  // 待审批数据
  const [approvals, setApprovals] = useState([
    { id: 'app-1', name: '张三', email: 'zhangsan@example.com', dept: '市场部', applyDate: '2026-01-18', reason: '参与Q1促销活动需求评审' }
  ]);

  // 筛选状态
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [statusFilter, setStatusFilter] = useState('所有');
  const [groupFilter, setGroupFilter] = useState('所有'); // 新增：用户组筛选状态

  // 过滤后的成员列表
  const filteredMembers = useMemo(() => {
    return members.filter(m => {
        const matchName = m.name.toLowerCase().includes(searchName.toLowerCase());
        const matchEmail = m.email.toLowerCase().includes(searchEmail.toLowerCase());
        const matchStatus = statusFilter === '所有' || m.status === statusFilter;
        // 用户组过滤逻辑：管理员匹配 strictly，普通成员匹配非管理员
        const matchGroup = groupFilter === '所有' || 
                          (groupFilter === '管理员' ? m.group === '管理员' : m.group !== '管理员');
        return matchName && matchEmail && matchStatus && matchGroup;
    });
  }, [members, searchName, searchEmail, statusFilter, groupFilter]);

  const handleAddMember = (newMember: any) => {
      if (members.some(m => m.id === newMember.id)) {
          alert('该用户已在项目中');
          return;
      }
      setMembers([...members, { ...newMember, id: `pm-${Date.now()}` }]);
  };

  const handleApprove = (id: string) => {
      const applicant = approvals.find(a => a.id === id);
      if (applicant) {
          handleAddMember({
              id: applicant.id,
              name: applicant.name,
              realName: applicant.name,
              dept: applicant.dept,
              gender: '--',
              position: '--',
              email: applicant.email,
              group: '普通成员',
              joinDate: new Date().toISOString().split('T')[0],
              status: '正常',
              avatarColor: 'bg-emerald-500'
          });
          setApprovals(approvals.filter(a => a.id !== id));
      }
  };

  const handleReject = (id: string) => {
      if (window.confirm('确定拒绝该申请吗？')) {
          setApprovals(approvals.filter(a => a.id !== id));
      }
  };

  const handleRemoveMember = (id: string) => {
      if (window.confirm('确定要将该成员移除出项目吗？')) {
          setMembers(members.filter(m => m.id !== id));
      }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 font-sans">
      <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-800">成员管理</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 transition-all">
                <Copy size={14} /> 复制配置
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 transition-all">
                <Mail size={14} /> 批量邀请
            </button>
          </div>
      </div>
      
      {/* Tab 切换 */}
      <div className="flex items-center gap-8 border-b border-slate-200 mb-6">
        {[
            { label: '项目成员', count: members.length },
            { label: '待审批', count: approvals.length }
        ].map(tab => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 ${
              activeTab === tab.label ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                    activeTab === tab.label ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                    {tab.count}
                </span>
            )}
            {activeTab === tab.label && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full shadow-[0_-2px_4px_rgba(37,99,235,0.2)]"></div>}
          </button>
        ))}
      </div>

      {activeTab === '项目成员' ? (
          <div className="space-y-4">
              <div className="flex items-center justify-between">
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95"
                >
                    <UserPlus size={18} strokeWidth={3} /> 添加成员
                </button>
                
                {/* 核心筛选分类：实现点击切换逻辑 */}
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span 
                        onClick={() => setGroupFilter('所有')}
                        className={`cursor-pointer px-2 py-0.5 rounded border transition-all ${
                            groupFilter === '所有' 
                                ? 'text-blue-600 bg-blue-50 border-blue-100' 
                                : 'hover:text-slate-800 border-transparent'
                        }`}
                    >
                        所有 ({members.length})
                    </span>
                    <span 
                        onClick={() => setGroupFilter('管理员')}
                        className={`cursor-pointer px-2 py-0.5 rounded border transition-all ${
                            groupFilter === '管理员' 
                                ? 'text-blue-600 bg-blue-50 border-blue-100' 
                                : 'hover:text-slate-800 border-transparent'
                        }`}
                    >
                        管理员 ({members.filter(m => m.group === '管理员').length})
                    </span>
                    <span 
                        onClick={() => setGroupFilter('普通成员')}
                        className={`cursor-pointer px-2 py-0.5 rounded border transition-all ${
                            groupFilter === '普通成员' 
                                ? 'text-blue-600 bg-blue-50 border-blue-100' 
                                : 'hover:text-slate-800 border-transparent'
                        }`}
                    >
                        普通成员 ({members.filter(m => m.group !== '管理员').length})
                    </span>
                </div>
              </div>

              {/* 搜索栏 */}
              <div className="p-3 border border-slate-200 rounded-2xl bg-white grid grid-cols-12 gap-3 shadow-sm">
                <div className="col-span-3 relative">
                  <input 
                    type="text" 
                    placeholder="按昵称搜索..." 
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-100 rounded-xl text-xs bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-medium" 
                  />
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <div className="col-span-2 relative">
                  <select 
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-100 rounded-xl text-xs bg-slate-50 focus:bg-white outline-none cursor-pointer font-bold text-slate-600"
                  >
                    <option value="所有">所有状态</option>
                    <option value="正常">正常</option>
                    <option value="离职">离职</option>
                  </select>
                </div>
                <div className="col-span-4 relative">
                  <input 
                    type="text" 
                    placeholder="通过邮箱精确查找..." 
                    value={searchEmail}
                    onChange={e => setSearchEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-100 rounded-xl text-xs bg-slate-50 focus:bg-white outline-none transition-all font-medium" 
                  />
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <div className="col-span-3">
                   <button onClick={() => { setSearchName(''); setSearchEmail(''); setStatusFilter('所有'); setGroupFilter('所有'); }} className="w-full h-full text-xs font-black text-slate-400 hover:text-blue-600 transition-colors">清除筛选条件</button>
                </div>
              </div>

              <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <tr className="border-b border-slate-100">
                      <th className="py-4 px-6 w-10"><input type="checkbox" className="rounded border-slate-300" /></th>
                      <th className="py-4 px-4">成员昵称</th>
                      <th className="py-4 px-4">真实姓名</th>
                      <th className="py-4 px-4">部门</th>
                      <th className="py-4 px-4">邮箱</th>
                      <th className="py-4 px-4">用户组</th>
                      <th className="py-4 px-4">状态</th>
                      <th className="py-4 px-6 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-slate-600 divide-y divide-slate-50">
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-blue-50/20 transition-all group animate-in fade-in duration-300">
                        <td className="py-4 px-6"><input type="checkbox" className="rounded border-slate-300" /></td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${m.avatarColor} text-white flex items-center justify-center font-black text-[11px] shadow-sm`}>{m.name.charAt(0)}</div>
                            <span className="font-bold text-slate-800">{m.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-medium">{m.realName}</td>
                        <td className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">{m.dept}</td>
                        <td className="py-4 px-4 text-xs font-mono">{m.email}</td>
                        <td className="py-4 px-4">
                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase border ${
                                m.group === '管理员' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                            }`}>
                                {m.group === '管理员' && <ShieldCheck size={10} className="inline mr-1" />}
                                {m.group}
                            </span>
                        </td>
                        <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${m.status === '正常' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                                <span className="text-[11px] font-bold">{m.status}</span>
                            </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                           <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                              <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100"><Edit3 size={16} /></button>
                              <button onClick={() => handleRemoveMember(m.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100"><Trash2 size={16} /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                    {filteredMembers.length === 0 && (
                        <tr>
                            <td colSpan={8} className="py-20 text-center text-slate-300 italic font-medium">没有找到符合条件的成员</td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
          </div>
      ) : (
          /* 待审批列表 */
          <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex items-start gap-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="p-3 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-100 flex-shrink-0">
                      <ShieldAlert size={20} />
                  </div>
                  <div>
                      <h4 className="text-sm font-black text-amber-900 mb-1 tracking-tight">关于待审批成员</h4>
                      <p className="text-xs text-amber-700/80 leading-relaxed max-w-2xl">
                          下方列出的是通过系统邀请或自行申请加入本项目的用户。批准后，他们将获得默认角色权限（开发人员）。
                      </p>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {approvals.map(app => (
                      <div key={app.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group animate-in zoom-in-95 duration-300">
                          <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center font-black text-lg border border-slate-100">{app.name.charAt(0)}</div>
                                  <div>
                                      <h3 className="font-black text-slate-800">{app.name}</h3>
                                      <p className="text-xs text-slate-400 font-mono">{app.email}</p>
                                  </div>
                              </div>
                              <div className="text-right">
                                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">申请于</div>
                                  <div className="text-xs font-bold text-slate-500">{app.applyDate}</div>
                              </div>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-2">申请原因</span>
                              <p className="text-xs text-slate-600 italic leading-relaxed">“ {app.reason} ”</p>
                          </div>
                          <div className="flex gap-3">
                              <button 
                                onClick={() => handleApprove(app.id)}
                                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-700 shadow-lg shadow-blue-50 transition-all flex items-center justify-center gap-2"
                              >
                                  <UserCheck size={14} strokeWidth={3} /> 批准加入
                              </button>
                              <button 
                                onClick={() => handleReject(app.id)}
                                className="flex-1 py-2.5 bg-white border border-slate-200 text-rose-500 rounded-xl text-xs font-black hover:bg-rose-50 transition-all"
                              >
                                  拒绝申请
                              </button>
                          </div>
                      </div>
                  ))}
                  {approvals.length === 0 && (
                      <div className="col-span-full py-32 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-3xl">
                          <CheckCircle2 size={48} className="opacity-10 mb-4" />
                          <p className="font-bold">暂无待审批的加入申请</p>
                      </div>
                  )}
              </div>
          </div>
      )}

      {/* 弹窗组件 */}
      <AddMemberModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddMember} 
      />
    </div>
  );
};
