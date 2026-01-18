

import React, { useState, useMemo, useRef } from 'react';
import { FlaskConical, Plus, ZoomIn, ZoomOut, Grid, Share2 } from '../Icons';
import { StatusBadge } from '../ProjectShared';
import { TestCase } from './types';

const MindmapCurves = ({ count }: { count: number }) => {
  const cardHeight = 84; const gap = 16; const startY = 48;
  return (
    <svg className="absolute top-0 left-[-64px] w-16 h-full pointer-events-none overflow-visible">
      {Array.from({ length: count }).map((_, i) => (
        <path key={i} d={`M 0 0 C 32 0, 32 ${i * (cardHeight + gap) + (cardHeight / 2) - startY}, 64 ${i * (cardHeight + gap) + (cardHeight / 2) - startY}`} stroke="#E2E8F0" strokeWidth="2" fill="none" className="transition-all duration-300" />
      ))}
    </svg>
  );
};

export const TestCaseMindmap = ({ 
  testCases, onNodeClick, onQuickAdd 
}: { 
  testCases: TestCase[], onNodeClick: (tc: TestCase) => void, onQuickAdd: (type: string) => void
}) => {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const groupedData = useMemo(() => {
    const groups: Record<string, TestCase[]> = {};
    testCases.forEach(tc => { if (!groups[tc.type]) groups[tc.type] = []; groups[tc.type].push(tc); });
    return groups;
  }, [testCases]);

  const handleMouseDown = (e: React.MouseEvent) => { if (e.button !== 0) return; setIsDragging(true); lastMousePos.current = { x: e.clientX, y: e.clientY }; };
  const handleMouseMove = (e: React.MouseEvent) => { if (!isDragging) return; setOffset(prev => ({ x: prev.x + (e.clientX - lastMousePos.current.x), y: prev.y + (e.clientY - lastMousePos.current.y) })); lastMousePos.current = { x: e.clientX, y: e.clientY }; };
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className={`flex-1 overflow-hidden bg-slate-50/50 relative select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      <div className="absolute inset-0 transition-transform duration-75 ease-out will-change-transform" style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`, transformOrigin: 'center center' }}>
        <div className="flex items-center min-w-max h-full p-64 gap-24">
          <div className="bg-pink-600 text-white px-8 py-5 rounded-2xl shadow-2xl border-4 border-white flex flex-col items-center gap-2">
            <FlaskConical size={24} strokeWidth={2.5} /><span className="font-black text-base uppercase tracking-widest">用例库脑图</span>
          </div>
          <div className="flex flex-col gap-24 relative">
            {Object.entries(groupedData).map(([type, cases]) => (
              <div key={type} className="flex items-center gap-16 relative">
                <div className="w-48 bg-white border-2 border-pink-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group relative z-10">
                  <div className="flex justify-between items-center mb-1"><span className="text-[10px] font-black text-slate-400 uppercase">Category</span><button onClick={() => onQuickAdd(type)} className="p-1 text-pink-400 hover:text-pink-600 hover:bg-pink-50 rounded transition-all"><Plus size={14} /></button></div>
                  <div className="font-black text-slate-800 text-sm">{type}</div>
                </div>
                <div className="flex flex-col gap-4 relative py-2">
                  {/* Cast cases to TestCase[] to resolve Property 'length' does not exist on type 'unknown' error */}
                  <MindmapCurves count={(cases as TestCase[]).length} />
                  {/* Cast cases to TestCase[] to resolve Property 'map' does not exist on type 'unknown' error */}
                  {(cases as TestCase[]).map(tc => (
                    <div key={tc.id} onClick={() => onNodeClick(tc)} className="bg-white border border-slate-200 hover:border-pink-400 hover:shadow-lg rounded-xl px-5 py-3 w-64 cursor-pointer transition-all active:scale-[0.98] group">
                      <div className="flex justify-between items-center mb-1"><span className="text-[10px] font-mono font-bold text-slate-300">{tc.id}</span><div className={`w-2 h-2 rounded-full ${tc.priority === 'P0' ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'}`}></div></div>
                      <div className="text-xs font-bold text-slate-700 truncate group-hover:text-pink-600 transition-colors">{tc.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-2 rounded-2xl shadow-2xl flex items-center gap-1">
          <button onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))} className="p-2.5 text-slate-500 hover:text-pink-600 rounded-xl transition-all"><ZoomIn size={18} /></button>
          <div className="text-[10px] font-black text-slate-400 w-12 text-center">{Math.round(zoom * 100)}%</div>
          <button onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))} className="p-2.5 text-slate-500 hover:text-pink-600 rounded-xl transition-all"><ZoomOut size={18} /></button>
          <div className="w-px h-5 bg-slate-200 mx-1"></div>
          <button onClick={() => { setZoom(1); setOffset({x:0,y:0}); }} className="p-2.5 text-slate-500 hover:text-pink-600 rounded-xl transition-all"><Grid size={18} /></button>
        </div>
      </div>
    </div>
  );
};
