"use client";
import React, { createContext, ReactNode, useReducer } from "react";
import { ActionType, StateType } from "@/lib/types";

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "ADD_TODO":

    case "REMOVE_TODO":

    default:
  }
}

const TodoContext = createContext<
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
