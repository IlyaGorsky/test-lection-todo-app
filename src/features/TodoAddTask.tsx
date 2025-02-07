import { FormEventHandler, useState } from "react";
import { useAppDispatch } from "../store";
import { addTodoAsync } from "../models/todos";

export const TodoAddTask = () => {
  const dispatch = useAppDispatch();
  const [task, setTask] = useState("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(addTodoAsync(task));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  return (
    <>
      <h2>Add task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} data-testid="input" value={task} placeholder="New task" />
        <input type="submit" value="add" data-testid="submit" disabled={task.length === 0} />
      </form>
    </>
  );
};
