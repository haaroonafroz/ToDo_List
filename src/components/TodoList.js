// src/components/TodoList.js
import React, { useState, useCallback } from 'react';
import TodoItem from './TodoItem';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const addEmptyTodo = useCallback(() => {
    const newTodo = { 
      id: Date.now(), 
      text: "", 
      completed: false,
      isEditing: true // Start in editing mode
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    console.log('Added new empty todo:', newTodo);
  }, []);

  const updateTodoText = useCallback((id, newText) => {
    console.log('Updating text for todo id:', id, 'new text:', newText);
    setTodos(prevTodos => 
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }, []);

  const toggleEditing = useCallback((id, isEditing) => {
    console.log('Toggling editing mode for todo id:', id, 'isEditing:', isEditing);
    setTodos(prevTodos => 
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing } : todo
      )
    );
  }, []);

  const toggleComplete = useCallback((id) => {
    console.log('Toggling complete for todo id:', id);
    setTodos(prevTodos => 
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    console.log('Deleting todo with id:', id);
    setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    
    if (!over) return;
    
    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        if (oldIndex === -1 || newIndex === -1) return items;
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      
      <div className="todo-list-container">
        {todos.length > 0 ? (
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter} 
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={todos.map(todo => todo.id)} 
              strategy={verticalListSortingStrategy}
            >
              <div className="todo-list">
                {todos.map((todo) => (
                  <SortableItem key={todo.id} id={todo.id} disabled={todo.isEditing}>
                    <TodoItem
                      todo={todo}
                      toggleComplete={toggleComplete}
                      deleteTodo={deleteTodo}
                      updateTodoText={updateTodoText}
                      toggleEditing={toggleEditing}
                    />
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <p className="empty-message">No todos yet. Add one below!</p>
        )}
        
        <button 
          className="add-todo-button" 
          onClick={addEmptyTodo}
          aria-label="Add new todo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoList;