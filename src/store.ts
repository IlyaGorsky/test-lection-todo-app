import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './models/todos';
import { useDispatch, useSelector } from 'react-redux';

// Тип для состояния хранилища
export type RootState = ReturnType<typeof store.getState>;

// Тип для диспетчера
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;