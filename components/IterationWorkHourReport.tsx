
import React from 'react';
import { MOCK_USERS } from '../constants';
import { BarChart2, TrendingUp, TrendingDown } from './Icons';

export const IterationWorkHourReport = ({ sprintId }: { sprintId: string }) => {
  return (
    <div className="p-6 bg-white h-full overflow-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">迭代工时汇总</h3>
          <p className="text-sm text-slate-500">统计迭代内所有成员的预计工时与实际消耗工时</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100 flex items-center gap-2">
          <BarChart2 size={18} />
          <span className="text-sm font-bold">总负载: 128h / 160h (80%)</span>
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              <th className="py-4 px-6">成员</th>
              <th className="py-4 px-4">预计工时 (h)</th>
              <th className="py-4 px-4">实际工时 (h)</th>
              <th className="py-4 px-4">剩余工时 (h)</th>
              <th className="py-4 px-4">偏差率</th>
              <th className="py-4 px-4">饱和度</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_USERS.map((user, idx) => {
              const estimated = 32 + idx * 4;
              const actual = estimated - (idx % 2 === 0 ? 4 : -2);
              const remaining = estimated - actual;
              const deviation = ((actual - estimated) / estimated * 100).toFixed(1);
              const saturation = Math.min(100, (estimated / 40) * 100);

              return (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${user.avatarColor} text-white flex items-center justify-center text-xs font-bold`}>
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-600 font-mono">{estimated}</td>
                  <td className="py-4 px-4 text-sm text-slate-600 font-mono">{actual}</td>
                  <td className="py-4 px-4">
                    <span className={`text-sm font-mono ${remaining < 0 ? 'text-red-500 font-bold' : 'text-green-600'}`}>
                      {remaining}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center gap-1 text-xs font-bold ${Number(deviation) > 0 ? 'text-red-500' : 'text-green-600'}`}>
                      {Number(deviation) > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {deviation}%
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full max-w-[80px]">
                        <div className={`h-full rounded-full ${saturation > 90 ? 'bg-orange-500' : 'bg-blue-500'}`} style={{ width: `${saturation}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{Math.round(saturation)}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
