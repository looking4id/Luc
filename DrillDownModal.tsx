
import React from 'react';
import { DetailItem } from '../types';

interface DrillDownModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: DetailItem[];
}

export const DrillDownModal: React.FC<DrillDownModalProps> = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[80vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <i className="fas fa-list-ul mr-3 text-blue-400"></i>
            {title} - 明细列表
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
        
        <div className="overflow-auto flex-1 p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 uppercase text-xs tracking-wider">
                <th className="pb-3 font-semibold">ID</th>
                <th className="pb-3 font-semibold">标题</th>
                <th className="pb-3 font-semibold">状态</th>
                <th className="pb-3 font-semibold">负责人</th>
                <th className="pb-3 font-semibold">更新日期</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 text-blue-400 font-mono text-sm">{item.id}</td>
                  <td className="py-4 text-sm font-medium">{item.title}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      item.status === '已完成' ? 'bg-emerald-500/20 text-emerald-400' : 
                      item.status === '进行中' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-300">{item.owner}</td>
                  <td className="py-4 text-sm text-slate-400">{item.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-slate-800/30 text-right">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
