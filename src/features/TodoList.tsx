import { Todo } from "../models/todos";
import { TodoItem } from "./TodoItem";

interface Props {
    items: Todo[];
}
export const TodoList = (props: Props) => {
    return (
        <ul>
            {props.items.map((item) => <TodoItem key={item.id} {...item} />)}
        </ul>
    )   
}