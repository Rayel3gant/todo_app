export async function createTodoAction(formData: {
  title: string;
  date: string;
  userId: string;
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return await res.json();
  } catch (error) {
    return { error: "create todo failed" };
  }
}

export const updateTodoAction = async (status: string, todoId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        todoId,
      }),
    });

    return await res.json();
  } catch (error) {
    return { error: "update todo failed" };
  }
};

export const deleteTodoAction = async (userId: string, todoId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        todoId,
      }),
    });

    return await res.json();
  } catch (error) {
    return { error: "delete todo failed" };
  }
};

export const getAllTodosAction = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTodos`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    return await res.json();
  } catch (error) {
    return { error: "get todos failed" };
  }
};
