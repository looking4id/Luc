
import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, Bell, Settings, Home, Edit3, Globe, Palette, User, 
  LogOut, Send, ChevronRight, Check, ArrowLeft, XCircle, 
  Target, ShieldAlert, MessageSquare, Info, Trash2
} from '../common/Icons';
import { useApp } from '../../utils/AppContext';
import { User as UserType } from '../../types';

interface Notification {
  id: string;
  type: 'workitem' | 'system' | 'mention';
  title: string;
  content: string;
  time: string;
  unread: boolean;
  icon: any;
  color: string;
}

interface GlobalRightControlsProps {
  user?: UserType | null;
  onLogout?: () => void;
  onGoHome?: () => void;
  onSettingsClick?: () => void;
}

export const GlobalRightControls: React.FC<GlobalRightControlsProps> = ({ 
  user, onLogout, onGoHome, onSettingsClick 
}) => {
  const { language, setLanguage, theme, setTheme, t } = useApp();
  
  // 状态管理
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [userMenuLevel, setUserMenuLevel] = useState<'main' | 'language' | 'theme'>('main');

  // 模拟通知数据
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
        id: '1', 
        type: 'workitem', 
        title: '工作项更新', 
        content: '王亮 更新了需求 #RQ-101 "支持移动端扫码支付"', 
        time: '5分钟前', 
        unread: true, 
        icon: Target, 
        color: 'text-blue-500 bg-blue-50' 
    },
    { 
        id: '2', 
        type: 'mention', 
        title: '有人提到了你', 
        content: 'Dev 1 在缺陷 #DF-201 的评论中提到了你：@lo 请协助排查此样式问题', 
        time: '1小时前', 
        unread: true, 
        icon: MessageSquare, 
        color: 'text-purple-500 bg-purple-50' 
    },
    { 
        id: '3', 
        type: 'system', 
        title: '系统安全提醒', 
        content: '您的账号在新的设备（北京，Chrome）登录，如非本人操作请及时修改密码', 
        time: '昨天', 
        unread: false, 
        icon: ShieldAlert, 
        color: 'text-orange-500 bg-orange-50' 
    },
    { 
        id: '4', 
        type: 'workitem', 
        title: '任务已逾期', 
        content: '任务 #TS-301 "后端API文档维护" 已超过截止日期 2 天', 
        time: '2天前', 
        unread: false, 
        icon: Info, 
        color: 'text-rose-500 bg-rose-50' 
    }
  ]);

  const unreadCount = useMemo(() => notifications.filter(n => n.unread).length, [notifications]);

  const closeMenus = () => {
      setIsUserMenuOpen(false);
      setIsNotificationOpen(false);
      setTimeout(() => setUserMenuLevel('main'), 200);
  };

  const markAllAsRead = () => {
      setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id: string) => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const deleteNotification = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const renderUserMenuContent = () => {
      if (userMenuLevel === 'language') {
          return (
              <>
                <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 mb-1">
                    <button onClick={(e) => { e.stopPropagation(); setUserMenuLevel('main'); }} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500"><ArrowLeft size={14}/></button>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{t('语言')}</span>
                </div>
                <div className="py-1">
                    <button onClick={() => { setLanguage('zh'); closeMenus(); }} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
                        <span className="text-sm font-medium">{t('简体中文')}</span>
                        {language === 'zh' && <Check size={14} className="text-blue-600" />}
                    </button>
                    <button onClick={() => { setLanguage('en'); closeMenus(); }} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
                        <span className="text-sm font-medium">{t('English')}</span>
                        {language === 'en' && <Check size={14} className="text-blue-600" />}
                    </button>
                </div>
              </>
          );
      }
      if (userMenuLevel === 'theme') {
          return (
              <>
                <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 mb-1">
                    <button onClick={(e) => { e.stopPropagation(); setUserMenuLevel('main'); }} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500"><ArrowLeft size={14}/></button>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{t('主题')}</span>
                </div>
                <div className="py-1">
                    <button onClick={() => { setTheme('light'); closeMenus(); }} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
                        <span className="text-sm font-medium">{t('浅色模式')}</span>
                        {theme === 'light' && <Check size={14} className="text-blue-600" />}
                    </button>
                    <button onClick={() => { setTheme('dark'); closeMenus(); }} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
                        <span className="text-sm font-medium">{t('深色模式')}</span>
                        {theme === 'dark' && <Check size={14} className="text-blue-600" />}
                    </button>
                </div>
              </>
          );
      }
      return (
          <>
            <div className="py-1">
                <button 
                    onClick={() => { onGoHome?.(); closeMenus(); }}
                    className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors text-left group"
                >
                    <Home size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                    <span className="text-sm font-medium">{t('首页')}</span>
                </button>
                <button className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors text-left group">
                    <Edit3 size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                    <span className="text-sm font-medium">{t('设置')}</span>
                </button>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
            <div className="py-1">
                <button onClick={(e) => { e.stopPropagation(); setUserMenuLevel('language'); }} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
                    <div className="flex items-center gap-3">
                        <Globe size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                        <span className="text-sm font-medium">{t('语言')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{language === 'zh' ? '中文' : 'En'}</span>
                        <ChevronRight size={14} className="text-slate-300" />
                    </div>
                </button>
                <button onClick={(e) => { e.stopPropagation(); setUserMenuLevel('theme'); }} className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-slate-600 dark:text-slate-300 transition-colors text-left group">
                    <div className="flex items-center gap-3">
                        <Palette size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                        <span className="text-sm font-medium">{t('主题')}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-300" />
                </button>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
            <div className="py-1">
                <button 
                    onClick={() => { onGoHome?.(); closeMenus(); }}
                    className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors text-left group"
                >
                    <User size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                    <span className="text-sm font-medium">{t('返回个人首页')}</span>
                </button>
                <button 
                    onClick={() => { onLogout?.(); closeMenus(); }}
                    className="w-full px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors text-left group"
                >
                    <LogOut size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" /> 
                    <span className="text-sm font-medium">{t('退出登录')}</span>
                </button>
            </div>
          </>
      );
  };

  return (
     <div className="flex items-center gap-1.5 flex-shrink-0 pl-4 bg-white dark:bg-slate-800 transition-colors relative">
         <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all">
             <HelpCircle size={20} />
         </button>
         
         {/* 通知中心触发器 */}
         <div className="relative">
            <button 
                onClick={() => { setIsNotificationOpen(!isNotificationOpen); setIsUserMenuOpen(false); }}
                className={`p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all relative ${isNotificationOpen ? 'bg-slate-100 dark:bg-slate-700 text-blue-600' : ''}`}
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm animate-in zoom-in duration-300">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isNotificationOpen && (
                <>
                    <div className="fixed inset-0 z-[100] cursor-default" onClick={closeMenus}></div>
                    <div className="absolute top-full right-0 mt-3 w-96 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-3xl py-1 z-[110] animate-in slide-in-from-top-2 zoom-in-95 duration-200 origin-top-right overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                            <div className="flex items-center gap-2">
                                <span className="font-black text-slate-800 dark:text-slate-200">通知中心</span>
                                {unreadCount > 0 && <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black rounded uppercase tracking-widest">{unreadCount} New</span>}
                            </div>
                            <button 
                                onClick={markAllAsRead}
                                className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            >
                                全部标记已读
                            </button>
                        </div>

                        <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                            {notifications.length > 0 ? (
                                <div className="divide-y divide-slate-50 dark:divide-slate-700">
                                    {notifications.map(n => (
                                        <div 
                                            key={n.id} 
                                            onClick={() => markAsRead(n.id)}
                                            className={`p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-all flex gap-4 relative group ${n.unread ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                                        >
                                            {n.unread && <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
                                            <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm ${n.color}`}>
                                                <n.icon size={18} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-sm font-black text-slate-800 dark:text-slate-200">{n.title}</span>
                                                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{n.time}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                                    {n.content}
                                                </p>
                                            </div>
                                            <button 
                                                onClick={(e) => deleteNotification(e, n.id)}
                                                className="absolute right-4 bottom-4 p-1.5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 flex flex-col items-center justify-center text-slate-300 dark:text-slate-600 gap-4">
                                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center border border-slate-100 dark:border-slate-600">
                                        <Bell size={32} className="opacity-20" />
                                    </div>
                                    <p className="text-sm font-black uppercase tracking-[0.2em]">No Notifications</p>
                                </div>
                            )}
                        </div>

                        <div className="p-3 border-t border-slate-100 dark:border-slate-700 text-center">
                            <button className="text-[11px] font-black text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 uppercase tracking-widest transition-all py-1 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                查看全部历史消息 <ChevronRight size={14} className="inline ml-1" />
                            </button>
                        </div>
                    </div>
                </>
            )}
         </div>

         {onSettingsClick && (
             <button 
                onClick={() => { onSettingsClick(); setIsNotificationOpen(false); setIsUserMenuOpen(false); }}
                className={`p-2 transition-colors text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl`}
                title={t('设置')}
             >
                <Settings size={20} />
             </button>
         )}
         
         <div className="relative flex items-center ml-2">
             <div 
                onClick={() => { setIsUserMenuOpen(!isUserMenuOpen); setIsNotificationOpen(false); }}
                className={`w-8 h-8 rounded-full ${user?.avatarColor || 'bg-orange-500'} text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-95 relative z-[60] border-2 border-white dark:border-slate-800`}
             >
                {user?.name?.substring(0, 2) || 'Lo'}
             </div>
             
             {isUserMenuOpen && (
                <>
                    <div className="fixed inset-0 z-[100] bg-transparent cursor-default" onClick={closeMenus}></div>
                    <div 
                        className="absolute top-full right-0 mt-3 w-64 !bg-white dark:!bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-2xl py-1 z-[110] animate-in slide-in-from-top-2 zoom-in-95 duration-200 origin-top-right overflow-hidden !opacity-100"
                    >
                        {renderUserMenuContent()}
                    </div>
                </>
             )}
         </div>
     </div>
  );
};
