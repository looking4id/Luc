
import React from 'react';
import * as LucideIcons from 'lucide-react';

const createIcon = (IconComponent: any) => {
  return ({ size = 20, className = '', strokeWidth = 1.5, ...props }: any) => (
    <IconComponent 
      size={size} 
      strokeWidth={strokeWidth}
      className={`group ${className} transition-all duration-300 hover:scale-110 group-hover:scale-110`}
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
export const History = createIcon(LucideIcons.History);
export const MessageSquare = createIcon(LucideIcons.MessageSquare);
export const LogOut = createIcon(LucideIcons.LogOut);
export const Globe = createIcon(LucideIcons.Globe);
export const Palette = createIcon(LucideIcons.Palette);
export const Send = createIcon(LucideIcons.Send);
export const ToggleLeft = createIcon(LucideIcons.ToggleLeft);
export const ToggleRight = createIcon(LucideIcons.ToggleRight);
export const Square = createIcon(LucideIcons.Square);
export const Package = createIcon(LucideIcons.Package);
export const ExternalLink = createIcon(LucideIcons.ExternalLink);
export const Cpu = createIcon(LucideIcons.Cpu);
export const ArrowUpRight = createIcon(LucideIcons.ArrowUpRight);

// Fix: Exporting missing icons needed for PerformanceMetrics
export const PieChart = createIcon(LucideIcons.PieChart);
export const BarChart = createIcon(LucideIcons.BarChart);
export const MousePointer2 = createIcon(LucideIcons.MousePointer2);

export const Image = createIcon(LucideIcons.Image);
export const Strikethrough = createIcon(LucideIcons.Strikethrough);
export const Quote = createIcon(LucideIcons.Quote);
export const Minus = createIcon(LucideIcons.Minus);
export const Smile = createIcon(LucideIcons.Smile);

export const AiIcon = createIcon(LucideIcons.Sparkles);

export const GLogo = () => (
  <div className="relative w-8 h-8 group flex items-center justify-center transition-all duration-300 hover:scale-110 group-hover:scale-110">
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-xl shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform duration-500"></div>
    <div className="absolute inset-[1px] bg-white/10 backdrop-blur-[2px] rounded-xl border border-white/20"></div>
    <span className="relative text-white font-black text-lg select-none">G</span>
  </div>
);
