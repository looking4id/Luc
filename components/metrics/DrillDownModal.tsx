
import React from 'react';
import { DetailItem } from '../../types/index';
import { XCircle, ListChecks, Calendar, User as UserIcon, ExternalLink } from '../common/Icons';

interface DrillDownModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: DetailItem[];
}

export const DrillDownModal: React.FC<DrillDownModalProps> = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white border border-slate-200 w-full max-w-5xl max-h-[85vh] rounded-[2.5rem] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-5">
             <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                <ListChecks size={24} />
             </div>
             <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">{title} <span className="text-slate-400 font-medium ml-3 italic">Data Detail Raw Report</span></h2>
                <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.3em] mt-1">Deep-dive automated metrics inspection</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
            <XCircle size={28} />
          </button>
        </div>
        
        <div className="overflow-auto flex-1 p-10 custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 sticky top-0 z-10">
              <tr>
                <th className="pb-5 px-4 w-32">Index ID</th>
                <th className="pb-5 px-4">Subject Title</th>
                <th className="pb-5 px-4 w-32">Status</th>
                <th className="pb-5 px-4 w-32">Owner</th>
                <th className="pb-5 px-4 w-40">Last Synchronized</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-all group cursor-default">
                  <td className="py-5 px-4 font-mono font-bold text-slate-400 group-hover:text-blue-600 transition-colors">#{item.id}</td>
                  <td className="py-5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{item.title}</span>
                        <ExternalLink size={14} className="text-slate-200 group-hover:text-blue-400 transition-colors cursor-pointer" />
                      </div>
                  </td>
                  <td className="py-5 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                      item.status === '已完成' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      item.status === '进行中' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-200 shadow-sm"><UserIcon size={12} /></div>
                        <span className="text-xs font-bold text-slate-600">{item.owner}</span>
                    </div>
                  </td>
                  <td className="py-5 px-4 text-xs font-mono font-bold text-slate-400">
                    <div className="flex items-center gap-2 group-hover:text-slate-600 transition-colors"><Calendar size={14}/> {item.updatedAt}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="py-32 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
                    <ListChecks size={40} className="text-slate-200" />
                </div>
                <p className="text-slate-300 font-black uppercase tracking-[0.2em]">No detailed data trace found</p>
            </div>
          )}
        </div>
        
        <div className="px-10 py-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-2xl text-xs font-black transition-all shadow-sm uppercase tracking-widest active:scale-95"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
