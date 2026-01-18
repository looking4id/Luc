
import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Plus } from '../Icons';
import { Version, PHASE_COLORS } from './types';

interface ReleaseCalendarProps {
  versions: Version[];
  onDateClick: (date: string) => void;
  onVersionEdit: (v: Version) => void;
}

export const ReleaseCalendar: React.FC<ReleaseCalendarProps> = ({ 
  versions, onDateClick, onVersionEdit 
}) => {
  const [calendarDate, setCalendarDate] = useState(new Date(2025, 11, 1));

  const calendarGrid = useMemo(() => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const grid = [];
    for (let i = 0; i < startDay; i++) grid.push(null);
    for (let i = 1; i <= days; i++) grid.push(new Date(year, month, i));
    return grid;
  }, [calendarDate]);

  const handlePrevMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));

  const getVersionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return versions.filter(v => v.date === dateStr);
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/20">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-black text-slate-800 tracking-tight">{calendarDate.getFullYear()}年 {calendarDate.getMonth() + 1}月</h3>
          <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-sm p-1">
            <button onClick={handlePrevMonth} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronLeft size={18} /></button>
            <button onClick={() => setCalendarDate(new Date())} className="px-3 py-1 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg">今天</button>
            <button onClick={handleNextMonth} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronRight size={18} /></button>
          </div>
        </div>
        <div className="flex gap-6">
          {Object.entries(PHASE_COLORS).map(([name, color]) => (
            <div key={name} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${color}`}></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-slate-100/30 p-1">
        <div className="grid grid-cols-7 h-full min-h-[600px] border-l border-t border-slate-200 bg-white">
          {['日', '一', '二', '三', '四', '五', '六'].map(day => (
            <div key={day} className="py-3 bg-slate-50/50 border-r border-b border-slate-200 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</div>
          ))}
          {calendarGrid.map((date, idx) => (
            <div key={idx} className={`min-h-[120px] border-r border-b border-slate-200 p-2 transition-colors relative group ${!date ? 'bg-slate-50/30' : 'bg-white hover:bg-slate-50/50'}`} onClick={() => date && onDateClick(date.toISOString().split('T')[0])}>
              {date && (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold ${date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0] ? 'w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md' : 'text-slate-400'}`}>{date.getDate()}</span>
                    <button className="p-1 text-blue-500 opacity-0 group-hover:opacity-100 bg-blue-50 rounded-lg"><Plus size={14} /></button>
                  </div>
                  <div className="space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar">
                    {getVersionsForDate(date).map(v => (
                      <div key={v.id} onClick={(e) => { e.stopPropagation(); onVersionEdit(v); }} className={`${v.color} text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center justify-between cursor-pointer hover:brightness-110`}>
                        <span className="truncate pr-1">{v.version} {v.name}</span>
                        {v.progress === 100 && <CheckCircle2 size={10} />}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
