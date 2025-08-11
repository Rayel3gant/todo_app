import { TodoContext } from "@/services/context/TodoContext";
import { useContext } from "react";

export function useAppDispatch() {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("useAppDispatch must be used within StateProvider");
  return context.dispatch;
}
