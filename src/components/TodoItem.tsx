import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';
import { formatDate } from '../utils/dateUtils';
import { Check, Trash2, Edit, Calendar, X } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, dueDate?: Date) => void;
  provided?: any;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit,
  provided 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDueDate, setEditDueDate] = useState<string | undefined>(
    todo.dueDate ? new Date(todo.dueDate.getTime() - (todo.dueDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : undefined
  );
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(
        todo.id, 
        editText.trim(), 
        editDueDate ? new Date(editDueDate) : undefined
      );
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditDueDate(
      todo.dueDate ? new Date(todo.dueDate.getTime() - (todo.dueDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : undefined
    );
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className={`group flex items-center p-3 mb-2 rounded-lg border transition-all duration-300 ${
        todo.completed
          ? 'bg-gray-50 border-gray-200'
          : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm'
      }`}
    >
      {isEditing ? (
        <div className="flex flex-col w-full space-y-2">
          <input
            ref={editInputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Edit task..."
          />
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <input
              type="date"
              value={editDueDate || ''}
              onChange={(e) => setEditDueDate(e.target.value || undefined)}
              className="text-sm border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 h-6 w-6 rounded-full border flex items-center justify-center transition-colors duration-300 mr-3 ${
              todo.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-indigo-500'
            }`}
            aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {todo.completed && <Check className="h-4 w-4" />}
          </button>

          <div className="flex-1">
            <p
              className={`text-sm sm:text-base transition-all duration-300 ${
                todo.completed
                  ? 'text-gray-400 line-through'
                  : 'text-gray-800'
              }`}
            >
              {todo.text}
            </p>
            {todo.dueDate && (
              <p className={`text-xs ${
                todo.completed 
                  ? 'text-gray-400' 
                  : new Date(todo.dueDate) < new Date() 
                    ? 'text-red-500' 
                    : 'text-gray-500'
              }`}>
                Due: {formatDate(todo.dueDate)}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handleEdit}
              className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
              aria-label="Edit task"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;