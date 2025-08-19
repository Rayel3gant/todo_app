"use client";
import { TodoForm } from "@/components/todos/TodoForm";
import { useUser } from "@/lib/context/userContext";
import React from "react";

const Todos = () => {
  const { userId } = useUser();
  return (
    <div className="w-11/12 lg:w-3/4 mx-auto mt-6 lg:mt-16">
      <TodoForm userId={userId ?? ""} />
    </div>
  );
};

export default Todos;
