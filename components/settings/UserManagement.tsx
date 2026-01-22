
import React, { useState, useMemo } from 'react';
// Fix: Added missing Send icon import
import { Search, Plus, MoreHorizontal, UserCheck, ShieldAlert, Mail, XCircle, RefreshCw, CheckCircle2, Download, UserPlus, Send } from '../Icons';
import { MOCK_USERS } from '../../constants';

// --- 内部组件：创建用户弹窗 ---
const CreateUserModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: (user: any) => void }) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', role: 'Member', dept: '研发中心 / 前端部' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // 模拟 API 请求
        setTimeout(() => {
            onSuccess({
                id: `u${Date.now()}`,
                name: form.name,
                email: form.email,
                role: form.role,
                dept: form.dept,
                avatarColor: 'bg-indigo-50',
                status: '在线'
            });
            setLoading(false);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-xl"><Plus size={20} /></div>
                        <h3 className="text-lg font-bold text-slate-800">新建系统用户</h3>
                    </div>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                </div>
                <form className="p-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">用户姓名</label>
                        <input required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-slate-50" placeholder="请输入真实姓名" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">电子邮箱</label>
                        <input required type="email" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-slate-50" placeholder="example@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">系统角色</label>
                            <select className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 bg-slate-50 font-bold" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                                <option value="Member">普通成员</option>
                                <option value="Admin">管理员</option>
                                <option value="Super Admin">超级管理员</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">所属部门</label>
                            <input className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none bg-slate-50" value={form.dept} onChange={e => setForm({...form, dept: e.target.value})} />
                        </div>
                    </div>
                    <div className="pt-6 border-t border-slate-100 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">取消</button>
                        <button type="submit" disabled={loading} className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-2">
                            {loading ? <RefreshCw size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                            {loading ? '正在同步数据...' : '确认创建用户'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- 内部组件：快速邀请弹窗 ---
const InviteUserModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [emails, setEmails] = useState('');
    const [isSent, setIsSent] = useState(false);

    const handleInvite = () => {
        setIsSent(true);
        setTimeout(() => {
            setIsSent(false);
            onClose();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-8 space-y-6 text-center">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">批量邀请新成员</h3>
                    <p className="text-sm text-slate-400">请输入成员邮箱，多个邮箱请用逗号或回车分隔</p>
                    <textarea 
                        className="w-full border border-slate-200 rounded-xl p-4 text-sm focus:border-blue-500 outline-none h-32 bg-slate-50" 
                        placeholder="example1@gproject.com&#10;example2@gproject.com"
                        value={emails}
                        onChange={e => setEmails(e.target.value)}
                    />
                    <div className="flex gap-3 pt-2">
                        <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-400 hover:text-slate-600">取消</button>
                        <button onClick={handleInvite} className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95">
                            {isSent ? <CheckCircle2 size={18} /> : <Send size={18} />}
                            {isSent ? '邀请已发送' : '发送邀请链接'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 主组件 ---
export const UserManagement = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // 搜索过滤逻辑
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (user.name.toLowerCase() + '@gproject.com').includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const handleCreateSuccess = (newUser: any) => {
    setUsers([newUser, ...users]);
    setIsCreateModalOpen(false);
    triggerToast();
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      triggerToast('名单导出成功！');
    }, 1500);
  };

  const triggerToast = (msg?: string) => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
      {/* 顶部操作区 */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
        <div>
          <h3 className="text-xl font-black text-slate-800">用户管理</h3>
          <p className="text-sm text-slate-500 font-medium">当前组织内共有 <span className="text-blue-600 font-bold">{users.length}</span> 位活跃成员</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={handleExport}
             disabled={isExporting}
             className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 text-sm font-bold transition-all disabled:opacity-50"
           >
            {isExporting ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
            {isExporting ? '导出中...' : '导出名单'}
          </button>
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-900 text-sm font-bold transition-all shadow-lg active:scale-95"
          >
            <Mail size={16} /> 批量邀请
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-bold transition-all shadow-xl shadow-blue-100 active:scale-95"
          >
            <Plus size={16} strokeWidth={3} /> 创建新用户
          </button>
        </div>
      </div>

      {/* 搜索与统计 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索姓名、工号或邮箱账号..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 w-80 bg-white transition-all shadow-sm" 
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest">
            Showing {filteredUsers.length} Results
          </div>
        </div>

        {/* 用户列表 */}
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-slate-50/50">
                <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="py-4 px-8 w-12"><input type="checkbox" className="rounded" /></th>
                <th className="py-4 px-4">用户信息</th>
                <th className="py-4 px-4">角色</th>
                <th className="py-4 px-4">所在部门</th>
                <th className="py-4 px-4">当前状态</th>
                <th className="py-4 px-8 text-right">操作</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((user, i) => (
                <tr key={user.id} className="hover:bg-blue-50/20 transition-all group animate-in fade-in slide-in-from-left-2 duration-300">
                    <td className="py-5 px-8"><input type="checkbox" className="rounded text-blue-600" /></td>
                    <td className="py-5 px-4">
                    <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-2xl ${user.avatarColor} text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-110 transition-transform`}>
                        {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                        <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{user.name}</span>
                        <span className="text-xs text-slate-400 font-medium">{user.name.toLowerCase()}@gproject.com</span>
                        </div>
                    </div>
                    </td>
                    <td className="py-5 px-4">
                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase border shadow-sm ${
                        user.role === 'Admin' || user.role === 'Super Admin' 
                            ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
                            : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                        {user.role || 'Member'}
                    </span>
                    </td>
                    <td className="py-5 px-4 text-sm text-slate-600 font-bold">{user.dept || '研发中心 / 前端部'}</td>
                    <td className="py-5 px-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-slate-600">在线</span>
                    </div>
                    </td>
                    <td className="py-5 px-8 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all" title="权限设置"><ShieldAlert size={18} /></button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all" title="移交工作项"><UserCheck size={18} /></button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all"><MoreHorizontal size={18} /></button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {filteredUsers.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-slate-300">
                <Search size={64} className="opacity-10 mb-4" />
                <p className="font-bold text-lg">没有找到符合条件的用户</p>
                <button onClick={() => setSearchQuery('')} className="mt-4 text-blue-600 hover:underline font-bold">清除搜索条件</button>
            </div>
        )}
      </div>

      {/* 提示组件 */}
      {showToast && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 duration-500">
              <CheckCircle2 size={24} className="text-green-400" />
              <div className="flex flex-col">
                  <span className="text-sm font-bold">操作成功</span>
                  <span className="text-xs opacity-60">数据已同步至云端集群</span>
              </div>
          </div>
      )}

      {/* 模态框组件 */}
      <CreateUserModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={handleCreateSuccess} 
      />
      <InviteUserModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
      />
    </div>
  );
};
