
import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { MOCK_COLUMNS, MOCK_USERS, MOCK_PROJECTS } from '../../../utils/constants';
import { KanbanCard } from './KanbanCard';
import { 
  Circle, MoreHorizontal, Plus, XCircle, ChevronDown, 
  Maximize2, Bold, Italic, Underline, Link, Box, ListChecks, History, Share2, 
  Ban, Trash2, Calendar, Target, Code2, List, LayoutList, Image as ImageIcon, 
  Strikethrough, Quote, Minus, Smile, Paperclip, RefreshCw, Star, 
  MessageSquare, User, CheckCircle2, ChevronRight, Edit3, Globe, Copy,
  LayoutGrid, FileText, Bug, Layers, Smartphone, Download, Clock, GitPullRequest, FlaskConical,
  CheckSquare, Search, BookOpen, Send, Sparkles, Keyboard, ThumbsUp, ThumbsDown,
  GitBranch, Flag, AlertTriangle, ExternalLink, Paperclip as AttachmentIcon,
  UploadCloud, Repeat, Settings, HelpCircle, Package, Filter, Unlink, Diamond, Eye, ArrowRight
} from '../../../components/common/Icons';
import { Task, TaskType, Priority, Severity, Column, User as UserType, Attachment } from '../../../types';
import { StatusBadge, PriorityBadge } from '../../../components/common/ProjectShared';

// ------------------- Create Task Modal -------------------

export const CreateTaskModal: React.FC<{
    onClose: () => void;
    onSubmit: (task: Task) => void;
    defaultType: TaskType | null;
    defaultProjectId?: string;
}> = ({ onClose, onSubmit, defaultType, defaultProjectId }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<TaskType>(defaultType || TaskType.Requirement);
    const [priority, setPriority] = useState<Priority>(Priority.Normal);
    const [assigneeId, setAssigneeId] = useState('u1');
    const [projectId, setProjectId] = useState(defaultProjectId || 'p1');
    const [version, setVersion] = useState('');

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6 font-sans">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 w-[900px] h-[80vh] border border-white/20">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white flex-shrink-0">
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">新建{type}</h3>
                    <div className="flex items-center gap-4">
                        <button className="p-1 text-slate-300 hover:text-slate-600 transition-colors" onClick={onClose}><XCircle size={22} /></button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-white">
                    <div className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">标题 <span className="text-red-500">*</span></label>
                            <input 
                                autoFocus
                                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-300" 
                                placeholder="请填写" 
                                value={title} 
                                onChange={e => setTitle(e.target.value)} 
                            />
                        </div>

                        {/* Grid Fields */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">负责人/协作者</label>
                                <div className="relative">
                                    <select className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none appearance-none bg-white text-slate-600" value={assigneeId} onChange={e => setAssigneeId(e.target.value)}>
                                        <option value="" disabled>指派负责人/协作者</option>
                                        {MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">类型 <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none appearance-none bg-white text-slate-600" value={type} onChange={e => setType(e.target.value as TaskType)}>
                                        {Object.values(TaskType).map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">计划时间</label>
                                <div className="flex items-center gap-2 border border-slate-200 rounded px-3 py-2">
                                    <input type="date" className="flex-1 text-sm outline-none text-slate-600" />
                                    <span className="text-slate-300">→</span>
                                    <input type="date" className="flex-1 text-sm outline-none text-slate-600" />
                                    <Calendar size={14} className="text-slate-400" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">关联项目</label>
                                <div className="relative">
                                    <select className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none appearance-none bg-white text-slate-600" value={projectId} onChange={e => setProjectId(e.target.value)}>
                                        {MOCK_PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">迭代</label>
                                <div className="relative">
                                    <select className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none appearance-none bg-white text-slate-600">
                                        <option>选择迭代</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">版本</label>
                                <div className="relative">
                                    <select className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none appearance-none bg-white text-slate-600">
                                        <option>选择版本</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">描述</label>
                            <div className="border border-slate-200 rounded overflow-hidden flex flex-col min-h-[200px]">
                                <div className="bg-slate-50 border-b border-slate-100 p-2 flex items-center gap-2">
                                    <button className="p-1.5 hover:bg-white rounded text-slate-500"><span className="text-xs font-bold">正文</span></button>
                                    <div className="w-px h-4 bg-slate-300 mx-1"></div>
                                    <button className="p-1.5 hover:bg-white rounded text-slate-500"><Bold size={14}/></button>
                                    <button className="p-1.5 hover:bg-white rounded text-slate-500"><Italic size={14}/></button>
                                    <button className="p-1.5 hover:bg-white rounded text-slate-500"><Underline size={14}/></button>
                                    <button className="p-1.5 hover:bg-white rounded text-slate-500"><Strikethrough size={14}/></button>
                                    <div className="w-px h-4 bg-slate-300 mx-1"></div>
                                    <button className="p-1.5 hover:bg-white rounded text-slate-500"><List size={14}/></button>
                                    <button className="p-1.5 hover:bg-white rounded text-slate-500"><ListChecks size={14}/></button>
                                    <div className="w-px h-4 bg-slate-300 mx-1"></div>
                                    <button className="p-1.5 hover:bg-white rounded text-slate-500"><Link size={14}/></button>
                                    <button className="p-1.5 hover:bg-white rounded text-slate-500"><ImageIcon size={14}/></button>
                                    <div className="ml-auto">
                                        <button className="p-1.5 hover:bg-white rounded text-slate-500"><Maximize2 size={14}/></button>
                                    </div>
                                </div>
                                <textarea className="flex-1 p-4 outline-none resize-none text-sm text-slate-700" placeholder="" />
                            </div>
                        </div>

                        {/* Attachments */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                附件 <Plus size={14} className="text-blue-600 cursor-pointer"/>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-5 border-t border-slate-100 bg-white flex items-center gap-3 flex-shrink-0 z-30">
                    <button 
                        type="button"
                        onClick={() => {
                            const selectedUser = MOCK_USERS.find(u => u.id === assigneeId) || MOCK_USERS[0];
                            onSubmit({
                                title: title || `未命名${type}`,
                                type,
                                priority,
                                assignee: selectedUser,
                                projectId: projectId,
                                iteration: '未规划'
                            } as any);
                        }} 
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-bold shadow-md shadow-blue-100 transition-all active:scale-95"
                    >
                        新建
                    </button>
                    <button type="button" className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded text-sm font-bold hover:bg-slate-50 transition-all">新建并继续</button>
                    <button onClick={onClose} type="button" className="px-6 py-2 bg-white border border-slate-200 text-slate-500 rounded text-sm font-medium hover:bg-slate-50 transition-all">取消</button>
                </div>
            </div>
        </div>
    );
};

// ------------------- Relate Test Case Modal -------------------

const RelateTestCaseModal = ({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (selected: any[]) => void }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    
    // Mock Data for Test Cases selection
    const availableTestCases = [
        { id: 'TR132', title: '【示例数据】注册时检验用户名是否重复', version: '版本 1', result: '已通过', type: '功能测试', priority: 'P0', maintainer: 'looking4id' },
        { id: 'TR131', title: '【示例数据】注册时提示密码强度', version: '版本 1', result: '已通过', type: '功能测试', priority: 'P0', maintainer: 'looking4id' },
        { id: 'TR130', title: '【示例数据】登录页面验证码刷新', version: '版本 2', result: '未测试', type: '功能测试', priority: 'P1', maintainer: 'looking4id' },
        { id: 'TR129', title: '【示例数据】忘记密码流程验证', version: '版本 1', result: '失败', type: '功能测试', priority: 'P0', maintainer: 'Dev 1' },
    ];

    const toggleSelection = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-[1000px] h-[700px] rounded shadow-2xl relative z-10 flex overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 h-14 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-20">
                    <h3 className="text-lg font-bold text-slate-800">关联测试用例</h3>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                </div>

                {/* Left Sidebar */}
                <div className="w-64 border-r border-slate-100 pt-16 flex flex-col bg-slate-50/30">
                    <div className="px-4 py-3 flex items-center justify-between">
                        <span className="font-bold text-slate-700 text-sm">测试计划</span>
                        <Filter size={14} className="text-slate-400 cursor-pointer" />
                    </div>
                    <div className="px-2">
                        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded text-sm text-slate-600 font-medium">
                            <Minus size={10} />
                            <span>测试计划01</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col pt-14 bg-white">
                    {/* Filters */}
                    <div className="px-6 py-3 border-b border-slate-100 flex gap-3">
                        <div className="relative">
                            <select className="pl-3 pr-8 py-1.5 text-sm border border-slate-200 rounded bg-white outline-none text-slate-600 appearance-none w-32">
                                <option>功能模块</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <select className="pl-3 pr-8 py-1.5 text-sm border border-slate-200 rounded bg-white outline-none text-slate-600 appearance-none w-32">
                                <option>用例类型</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative flex-1">
                            <input className="w-full pl-8 pr-4 py-1.5 text-sm border border-slate-200 rounded outline-none focus:border-blue-500 transition-all" placeholder="搜索用例" />
                            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                                <tr>
                                    <th className="py-3 px-6 w-12"><div className="w-4 h-4 border rounded bg-white"></div></th>
                                    <th className="py-3 px-4 w-24">编号</th>
                                    <th className="py-3 px-4">标题</th>
                                    <th className="py-3 px-4 w-24">版本号</th>
                                    <th className="py-3 px-4 w-40">当前版本评审结果</th>
                                    <th className="py-3 px-4 w-24">类型</th>
                                    <th className="py-3 px-4 w-20">优先级</th>
                                    <th className="py-3 px-4 w-24">维护人</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-slate-50">
                                {availableTestCases.map(tc => (
                                    <tr key={tc.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-3 px-6">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                checked={selectedIds.includes(tc.id)}
                                                onChange={() => toggleSelection(tc.id)}
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-xs font-mono text-slate-400">{tc.id}</td>
                                        <td className="py-3 px-4 font-bold text-slate-700">{tc.title}</td>
                                        <td className="py-3 px-4 text-slate-500">{tc.version}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-1.5">
                                                {tc.result === '已通过' ? <CheckCircle2 size={14} className="text-green-500"/> : <Circle size={14} className="text-slate-300"/>}
                                                <span className={tc.result === '已通过' ? 'text-green-600' : 'text-slate-500'}>{tc.result}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-slate-500">{tc.type}</td>
                                        <td className="py-3 px-4">
                                            <span className="text-red-500 border border-red-200 bg-red-50 px-1 py-0.5 rounded text-[10px] font-bold">{tc.priority}</span>
                                        </td>
                                        <td className="py-3 px-4 text-slate-600">{tc.maintainer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="h-16 border-t border-slate-100 flex items-center justify-end px-6 gap-3 bg-slate-50/30">
                        <button onClick={onClose} className="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded text-sm font-bold hover:bg-slate-50 transition-all">取消</button>
                        <button 
                            onClick={() => onAdd(availableTestCases.filter(tc => selectedIds.includes(tc.id)))} 
                            className="px-5 py-2 bg-emerald-500 text-white rounded text-sm font-bold hover:bg-emerald-600 shadow-md transition-all active:scale-95"
                        >
                            添加
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ------------------- Task Details Modal (Comprehensive Edit View) -------------------

const DetailField = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex items-start gap-8">
        <span className="text-slate-500 font-bold text-sm w-24 flex-shrink-0">{label}</span>
        <div className="text-sm text-slate-700 font-medium flex-1">{value}</div>
    </div>
);

export const TaskDetailsModal: React.FC<{
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}> = ({ task, onClose, onUpdate, onDelete }) => {
  const [activeTab, setActiveTab] = useState('详情');
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const [newSubTaskTitle, setNewSubTaskTitle] = useState('');
  const [newSubTaskType, setNewSubTaskType] = useState<TaskType>(TaskType.Task);
  const [newSubTaskAssignee, setNewSubTaskAssignee] = useState(MOCK_USERS[0].id);
  
  // New state for test case linking
  const [linkedTestCases, setLinkedTestCases] = useState<any[]>([]);
  const [isRelateModalOpen, setIsRelateModalOpen] = useState(false);

  // New state for code review linking
  const [linkedCodeReviews, setLinkedCodeReviews] = useState([
      { id: '!1', title: '【示例数据】Pull Request 是实现代码质量左移，保障代码质量和规范的绝佳工具', repo: '北京华佑科技有限公司/示例仓库-测试仓库', status: '未测试', owner: 'lo', priority: 'P0', checkStatus: '已通过' }
  ]);
  const [isAddingCodeReview, setIsAddingCodeReview] = useState(false);

  // New state for document linking
  const [linkedDocuments, setLinkedDocuments] = useState([
      { id: 'd1', title: '【示例数据】自助开票 PRD', type: 'Word', size: '2.4 MB', creator: 'looking4id', date: '2025-08-02' }
  ]);
  const [isAddingDocument, setIsAddingDocument] = useState(false);

  // New state for work logs
  const [workLogs, setWorkLogs] = useState([
      { id: 'wl1', name: 'Mo Chun', avatarColor: 'bg-orange-500', date: '04-05', hours: 8, desc: '修复代码建议样式丢失' },
      { id: 'wl2', name: 'Dreampie', avatarColor: 'bg-green-500', date: '04-05', hours: 2, desc: '社区版 issue 创建的 URL 参数处理' },
      { id: 'wl3', name: 'Lily', avatarColor: 'bg-purple-500', date: '04-05', hours: 1, desc: '移除添加用例弹框中的数量限制' },
      { id: 'wl4', name: 'Tony', avatarColor: 'bg-blue-500', date: '04-05', hours: 4, desc: 'PR 评论报错 st.isSuccess 不存在' },
  ]);

  // Mock Attachments
  const [attachments, setAttachments] = useState([
      { id: 'f1', name: 'chrome.exe.sig', size: '1.39 KB', time: '上传于 4 分钟前', uploader: 'looking4id', uploaderAvatar: 'bg-orange-500' },
      { id: 'f2', name: 'chrome.exe.sig', size: '1.39 KB', time: '上传于 4 分钟前', uploader: 'looking4id', uploaderAvatar: 'bg-orange-500' },
  ]);

  // Mock Versions
  const [reqVersions, setReqVersions] = useState([
      { id: 'v1', version: 'V1.0', remark: '备注', status: '启用', editor: 'looking4id', date: '2026-01-22 23:11', avatar: 'bg-orange-500' }
  ]);
  
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Local state for sub-items
  const [subItems, setSubItems] = useState([
    { id: '#ICQMC8', title: '【示例需求】付款后支持自助申请开票', status: '意向', owner: MOCK_USERS[0], type: TaskType.Requirement },
    { id: '#ICQMC9', title: '【示例需求】订单页面支持查看开票进度', status: '意向', owner: MOCK_USERS[0], type: TaskType.Requirement },
    { id: '#ICQMCA', title: '【示例需求】开票完成前支持更改发票信息', status: '意向', owner: MOCK_USERS[0], type: TaskType.Requirement },
    { id: '#ICQMCB', title: '【示例需求】开票完成后支持发送至邮箱', status: '意向', owner: MOCK_USERS[0], type: TaskType.Requirement },
    { id: '#ICQMCC', title: '【示例需求】后台支持发票审查通过功能', status: '进行中', owner: MOCK_USERS[0], type: TaskType.Requirement },
  ]);

  // Local state for related items
  const [relatedItems, setRelatedItems] = useState([
    { id: '#ICQMCD', title: '【示例缺陷】手动开票时小概率遇到发票金额错误', type: TaskType.Defect, status: '已确认', owner: 'looking4id', relation: '普通' },
    { id: '#ICQMC4', title: '【示例任务】后端任务：提交订单接口', type: TaskType.Task, status: '进行中', owner: 'looking4id', relation: '普通' },
    { id: '#ICQMC2', title: '【示例任务】后端任务：删除菜品接口', type: TaskType.Task, status: '进行中', owner: 'looking4id', relation: '普通' },
    { id: '#ICQMC3', title: '【示例任务】前端任务：跳转逻辑修改', type: TaskType.Task, status: '进行中', owner: 'looking4id', relation: '普通' },
    { id: '#ICQMBW', title: '【示例缺陷】多人进入系统后，菜品有概率被重复提交', type: TaskType.Defect, status: '修复中', owner: 'looking4id', relation: '普通' },
    { id: '#ICQMBP', title: '【示例需求】支持多人同时点餐功能', type: TaskType.Requirement, status: '进行中', owner: 'looking4id', relation: '普通' },
  ]);
  const [isAddingRelated, setIsAddingRelated] = useState(false);

  // History logs
  const historyLogs = [
      { user: 'looking4id', action: '关联了', target: '北京华佑科技有限公司/示例仓库-测试仓库 Pull Request !1', time: '4小时前', icon: GitPullRequest },
      { user: 'looking4id', action: '将 计划截止日期 从 2025-08-30 修改为', target: '2025-09-13', time: '11小时前', icon: Calendar },
      { user: 'looking4id', action: '关联了 任务 (普通)', target: '【示例缺陷】手动开票时小概率遇到发票金额错误', time: '2025年08月02日', icon: Link },
      { user: 'looking4id', action: '关联了文档', target: '【示例数据】自助开票 PRD', time: '2025年08月02日', icon: BookOpen },
      { user: 'looking4id', action: '添加了 新手引导 标签', target: '', time: '2025年08月02日', icon: Target },
      { user: 'looking4id', action: '创建了 需求', target: '', time: '2025年08月02日', icon: Plus },
  ];

  const handleAddSubTask = () => {
    if (!newSubTaskTitle.trim()) return;
    const assignee = MOCK_USERS.find(u => u.id === newSubTaskAssignee) || MOCK_USERS[0];
    const newId = `#NEW-${Math.floor(Math.random() * 1000)}`;
    const newItem = {
        id: newId,
        title: newSubTaskTitle,
        status: '未开始',
        owner: assignee,
        type: newSubTaskType
    };
    setSubItems([newItem, ...subItems]);
    setNewSubTaskTitle('');
    setIsAddingSubTask(false);
  };

  const handleAddTestCases = (selected: any[]) => {
      // Avoid duplicates
      const newCases = selected.filter(s => !linkedTestCases.some(l => l.id === s.id));
      setLinkedTestCases([...linkedTestCases, ...newCases]);
      setIsRelateModalOpen(false);
  };

  const handleRemoveTestCase = (id: string) => {
      setLinkedTestCases(linkedTestCases.filter(tc => tc.id !== id));
  };

  const handleRemoveCodeReview = (id: string) => {
      setLinkedCodeReviews(linkedCodeReviews.filter(pr => pr.id !== id));
  };

  const handleAddCodeReview = () => {
      // Mock adding a new PR
      const newPR = {
          id: `!${Date.now()}`,
          title: '【新增】支持多端同步的实时通信模块',
          repo: '北京华佑科技有限公司/示例仓库-核心服务',
          status: '未评审',
          owner: 'looking4id',
          priority: 'P1',
          checkStatus: '进行中'
      };
      setLinkedCodeReviews([newPR, ...linkedCodeReviews]);
      setIsAddingCodeReview(false);
  };

  const handleAddDocument = () => {
      const newDoc = {
          id: `d${Date.now()}`,
          title: '【新增】需求规格说明书 v1.2',
          type: 'PDF',
          size: '1.8 MB',
          creator: 'looking4id',
          date: new Date().toISOString().split('T')[0]
      };
      setLinkedDocuments([newDoc, ...linkedDocuments]);
      setIsAddingDocument(false);
  };

  const handleRemoveDocument = (id: string) => {
      setLinkedDocuments(linkedDocuments.filter(d => d.id !== id));
  };

  const handleMoreSelect = (tabName: string) => {
      setActiveTab(tabName);
      setIsMoreMenuOpen(false);
  };

  const tabs = [
    { name: '详情' },
    { name: '子工作项', count: subItems.length },
    { name: '关联工作项', count: relatedItems.length },
    { name: '关联测试用例', count: linkedTestCases.length > 0 ? linkedTestCases.length : undefined },
    { name: '关联代码评审', count: linkedCodeReviews.length > 0 ? linkedCodeReviews.length : 1 },
    { name: '关联文档', count: linkedDocuments.length > 0 ? linkedDocuments.length : 1 },
    { name: '工时' },
    { name: '更多', hasDropdown: true },
  ];

  const isMoreActive = ['附件', '需求版本'].includes(activeTab);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 font-sans text-slate-700">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white w-[1200px] h-[90vh] rounded shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 relative z-10 border border-slate-200 overflow-hidden">
        
        {/* 1. Header */}
        <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6 bg-white flex-shrink-0">
           <div className="flex items-center gap-3">
              <div className="p-1.5 bg-purple-500 rounded text-white"><FileText size={16} /></div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                 <Link size={14} />
                 <span>{task.displayId}</span>
              </div>
              
              <div className="relative group ml-2">
                  <button className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                      <div className="w-3 h-3 rounded-full border-2 border-slate-400"></div>
                      <span>意向</span>
                      <ChevronDown size={14} className="text-slate-400" />
                  </button>
              </div>
           </div>

           <div className="flex items-center gap-4 text-slate-400">
              <button className="hover:text-slate-600"><Share2 size={18}/></button>
              <div className="w-px h-4 bg-slate-200"></div>
              <button className="flex items-center gap-1 hover:text-slate-600"><Sparkles size={16}/> <span className="text-xs">要规范，更要高效！</span></button>
              <div className="w-px h-4 bg-slate-200"></div>
              <button className="hover:text-slate-600"><Star size={18}/></button>
              <button className="hover:text-slate-600"><RefreshCw size={18}/></button>
              <button className="hover:text-slate-600"><LayoutList size={18}/></button>
              <button className="hover:text-slate-600"><Copy size={18}/></button>
              <button className="hover:text-slate-600"><Paperclip size={18}/></button>
              <button className="hover:text-slate-600"><MoreHorizontal size={18}/></button>
           </div>
        </div>

        {/* 2. Main Title */}
        <div className="px-8 pt-6 pb-2 flex-shrink-0 bg-white">
           <div className="flex items-start gap-3 group">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight flex-1">
                 【示例需求】{task.title} <Edit3 size={16} className="inline ml-2 text-slate-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-blue-600"/>
              </h1>
           </div>
           <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 mb-4">
              <span>{task.assignee?.name} 创建于 2025年08月02日，最近更新于 4 小时前</span>
           </div>
        </div>

        {/* 3. Navigation Tabs */}
        <div className="px-8 border-b border-slate-200 bg-white flex-shrink-0 flex items-center justify-between">
           <div className="flex items-center gap-8">
              {tabs.map(tab => (
                 <div key={tab.name} className="relative">
                     <button
                        onClick={() => {
                            if (tab.hasDropdown) {
                                setIsMoreMenuOpen(!isMoreMenuOpen);
                            } else {
                                setActiveTab(tab.name);
                                setIsMoreMenuOpen(false);
                            }
                        }}
                        className={`pb-3 text-sm font-medium transition-all relative whitespace-nowrap flex items-center gap-1.5 ${
                        (activeTab === tab.name || (tab.name === '更多' && isMoreActive)) ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'
                        }`}
                     >
                        {tab.name}
                        {tab.count !== undefined && <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.name ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>{tab.count}</span>}
                        {tab.hasDropdown && <ChevronDown size={12} className={`ml-0.5 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />}
                     </button>
                     {/* More Dropdown */}
                     {tab.hasDropdown && isMoreMenuOpen && (
                         <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 shadow-xl rounded-lg py-1 z-50 w-32 animate-in fade-in zoom-in-95 duration-200">
                             <button onClick={() => handleMoreSelect('附件')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">附件</button>
                             <button onClick={() => handleMoreSelect('需求版本')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">需求版本</button>
                         </div>
                     )}
                 </div>
              ))}
           </div>
        </div>

        {/* 4. Content Area */}
        <div className="flex-1 flex overflow-hidden bg-white">
           {/* Left Main Content */}
           <div className="flex-1 overflow-y-auto custom-scrollbar p-8 border-r border-slate-200">
               
               {activeTab === '详情' && (
                   <div className="space-y-10 animate-in fade-in duration-300">
                       <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                            <DetailField label="负责人 / 协作" value={
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold">L</div>
                                    <span className="text-slate-700 font-medium">looking4id</span>
                                </div>
                            } />
                            <DetailField label="类型" value="需求" />
                            <DetailField label="计划时间" value={
                                <div className="flex items-center gap-2 font-mono text-slate-600">
                                    2025.08.16 <ArrowRight size={12} className="text-slate-300"/> 2025.09.13
                                    <Calendar size={14} className="text-slate-400 ml-1"/>
                                </div>
                            } />
                            <DetailField label="项目" value={
                                <div className="flex items-center gap-2">
                                    <BookOpen size={14} className="text-slate-400"/>
                                    <span>敏捷研发项目01</span>
                                    <ExternalLink size={12} className="text-slate-300"/>
                                </div>
                            } />
                            <DetailField label="迭代" value={
                                <div className="flex items-center gap-2">
                                    <span>Sprint2：自助开票功能开发</span>
                                    <ExternalLink size={12} className="text-slate-300"/>
                                </div>
                            } />
                            <DetailField label="版本" value={
                                <div className="flex items-center gap-2">
                                    <span>1.2 - 【示例数据】自助开票功能...</span>
                                    <ExternalLink size={12} className="text-slate-300"/>
                                </div>
                            } />
                       </div>

                       <div className="group">
                           <div className="flex items-center gap-2 mb-2">
                               <span className="font-bold text-slate-500 text-sm">描述</span>
                               <Edit3 size={14} className="text-slate-300 cursor-pointer hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                               <button className="ml-auto text-slate-300 hover:text-blue-500"><Maximize2 size={14} /></button>
                           </div>
                           <div className="text-slate-800 leading-relaxed text-sm">
                               我需要自助开票功能，以便我吃完饭后可以直接在小程序上完成付款后的开票流程
                           </div>
                           <div className="flex gap-2 mt-4">
                                <button className="p-1.5 border border-slate-200 rounded text-slate-400 hover:text-orange-500 hover:bg-orange-50"><ThumbsUp size={14}/></button>
                                <button className="p-1.5 border border-slate-200 rounded text-slate-400 hover:text-blue-500 hover:bg-blue-50"><ThumbsDown size={14}/></button>
                                <button className="p-1.5 border border-slate-200 rounded text-slate-400 hover:text-yellow-500 hover:bg-yellow-50"><Smile size={14}/></button>
                           </div>
                       </div>
                   </div>
               )}

               {activeTab === '子工作项' && (
                   <div className="space-y-4">
                       <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center gap-4 text-sm text-slate-500">
                               <button className="flex items-center gap-1 hover:text-slate-800 font-bold text-slate-800">全部 <ChevronDown size={12}/></button>
                               <button className="flex items-center gap-1 hover:text-slate-800">负责人 <ChevronDown size={12}/></button>
                               <button className="flex items-center gap-1 hover:text-slate-800">状态 <ChevronDown size={12}/></button>
                           </div>
                           <button onClick={() => setIsAddingSubTask(!isAddingSubTask)} className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 font-medium">
                               <Plus size={16} /> 添加
                           </button>
                       </div>

                       {isAddingSubTask && (
                           <div className="flex items-center gap-2 p-2 border border-blue-200 rounded bg-blue-50/10 animate-in fade-in slide-in-from-top-2 duration-200">
                               <div className="relative">
                                   <select 
                                       className="appearance-none bg-white border border-slate-200 rounded px-2 py-1.5 text-sm w-24 outline-none focus:border-blue-500 text-slate-600 pl-8"
                                       value={newSubTaskType}
                                       onChange={(e) => setNewSubTaskType(e.target.value as TaskType)}
                                   >
                                       <option value={TaskType.Requirement}>需求</option>
                                       <option value={TaskType.Task}>任务</option>
                                       <option value={TaskType.Defect}>缺陷</option>
                                   </select>
                                   <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                       {newSubTaskType === TaskType.Requirement ? <FileText size={14} className="text-purple-500"/> : newSubTaskType === TaskType.Defect ? <Bug size={14} className="text-red-500"/> : <CheckSquare size={14} className="text-blue-500"/>}
                                   </div>
                               </div>
                               <input 
                                   autoFocus
                                   className="flex-1 border border-slate-200 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                                   placeholder="请输入子工作项标题"
                                   value={newSubTaskTitle}
                                   onChange={(e) => setNewSubTaskTitle(e.target.value)}
                                   onKeyDown={(e) => e.key === 'Enter' && handleAddSubTask()}
                               />
                               <div className="relative">
                                   <select 
                                       className="appearance-none bg-white border border-slate-200 rounded px-2 py-1.5 text-sm w-32 outline-none focus:border-blue-500 text-slate-600 pl-8"
                                       value={newSubTaskAssignee}
                                       onChange={(e) => setNewSubTaskAssignee(e.target.value)}
                                   >
                                       {MOCK_USERS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                   </select>
                                   <User size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none" />
                               </div>
                               <button onClick={handleAddSubTask} className="px-3 py-1.5 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600">新建</button>
                               <button onClick={() => setIsAddingSubTask(false)} className="px-3 py-1.5 text-slate-500 hover:text-slate-700 text-sm">取消</button>
                           </div>
                       )}

                       <div className="space-y-1">
                           {subItems.map((item) => (
                               <div key={item.id} className="flex items-center justify-between py-3 px-2 hover:bg-slate-50 rounded group border-b border-slate-50">
                                   <div className="flex items-center gap-3 flex-1 min-w-0">
                                       {item.type === TaskType.Requirement ? <FileText size={16} className="text-purple-500 flex-shrink-0" /> : <CheckSquare size={16} className="text-blue-500 flex-shrink-0" />}
                                       <span className="text-xs text-slate-400 font-mono flex-shrink-0">{item.id}</span>
                                       <span className="text-sm text-slate-700 font-medium truncate">{item.title}</span>
                                   </div>
                                   <div className="flex items-center gap-6 flex-shrink-0">
                                       <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded border border-slate-200">{item.status}</span>
                                       <div className="flex items-center gap-2 w-24">
                                           <div className={`w-5 h-5 rounded-full ${item.owner.avatarColor} text-white flex items-center justify-center text-[10px]`}>{item.owner.name.charAt(0)}</div>
                                           <span className="text-sm text-slate-600">{item.owner.name}</span>
                                       </div>
                                       <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                                           <MoreHorizontal size={16} />
                                       </button>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>
               )}

               {activeTab === '关联工作项' && (
                   <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <button className="flex items-center gap-1 hover:text-slate-800 font-bold text-slate-800">全部 <ChevronDown size={12}/></button>
                                <button className="flex items-center gap-1 hover:text-slate-800">负责人 <ChevronDown size={12}/></button>
                                <button className="flex items-center gap-1 hover:text-slate-800">状态 <ChevronDown size={12}/></button>
                            </div>
                            <button onClick={() => setIsAddingRelated(!isAddingRelated)} className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 font-medium">
                                <Plus size={16} /> 添加
                            </button>
                        </div>

                        {isAddingRelated && (
                            <div className="flex items-center gap-2 p-2 border border-blue-200 rounded bg-blue-50/10 mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="flex-1 relative">
                                    <input className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500 bg-white placeholder:text-slate-400" placeholder="请选择" />
                                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <select className="appearance-none border border-slate-200 rounded px-2 py-1.5 text-sm w-24 outline-none text-slate-700 bg-white pl-7">
                                            <option>任务</option>
                                            <option>需求</option>
                                            <option>缺陷</option>
                                        </select>
                                        <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500"><CheckSquare size={14} /></div>
                                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <div className="relative">
                                        <select className="appearance-none border border-slate-200 rounded px-2 py-1.5 text-sm w-24 outline-none text-slate-700 bg-white">
                                            <option>普通</option>
                                        </select>
                                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <div className="relative">
                                        <select className="appearance-none border border-slate-200 rounded px-2 py-1.5 text-sm w-28 outline-none text-slate-700 bg-white">
                                            <option>NORMAL...</option>
                                            <option>Finish-Start</option>
                                        </select>
                                        <HelpCircle size={12} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                <button className="px-4 py-1.5 bg-emerald-500 text-white rounded text-sm font-bold hover:bg-emerald-600 shadow-sm">新建</button>
                                <button onClick={() => setIsAddingRelated(false)} className="px-3 py-1.5 text-slate-500 hover:text-slate-700 text-sm">取消</button>
                            </div>
                        )}

                        <div className="space-y-1">
                            {relatedItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-3 px-2 hover:bg-slate-50 rounded group border-b border-slate-50">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        {item.type === TaskType.Defect ? (
                                            <div className="p-1 bg-red-500 rounded text-white shadow-sm shadow-red-100 flex-shrink-0"><Bug size={12} strokeWidth={3} /></div>
                                        ) : item.type === TaskType.Requirement ? (
                                            <div className="p-1 bg-purple-500 rounded text-white shadow-sm shadow-purple-100 flex-shrink-0"><FileText size={12} strokeWidth={3} /></div>
                                        ) : (
                                            <div className="p-1 bg-blue-500 rounded text-white shadow-sm shadow-blue-100 flex-shrink-0"><CheckSquare size={12} strokeWidth={3} /></div>
                                        )}
                                        <span className="text-xs text-slate-400 font-mono flex-shrink-0">{item.id}</span>
                                        <span className="text-sm text-slate-700 font-medium truncate">{item.title}</span>
                                    </div>
                                    <div className="flex items-center gap-6 flex-shrink-0">
                                        <span className={`px-2 py-0.5 text-xs rounded border flex items-center gap-1.5 ${
                                            item.status === '已确认' ? 'bg-slate-100 text-slate-500 border-slate-200' :
                                            item.status === '修复中' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            'bg-slate-100 text-slate-500 border-slate-200'
                                        }`}>
                                            {item.status === '进行中' ? <><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>进行中</> : 
                                            item.status === '修复中' ? <><div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>修复中</> :
                                            item.status === '已确认' ? <><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>已确认</> :
                                            <><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>{item.status}</>}
                                        </span>
                                        
                                        <div className="flex items-center gap-2 w-24 justify-end">
                                            <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">Lo</div>
                                            <span className="text-sm text-slate-600 truncate">{item.owner}</span>
                                        </div>
                                        <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                   </div>
               )}

               {/* Related Test Cases Tab */}
               {activeTab === '关联测试用例' && (
                   <div className="h-full flex flex-col">
                       {/* Top Bar with Add Button - Only show if has items or to allow adding from top */}
                       <div className="flex justify-end mb-4">
                           <button onClick={() => setIsRelateModalOpen(true)} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-bold border border-transparent hover:bg-blue-50 px-3 py-1.5 rounded transition-all">
                               <Plus size={16} /> 添加
                           </button>
                       </div>

                       {linkedTestCases.length === 0 ? (
                           <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-4">
                               <Package size={64} className="opacity-20 text-slate-400" strokeWidth={1} />
                               <span className="text-sm font-medium text-slate-400">暂无关联测试用例</span>
                           </div>
                       ) : (
                           <div className="space-y-1">
                               {linkedTestCases.map(tc => (
                                   <div key={tc.id} className="flex items-center justify-between py-3 px-2 hover:bg-slate-50 rounded group border-b border-slate-50 transition-colors">
                                       <div className="flex items-center gap-3 flex-1 min-w-0">
                                           <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                                           <span className="text-sm text-slate-700 font-bold truncate">{tc.title}</span>
                                       </div>
                                       <div className="flex items-center gap-6 flex-shrink-0">
                                           <span className="text-red-500 border border-red-200 bg-red-50 px-1 py-0.5 rounded text-[10px] font-black">{tc.priority}</span>
                                           <div className="flex items-center gap-2 w-24">
                                               <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">L</div>
                                               <span className="text-xs text-slate-600 font-bold">{tc.maintainer}</span>
                                           </div>
                                           <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                {tc.result === '已通过' ? <CheckCircle2 size={12} className="text-green-500"/> : <Circle size={12} />}
                                                <span>{tc.result || '未测试'}</span>
                                           </div>
                                           <button 
                                                onClick={() => handleRemoveTestCase(tc.id)}
                                                className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-xs font-medium hover:bg-red-50 px-2 py-1 rounded transition-colors"
                                           >
                                               <Unlink size={14} /> 取消关联
                                           </button>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       )}
                   </div>
               )}

                {/* Related Code Reviews Tab */}
                {activeTab === '关联代码评审' && (
                    <div className="space-y-4">
                        {/* Toolbar */}
                        <div className="flex items-center justify-end gap-4 mb-2">
                             <button className="text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1">
                                <Unlink size={14} /> 批量取消关联
                             </button>
                             <button onClick={() => setIsAddingCodeReview(!isAddingCodeReview)} className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 font-medium">
                                <Plus size={16} /> 添加
                             </button>
                        </div>

                        {/* Inline Add */}
                        {isAddingCodeReview && (
                            <div className="flex items-center gap-2 p-2 border border-blue-200 rounded bg-blue-50/10 mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="flex-1 relative">
                                    <select className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500 bg-white appearance-none text-slate-700">
                                        <option>【示例数据】Pull Request 是实现代码质量左移，保障代码质量和规范的绝佳工具</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                                <button onClick={handleAddCodeReview} className="px-4 py-1.5 bg-emerald-500 text-white rounded text-sm font-bold hover:bg-emerald-600 shadow-sm">关联</button>
                                <button onClick={() => setIsAddingCodeReview(false)} className="px-3 py-1.5 text-slate-500 hover:text-slate-700 text-sm">取消</button>
                            </div>
                        )}

                        {/* List */}
                        <div className="space-y-1">
                            {linkedCodeReviews.map(pr => (
                                <div key={pr.id} className="flex items-center justify-between py-3 px-2 hover:bg-slate-50 rounded group border-b border-slate-50">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                         <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">!1</div>
                                         <span className="text-sm text-slate-700 font-medium truncate">{pr.title}</span>
                                         <span className="text-red-500 border border-red-200 bg-red-50 px-1 py-0.5 rounded text-[10px] font-bold">{pr.priority}</span>
                                    </div>
                                    <div className="flex items-center gap-6 flex-shrink-0">
                                        <div className="flex items-center gap-3 text-xs">
                                            <span className="flex items-center gap-1 text-slate-500">评审: <span className="bg-amber-400 text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold">Lo</span></span>
                                            <span className="flex items-center gap-1 text-slate-500">测试: <span className="bg-amber-400 text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold">Lo</span></span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                            <Circle size={12} />
                                            <span>{pr.status}</span>
                                        </div>
                                        <button onClick={() => handleRemoveCodeReview(pr.id)} className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-xs font-medium hover:bg-red-50 px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100">
                                            <Unlink size={14} /> 取消关联
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Documents Tab */}
                {activeTab === '关联文档' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-end gap-4 mb-2">
                                <button className="text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1">
                                <Unlink size={14} /> 批量取消关联
                                </button>
                                <button onClick={() => setIsAddingDocument(!isAddingDocument)} className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 font-medium">
                                <Plus size={16} /> 添加
                                </button>
                        </div>

                        {isAddingDocument && (
                            <div className="flex items-center gap-2 p-2 border border-blue-200 rounded bg-blue-50/10 mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="flex-1 relative">
                                    <select className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500 bg-white appearance-none text-slate-700">
                                        <option>【新增】需求规格说明书 v1.2</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                                <button onClick={handleAddDocument} className="px-4 py-1.5 bg-emerald-500 text-white rounded text-sm font-bold hover:bg-emerald-600 shadow-sm">关联</button>
                                <button onClick={() => setIsAddingDocument(false)} className="px-3 py-1.5 text-slate-500 hover:text-slate-700 text-sm">取消</button>
                            </div>
                        )}

                        <div className="space-y-1">
                            {linkedDocuments.map(doc => (
                                <div key={doc.id} className="flex items-center justify-between py-3 px-2 hover:bg-slate-50 rounded group border-b border-slate-50">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                <FileText size={16} />
                                            </div>
                                            <div className="flex flex-col gap-0.5 min-w-0">
                                                <span className="text-sm text-slate-700 font-medium truncate">{doc.title}</span>
                                                <span className="text-xs text-slate-400">{doc.size} • {doc.date}</span>
                                            </div>
                                    </div>
                                    <div className="flex items-center gap-6 flex-shrink-0">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold">{doc.creator.charAt(0).toUpperCase()}</div>
                                            <span className="text-xs text-slate-600">{doc.creator}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded bg-slate-50 uppercase w-12 text-center">{doc.type}</span>
                                        <button onClick={() => handleRemoveDocument(doc.id)} className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-xs font-medium hover:bg-red-50 px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100">
                                            <Unlink size={14} /> 取消关联
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

               {/* Attachments Tab - High Fidelity Implementation */}
               {activeTab === '附件' && (
                   <div className="space-y-4 animate-in fade-in duration-300">
                       <div className="flex items-center justify-between mb-2">
                           <span className="text-sm font-bold text-slate-500">共 {attachments.length} 项</span>
                           <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 font-medium">
                               <Plus size={16} /> 添加
                           </button>
                       </div>
                       
                       <div className="space-y-1">
                           {attachments.map(file => (
                               <div key={file.id} className="flex items-center justify-between py-3 px-2 hover:bg-slate-50 rounded group border-b border-slate-50">
                                   <div className="flex items-center gap-3 flex-1 min-w-0">
                                       <div className="text-slate-400"><Paperclip size={16} /></div>
                                       <span className="text-sm text-slate-700 font-medium truncate">{file.name}</span>
                                       <span className="text-xs text-slate-400 font-mono">({file.size})</span>
                                       <span className="text-xs text-slate-400">{file.time}</span>
                                   </div>
                                   <div className="flex items-center gap-4 flex-shrink-0">
                                       <div className="flex items-center gap-2">
                                           <span className="text-sm text-slate-600">{file.uploader}</span>
                                           <div className={`w-6 h-6 rounded-full ${file.uploaderAvatar} text-white flex items-center justify-center text-[10px] font-bold shadow-sm`}>Lo</div>
                                       </div>
                                       <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                                           <MoreHorizontal size={16} />
                                       </button>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>
               )}

               {/* Requirement Versions Tab - High Fidelity Implementation */}
               {activeTab === '需求版本' && (
                   <div className="space-y-4 animate-in fade-in duration-300">
                       <div className="flex items-center justify-between mb-2">
                           <span className="text-sm font-bold text-slate-500">共 {reqVersions.length} 项</span>
                           <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 font-medium">
                               <Plus size={16} /> 创建需求版本
                           </button>
                       </div>

                       <div className="space-y-1">
                           {reqVersions.map(ver => (
                               <div key={ver.id} className="flex items-center justify-between py-3 px-2 hover:bg-slate-50 rounded group border-b border-slate-50">
                                   <div className="flex items-center gap-8 flex-1 min-w-0">
                                       <span className="text-sm text-slate-700 font-medium w-16">{ver.version}</span>
                                       <span className="text-sm text-slate-400 w-32">{ver.remark}</span>
                                       <span className="px-2 py-0.5 bg-green-50 text-green-600 border border-green-200 text-xs rounded">{ver.status}</span>
                                       <div className="flex items-center gap-2">
                                           <div className={`w-6 h-6 rounded-full ${ver.avatar} text-white flex items-center justify-center text-[10px] font-bold shadow-sm`}>Lo</div>
                                           <span className="text-sm text-slate-600">{ver.editor}</span>
                                       </div>
                                       <span className="text-sm text-slate-500 font-mono">{ver.date}</span>
                                   </div>
                                   <div className="flex items-center gap-4 flex-shrink-0">
                                       <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">查看</button>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>
               )}

               {/* Work Hours Tab - High Fidelity Implementation */}
               {activeTab === '工时' && (
                   <div className="space-y-8 animate-in fade-in duration-300">
                       {/* Statistics Row */}
                       <div className="flex items-start justify-between px-2">
                           <div className="space-y-2">
                               <div className="text-xs font-bold text-slate-500">预估工时</div>
                               <div className="flex items-end gap-2 group cursor-pointer">
                                   <span className="text-3xl font-black text-slate-800 leading-none">0</span>
                                   <span className="text-xs font-bold text-slate-400 mb-1">小时</span>
                                   <Edit3 size={14} className="text-slate-300 group-hover:text-blue-500 mb-1 transition-colors" />
                               </div>
                           </div>
                           
                           <div className="w-px h-10 bg-slate-100 mx-4"></div>

                           <div className="space-y-2">
                               <div className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                   已登记 <Diamond size={12} className="text-amber-400 fill-amber-400" />
                               </div>
                               <div className="flex items-end gap-2">
                                   <span className="text-3xl font-black text-slate-800 leading-none">15</span>
                                   <span className="text-xs font-bold text-slate-400 mb-1">小时</span>
                               </div>
                           </div>

                           <div className="w-px h-10 bg-slate-100 mx-4"></div>

                           <div className="space-y-2">
                               <div className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                   剩余 <Diamond size={12} className="text-amber-400 fill-amber-400" />
                               </div>
                               <div className="flex items-end gap-2">
                                   <span className="text-3xl font-black text-slate-800 leading-none">0</span>
                                   <span className="text-xs font-bold text-slate-400 mb-1">小时</span>
                               </div>
                           </div>

                           <div className="w-px h-10 bg-slate-100 mx-4"></div>

                           <div className="flex-1 space-y-2 max-w-xs">
                               <div className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                   工作项进度 <Diamond size={12} className="text-amber-400 fill-amber-400" />
                               </div>
                               <div className="flex items-center gap-3">
                                   <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                       <div className="h-full bg-slate-300" style={{ width: '0%' }}></div>
                                   </div>
                                   <span className="text-sm font-bold text-slate-400">0%</span>
                               </div>
                           </div>
                       </div>

                       {/* Work Logs List */}
                       <div className="border border-slate-200 rounded-lg overflow-hidden">
                           <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
                               <span className="text-xs font-bold text-slate-500">共登记 {workLogs.length} 次</span>
                               <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded shadow-sm shadow-emerald-100 transition-all active:scale-95">
                                   登记工时
                               </button>
                           </div>
                           <div className="divide-y divide-slate-100 bg-white">
                               {workLogs.map(log => (
                                   <div key={log.id} className="p-4 flex items-start gap-4 group hover:bg-slate-50/50 transition-colors">
                                       <div className={`w-10 h-10 rounded-full ${log.avatarColor} text-white flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0`}>
                                           {log.name.substring(0, 2)}
                                       </div>
                                       <div className="flex-1 min-w-0 pt-0.5">
                                           <div className="flex items-center gap-2 mb-1">
                                               <span className="text-sm font-bold text-slate-700">{log.name}</span>
                                               <span className="text-xs font-mono text-slate-400">{log.date}</span>
                                               <span className="text-xs text-slate-500">登记了 <span className="font-bold text-slate-900">{log.hours} 小时</span></span>
                                           </div>
                                           <div className="text-sm text-slate-600 truncate">{log.desc}</div>
                                       </div>
                                       <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity self-center">
                                           <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
                                               <Edit3 size={14} /> 编辑
                                           </button>
                                           <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                                               <Trash2 size={14} /> 删除
                                           </button>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       </div>
                   </div>
               )}

               {/* Comments and Activity Section */}
               <div className="mt-12 pt-8 border-t border-slate-100">
                   <div className="flex gap-6 mb-6">
                       <button className="text-sm font-bold text-slate-500 hover:text-slate-700 pb-1">评论 <span className="bg-slate-100 px-1.5 rounded-full text-xs text-slate-500 ml-1">1</span></button>
                       <button className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 pb-1">操作日志 <span className="bg-slate-100 px-1.5 rounded-full text-xs text-slate-500 ml-1">6</span></button>
                   </div>
                   
                   <div className="space-y-6 mb-8">
                        {historyLogs.map((log, idx) => (
                            <div key={idx} className="flex gap-3 text-sm group">
                                <div className="mt-0.5 text-slate-300 group-hover:text-blue-500 transition-colors"><log.icon size={16} /></div>
                                <div className="flex-1">
                                    <div className="text-slate-600">
                                        <span className="font-bold text-slate-800 mr-1">{log.user}</span>
                                        <span className="mr-1">{log.action}</span>
                                        <span className="font-medium text-slate-800">{log.target}</span>
                                    </div>
                                    <div className="text-xs text-slate-400 mt-0.5">{log.time}</div>
                                </div>
                            </div>
                        ))}
                   </div>

                   <div className="flex gap-3 items-start sticky bottom-0 bg-white pt-2 pb-4">
                       <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">Lo</div>
                       <div className="flex-1 border border-slate-200 rounded p-2 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-50 transition-all">
                           <textarea className="w-full text-sm outline-none resize-none h-16 placeholder:text-slate-400" placeholder="发表您的看法 (Ctrl/Command+Enter发送)"></textarea>
                       </div>
                   </div>
               </div>
           </div>

           {/* Right Sidebar */}
           <div className="w-[300px] bg-white p-6 space-y-8 flex-shrink-0 overflow-y-auto border-l border-slate-100">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-slate-500 block mb-1">优先级</label>
                        <div className="inline-flex items-center gap-1 border border-rose-200 bg-rose-50 text-rose-600 px-2 py-0.5 rounded text-xs font-medium">
                            紧急
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-500 block mb-1">标签</label>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm shadow-blue-200">
                                新手引导 <XCircle size={12} className="cursor-pointer hover:text-blue-200"/>
                            </span>
                            <button className="text-blue-600 text-sm hover:underline flex items-center gap-1 font-bold"><Plus size={12}/> </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-500 block mb-1">实际开始时间</label>
                        <div className="text-sm text-slate-300 flex items-center justify-between cursor-pointer hover:text-slate-500 group font-medium">
                            选择日期 <Calendar size={14} className="text-slate-300 group-hover:text-slate-500"/>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-500 block mb-1">实际结束时间</label>
                        <div className="text-sm text-slate-300 flex items-center justify-between cursor-pointer hover:text-slate-500 group font-medium">
                            选择日期 <Calendar size={14} className="text-slate-300 group-hover:text-slate-500"/>
                        </div>
                    </div>
                </div>
           </div>
        </div>
      </div>

      {/* Relate Test Case Modal */}
      <RelateTestCaseModal 
        isOpen={isRelateModalOpen}
        onClose={() => setIsRelateModalOpen(false)}
        onAdd={handleAddTestCases}
      />
    </div>
  );
};

// ------------------- Kanban Board Core -------------------

interface KanbanBoardProps {
    columns: Column[];
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
    onTaskClick: (task: Task) => void;
    onAddClick: (typeOrStatus: TaskType | string) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
  columns, setColumns, onTaskClick, onAddClick
}) => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
        const columnIndex = columns.findIndex(c => c.id === source.droppableId);
        const column = columns[columnIndex];
        const newTasks = Array.from(column.tasks);
        const [movedTask] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, movedTask);
        const newColumns = [...columns];
        newColumns[columnIndex] = { ...column, tasks: newTasks };
        setColumns(newColumns);
    } else {
        const sourceColIndex = columns.findIndex(c => c.id === source.droppableId);
        const destColIndex = columns.findIndex(c => c.id === destination.droppableId);
        const sourceCol = columns[sourceColIndex];
        const destCol = columns[destColIndex];
        if (!sourceCol || !destCol) return;
        const sourceTasks = Array.from(sourceCol.tasks);
        const destTasks = Array.from(destCol.tasks);
        const movedTask = sourceTasks.splice(source.index, 1)[0] as Task | undefined;
        if (!movedTask) return;
        let newStatusColor = movedTask.statusColor;
        if (destCol.id === 'done') newStatusColor = 'bg-green-500';
        else if (destCol.id === 'inprogress') newStatusColor = 'bg-blue-600';
        else if (destCol.id === 'todo') newStatusColor = 'bg-gray-400';
        destTasks.splice(destination.index, 0, { ...movedTask, statusColor: newStatusColor });
        const newColumns = [...columns];
        newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks, count: sourceTasks.length };
        newColumns[destColIndex] = { ...destCol, tasks: destTasks, count: destTasks.length };
        setColumns(newColumns);
    }
  };
  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden bg-slate-50/50">
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-full p-6 gap-6 min-w-max">
                {columns.map(col => (
                    <div key={col.id} className="w-80 flex flex-col h-full bg-slate-100/50 rounded-xl border border-slate-200/60 backdrop-blur-sm">
                        <div className="p-4 flex items-center justify-between flex-shrink-0"><div className="flex items-center gap-2"><Circle size={10} className={col.iconColor} fill="currentColor" /><span className="font-bold text-slate-700 text-sm">{col.title}</span><span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{col.tasks.length}</span></div><div className="flex gap-1"><button onClick={() => onAddClick(TaskType.Task)} className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors"><Plus size={14}/></button><button className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors"><MoreHorizontal size={14}/></button></div></div>
                        <Droppable droppableId={col.id}>{(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className={`flex-1 overflow-y-auto px-3 pb-3 custom-scrollbar transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50/30' : ''}`}>
                                    {col.tasks.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>{(provided, snapshot) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ ...provided.draggableProps.style }} className={`${snapshot.isDragging ? 'rotate-2 scale-105 z-50' : ''}`}><KanbanCard task={task} onClick={(t) => onTaskClick(t)} onUpdate={() => {}} /></div>
                                            )}</Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <button onClick={() => onAddClick(TaskType.Task)} className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-blue-500 hover:border-blue-200 hover:bg-white transition-all flex items-center justify-center gap-1.5 text-xs font-bold mt-2"><Plus size={14} /> 添加工作项</button>
                                </div>
                            )}</Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    </div>
  );
};
