import { useTodoContext } from "@/hooks/useTodoContext";
import { TodoType } from "@/lib/types";
import React from "react";

const TodoList = () => {
  const { state, dispatch } = useTodoContext();
  const deleteTodoHandler = (id: number) => {
    dispatch({
      type: "REMOVE_TODO",
      id,
    });
  };

  const updateTodoStatus = (todo: TodoType) => {
    dispatch({
      type: "UPDATE_TODO_STATUS",
      payload: {
        id: todo.id,
        completed: !todo.completed,
        text: todo.text,
      },
    });
  };

  return (
    <div className="w-11/12 mx-auto mt-6 ">
      {state.todos.length === 0 ? (
        <div>No todos created</div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 lg:gap-y-8">
          {state.todos.map((todo) => (
            <div
              key={todo.id}
              className=" w-11/12 mx-auto border-1 border-gray-600 py-4 px-2 rounded-sm"
            >
              <div className="flex w-full justify-between">
                <p>{todo.text}</p>
                <p>
                  {todo.completed ? (
                    <span className="text-green-500">Completed</span>
                  ) : (
                    <span className="text-red-500">To Do</span>
                  )}
                </p>
              </div>

              <div className="flex gap-x-4 ">
                <button onClick={() => deleteTodoHandler(todo.id)} className="">
                  Delete
                </button>

                <button
                  className="cursor-pointer "
                  onClick={() => updateTodoStatus(todo)}
                >
                  {todo.completed ? "mark as incomplete" : "Mark as done"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
