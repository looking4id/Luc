
import React, { useState, useMemo } from 'react';
import { Plus, Search, Calendar as CalendarIcon, Box, List } from './Icons';
import { Version, PHASE_COLORS } from './versions/types';
import { VersionModal } from './versions/VersionModal';
import { VersionList } from './versions/VersionList';
import { ReleaseCalendar } from './versions/ReleaseCalendar';

type VersionTab = '版本列表' | '发布计划';

export const ProjectVersions = () => {
  const [activeTab, setActiveTab] = useState<VersionTab>('版本列表');
  const [searchQuery, setSearchQuery] = useState('');
  const [versions, setVersions] = useState<Version[]>([
    { id: 'v1', version: '1.2.1', name: '紧急安全补丁', phase: '开发环境', owner: 'lo', date: '2025-11-30', progress: 0, color: 'bg-blue-500', description: '修复已知的支付接口安全漏洞' },
    { id: 'v2', version: '1.2.0', name: '自助开票功能上线', phase: '生产环境', owner: 'Dev 1', date: '2025-11-15', progress: 100, color: 'bg-emerald-500', description: '支持用户在线申请电子发票' },
    { id: 'v3', version: '1.1.5', name: 'UI体验优化', phase: '测试环境', owner: 'lo', date: '2025-12-05', progress: 45, color: 'bg-amber-500', description: '重构全局侧边栏交互' },
    { id: 'v4', version: '1.3.0', name: '性能提升专项', phase: '开发环境', owner: 'lo', date: '2025-12-15', progress: 20, color: 'bg-blue-500', description: '优化数据库索引与缓存机制' },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVersion, setEditingVersion] = useState<Version | null>(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | undefined>();

  const filteredVersions = useMemo(() => {
    return versions.filter(v => 
      v.version.includes(searchQuery) || v.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [versions, searchQuery]);

  const handleSaveVersion = (versionData: Version) => {
    if (editingVersion) {
      setVersions(prev => prev.map(v => v.id === versionData.id ? versionData : v));
    } else {
      setVersions(prev => [versionData, ...prev]);
    }
    setIsModalOpen(false);
    setEditingVersion(null);
  };

  const handleDeleteVersion = (id: string) => {
    if (window.confirm("确定要删除该版本吗？")) {
      setVersions(prev => prev.filter(v => v.id !== id));
    }
  };

  const handleDateClick = (date: string) => {
    setSelectedCalendarDate(date);
    setEditingVersion(null);
    setIsModalOpen(true);
  };

  const handleEditVersion = (v: Version) => {
    setEditingVersion(v);
    setSelectedCalendarDate(v.date);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/30 rounded-xl border border-slate-200 shadow-sm overflow-hidden font-sans">
      {/* Header */}
      <div className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between flex-shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-8 h-full">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Box size={20} /></div>
             <h2 className="text-lg font-black text-slate-800 tracking-tight">项目版本</h2>
          </div>
          <div className="flex items-center gap-6 h-full pt-1">
            {[
              { id: '版本列表', icon: List },
              { id: '发布计划', icon: CalendarIcon }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id as VersionTab)} 
                className={`h-full border-b-2 transition-all flex items-center gap-2 font-black text-xs px-2 ${activeTab === tab.id ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
              >
                <tab.icon size={16} />
                {tab.id}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === '版本列表' && (
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索版本/名称..." 
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:border-blue-500 outline-none w-64 bg-slate-50/50 transition-all focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
            </div>
          )}
          <button 
            onClick={() => { setEditingVersion(null); setSelectedCalendarDate(undefined); setIsModalOpen(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-100 transition-all uppercase tracking-widest active:scale-95"
          >
            <Plus size={16} strokeWidth={3} /> 新建版本
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === '版本列表' ? (
          <VersionList 
            versions={filteredVersions} 
            onEdit={handleEditVersion} 
            onDelete={handleDeleteVersion} 
          />
        ) : (
          <ReleaseCalendar 
            versions={versions} 
            onDateClick={handleDateClick} 
            onVersionEdit={handleEditVersion} 
          />
        )}
      </div>

      {/* Shared Modal */}
      <VersionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveVersion}
        initialData={editingVersion}
        defaultDate={selectedCalendarDate}
      />
    </div>
  );
};
