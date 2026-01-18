
import React from 'react';
import * as LucideIcons from 'lucide-react';

/**
 * 图标工厂函数：统一全站图标风格
 * 风格定义：1.5px 极细线条 + 5% 填充 + 悬停缩放，营造极致的精致感
 */
const createIcon = (IconComponent: any) => {
  return ({ size = 20, className = '', strokeWidth = 1.5, ...props }: any) => (
    <IconComponent 
      size={size} 
      strokeWidth={strokeWidth}
      className={`group ${className} transition-all duration-300 hover:scale-110`}
      style={{ 
        // 增加极淡的填充，使细线条图标更有质感
        fill: 'currentColor', 
        fillOpacity: 0.03 
      }}
      {...props} 
    />
  );
};

export const LayoutGrid = createIcon(LucideIcons.LayoutGrid);
export const ClipboardList = createIcon(LucideIcons.ClipboardList);
export const Code2 = createIcon(LucideIcons.Code2);
export const Copy = createIcon(LucideIcons.Copy);
export const BookOpen = createIcon(LucideIcons.BookOpen);
export const Share2 = createIcon(LucideIcons.Share2);
export const Users = createIcon(LucideIcons.Users);
export const BarChart2 = createIcon(LucideIcons.BarChart2);
export const Settings = createIcon(LucideIcons.Settings);
export const Search = createIcon(LucideIcons.Search);
export const Plus = createIcon(LucideIcons.Plus);
export const Bell = createIcon(LucideIcons.Bell);
export const Bold = createIcon(LucideIcons.Bold);
export const Italic = createIcon(LucideIcons.Italic);
export const Underline = createIcon(LucideIcons.Underline);
export const HelpCircle = createIcon(LucideIcons.HelpCircle);
export const MoreHorizontal = createIcon(LucideIcons.MoreHorizontal);
export const Filter = createIcon(LucideIcons.Filter);
export const ChevronDown = createIcon(LucideIcons.ChevronDown);
export const ChevronRight = createIcon(LucideIcons.ChevronRight);
export const ChevronLeft = createIcon(LucideIcons.ChevronLeft);
export const Clock = createIcon(LucideIcons.Clock);
export const CheckCircle2 = createIcon(LucideIcons.CheckCircle2);
export const Circle = createIcon(LucideIcons.Circle);
export const XCircle = createIcon(LucideIcons.XCircle);
export const ListFilter = createIcon(LucideIcons.ListFilter);
export const Maximize2 = createIcon(LucideIcons.Maximize2);
export const ArrowUpDown = createIcon(LucideIcons.ArrowUpDown);
export const Edit3 = createIcon(LucideIcons.Edit3);
export const Calendar = createIcon(LucideIcons.Calendar);
export const Trash2 = createIcon(LucideIcons.Trash2);
export const Paperclip = createIcon(LucideIcons.Paperclip);
export const Download = createIcon(LucideIcons.Download);
export const UploadCloud = createIcon(LucideIcons.UploadCloud);
export const FileText = createIcon(LucideIcons.FileText);
export const LayoutList = createIcon(LucideIcons.LayoutList);
export const FolderTree = createIcon(LucideIcons.FolderTree);
export const Box = createIcon(LucideIcons.Box);
export const Star = createIcon(LucideIcons.Star);
export const Activity = createIcon(LucideIcons.Activity);
export const Sun = createIcon(LucideIcons.Sun);
export const RefreshCw = createIcon(LucideIcons.RefreshCw);
export const GitPullRequest = createIcon(LucideIcons.GitPullRequest);
export const Layers = createIcon(LucideIcons.Layers);
export const Target = createIcon(LucideIcons.Target);
export const FileEdit = createIcon(LucideIcons.FileEdit);
export const Briefcase = createIcon(LucideIcons.Briefcase);
export const LayoutDashboard = createIcon(LucideIcons.LayoutDashboard);
export const Map = createIcon(LucideIcons.Map);
export const CheckSquare = createIcon(LucideIcons.CheckSquare);
export const Bug = createIcon(LucideIcons.Bug);
export const Repeat = createIcon(LucideIcons.Repeat);
export const FlaskConical = createIcon(LucideIcons.FlaskConical);
export const GitBranch = createIcon(LucideIcons.GitBranch);
export const Flag = createIcon(LucideIcons.Flag);
export const ShieldAlert = createIcon(LucideIcons.ShieldAlert);
export const PlayCircle = createIcon(LucideIcons.PlayCircle);
export const AlertTriangle = createIcon(LucideIcons.AlertTriangle);
export const Zap = createIcon(LucideIcons.Zap);
export const Home = createIcon(LucideIcons.Home);
export const Grid = createIcon(LucideIcons.Grid);
export const List = createIcon(LucideIcons.List);
export const Link = createIcon(LucideIcons.Link);
export const Lock = createIcon(LucideIcons.Lock);
export const Printer = createIcon(LucideIcons.Printer);
export const TrendingUp = createIcon(LucideIcons.TrendingUp);
export const TrendingDown = createIcon(LucideIcons.TrendingDown);
export const User = createIcon(LucideIcons.User);
export const ListChecks = createIcon(LucideIcons.ListChecks);
export const Mail = createIcon(LucideIcons.Mail);
export const UserCheck = createIcon(LucideIcons.UserCheck);
export const CreditCard = createIcon(LucideIcons.CreditCard);
export const Monitor = createIcon(LucideIcons.Monitor);
export const Smartphone = createIcon(LucideIcons.Smartphone);
export const UserPlus = createIcon(LucideIcons.UserPlus);
export const ShieldCheck = createIcon(LucideIcons.ShieldCheck);
export const ZoomIn = createIcon(LucideIcons.ZoomIn);
export const ZoomOut = createIcon(LucideIcons.ZoomOut);
export const GitMerge = createIcon(LucideIcons.GitMerge);
export const ArrowLeft = createIcon(LucideIcons.ArrowLeft);
export const Check = createIcon(LucideIcons.Check);
export const Ban = createIcon(LucideIcons.Ban);

// 重新设计的玻璃拟态 Logo
export const GLogo = () => (
  <div className="relative w-8 h-8 group flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-xl shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform duration-500"></div>
    <div className="absolute inset-[1px] bg-white/10 backdrop-blur-[2px] rounded-xl border border-white/20"></div>
    <span className="relative text-white font-black text-lg select-none">G</span>
  </div>
);

// 重新设计的 AI 图标
export const AiIcon = () => (
  <div className="relative group cursor-pointer">
    <div className="absolute inset-0 bg-indigo-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-[10px] text-white font-black border border-white/30 shadow-sm relative z-10 hover:scale-110 transition-transform">
      AI
    </div>
  </div>
);
