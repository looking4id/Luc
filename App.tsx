
import React, { useState } from 'react';
import { MainSidebar, SecondarySidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { FilterBar } from './components/FilterBar';
import { KanbanBoard } from './components/KanbanBoard';
import { ProjectList } from './components/ProjectList';
import { Workbench } from './components/Workbench';
import { FilterState, ViewType, SavedView, TaskType } from './types';

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

  const [activeMainItem, setActiveMainItem] = useState('工作台'); // Controls the main module
  
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [viewType, setViewType] = useState<ViewType>('kanban');
  const [activeView, setActiveView] = useState('全部工作项');
  const [customViews, setCustomViews] = useState<SavedView[]>([]);
  
  // Modal State lifted from KanbanBoard
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState<TaskType | null>(null);

  // Simulate current user
  const currentUserId = 'u1'; 

  const handleViewSelect = (viewName: string) => {
    setActiveView(viewName);
    
    // Reset filters first
    let newFilters = { ...initialFilters };

    // Apply System View Logic
    if (viewName === '全部工作项') {
       // Default state (All)
    } else if (viewName === '我负责的') {
       newFilters.assigneeId = currentUserId;
    } else if (viewName === '我创建的') {
       newFilters.creatorId = currentUserId;
    } else if (viewName === '我参与的') {
       // Mock logic: Treat participation as assigned for now
       newFilters.assigneeId = currentUserId; 
    } else if (viewName === '父级工作项') {
       newFilters.type = TaskType.Requirement; // Assuming requirements are parent items
    } else {
       // Check Custom Views
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
              filters: { ...filters } // Save current filter state
          };
          setCustomViews([...customViews, newView]);
          setActiveView(name);
      }
  };
  
  const handleTriggerCreate = (type: TaskType) => {
      setCreateModalType(type);
      setIsCreateModalOpen(true);
  };

  // Render Logic based on Main Sidebar
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
            {/* Secondary Sidebar */}
            <SecondarySidebar 
                activeView={activeView} 
                onViewSelect={handleViewSelect}
                customViews={customViews}
                onAddView={handleAddCustomView}
            />
            
            {/* Main Work Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {/* Top Header */}
              <TopHeader 
                selectedType={filters.type}
                onTypeChange={(type) => {
                    setFilters(prev => ({ ...prev, type }));
                }}
              />
              
              {/* Toolbar/Filters */}
              <FilterBar 
                filters={filters} 
                setFilters={setFilters} 
                viewType={viewType}
                setViewType={setViewType}
                onTriggerCreate={handleTriggerCreate}
              />
              
              {/* Kanban Board / List View */}
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
      {/* Primary Sidebar */}
      <MainSidebar 
        activeItem={activeMainItem}
        onSelectItem={setActiveMainItem}
      />
      
      {/* App Content Switcher */}
      {renderContent()}
    </div>
  );
};

export default App;
