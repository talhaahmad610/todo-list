import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList: React.FC = () => {
  const { 
    todos, 
    filter, 
    searchQuery,
    toggleTodo, 
    deleteTodo, 
    editTodo,
    reorderTodos
  } = useTodo();
  
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Filter todos based on current filter and search query
    let result = [...todos];
    
    if (filter === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      result = result.filter(todo => todo.completed);
    }
    
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(todo => 
        todo.text.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    setFilteredTodos(result);
  }, [todos, filter, searchQuery]);

  const handleDragEnd = (result: any) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }
    
    if (result.destination.index === result.source.index) {
      return;
    }
    
    reorderTodos(result.source.index, result.destination.index);
  };

  if (filteredTodos.length === 0) {
    return (
      <div className="mt-8 text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">
          {searchQuery 
            ? 'No tasks match your search' 
            : filter === 'active' 
              ? 'No active tasks' 
              : filter === 'completed' 
                ? 'No completed tasks' 
                : 'No tasks yet'}
        </p>
        {(searchQuery || filter !== 'all') && (
          <p className="text-sm text-gray-400 mt-2">
            Try changing your filter or search term
          </p>
        )}
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todoList">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="mt-4"
          >
            {filteredTodos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided) => (
                  <TodoItem
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                    provided={provided}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;