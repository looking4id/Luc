
import React, { useState, useMemo } from 'react';
import { 
  Lock, ShieldAlert, Users, CheckCircle2, ChevronRight, Plus, 
  XCircle, Search, Trash2, Edit3, Check, RefreshCw, ShieldCheck
} from '../Icons';
import { MOCK_USERS } from '../../constants';

// --- 内部组件：创建/编辑角色弹窗 ---
const RoleFormModal = ({ isOpen, onClose, onSave, initialData }: any) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    React.useEffect(() => {
        if (isOpen) {
            setName(initialData?.name || '');
            setDesc(initialData?.desc || '');
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-800">{initialData ? '编辑角色' : '新建自定义角色'}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                </div>
                <form className="p-8 space-y-5" onSubmit={(e) => { e.preventDefault(); onSave({ name, desc }); }}>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">角色名称</label>
                        <input required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none bg-slate-50" placeholder="如：财务审计员" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">角色描述</label>
                        <textarea className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none bg-slate-50 h-24 resize-none" placeholder="描述该角色的职能范围..." value={desc} onChange={e => setDesc(e.target.value)} />
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">取消</button>
                        <button type="submit" className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg transition-all active:scale-95">确认保存</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- 内部组件：权限矩阵弹窗 ---
const PermissionMatrixModal = ({ isOpen, onClose, roleName }: any) => {
    const modules = [
        { title: '需求管理', items: ['查看需求', '创建需求', '编辑需求', '删除需求', '导出数据'] },
        { title: '缺陷追踪', items: ['查看缺陷', '登记缺陷', '修复缺陷', '关闭缺陷', '批量流转'] },
        { title: '项目设置', items: ['修改基本信息', '应用管理', '工作流配置', '成员邀请'] },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">编辑权限矩阵：{roleName}</h3>
                        <p className="text-xs text-slate-400 font-medium">勾选下方选项为该角色分配具体操作权限</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                </div>
                <div className="p-8 max-h-[60vh] overflow-y-auto space-y-8 custom-scrollbar">
                    {modules.map(mod => (
                        <div key={mod.title} className="space-y-4">
                            <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3">
                                <h4 className="font-bold text-slate-700">{mod.title}</h4>
                                <button className="text-[10px] text-blue-500 font-bold hover:underline ml-2">全选</button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {mod.items.map(item => (
                                    <label key={item} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors group">
                                        <input type="checkbox" defaultChecked={roleName === '超级管理员'} className="w-4 h-4 rounded text-blue-600" />
                                        <span className="text-sm font-medium text-slate-600 group-hover:text-blue-700">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-slate-400">取消</button>
                    <button onClick={onClose} className="px-8 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-blue-700 active:scale-95 transition-all">保存更改</button>
                </div>
            </div>
        </div>
    );
};

// --- 内部组件：成员管理弹窗 ---
const MemberManagerModal = ({ isOpen, onClose, roleName }: any) => {
    const [search, setSearch] = useState('');
    const filtered = MOCK_USERS.filter(u => u.name.includes(search));

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">关联成员：{roleName}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="relative">
                        <input className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="搜索成员..." value={search} onChange={e => setSearch(e.target.value)} />
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                        {filtered.map(user => (
                            <div key={user.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full ${user.avatarColor} text-white flex items-center justify-center text-xs font-bold`}>{user.name.charAt(0)}</div>
                                    <span className="text-sm font-bold text-slate-700">{user.name}</span>
                                </div>
                                <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                    <button onClick={onClose} className="px-8 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm">确定</button>
                </div>
            </div>
        </div>
    );
};

// --- 主组件 ---
export const SecurityPermissions = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: '超级管理员', desc: '拥有组织最高权限，可管理所有项目、成员及系统配置。', count: 2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 2, name: '项目负责人', desc: '可创建项目，管理所负责项目的所有资源、成员及迭代。', count: 12, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 3, name: '标准成员', desc: '可查看及参与项目协作，管理分配给自己的工作项。', count: 45, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 4, name: '只读成员', desc: '仅拥有查看权限，无法进行编辑、删除等任何修改操作。', count: 5, color: 'text-slate-600', bg: 'bg-slate-100' },
  ]);

  const [policies, setPolicies] = useState([
    { id: 'mfa', title: '双重身份验证 (MFA)', desc: '要求所有用户在登录时必须进行手机短信或动态令牌验证。', enabled: true },
    { id: 'pwd', title: '密码复杂度要求', desc: '强制要求密码长度不少于 12 位，且包含字母、数字及特殊符号。', enabled: true },
    { id: 'ip', title: '登录 IP 限制', desc: '仅允许来自特定 IP 段的用户访问组织资源。', enabled: false },
    { id: 'audit', title: '敏感操作审计', desc: '自动记录所有删除项目、修改权限等敏感操作日志。', enabled: true },
  ]);

  const [activeRole, setActiveRole] = useState<any>(null);
  const [modalType, setModalType] = useState<'form' | 'permission' | 'member' | null>(null);

  const handleTogglePolicy = (id: string) => {
      setPolicies(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const handleSaveRole = (data: any) => {
      const newRole = {
          id: Date.now(),
          name: data.name,
          desc: data.desc,
          count: 0,
          color: 'text-blue-600',
          bg: 'bg-blue-50'
      };
      setRoles([newRole, ...roles]);
      setModalType(null);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* 角色管理部分 - 修改为列表展示 */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
              <Users size={24} className="text-blue-600" /> 组织角色管理
            </h3>
            <p className="text-sm text-slate-400 mt-1">定义不同的职能角色以控制成员对系统资源的访问级别</p>
          </div>
          <button 
            onClick={() => { setActiveRole(null); setModalType('form'); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-bold transition-all shadow-xl shadow-blue-100 active:scale-95"
          >
            <Plus size={16} strokeWidth={3} /> 创建自定义角色
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <th className="py-4 px-8 w-64">角色名称</th>
                <th className="py-4 px-4">角色描述</th>
                <th className="py-4 px-4 w-32 text-center">活跃成员</th>
                <th className="py-4 px-8 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {roles.map(role => (
                <tr key={role.id} className="hover:bg-blue-50/20 transition-all group">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${role.bg} ${role.color} flex items-center justify-center`}>
                        <ShieldCheck size={18} />
                      </div>
                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{role.name}</span>
                    </div>
                  </td>
                  <td className="py-5 px-4 text-sm text-slate-500 line-clamp-1 h-16 flex items-center">{role.desc}</td>
                  <td className="py-5 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full ${role.bg} ${role.color} text-[10px] font-black border border-current opacity-70`}>
                      {role.count} 成员
                    </span>
                  </td>
                  <td className="py-5 px-8 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => { setActiveRole(role); setModalType('permission'); }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all"
                        title="编辑权限"
                      >
                        <Lock size={18} />
                      </button>
                      <button 
                        onClick={() => { setActiveRole(role); setModalType('member'); }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all"
                        title="管理成员"
                      >
                        <Users size={18} />
                      </button>
                      <button 
                        onClick={() => { setActiveRole(role); setModalType('form'); }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all"
                        title="修改信息"
                      >
                        <Edit3 size={18} />
                      </button>
                      {role.name !== '超级管理员' && (
                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all" title="删除角色">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 安全策略部分 - 保持原有设计 */}
      <section>
        <div className="mb-8">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
              <ShieldAlert size={24} className="text-orange-500" /> 企业级安全策略
            </h3>
            <p className="text-sm text-slate-400 mt-1">全局加固组织的账户安全性与操作合规性</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl divide-y divide-slate-50 overflow-hidden shadow-sm">
          {policies.map(policy => (
              <div key={policy.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                <div className="flex gap-5">
                    <div className={`p-4 rounded-2xl shadow-inner border transition-all ${policy.enabled ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-300 border-slate-200'}`}>
                        <Lock size={24} />
                    </div>
                    <div className="space-y-1 pt-0.5">
                        <div className="font-black text-slate-800 text-base flex items-center gap-2">
                            {policy.title}
                            {policy.enabled && <CheckCircle2 size={16} className="text-emerald-500" />}
                        </div>
                        <div className="text-sm text-slate-500 font-medium max-w-xl">{policy.desc}</div>
                    </div>
                </div>
                <div 
                    onClick={() => handleTogglePolicy(policy.id)}
                    className={`w-14 h-7 rounded-full relative cursor-pointer transition-all duration-300 border-2 ${policy.enabled ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-100' : 'bg-slate-200 border-slate-200'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 transform ${policy.enabled ? 'translate-x-7' : 'translate-x-0.5'}`}></div>
                </div>
              </div>
          ))}
        </div>
      </section>

      {/* 各类功能弹窗 */}
      <RoleFormModal 
        isOpen={modalType === 'form'} 
        onClose={() => setModalType(null)} 
        onSave={handleSaveRole} 
        initialData={activeRole} 
      />
      <PermissionMatrixModal 
        isOpen={modalType === 'permission'} 
        onClose={() => setModalType(null)} 
        roleName={activeRole?.name} 
      />
      <MemberManagerModal 
        isOpen={modalType === 'member'} 
        onClose={() => setModalType(null)} 
        roleName={activeRole?.name} 
      />
    </div>
  );
};
