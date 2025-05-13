import { Todo } from '../types';

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string; dueDate?: Date } }
  | { type: 'REORDER_TODOS'; payload: { startIndex: number; endIndex: number } }
  | { type: 'CLEAR_COMPLETED' };

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [action.payload, ...state];

    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload.id);

    case 'EDIT_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              text: action.payload.text,
              dueDate: action.payload.dueDate
            }
          : todo
      );

    case 'REORDER_TODOS':
      const result = Array.from(state);
      const [removed] = result.splice(action.payload.startIndex, 1);
      result.splice(action.payload.endIndex, 0, removed);
      return result;

    case 'CLEAR_COMPLETED':
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
};