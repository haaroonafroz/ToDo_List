// src/components/SortableItem.js
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = (props) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition,
    isDragging 
  } = useSortable({ 
    id: props.id,
    disabled: false // Ensure dragging is enabled
  });
  
  // Only apply the drag handle to the outer area but not to child inputs/buttons
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
      className="sortable-item"
    >
      {props.children}
    </div>
  );
};