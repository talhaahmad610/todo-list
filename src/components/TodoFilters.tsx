import React from 'react';
import { useTodo } from '../context/TodoContext';
import { FilterType } from '../types';
import { Search, X } from 'lucide-react';

const TodoFilters: React.FC = () => {
  const { 
    todos, 
    filter, 
    searchQuery, 
    setFilter, 
    setSearchQuery,
    clearCompleted 
  } = useTodo();
  
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' }
  ];

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                filter === f.value
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f.label}{' '}
              {f.value === 'all' && todos.length > 0 && <span>({todos.length})</span>}
              {f.value === 'active' && activeCount > 0 && <span>({activeCount})</span>}
              {f.value === 'completed' && completedCount > 0 && <span>({completedCount})</span>}
            </button>
          ))}
        </div>
        
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoFilters;