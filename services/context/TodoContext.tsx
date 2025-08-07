"use client";
import React, { createContext, ReactNode, useReducer } from "react";
import { ActionType, StateType } from "@/lib/types";

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "ADD_TODO": {
      return {
        todos: [...state.todos, action.payload],
      };
    }

    case "REMOVE_TODO": {
      const filteredTodos = state.todos.filter((todo) => todo.id !== action.id);
      return {
        todos: filteredTodos,
      };
    }

    case "UPDATE_TODO_STATUS": {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: action.payload.completed }
          : todo
      );
      return {
        todos: updatedTodos,
      };
    }

    default:
      return state;
  }
}

export const TodoContext = createContext<
  | {
      state: StateType;
      dispatch: React.Dispatch<ActionType>;
    }
  | undefined
>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { todos: [] });
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
