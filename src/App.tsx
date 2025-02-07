import "./App.css";

import { TodoList } from "./features/TodoList";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchTodos } from "./models/todos";
import { useEffect } from "react";
import { TodoAddTask } from "./features/TodoAddTask";

function App() {
  const items = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();
  const completedTasks = items.filter((item) => item.completed);
  const noCompletedTasks = items.filter((item) => !item.completed);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <>
      <h1>TODO APP</h1>
      <TodoAddTask />
      <h2>Task list</h2>
      {Boolean(noCompletedTasks.length) && (
        <>
          <h3>No completed</h3>
          <TodoList items={noCompletedTasks} />
        </>
      )}
      {Boolean(completedTasks.length) && (
        <>
          <h3>Completed:</h3>
          <TodoList items={completedTasks} />
        </>
      )}
    </>
  );
}

export default App;
