import React from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoHeader from './components/TodoHeader';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import TodoFooter from './components/TodoFooter';

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-2xl mx-auto p-4 sm:p-6">
          <TodoHeader />
          <div className="mt-8">
            <TodoForm />
            <TodoFilters />
            <TodoList />
            <TodoFooter />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;