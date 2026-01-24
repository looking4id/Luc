
import React, { useState } from 'react';
import { MOCK_COLUMNS } from '../../../utils/constants';
import { KanbanBoard } from '../kanban/KanbanBoard';
import { Task, TaskType, Column } from '../../../types';

export const IterationKanban = ({ sprintId }: { sprintId: string }) => {
    // Local state for the kanban board to support dragging
    const [columns, setColumns] = useState<Column[]>(MOCK_COLUMNS);

    const handleTaskClick = (task: Task) => {
        console.log('Task clicked:', task);
        // In a real app, this would open the drawer or modal details
        // For now, we can just log it, or if you have a way to open details from here
    };

    const handleAddClick = (typeOrStatus: TaskType | string) => {
         console.log('Add task:', typeOrStatus);
         // This would trigger the creation modal
    };

    return (
        <div className="h-full flex flex-col bg-white">
            <KanbanBoard 
                columns={columns} 
                setColumns={setColumns}
                onTaskClick={handleTaskClick}
                onAddClick={handleAddClick}
            />
        </div>
    );
};
