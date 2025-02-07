import { deleteTodoAsync, Todo, toggleTodoAsync } from "../models/todos";
import { useAppDispatch } from "../store";

export const TodoItem = (props: Todo) => {
  const dispatch = useAppDispatch();
  const handleToggle = () => {
    dispatch(toggleTodoAsync(props));
  };
  const handleDelete = async () => {
    const res = await dispatch(deleteTodoAsync(props.id));
    console.log("res", res);
  };

  return (
    <li>
      <h4 onClick={handleToggle}>
        {props.completed && `✅ `}
        {props.title}
        <span style={{ margin: "0 4px" }} onClick={handleDelete}>
          ␡
        </span>
      </h4>
    </li>
  );
};
