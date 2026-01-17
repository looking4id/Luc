import React, { useState } from 'react';
import { AuthService } from '../services/api';
import { ChevronDown, RefreshCw } from './Icons';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'password'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Phone Login State
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Password Login State
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');

  const handleSendCode = () => {
    if (!phone) {
        setError('请输入手机号');
        return;
    }
    setCountdown(60);
    const timer = setInterval(() => {
        setCountdown(prev => {
            if (prev <= 1) {
                clearInterval(timer);
                return 0;
            }
            return prev - 1;
        });
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        if (loginMethod === 'password') {
            const response = await AuthService.login(username, password);
            if (response.code === 0) {
                onLoginSuccess(response.data.user);
            } else {
                setError(response.msg);
            }
        } else {
            // Mock Phone Login
            if (!phone || !code) {
                setError('请输入手机号和验证码');
                setLoading(false);
                return;
            }
            // Simulate API call
            setTimeout(() => {
                // Mock success for any phone input
                onLoginSuccess({
                    id: 'u1',
                    name: 'looking4id',
                    avatarColor: 'bg-yellow-500'
                });
            }, 800);
        }
    } catch (err) {
      setError('网络异常，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f9fafb] text-slate-800 font-sans">
      
      {/* Main Card */}
      <div className="bg-white rounded-[4px] shadow-2xl shadow-slate-200/50 w-[960px] h-[580px] flex overflow-hidden">
        
        {/* Left Side: Illustration */}
        <div className="w-[45%] relative bg-white p-8 flex flex-col justify-between items-center border-r border-slate-50">
           <div className="w-full flex justify-start">
               <div className="flex items-center gap-2">
                   <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center transform rotate-45">
                        <div className="w-3 h-3 bg-white rounded-sm transform -rotate-45"></div>
                   </div>
                   <span className="text-xl font-bold text-slate-700 tracking-tight">Luky</span>
               </div>
           </div>
           
           <div className="flex-1 flex items-center justify-center w-full max-w-[320px]">
               {/* Using a high-quality placeholder illustration that matches the 'dashboard/analytics' vibe */}
               <img 
                 src="https://ouch-cdn2.icons8.com/6-dM3iZp_y-tXq_5A5m8qk5Xw_7Qj_9a5m8qk5Xw_7Qj.png" 
                 alt="Login Illustration" 
                 className="w-full object-contain drop-shadow-sm opacity-90"
                 // Fallback to a clean placeholder if external image fails
                 onError={(e) => {
                     e.currentTarget.src = "https://placehold.co/400x300/f8fafc/94a3b8?text=Project+Management";
                 }}
               />
           </div>
           
           <div className="h-4"></div> {/* Spacer */}
        </div>

        {/* Right Side: Login Form */}
        <div className="w-[55%] p-12 flex flex-col justify-center relative">
            
            <h2 className="text-[26px] font-medium text-slate-800 mb-2">登录</h2>
            
            <div className="flex items-center gap-1 text-sm text-slate-500 mb-8">
                {loginMethod === 'phone' ? (
                    <>
                        <span>通过手机验证码登录组织，或者切换为</span>
                        <button onClick={() => setLoginMethod('password')} className="text-blue-600 hover:underline cursor-pointer">账号密码登录</button>
                    </>
                ) : (
                    <>
                        <span>通过账号密码登录组织，或者切换为</span>
                        <button onClick={() => setLoginMethod('phone')} className="text-blue-600 hover:underline cursor-pointer">手机验证码登录</button>
                    </>
                )}
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                    <div className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded border border-red-100">
                        {error}
                    </div>
                )}

                {loginMethod === 'phone' ? (
                    <>
                        {/* Phone Input */}
                        <div className="space-y-2">
                            <label className="text-slate-500 text-sm">手机号</label>
                            <div className="flex items-center border border-slate-300 rounded hover:border-blue-500 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 h-[42px] overflow-hidden">
                                <div className="h-full px-3 bg-white flex items-center gap-1 border-r border-slate-200 text-slate-600 text-sm cursor-pointer hover:bg-slate-50 min-w-[70px] justify-center">
                                    <span>+86</span>
                                    <ChevronDown size={14} className="text-slate-400" />
                                </div>
                                <input 
                                    type="text" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="输入手机号" 
                                    className="flex-1 h-full px-3 text-sm outline-none text-slate-700 placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        {/* Code Input */}
                        <div className="space-y-2">
                            <label className="text-slate-500 text-sm">手机验证码</label>
                            <div className="flex items-center border border-slate-300 rounded hover:border-blue-500 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 h-[42px] overflow-hidden bg-white">
                                <input 
                                    type="text" 
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="输入手机验证码" 
                                    className="flex-1 h-full px-3 text-sm outline-none text-slate-700 placeholder:text-slate-300"
                                />
                                <button 
                                    type="button"
                                    onClick={handleSendCode}
                                    disabled={countdown > 0}
                                    className="px-3 h-8 mr-1 rounded bg-slate-50 text-slate-500 text-xs hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {countdown > 0 ? `${countdown}s 后重试` : '获取短信验证码'}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                         {/* Username Input */}
                        <div className="space-y-2">
                            <label className="text-slate-500 text-sm">账号</label>
                            <div className="flex items-center border border-slate-300 rounded hover:border-blue-500 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 h-[42px] overflow-hidden">
                                <input 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="请输入用户名/手机号/邮箱" 
                                    className="flex-1 h-full px-3 text-sm outline-none text-slate-700 placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                         <div className="space-y-2">
                            <label className="text-slate-500 text-sm">密码</label>
                            <div className="flex items-center border border-slate-300 rounded hover:border-blue-500 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 h-[42px] overflow-hidden">
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="请输入密码" 
                                    className="flex-1 h-full px-3 text-sm outline-none text-slate-700 placeholder:text-slate-300"
                                />
                            </div>
                        </div>
                    </>
                )}

                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#528eff] hover:bg-blue-600 text-white h-[42px] rounded text-sm font-medium transition-colors flex items-center justify-center gap-2 mt-6 shadow-sm shadow-blue-200"
                >
                    {loading && <RefreshCw size={16} className="animate-spin" />}
                    登录
                </button>
            </form>
            
            {loginMethod === 'password' && (
                 <div className="flex justify-between mt-4 text-xs">
                    <span className="text-slate-400 cursor-pointer hover:text-slate-600">忘记密码?</span>
                    <span className="text-blue-600 cursor-pointer hover:underline">注册账号</span>
                 </div>
            )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-xs text-slate-400 font-sans">
        © PingCode
      </div>
    </div>
  );
};