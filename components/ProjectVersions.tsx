
import React from 'react';
import { Box, Edit3, Trash2 } from './Icons';
import { StatusBadge } from './ProjectShared';

export const ProjectVersions = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg">发布版本</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">发布新版本</button>
        </div>
        <div className="divide-y divide-slate-100">
             {[
                 { v: '1.2.0', date: '2025-08-10', status: '已发布', desc: '包含多人点餐功能的正式发布' },
                 { v: '1.1.0', date: '2025-07-25', status: '已发布', desc: '基础点餐流程上线' },
                 { v: '1.0.0-beta', date: '2025-07-01', status: '已归档', desc: '内测版本' }
             ].map((ver, i) => (
                 <div key={i} className="p-4 hover:bg-slate-50 flex items-start justify-between">
                     <div className="flex items-start gap-4">
                         <div className="bg-slate-100 p-2 rounded text-slate-500">
                             <Box size={24} />
                         </div>
                         <div>
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="font-bold text-lg text-slate-800">{ver.v}</span>
                                 <StatusBadge status={ver.status === '已发布' ? '已完成' : '已逾期'} />
                             </div>
                             <div className="text-sm text-slate-500">{ver.desc}</div>
                             <div className="text-xs text-slate-400 mt-2 flex items-center gap-4">
                                 <span>发布于: {ver.date}</span>
                                 <span>负责人: lo</span>
                             </div>
                         </div>
                     </div>
                     <div className="flex items-center gap-2">
                         <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit3 size={16} /></button>
                         <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                     </div>
                 </div>
             ))}
        </div>
    </div>
);
