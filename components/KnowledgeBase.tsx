
import React from 'react';
import { Search, Plus, BookOpen, FolderTree, FileText, ChevronRight, Star, MoreHorizontal, Clock, Users } from './Icons';

export const KnowledgeBase = () => {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <BookOpen size={24} className="text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">知识库</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input type="text" placeholder="全局搜索文档..." className="pl-8 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 w-64 bg-slate-50" />
            <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all shadow-sm">
            <Plus size={16} /> 新建文档
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <div className="w-64 border-r border-slate-200 bg-slate-50/50 flex flex-col p-4 space-y-6">
          <section>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">我的空间</h3>
            <div className="space-y-1">
              <NavItem icon={Star} label="快捷访问" active />
              <NavItem icon={Clock} label="最近查看" />
              <NavItem icon={FileText} label="我的草稿" />
            </div>
          </section>
          <section>
             <div className="flex justify-between items-center mb-3">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">公共知识库</h3>
                <Plus size={14} className="text-slate-400 cursor-pointer" />
             </div>
             <div className="space-y-1">
                <NavItem icon={FolderTree} label="产品文档" count={12} />
                <NavItem icon={FolderTree} label="技术规范" count={8} />
                <NavItem icon={FolderTree} label="新人入职指南" count={5} />
             </div>
          </section>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
              <span>知识库</span>
              <ChevronRight size={12} />
              <span className="text-slate-800">所有文档</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-800 mb-8">所有文档</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DocCard title="敏捷研发流程说明" author="lo" time="2小时前" tags={['规范']} />
              <DocCard title="2025年Q3产品路线图" author="产品经理" time="1天前" tags={['规划', '核心']} />
              <DocCard title="API 接口鉴权方案" author="dev01" time="3天前" tags={['技术']} />
              <DocCard title="前端代码规范 v2.0" author="lo" time="1周前" tags={['前端', '规范']} />
              <DocCard title="提测申请流程指南" author="测试工程师" time="2周前" tags={['流程']} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active, count }: any) => (
  <div className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}`}>
    <div className="flex items-center gap-2 text-sm">
      <Icon size={16} />
      <span>{label}</span>
    </div>
    {count !== undefined && <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 rounded-full font-bold">{count}</span>}
  </div>
);

const DocCard = ({ title, author, time, tags }: any) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all group cursor-pointer border-b-4 border-b-transparent hover:border-b-blue-500">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <FileText size={20} />
      </div>
      <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={18} /></button>
    </div>
    <h4 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 h-10">{title}</h4>
    <div className="flex flex-wrap gap-1.5 mb-4">
      {tags.map((tag: string) => (
        <span key={tag} className="text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 uppercase">{tag}</span>
      ))}
    </div>
    <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400 font-medium">
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold">{author.charAt(0)}</div>
        {author}
      </div>
      <div className="flex items-center gap-1">
        <Clock size={12} /> {time}
      </div>
    </div>
  </div>
);
