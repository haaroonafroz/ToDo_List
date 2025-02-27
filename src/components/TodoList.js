// src/components/TodoList.js
import React, { useState, useCallback } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  
  // Use a custom sensor with higher activation constraints to prevent drag conflicts
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Only start dragging after moving 8px
      },
    })
  );

  // Use useCallback to ensure function identity remains stable
  const addTodo = useCallback((text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    console.log('Added new todo:', newTodo);
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
      <AddTodoForm addTodo={addTodo} />
      
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
                <SortableItem key={todo.id} id={todo.id}>
                  <TodoItem
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                  />
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <p className="empty-message">No todos yet. Add one above!</p>
      )}
    </div>
  );
};

export default TodoList;