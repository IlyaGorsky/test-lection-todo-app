
import { Provider } from "react-redux";

import store from "../store";
import { fireEvent, render } from "@testing-library/react";
import { TodoAddTask } from "./TodoAddTask";
import * as mockModel from "../models/todos";

describe("feateures/TodoAddTask", () => {
  test("Компоеннт успешно рендерится", () => {
    // arrange
    const result = render(
      <Provider store={store}>
        <TodoAddTask />
      </Provider>
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(result.getByText("Add task")).toBeInTheDocument();
  });

  test("Компоеннт успешно создает задание", () => {
    // arrange
    const spyOnDispatch = jest.spyOn(mockModel, "addTodoAsync");
    const expectedInputValue = "New task";
    const result = render(
      <Provider store={store}>
        <TodoAddTask />
      </Provider>
    );

    // act
    const input = result.getByTestId("input") as HTMLInputElement;
    const submitButton = result.getByTestId("submit");
    fireEvent.change(input, { target: { value: expectedInputValue } });
    result.rerender(
      <Provider store={store}>
        <TodoAddTask />
      </Provider>
    );
    fireEvent.click(submitButton);

    // assert
    expect(input.value).toBe(expectedInputValue);
    expect(spyOnDispatch).not.toHaveBeenCalledWith(expectedInputValue);
  });
});
