import React from 'react';
import { useTodo } from '../context/TodoContext';

const TodoFooter: React.FC = () => {
  const { todos } = useTodo();
  const completedCount = todos.filter(todo => todo.completed).length;
  const remainingCount = todos.length - completedCount;
  
  if (todos.length === 0) return null;
  
  return (
    <footer className="mt-6 text-sm text-gray-500 text-center pb-8">
      <p>
        {remainingCount === 0 
          ? 'All tasks completed! 🎉' 
          : `${remainingCount} ${remainingCount === 1 ? 'task' : 'tasks'} remaining`}
      </p>
      <p className="mt-4 text-xs text-gray-400">
        Drag and drop to reorder tasks
      </p>
    </footer>
  );
};

export default TodoFooter;