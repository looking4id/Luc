
import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Users, MoreHorizontal, UserCheck, 
  ShieldAlert, Mail, XCircle, RefreshCw, CheckCircle2, 
  Download, UserPlus, Send, Filter, ShieldCheck, Settings, Trash2
} from './Icons';
import { MOCK_USERS } from '../constants';

// --- 内部组件：邀请成员弹窗 ---
const InviteMemberModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
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
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
                <div className="p-8 space-y-6 text-center">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail size={32} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800">邀请新成员加入项目</h3>
                    <p className="text-sm text-slate-400 font-medium">请输入成员邮箱，多个邮箱请用逗号或回车分隔</p>
                    <textarea 
                        className="w-full border border-slate-200 rounded-xl p-4 text-sm focus:border-blue-500 outline-none h-32 bg-slate-50 font-medium" 
                        placeholder="example1@gproject.com&#10;example2@gproject.com"
                        value={emails}
                        onChange={e => setEmails(e.target.value)}
                    />
                    <div className="flex gap-3 pt-2">
                        <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-400 hover:text-slate-600">取消</button>
                        <button onClick={handleInvite} className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95">
                            {isSent ? <CheckCircle2 size={18} /> : <Send size={18} />}
                            {isSent ? '邀请已发送' : '发送项目邀请'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 主组件 ---
export const ProjectMembers = () => {
  const [members, setMembers] = useState(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // 搜索过滤逻辑
  const filteredMembers = useMemo(() => {
    return members.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (user.name.toLowerCase() + '@gproject.com').includes(searchQuery.toLowerCase())
    );
  }, [members, searchQuery]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 relative font-sans">
      {/* 1. 顶部操作区 */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">项目成员管理</h3>
          <p className="text-sm text-slate-500 font-medium">当前项目共有 <span className="text-blue-600 font-bold">{members.length}</span> 位协作成员</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={handleExport}
             disabled={isExporting}
             className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 text-sm font-bold transition-all disabled:opacity-50"
           >
            {isExporting ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
            {isExporting ? '导出中...' : '导出成员'}
          </button>
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-900 text-sm font-bold transition-all shadow-lg active:scale-95"
          >
            <Mail size={16} /> 批量邀请
          </button>
          <button 
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-bold transition-all shadow-xl shadow-blue-100 active:scale-95"
          >
            <Plus size={16} strokeWidth={3} /> 添加成员
          </button>
        </div>
      </div>

      {/* 2. 统计卡片行 */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner"><Users size={24}/></div>
            <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">项目总人数</div>
                <div className="text-2xl font-black text-slate-800 tabular-nums">{members.length}</div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner"><ShieldCheck size={24}/></div>
            <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">项目管理员</div>
                <div className="text-2xl font-black text-slate-800 tabular-nums">1</div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner"><CheckCircle2 size={24}/></div>
            <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">待接受邀请</div>
                <div className="text-2xl font-black text-slate-800 tabular-nums">0</div>
            </div>
        </div>
      </div>

      {/* 3. 搜索与列表 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索成员姓名、职位或邮箱账号..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 w-96 bg-white transition-all shadow-sm font-medium" 
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-all">
                <Filter size={14} /> 多维筛选
             </button>
             <div className="w-px h-6 bg-slate-200"></div>
             <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Showing {filteredMembers.length} Members</span>
          </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-slate-50/50">
                <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="py-4 px-8 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
                <th className="py-4 px-4">成员信息</th>
                <th className="py-4 px-4">项目角色</th>
                <th className="py-4 px-4">所属部门</th>
                <th className="py-4 px-4">状态</th>
                <th className="py-4 px-8 text-right">操作</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {filteredMembers.map((user, i) => (
                <tr key={user.id} className="hover:bg-blue-50/20 transition-all group animate-in fade-in slide-in-from-left-2 duration-300">
                    <td className="py-5 px-8"><input type="checkbox" className="rounded border-slate-300 text-blue-600" /></td>
                    <td className="py-5 px-4">
                    <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-2xl ${user.avatarColor} text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-110 transition-transform`}>
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{user.name}</span>
                            <span className="text-xs text-slate-400 font-medium">{user.name.toLowerCase()}@example.com</span>
                        </div>
                    </div>
                    </td>
                    <td className="py-5 px-4">
                        <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase border shadow-sm flex items-center gap-1.5 w-fit ${
                            i === 0 
                                ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
                                : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                            {i === 0 ? <ShieldCheck size={12}/> : null}
                            {i === 0 ? '项目管理员' : '开发人员'}
                        </span>
                    </td>
                    <td className="py-5 px-4 text-sm text-slate-600 font-bold">研发中心 / {i % 2 === 0 ? '前端开发组' : '后端开发组'}</td>
                    <td className="py-5 px-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-bold text-slate-600">活跃</span>
                        </div>
                    </td>
                    <td className="py-5 px-8 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all" title="角色设置"><Settings size={18} /></button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all" title="移交负责事项"><UserCheck size={18} /></button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all" title="移除出项目"><Trash2 size={18} /></button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {filteredMembers.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-slate-300">
                <Search size={64} className="opacity-10 mb-4" />
                <p className="font-bold text-lg">没有找到符合搜索条件的成员</p>
                <button onClick={() => setSearchQuery('')} className="mt-4 text-blue-600 hover:underline font-bold">查看所有成员</button>
            </div>
        )}
      </div>

      {/* 4. 成功反馈 Toast */}
      {showToast && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 duration-500">
              <CheckCircle2 size={24} className="text-green-400" />
              <div className="flex flex-col">
                  <span className="text-sm font-bold">名单导出成功</span>
                  <span className="text-xs opacity-60">Excel 文件已生成并开始下载</span>
              </div>
          </div>
      )}

      {/* 5. 弹窗组件 */}
      <InviteMemberModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
      />
    </div>
  );
};
