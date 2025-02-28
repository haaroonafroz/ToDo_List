// src/components/TodoItem.js
import React, { useRef, useEffect } from 'react';
import deleteIcon from '../icons/delete.png';

const TodoItem = ({ todo, toggleComplete, deleteTodo, updateTodoText, toggleEditing }) => {
  const inputRef = useRef(null);
  
  // Auto-focus the input when entering edit mode
  useEffect(() => {
    if (todo.isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [todo.isEditing]);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Delete button clicked for todo id:', todo.id);
    deleteTodo(todo.id);
    return false;
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    console.log('Checkbox toggled for todo id:', todo.id);
    toggleComplete(todo.id);
  };

  const handleTextClick = (e) => {
    e.stopPropagation();
    if (!todo.isEditing && !todo.completed) {
      toggleEditing(todo.id, true);
    }
  };

  const handleInputChange = (e) => {
    updateTodoText(todo.id, e.target.value);
  };

  const handleInputBlur = () => {
    // If empty text and blur, delete the todo
    if (!todo.text.trim()) {
      deleteTodo(todo.id);
    } else {
      toggleEditing(todo.id, false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!todo.text.trim()) {
        deleteTodo(todo.id);
      } else {
        toggleEditing(todo.id, false);
      }
    } else if (e.key === 'Escape') {
      // If ESC and empty, delete, otherwise just stop editing
      if (!todo.text.trim()) {
        deleteTodo(todo.id);
      } else {
        toggleEditing(todo.id, false);
      }
    }
  };

  return (
    <div 
      className={`todo-item ${todo.completed ? 'completed' : ''} ${todo.isEditing ? 'editing' : ''}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        disabled={todo.isEditing}
      />
      
      {todo.isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="todo-text-input"
          value={todo.text}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          placeholder="What needs to be done?"
        />
      ) : (
        <span 
          className={todo.completed ? 'completed-text' : ''}
          onClick={handleTextClick}
        >
          {todo.text || 'Empty todo'}
        </span>
      )}
      
      {!todo.isEditing && (
        <button 
          onClick={handleDeleteClick}
          onMouseDown={(e) => e.stopPropagation()} 
          type="button"
          className="delete-button"
          aria-label="Delete todo"
        >
          <img src={deleteIcon} alt="Delete" />
        </button>
      )}
    </div>
  );
};

export default TodoItem;