
import React, { useState } from 'react';
import { 
  Box, Code2, Share2, RefreshCw, Trash2, AlertTriangle, 
  ChevronRight, Lock, XCircle, CheckCircle2, Globe, Link, Check, Plus, Copy
} from '../Icons';

// --- 内部组件：生成 Token 弹窗 ---
const TokenModal = ({ isOpen, onClose, onSave }: any) => {
    const [name, setName] = useState('');
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-xl"><Lock size={20} /></div>
                        <h3 className="text-lg font-bold text-slate-800">生成开发者 Token</h3>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                </div>
                <form className="p-8 space-y-5" onSubmit={(e) => { 
                    e.preventDefault(); 
                    onSave(name); 
                    setName('');
                }}>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Token 名称</label>
                        <input 
                            required 
                            autoFocus
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none bg-slate-50" 
                            placeholder="例如：生产环境集成密钥" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                        />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                        生成的 Token 将具有与您当前账户相同的访问权限。请妥善保管，密钥仅在创建时完整显示一次。
                    </p>
                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">取消</button>
                        <button type="submit" className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg transition-all active:scale-95">立即生成密钥</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- 内部组件：添加 Webhook 弹窗 ---
const WebhookModal = ({ isOpen, onClose, onSave }: any) => {
    const [url, setUrl] = useState('');
    const [events, setEvents] = useState(['workitem.created']);
    
    if (!isOpen) return null;

    const availableEvents = [
        { id: 'workitem.created', label: '工作项创建' },
        { id: 'workitem.updated', label: '工作项状态更新' },
        { id: 'repo.push', label: '代码仓库推送' },
        { id: 'mr.merged', label: '合并请求通过' },
        { id: 'member.joined', label: '新成员加入' }
    ];

    const toggleEvent = (id: string) => {
        setEvents(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
    };

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl"><Globe size={20} /></div>
                        <h3 className="text-lg font-bold text-slate-800">配置新 Webhook</h3>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Payload URL</label>
                        <input 
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none bg-slate-50" 
                            placeholder="https://your-service.com/webhook" 
                            value={url} 
                            onChange={e => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">订阅事件</label>
                        <div className="grid grid-cols-2 gap-3">
                            {availableEvents.map(ev => (
                                <label key={ev.id} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 cursor-pointer transition-all">
                                    <input 
                                        type="checkbox" 
                                        checked={events.includes(ev.id)} 
                                        onChange={() => toggleEvent(ev.id)}
                                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-xs font-bold text-slate-700">{ev.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">取消</button>
                        <button onClick={() => { onSave({ url, events }); setUrl(''); }} className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg active:scale-95 transition-all">激活 Webhook</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 主组件 ---
export const AdvancedFeatures = () => {
  const [tokens, setTokens] = useState([
    { id: 't1', name: 'G-Project-API-Key-2025', secret: 'sk_live_832jfksh921ka8f21', lastUsed: '2小时前' }
  ]);
  
  const [webhooks, setWebhooks] = useState<any[]>([]);
  
  const [modalType, setModalType] = useState<'token' | 'webhook' | null>(null);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleCreateToken = (name: string) => {
      const newToken = {
          id: `t${Date.now()}`,
          name: name,
          secret: `sk_live_${Math.random().toString(36).substring(2, 15)}`,
          lastUsed: '从未'
      };
      setTokens([newToken, ...tokens]);
      setModalType(null);
  };

  const handleAddWebhook = (data: any) => {
      const newHook = {
          id: `wh_${Date.now()}`,
          url: data.url,
          events: data.events,
          status: 'Active',
          lastDelivery: 'N/A'
      };
      setWebhooks([newHook, ...webhooks]);
      setModalType(null);
  };

  const handleDeleteToken = (id: string) => {
      if (window.confirm('此操作将导致依赖此 Token 的应用无法访问，确认删除？')) {
          setTokens(tokens.filter(t => t.id !== id));
      }
  };

  const handleDeleteWebhook = (id: string) => {
      if (window.confirm('确认移除此 Webhook 回调？')) {
          setWebhooks(webhooks.filter(w => w.id !== id));
      }
  };

  const triggerCopy = () => {
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20 relative">
      {/* Developer API Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
              <Code2 size={24} className="text-purple-600" /> 开发者 API 令牌
            </h3>
            <p className="text-sm text-slate-400 mt-1">使用 API 令牌通过程序访问您的组织数据</p>
          </div>
          <button 
            onClick={() => setModalType('token')}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 text-sm font-bold transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center gap-2"
          >
            <Plus size={16} strokeWidth={3} /> 生成新 Token
          </button>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm divide-y divide-slate-50">
          {tokens.map((token) => (
            <div key={token.id} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-all">
                <div className="flex items-center gap-5">
                   <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-white transition-colors group-hover:shadow-inner">
                      <Lock size={22} />
                   </div>
                   <div>
                      <div className="font-bold text-slate-800 text-base">{token.name}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <code className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">
                            {token.secret.substring(0, 12)}****************
                        </code>
                        <button onClick={triggerCopy} className="text-blue-500 hover:text-blue-700 transition-colors">
                            <Copy size={14} />
                        </button>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">最后使用</div>
                        <div className="text-xs font-bold text-slate-500">{token.lastUsed}</div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                       <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 shadow-sm" title="重置密钥"><RefreshCw size={16} /></button>
                       <button onClick={() => handleDeleteToken(token.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 shadow-sm" title="撤销 Token"><Trash2 size={16} /></button>
                    </div>
                </div>
            </div>
          ))}
          <div className="p-4 bg-slate-50/50 flex items-center justify-center">
             <button className="text-[11px] text-slate-400 hover:text-blue-600 font-black flex items-center gap-1 uppercase tracking-widest transition-all">
               查阅 API 开发文档 <ChevronRight size={14} />
             </button>
          </div>
        </div>
      </section>

      {/* Webhooks Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
            <div>
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <Share2 size={24} className="text-blue-600" /> Webhooks 外部钩子
                </h3>
                <p className="text-sm text-slate-400 mt-1">实时将组织内的事件推送到您的外部服务</p>
            </div>
            {webhooks.length > 0 && (
                <button 
                    onClick={() => setModalType('webhook')}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-bold shadow-xl shadow-blue-100 transition-all active:scale-95"
                >
                    <Plus size={16} strokeWidth={3} /> 添加端点
                </button>
            )}
        </div>

        {webhooks.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center border-dashed group hover:border-blue-300 transition-all">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Share2 size={40} />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">配置您的第一个 Webhook</h4>
                <p className="text-sm text-slate-500 max-w-xs mx-auto mb-10 leading-relaxed">
                    每当组织内发生特定事件（如工作项完成、代码合并）时，系统会自动发送 POST 请求。
                </p>
                <button 
                    onClick={() => setModalType('webhook')}
                    className="px-10 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-black transition-all shadow-xl shadow-blue-100 active:scale-95 flex items-center gap-2 mx-auto"
                >
                    <Plus size={18} strokeWidth={3} /> 开始集成
                </button>
            </div>
        ) : (
            <div className="space-y-4">
                {webhooks.map(hook => (
                    <div key={hook.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-lg transition-all group border-l-8 border-l-blue-600">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                <Globe size={24} />
                            </div>
                            <div>
                                <div className="font-bold text-slate-800 text-base flex items-center gap-2">
                                    {hook.url}
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase rounded border border-emerald-100">Active</span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {hook.events.map((ev: string) => (
                                        <span key={ev} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">{ev}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">上次交付</div>
                                <div className="text-xs font-bold text-slate-500">{hook.lastDelivery}</div>
                            </div>
                            <button onClick={() => handleDeleteWebhook(hook.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </section>

      {/* Danger Zone Section */}
      <section className="pt-12 border-t border-slate-200">
        <div className="flex items-center gap-2 mb-8 text-red-600">
          <AlertTriangle size={24} />
          <h3 className="text-xl font-black italic uppercase tracking-tight">危险操作区域 / Zone of No Return</h3>
        </div>
        <div className="bg-red-50/30 border border-red-100 rounded-3xl divide-y divide-red-100 overflow-hidden shadow-sm">
          <div className="p-8 flex items-center justify-between group hover:bg-red-50/50 transition-colors">
             <div className="flex gap-5">
                <div className="p-4 bg-white rounded-2xl text-red-600 shadow-sm"><Box size={24} /></div>
                <div>
                    <div className="font-black text-red-900 text-base">归档整个组织空间</div>
                    <div className="text-sm text-red-700/60 font-medium">归档后所有成员将无法访问，数据将转为只读状态，可随时恢复。</div>
                </div>
             </div>
             <button className="px-6 py-2.5 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 text-sm font-black transition-all active:scale-95 shadow-sm">
               归档组织
             </button>
          </div>
          <div className="p-8 flex items-center justify-between group hover:bg-red-50/80 transition-colors">
             <div className="flex gap-5">
                <div className="p-4 bg-white rounded-2xl text-red-600 shadow-sm"><Trash2 size={24} /></div>
                <div>
                    <div className="font-black text-red-900 text-base">彻底注销并抹除数据</div>
                    <div className="text-sm text-red-700/60 font-medium">此操作不可撤销！所有项目、工作项、代码、文档将被永久物理删除。</div>
                </div>
             </div>
             <button className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 text-sm font-black transition-all shadow-xl shadow-red-200 active:scale-95">
               立即注销
             </button>
          </div>
        </div>
      </section>

      {/* Copy Success Toast */}
      {showCopySuccess && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 duration-500">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                 <CheckCircle2 size={20} />
              </div>
              <div className="flex flex-col">
                  <span className="text-sm font-bold">Token 已复制</span>
                  <span className="text-xs opacity-60">请将其粘贴到安全的配置环境中</span>
              </div>
          </div>
      )}

      {/* Modals */}
      <TokenModal 
        isOpen={modalType === 'token'} 
        onClose={() => setModalType(null)} 
        onSave={handleCreateToken} 
      />
      <WebhookModal 
        isOpen={modalType === 'webhook'} 
        onClose={() => setModalType(null)} 
        onSave={handleAddWebhook} 
      />
    </div>
  );
};
