
import React from 'react';
import { Edit3, Trash2, Box } from '../Icons';
import { Version } from './types';

interface VersionListProps {
  versions: Version[];
  onEdit: (v: Version) => void;
  onDelete: (id: string) => void;
}

export const VersionList: React.FC<VersionListProps> = ({ versions, onEdit, onDelete }) => {
  return (
    <div className="h-full overflow-auto bg-white">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/50 text-[10px] text-slate-400 font-black uppercase tracking-widest border-b border-slate-200 sticky top-0 z-10">
          <tr>
            <th className="py-4 px-8 w-40">版本号</th>
            <th className="py-4 px-4">发布内容</th>
            <th className="py-4 px-4 w-32 text-center">阶段</th>
            <th className="py-4 px-4 w-40">进度</th>
            <th className="py-4 px-4 w-32">发布日期</th>
            <th className="py-4 px-4 w-32">负责人</th>
            <th className="py-4 px-12 text-right">操作</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {versions.map(v => (
            <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50 group transition-colors">
              <td className="py-5 px-8 font-black text-slate-800 text-base">{v.version}</td>
              <td className="py-5 px-4">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{v.name}</span>
                  <span className="text-[11px] text-slate-400 line-clamp-1">{v.description || '暂无描述信息'}</span>
                </div>
              </td>
              <td className="py-5 px-4 text-center">
                 <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black text-white ${v.color} shadow-sm shadow-inner uppercase`}>
                   {v.phase.slice(0, 2)}
                 </span>
              </td>
              <td className="py-5 px-4">
                <div className="flex items-center gap-3">
                   <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-700 ${v.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${v.progress}%` }}></div>
                   </div>
                   <span className="text-[10px] font-black text-slate-400 w-8">{v.progress}%</span>
                </div>
              </td>
              <td className="py-5 px-4 font-mono text-slate-500 font-bold">{v.date}</td>
              <td className="py-5 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border border-slate-200">{v.owner.charAt(0)}</div>
                  <span className="text-slate-600 font-bold">{v.owner}</span>
                </div>
              </td>
              <td className="py-5 px-12 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(v)} className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-100 rounded-lg shadow-sm"><Edit3 size={14} /></button>
                  <button onClick={() => onDelete(v.id)} className="p-2 text-slate-400 hover:text-red-500 bg-white border border-slate-100 rounded-lg shadow-sm"><Trash2 size={14} /></button>
                </div>
              </td>
            </tr>
          ))}
          {versions.length === 0 && (
            <tr>
              <td colSpan={7} className="py-32 text-center text-slate-300 font-bold">
                <div className="flex flex-col items-center gap-3">
                  <Box size={48} className="opacity-10" />
                  <p>暂无版本记录</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
