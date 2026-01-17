
import React from 'react';
import { PlayCircle, RefreshCw, CheckCircle2, AlertTriangle, GitBranch, Clock } from './Icons';

export const ProjectPipeline = () => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full">
         <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <PlayCircle size={20} className="text-blue-500" /> 流水线
            </h3>
             <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-2">
                <PlayCircle size={16} /> 运行流水线
            </button>
        </div>
        <div className="flex-1 overflow-auto p-6">
            <div className="space-y-4">
                {[
                    { id: '#1024', name: 'Backend-CI-Master', status: 'Success', branch: 'master', trigger: 'Push by lo', time: '5分钟前', duration: '2m 30s' },
                    { id: '#1023', name: 'Frontend-CI-Dev', status: 'Running', branch: 'dev', trigger: 'Merge by dev01', time: '15分钟前', duration: 'Running' },
                    { id: '#1022', name: 'Backend-CI-Master', status: 'Failed', branch: 'master', trigger: 'Push by lo', time: '1小时前', duration: '1m 10s' },
                ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                p.status === 'Success' ? 'bg-green-100 text-green-600' :
                                p.status === 'Running' ? 'bg-blue-100 text-blue-600 animate-pulse' :
                                'bg-red-100 text-red-600'
                            }`}>
                                {p.status === 'Running' ? <RefreshCw size={20} className="animate-spin" /> : 
                                 p.status === 'Success' ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-800">{p.name}</span>
                                    <span className="text-xs font-mono text-slate-500">{p.id}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                                    <span className="flex items-center gap-1"><GitBranch size={12}/> {p.branch}</span>
                                    <span>{p.trigger}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className={`text-sm font-medium mb-1 ${
                                p.status === 'Success' ? 'text-green-600' :
                                p.status === 'Running' ? 'text-blue-600' :
                                'text-red-600'
                             }`}>{p.status}</div>
                             <div className="text-xs text-slate-500 flex items-center gap-2 justify-end">
                                 <Clock size={12} /> {p.duration}
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
