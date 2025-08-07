"use client";
import Navbar from "@/components/Navbar";
import TodoList from "@/components/TodoList";
import { useTodoContext } from "@/hooks/useTodoContext";
import React, { useState } from "react";

const Page = () => {
  const { dispatch } = useTodoContext();
  const [title, setTitle] = useState<string>("");
  const createTodoHandler = () => {
    if (title.length) {
      dispatch({
        type: "ADD_TODO",
        payload: {
          text: title,
          completed: false,
          id: Date.now(),
        },
      });
      setTitle("");
    }
  };
  return (
    <div className="w-full">
      <Navbar />
      <div className="mt-4 w-11/12 mx-auto ">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-xs lg:text-sm text-gray-500">
            Task Title:
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-1 py-3 px-4 outline-none rounded-md w-3/4 max-w-[500px]"
            placeholder="Task to do"
          />
        </div>
        <button
          onClick={createTodoHandler}
          className="px-3 py-1 mt-6 rounded-sm text-white bg-black cursor-pointer "
        >
          Create
        </button>
      </div>

      <TodoList />
    </div>
  );
};

export default Page;
