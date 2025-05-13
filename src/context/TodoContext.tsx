import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { Todo, TodoContextType, FilterType } from '../types';
import { todoReducer } from './todoReducer';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  // Load todos from localStorage
  const loadTodos = (): Todo[] => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        // Parse stored todos and convert string dates back to Date objects
        return JSON.parse(storedTodos, (key, value) => {
          if (key === 'createdAt' || key === 'dueDate') {
            return value ? new Date(value) : null;
          }
          return value;
        });
      } catch (error) {
        console.error('Failed to parse todos from localStorage:', error);
      }
    }
    return [];
  };

  const [todos, dispatch] = useReducer(todoReducer, loadTodos());
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, dueDate?: Date) => {
    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date(),
        dueDate
      }
    });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  };

  const editTodo = (id: string, text: string, dueDate?: Date) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, text, dueDate } });
  };

  const reorderTodos = (startIndex: number, endIndex: number) => {
    dispatch({ type: 'REORDER_TODOS', payload: { startIndex, endIndex } });
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const value: TodoContextType = {
    todos,
    filter,
    searchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    setSearchQuery,
    reorderTodos,
    clearCompleted
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};