import { TodoContext } from "@/services/context/TodoContext";
import { useContext } from "react";

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  return context;
};
