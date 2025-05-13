export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoContextType {
  todos: Todo[];
  filter: FilterType;
  searchQuery: string;
  addTodo: (text: string, dueDate?: Date) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string, dueDate?: Date) => void;
  setFilter: (filter: FilterType) => void;
  setSearchQuery: (query: string) => void;
  reorderTodos: (startIndex: number, endIndex: number) => void;
  clearCompleted: () => void;
}