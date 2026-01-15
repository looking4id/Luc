import React, { useState } from 'react';
import { MainSidebar, SecondarySidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { FilterBar } from './components/FilterBar';
import { KanbanBoard } from './components/KanbanBoard';
import { ProjectList } from './components/ProjectList';
import { Workbench } from './components/Workbench';
import { Login } from './components/Login';
import { FilterState, ViewType, SavedView, TaskType, User } from './types';

const App = () => {
  const initialFilters: FilterState = {
    search: '',
    assigneeId: null,
    type: null,
    priority: null,
    dateRange: null,
    projectId: null,
    status: null,
    creatorId: null
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [activeMainItem, setActiveMainItem] = useState('工作台');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [viewType, setViewType] = useState<ViewType>('kanban');
  const [activeView, setActiveView] = useState('全部工作项');
  const [customViews, setCustomViews] = useState<SavedView[]>([]);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState<TaskType | null>(null);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleViewSelect = (viewName: string) => {
    setActiveView(viewName);
    let newFilters = { ...initialFilters };

    if (viewName === '全部工作项') {
    } else if (viewName === '我负责的') {
       newFilters.assigneeId = currentUser?.id || 'u1';
    } else if (viewName === '我创建的') {
       newFilters.creatorId = currentUser?.id || 'u1';
    } else if (viewName === '我参与的') {
       newFilters.assigneeId = currentUser?.id || 'u1'; 
    } else if (viewName === '父级工作项') {
       newFilters.type = TaskType.Requirement;
    } else {
       const customView = customViews.find(v => v.name === viewName);
       if (customView) {
           newFilters = { ...newFilters, ...customView.filters };
       }
    }
    setFilters(newFilters);
  };

  const handleAddCustomView = () => {
      const name = window.prompt("请输入新视图名称", `视图 ${customViews.length + 1}`);
      if (name && !customViews.some(v => v.name === name)) {
          const newView: SavedView = {
              name,
              type: 'personal',
              filters: { ...filters }
          };
          setCustomViews([...customViews, newView]);
          setActiveView(name);
      }
  };
  
  const handleTriggerCreate = (type: TaskType) => {
      setCreateModalType(type);
      setIsCreateModalOpen(true);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const renderContent = () => {
    switch (activeMainItem) {
      case '工作台':
        return <Workbench />;
      case '项目':
        return <ProjectList />;
      case '工作项':
      default:
        return (
          <div className="flex flex-1 overflow-hidden">
            <SecondarySidebar 
                activeView={activeView} 
                onViewSelect={handleViewSelect}
                customViews={customViews}
                onAddView={handleAddCustomView}
            />
            <div className="flex-1 flex flex-col overflow-hidden relative">
              <TopHeader 
                selectedType={filters.type}
                onTypeChange={(type) => {
                    setFilters(prev => ({ ...prev, type }));
                }}
              />
              <FilterBar 
                filters={filters} 
                setFilters={setFilters} 
                viewType={viewType}
                setViewType={setViewType}
                onTriggerCreate={handleTriggerCreate}
              />
              <KanbanBoard 
                filters={filters} 
                viewType={viewType}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                createModalType={createModalType}
                setCreateModalType={setCreateModalType}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <MainSidebar 
        activeItem={activeMainItem}
        onSelectItem={setActiveMainItem}
      />
      {renderContent()}
    </div>
  );
};

export default App;