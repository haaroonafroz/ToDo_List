// src/components/TodoItem.js
import React from 'react';
import deleteIcon from '../icons/delete.png';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  // Force event handlers to be direct and stop all propagation
  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Delete button clicked for todo id:', todo.id);
    deleteTodo(todo.id);
    return false; // Additional measure to prevent event bubbling
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    console.log('Checkbox toggled for todo id:', todo.id);
    toggleComplete(todo.id);
  };

  return (
    <div 
      className="todo-item" 
      style={{ 
        textDecoration: todo.completed ? 'line-through' : 'none',
        backgroundColor: todo.completed ? '#f0f0f0' : '#f9f9f9'
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />
      <span className={todo.completed ? 'completed-text' : ''}>
        {todo.text}
      </span>
      <button 
        onClick={handleDeleteClick}
        onMouseDown={(e) => e.stopPropagation()} 
        type="button"
        className="delete-button"
      >
        <img src={deleteIcon} alt="Delete" />
      </button>
    </div>
  );
};

export default TodoItem;