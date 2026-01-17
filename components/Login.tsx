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
        
        {/* Left Side: Illustration - Recreated based on TAPD Prototype */}
        <div className="w-[45%] relative bg-gradient-to-br from-blue-50 to-white p-10 flex flex-col overflow-hidden border-r border-slate-100">
             {/* Decorative Blurs */}
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
             <div className="absolute top-40 -left-10 w-32 h-32 bg-indigo-100/30 rounded-full blur-2xl"></div>

             {/* Brand Text - Updated to LUK */}
             <div className="z-10 mt-4 relative">
                 <h1 className="text-4xl font-black text-blue-600 italic tracking-wider mb-2" style={{ fontFamily: '"Arial", sans-serif' }}>LUK</h1>
                 <h2 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">让协作更敏捷</h2>
                 <p className="text-xs text-slate-500 tracking-[0.4em] uppercase font-medium">助力团队高效协作</p>
             </div>
             
             {/* 3D Illustration approximation */}
             <div className="absolute top-1/4 left-0 right-0 bottom-0 flex items-end justify-center pointer-events-none">
                 <div className="relative w-full h-full flex items-end justify-center">
                    {/* Lightened image using CSS filters */}
                     <img 
                         src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                         alt="Collaboration 3D" 
                         className="w-[110%] h-auto object-contain mb-8 drop-shadow-2xl mix-blend-multiply opacity-60 brightness-125 contrast-75 transform translate-y-6"
                     />
                 </div>
             </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-[55%] p-12 flex flex-col justify-center relative bg-white">
            
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