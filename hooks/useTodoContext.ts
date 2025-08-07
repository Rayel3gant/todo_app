import { TodoContext } from "@/services/context/TodoContext";
import { useContext } from "react";

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
