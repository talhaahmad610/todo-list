import React from 'react';
import { CheckSquare } from 'lucide-react';

const TodoHeader: React.FC = () => {
  return (
    <header className="pt-8 sm:pt-12 pb-4">
      <div className="flex items-center justify-center">
        <CheckSquare className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 ml-2">
          TodoFlow
        </h1>
      </div>
      <p className="text-center text-gray-500 mt-2 text-sm sm:text-base">
        Organize your tasks, simplify your life
      </p>
    </header>
  );
};

export default TodoHeader;