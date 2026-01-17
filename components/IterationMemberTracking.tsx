
import React, { useState } from 'react';
import { MOCK_USERS, MOCK_COLUMNS } from '../constants';
import { CheckCircle2, Clock, AlertTriangle, ChevronRight, User, MoreHorizontal, LayoutList, ListChecks, Target } from './Icons';
import { StatusBadge } from './ProjectShared';

export const IterationMemberTracking = ({ sprintId }: { sprintId: string }) => {
  const allTasks = MOCK_COLUMNS.flatMap(c => c.tasks);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-slate-50/30 overflow-hidden">
      {/* Top Summary Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-8">
          <div>
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">参与成员</div>
            <div className="text-xl font-bold text-slate-800">{MOCK_USERS.length} 位</div>
          </div>
          <div className="h-8 w-px bg-slate-100"></div>
          <div>
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">总工作项</div>
            <div className="text-xl font-bold text-slate-800">{allTasks.length} 项</div>
          </div>
          <div className="h-8 w-px bg-slate-100"></div>
          <div>
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">平均负载</div>
            <div className="text-xl font-bold text-slate-800">{(allTasks.length / MOCK_USERS.length).toFixed(1)} 项/人</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
             <LayoutList size={14} /> 列表视图
           </button>
           <button className="p-1.5 text-slate-400 hover:text-slate-600">
             <MoreHorizontal size={18} />
           </button>
        </div>
      </div>

      {/* Member List Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {MOCK_USERS.map(user => {
          // Robust task filtering (handling potential null assignees)
          const userTasks = allTasks.filter(t => t.assignee?.id === user.id);
          const doneCount = userTasks.filter(t => t.statusColor === 'bg-green-500').length;
          const todoCount = userTasks.filter(t => t.statusColor === 'bg-gray-300' || t.statusColor === 'bg-gray-400').length;
          const inProgressCount = userTasks.length - doneCount - todoCount;
          
          const progress = userTasks.length > 0 ? (doneCount / userTasks.length) * 100 : 0;
          const isExpanded = expandedMember === user.id;

          return (
            <div key={user.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
              {/* Member Main Row */}
              <div 
                className="p-5 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedMember(isExpanded ? null : user.id)}
              >
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full ${user.avatarColor} text-white flex items-center justify-center text-xl font-bold shadow-inner`}>
                      {user.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border border-slate-100 flex items-center justify-center text-[10px] text-blue-600 shadow-sm">
                      <Target size={10} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors">{user.name}</h3>
                    <p className="text-xs text-slate-400">项目核心成员</p>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex-1 max-w-md px-12">
                   <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-2 uppercase">
                     <span>任务饱和度</span>
                     <span className={progress === 100 ? 'text-green-600' : 'text-blue-600'}>{Math.round(progress)}%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div 
                        className={`h-full transition-all duration-1000 ease-out ${progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`} 
                        style={{ width: `${progress}%` }}
                     ></div>
                   </div>
                </div>

                {/* Status Pills */}
                <div className="flex items-center gap-6 pr-4">
                  <div className="text-center">
                    <div className="text-xs font-bold text-slate-800">{todoCount}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">待办</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-blue-600">{inProgressCount}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">进行中</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-green-600">{doneCount}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">已完成</div>
                  </div>
                  <div className="w-px h-8 bg-slate-100 mx-2"></div>
                  <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                    <ChevronRight size={20} className="text-slate-300" />
                  </div>
                </div>
              </div>

              {/* Expanded Task Breakdown */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-6 animate-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                       <ListChecks size={16} className="text-blue-500" />
                       详细工作项列表
                    </h4>
                    <span className="text-xs text-slate-400">显示当前迭代关联的 {userTasks.length} 个任务</span>
                  </div>

                  {userTasks.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 italic text-sm">
                      该成员当前暂无分配的工作项
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      {userTasks.map(task => (
                        <div key={task.id} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
                          <div className="flex items-center gap-3">
                             <div className={`w-1 h-6 rounded-full ${task.statusColor}`}></div>
                             <span className="text-xs font-mono text-slate-400 w-20">{task.displayId}</span>
                             <span className="text-sm font-medium text-slate-700 truncate max-w-md">{task.title}</span>
                          </div>
                          <div className="flex items-center gap-4">
                             <StatusBadge status={task.statusColor === 'bg-green-500' ? '已完成' : '处理中'} />
                             <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                               <Clock size={12} />
                               {task.dueDate || '无期限'}
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
