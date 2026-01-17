
import React, { useState } from 'react';
/* Corrected relative path to reach components/Icons.tsx from components/project/settings/requirement/ */
import { ChevronRight, Settings } from '../../../Icons';
import { FieldSettings } from './FieldSettings';
import { TemplateSettings } from './TemplateSettings';
import { StatusSettings } from './StatusSettings';
import { WorkflowSettings } from './WorkflowSettings';
import { EnableSettings } from './EnableSettings';
import { TemplateEditor } from './TemplateEditor';

interface RequirementDetailSettingsProps {
  onBack: () => void;
}

export const RequirementDetailSettings: React.FC<RequirementDetailSettingsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('字段设置');
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);

  const tabs = ['字段设置', '公共模板库', '状态设置', '公共工作流', '启用设置'];

  if (isEditingTemplate) {
    return <TemplateEditor onBack={() => setIsEditingTemplate(false)} />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case '字段设置': return <FieldSettings />;
      case '公共模板库': return <TemplateSettings onEdit={() => setIsEditingTemplate(true)} />;
      case '状态设置': return <StatusSettings />;
      case '公共工作流': return <WorkflowSettings />;
      case '启用设置': return <EnableSettings />;
      default: return null;
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[12px] text-slate-400 mb-6 font-medium">
        <button onClick={onBack} className="hover:text-blue-600">应用设置</button>
        <ChevronRight size={12} />
        <span className="text-slate-600">需求</span>
        <ChevronRight size={12} />
        <span className="text-slate-800 font-bold">需求</span>
      </div>

      <h2 className="text-2xl font-black text-slate-800 mb-8">需求</h2>

      <div className="flex items-center gap-8 border-b border-slate-100 mb-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
          </button>
        ))}
      </div>

      <div className="pb-10">
        {renderTabContent()}
      </div>
    </div>
  );
};
