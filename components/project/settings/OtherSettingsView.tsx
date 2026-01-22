
import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Copy, Search, Calendar, ChevronRight, Settings, Check, XCircle, RefreshCw, CheckCircle2 } from '../../Icons';

export const OtherSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('可启用的功能模块');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const triggerSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  const renderContent = () => {
    switch (activeTab) {
      case '可启用的功能模块': return <EnabledModulesTab onSave={triggerSave} />;
      case '项目公共参数设置': return <PublicParamsTab onSave={triggerSave} />;
      case '项目系统视图设置': return <SystemViewsTab onSave={triggerSave} />;
      case '工作日设置': return <WorkdaySettingsTab onSave={triggerSave} />;
      default: return <EnabledModulesTab onSave={triggerSave} />;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full flex flex-col relative">
      <h2 className="text-2xl font-black text-slate-800 mb-6">其他设置</h2>
      
      <div className="flex items-center gap-8 border-b border-slate-200 mb-8 flex-shrink-0">
        {['可启用的功能模块', '项目公共参数设置', '项目系统视图设置', '工作日设置'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 shadow-[0_-2px_4px_rgba(37,99,235,0.2)]"></div>}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-20">
        {renderContent()}
      </div>

      {/* 成功提示 Toast */}
      {showToast && (
        <div className="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right duration-500">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle2 size={20} />
            </div>
            <div>
                <div className="text-sm font-bold">设置已成功更新</div>
                <div className="text-xs text-slate-400">项目配置已同步至云端</div>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-4 text-slate-500 hover:text-white transition-colors">
                <XCircle size={18} />
            </button>
        </div>
      )}
    </div>
  );
};

/* --- Tab 1: 可启用的功能模块 --- */
const EnabledModulesTab = ({ onSave }: { onSave: () => void }) => {
  const [moduleStates, setModuleStates] = useState([
    { id: 1, title: '启用工时花费', enabled: false },
    { 
      id: 2,
      title: '启用快速创建需求、缺陷', 
      enabled: true, 
      type: 'radio', 
      options: ['行内创建', '弹窗创建'], 
      selectedOption: '行内创建' 
    },
    { 
      id: 3,
      title: '启用水印功能', 
      enabled: false, 
      desc: '开启后将在需求、缺陷、任务、wiki、文档页面添加带有用户名字样的水印' 
    },
    { 
      id: 4,
      title: '父子工作项排期时间联动设置', 
      enabled: false, 
      desc: '限制子需求排期范围不可超过父需求或根据子需求排期自动计算父需求排期' 
    },
    { id: 5, title: '启用延期提醒标识', enabled: true },
    { 
      id: 6,
      title: '允许删除自己创建的业务单', 
      enabled: true, 
      subText: '需求、缺陷、发布评审、wiki' 
    },
    { 
      id: 7,
      title: '允许将当前项目设置为上级项目', 
      enabled: true, 
      desc: '关闭后，新创建的项目将无法将当前项目设置为父项目。' 
    },
  ]);

  const toggleModule = (id: number) => {
    setModuleStates(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
    onSave();
  };

  const setRadioOption = (id: number, option: string) => {
    setModuleStates(prev => prev.map(m => m.id === id ? { ...m, selectedOption: option } : m));
    onSave();
  };

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm max-w-4xl divide-y divide-slate-100">
      {moduleStates.map((s) => (
        <div key={s.id} className="p-8 hover:bg-slate-50/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[15px] font-black text-slate-800">{s.title}</span>
            <div 
              onClick={() => toggleModule(s.id)}
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300 border-2 ${s.enabled ? 'bg-blue-600 border-blue-600 shadow-md shadow-blue-100' : 'bg-slate-200 border-slate-200'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 transform ${s.enabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </div>
          </div>
          
          {s.desc && <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-2xl">{s.desc}</p>}
          {s.subText && <p className="text-xs text-slate-400 mt-1">{s.subText}</p>}

          {s.type === 'radio' && s.enabled && (
            <div className="flex items-center gap-8 mt-4 animate-in slide-in-from-top-1 duration-200">
              {s.options?.map(opt => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group" onClick={() => setRadioOption(s.id, opt)}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${s.selectedOption === opt ? 'border-blue-500 shadow-sm' : 'border-slate-300 group-hover:border-slate-400'}`}>
                    {s.selectedOption === opt && <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-in zoom-in duration-200"></div>}
                  </div>
                  <span className={`text-sm font-bold transition-colors ${s.selectedOption === opt ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`}>{opt}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* --- Tab 2: 项目公共参数设置 --- */
const PublicParamsTab = ({ onSave }: { onSave: () => void }) => {
  const [subTab, setSubTab] = useState('模块设置');
  const [modules, setModules] = useState([
    { id: 1, name: '模块1', desc: '-', owner: '王亮', time: '2026-01-01 13:55:39', selected: false }
  ]);

  const addModule = () => {
    const name = window.prompt('请输入新模块名称');
    if (name) {
      setModules([...modules, {
        id: Date.now(),
        name,
        desc: '-',
        owner: '王亮',
        time: new Date().toLocaleString(),
        selected: false
      }]);
      onSave();
    }
  };

  const deleteSelected = () => {
    if (window.confirm('确定要删除选中的模块吗？')) {
      setModules(modules.filter(m => !m.selected));
      onSave();
    }
  };

  const toggleSelect = (id: number) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, selected: !m.selected } : m));
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-xl w-fit border border-slate-200">
        {['模块设置', '版本管理', '基础设置', '标签管理'].map(t => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`px-5 py-2 text-xs font-black rounded-lg transition-all ${
              subTab === t ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {subTab === '模块设置' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={addModule}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
            >
              <Plus size={18} strokeWidth={3} /> 新建模块
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 bg-white rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
              <Copy size={16} /> 复制模块配置
            </button>
            <button 
              onClick={deleteSelected}
              disabled={!modules.some(m => m.selected)}
              className="px-5 py-2.5 bg-slate-100 text-slate-400 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-50 hover:text-rose-600"
            >
              删除选中 ({modules.filter(m => m.selected).length})
            </button>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-black uppercase tracking-widest">
                <tr>
                  <th className="py-4 px-6 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
                  <th className="py-4 px-4">模块名称 ({modules.length})</th>
                  <th className="py-4 px-4">描述</th>
                  <th className="py-4 px-4">负责人</th>
                  <th className="py-4 px-4 w-48">创建时间</th>
                  <th className="py-4 px-6 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-slate-600 divide-y divide-slate-50">
                {modules.map((m) => (
                  <tr key={m.id} className={`hover:bg-blue-50/20 transition-colors group ${m.selected ? 'bg-blue-50/10' : ''}`}>
                    <td className="py-5 px-6">
                      <input 
                        type="checkbox" 
                        checked={m.selected}
                        onChange={() => toggleSelect(m.id)}
                        className="rounded border-slate-300 text-blue-600" 
                      />
                    </td>
                    <td className="py-5 px-4 font-bold text-slate-800">{m.name}</td>
                    <td className="py-5 px-4 text-slate-400">{m.desc}</td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600 border border-white shadow-sm">{m.owner.charAt(0)}</div>
                        <span className="font-bold">{m.owner}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4 font-mono text-slate-400 text-xs">{m.time}</td>
                    <td className="py-5 px-6 text-right">
                      <button className="p-2 text-slate-300 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                        <Edit3 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- Tab 3: 项目系统视图设置 --- */
const SystemViewsTab = ({ onSave }: { onSave: () => void }) => {
  const [subTab, setSubTab] = useState('需求系统视图');
  
  const [viewsMap, setViewsMap] = useState<Record<string, any[]>>({
    '需求系统视图': [
      { id: 1, title: '所有的', type: '系统视图', creator: 'system', isDefault: true, enabled: true },
      { id: 2, title: '我负责的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 3, title: '可访问的工作项', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 4, title: '我关注的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 5, title: '我负责的未完成的', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 6, title: '我创建的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 12, title: '待规划工作项Backlog', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
    ],
    '缺陷系统视图': [
      { id: 1, title: '所有的', type: '系统视图', creator: 'system', isDefault: true, enabled: true },
      { id: 2, title: '我负责的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 3, title: '未关闭的', type: '系统视图', creator: 'system', isDefault: false, enabled: false },
      { id: 4, title: '我关注的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 8, title: '我创建的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
    ],
    '迭代系统视图': [
      { id: 1, title: '未关闭的', type: '系统视图', creator: 'system', isDefault: true, enabled: true },
      { id: 2, title: '当前迭代', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 5, title: '已关闭的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
      { id: 6, title: '所有的', type: '系统视图', creator: 'system', isDefault: false, enabled: true },
    ]
  });

  const toggleEnabled = (viewId: number) => {
    setViewsMap(prev => {
        const currentList = prev[subTab];
        const newList = currentList.map(v => v.id === viewId ? { ...v, enabled: !v.enabled } : v);
        return { ...prev, [subTab]: newList };
    });
    onSave();
  };

  const setDefault = (viewId: number) => {
    setViewsMap(prev => {
        const currentList = prev[subTab];
        const newList = currentList.map(v => ({ ...v, isDefault: v.id === viewId }));
        return { ...prev, [subTab]: newList };
    });
    onSave();
  };

  const tabs = [
    '需求系统视图', '缺陷系统视图', '迭代系统视图', 
    '发布计划系统视图', '发布评审系统视图', '测试计划系统视图', '任务系统视图'
  ];

  const currentViews = viewsMap[subTab] || [];

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-xl w-fit flex-wrap border border-slate-200">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`px-5 py-2 text-xs font-black rounded-lg transition-all ${
              subTab === t ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95">
          <Plus size={18} strokeWidth={3} /> 新建{subTab.replace('系统视图', '')}视图
        </button>

        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] text-slate-400 font-black uppercase tracking-widest">
              <tr>
                <th className="py-4 px-6 w-24 text-center">默认视图</th>
                <th className="py-4 px-6 w-24 text-center">启用状态</th>
                <th className="py-4 px-4">视图名称 ({currentViews.length})</th>
                <th className="py-4 px-4 w-32">视图类型</th>
                <th className="py-4 px-4 w-32">创建人</th>
                <th className="py-4 px-4 w-32">授权范围</th>
                <th className="py-4 px-6 text-right">管理</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-slate-600 divide-y divide-slate-50">
              {currentViews.map((view) => (
                <tr key={view.id} className="hover:bg-blue-50/20 transition-colors group">
                  <td className="py-5 px-6 text-center">
                    <div className="flex justify-center">
                      <div 
                        onClick={() => setDefault(view.id)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${view.isDefault ? 'border-blue-500 shadow-sm' : 'border-slate-300 hover:border-blue-300'}`}
                      >
                        {view.isDefault && <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-in zoom-in duration-200"></div>}
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <div className="flex justify-center">
                      <div 
                        onClick={() => toggleEnabled(view.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${view.enabled ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'border-slate-300 bg-white group-hover:border-blue-300'}`}
                      >
                        {view.enabled && <Check size={14} strokeWidth={4} />}
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-4 font-bold text-slate-800">{view.title}</td>
                  <td className="py-5 px-4"><span className="px-2 py-0.5 rounded border border-slate-100 bg-slate-50 text-[10px] font-black uppercase text-slate-400">{view.type}</span></td>
                  <td className="py-5 px-4 font-medium text-slate-500">{view.creator === 'system' ? '系统生成' : view.creator}</td>
                  <td className="py-5 px-4 text-slate-400 text-xs font-bold uppercase italic">Global</td>
                  <td className="py-5 px-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100"><Edit3 size={14} /></button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100"><Copy size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentViews.length === 0 && (
                  <tr>
                      <td colSpan={7} className="py-20 text-center text-slate-300 font-bold italic">该类别下暂无定义的系统视图</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* --- Tab 4: 工作日设置 --- */
const WorkdaySettingsTab = ({ onSave }: { onSave: () => void }) => {
  const [selectedType, setSelectedType] = useState('standard');

  const handleSelect = (type: string) => {
    setSelectedType(type);
    onSave();
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      <div 
        onClick={() => handleSelect('standard')}
        className={`border-2 rounded-2xl p-8 flex items-start justify-between shadow-sm cursor-pointer transition-all hover:shadow-md ${selectedType === 'standard' ? 'bg-blue-50/50 border-blue-500 ring-4 ring-blue-50 shadow-blue-100' : 'bg-white border-slate-100 hover:border-blue-200'}`}
      >
        <div className="flex gap-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
            <span className="font-black text-3xl">CN</span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-black text-slate-800">中国大陆法定工作日</h3>
              {selectedType === 'standard' && <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest">Active</span>}
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-md">基于中国国务院办公厅每年发布的法定节假日安排。系统将自动排除法定节假日及周末，并包含法定补班日。</p>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedType === 'standard' ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>
           {selectedType === 'standard' && <Check size={16} strokeWidth={4} />}
        </div>
      </div>

      <div 
        onClick={() => handleSelect('custom')}
        className={`border-2 rounded-2xl p-8 flex items-center justify-between shadow-sm cursor-pointer transition-all hover:shadow-md group ${selectedType === 'custom' ? 'bg-indigo-50/50 border-indigo-500 ring-4 ring-indigo-50 shadow-indigo-100' : 'bg-white border-slate-100 hover:border-indigo-200'}`}
      >
        <div className="flex gap-6 items-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
            <Edit3 size={32} strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-black text-slate-800">自定义项目工作日</h3>
                {selectedType === 'custom' && <span className="bg-indigo-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest">Configuring</span>}
            </div>
            <p className="text-sm text-slate-500 font-medium">适合跨国团队或有特殊排班需求的敏捷团队。</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-black text-indigo-600 group-hover:translate-x-1 transition-transform">
          前往配置 <ChevronRight size={18} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};
