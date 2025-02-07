import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Тип для задачи
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Тип для состояния
interface TodosState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Начальное состояние
const initialState: TodosState = {
  todos: [],
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk<Todo[]>('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  const data = await response.json();
  console.log('Todos fetched:', data);
  return data;
});

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (text: string) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: text,
      completed: false,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  const data = await response.json();
  return data;
});

export const toggleTodoAsync = createAsyncThunk<Todo, Todo>('todos/toggleTodoAsync', async (todo) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...todo,
      completed: !todo.completed,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  const data = await response.json();
  return data;
});

export const deleteTodoAsync = createAsyncThunk<number, Todo['id']>('todos/deleteTodoAsync', async (id: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload.map((todo) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
        }));
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(addTodoAsync.pending, (state) => { 
        state.status = 'loading';
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos.push({
          id: action.payload.id,
          title: action.payload.title,
          completed: action.payload.completed,
        });
      })
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.completed = action.payload.completed;
        }
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;