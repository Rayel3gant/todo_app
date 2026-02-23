"use client";
import { deleteTodoAction, updateTodoAction } from "@/actions/todos";
import { TodoForm } from "@/components/todos/TodoForm";
import { useGetTodos } from "@/hooks/useGetTodos";
import { useUser } from "@/lib/context/userContext";
import { TodoResponse } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import React from "react";

const Todos = () => {
  const { userId } = useUser();
  const {
    data: userTodos,
    isLoading,
    isFetching,
    refetch,
  } = useGetTodos(userId!);

  const deleteHandler = async (todoId: string) => {
    if (!userId) {
      return;
    }
    const res = await deleteTodoAction(userId, todoId);
    if (res.status === 201) {
      refetch();
    }
  };
  const updateHandler = async (todoId: string, todoStatus: string) => {
    const newStatus = todoStatus === "Pending" ? "Completed" : "Pending";
    const res = await updateTodoAction(newStatus, todoId);
    if (res.status === 200) {
      refetch();
    }
  };

  return (
    <div className="w-11/12 lg:w-3/4 mx-auto mt-6 lg:mt-16">
      <TodoForm refetch={refetch} userId={userId ?? ""} />

      <div className="w-full h-[0.5px] bg-black my-12" />
      <section className="mt-4 lg:mt-12">
        {isLoading || isFetching ? (
          <div>Loading...</div>
        ) : (
          <>
            {!userTodos ? (
              <div>No user todos available.</div>
            ) : (
              <div className="w-full grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 gap-4">
                {userTodos.todos?.map((item: TodoResponse) => (
                  <div
                    className="p-6 rounded-md bg-white shadow-md"
                    key={item._id}
                  >
                    <p className="text-2xl font-bold text-black">
                      {item.title}
                    </p>
                    <p className="mt-2">Due Date: {formatDate(item.date)}</p>
                    <p>Status: {item.status}</p>

                    <div className="mt-4 flex gap-x-2">
                      <button
                        onClick={() => deleteHandler(item._id)}
                        className="bg-red-500 px-3 py-1 cursor-pointer rounded-full text-white"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => updateHandler(item._id, item.status)}
                        className={`px-3 py-1 cursor-pointer rounded-full ${
                          item.status==="Completed" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {item.status==="Pending"
                          ? "Mark as complete"
                          : "Mark as pending"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Todos;
