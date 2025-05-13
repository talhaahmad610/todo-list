import React, { useState, useRef, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import { Plus, Calendar } from 'lucide-react';

const TodoForm: React.FC = () => {
  const { addTodo } = useTodo();
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim()) {
      addTodo(
        text.trim(), 
        dueDate ? new Date(dueDate) : undefined
      );
      setText('');
      setDueDate(undefined);
      setShowDatePicker(false);
      
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-300 focus-within:border-indigo-300 focus-within:shadow-md"
    >
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base"
        />
        <button
          type="button"
          onClick={toggleDatePicker}
          className={`p-2 mr-2 rounded-full transition-colors ${
            showDatePicker 
              ? 'text-indigo-600 bg-indigo-50' 
              : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
          }`}
          aria-label="Set due date"
        >
          <Calendar className="h-5 w-5" />
        </button>
        <button
          type="submit"
          disabled={!text.trim()}
          className={`flex items-center justify-center p-2 rounded-full transition-all ${
            text.trim()
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Add task"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      
      {showDatePicker && (
        <div className="mt-3 flex items-center">
          <label className="text-sm text-gray-500 mr-2">Due date:</label>
          <input
            type="date"
            value={dueDate || ''}
            onChange={(e) => setDueDate(e.target.value || undefined)}
            min={new Date().toISOString().split('T')[0]}
            className="border border-gray-300 rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}
    </form>
  );
};

export default TodoForm;