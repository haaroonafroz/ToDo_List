// src/components/SortableItem.js
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = ({ id, disabled, children }) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition,
    isDragging 
  } = useSortable({ 
    id: id,
    disabled: disabled // Disable dragging during editing
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    margin: '8px 0',
    zIndex: isDragging ? 1000 : 1,
    boxShadow: isDragging ? '0 0 10px rgba(0,0,0,0.3)' : 'none',
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={`sortable-item ${disabled ? 'drag-disabled' : ''}`}
    >
      {children}
    </div>
  );
};