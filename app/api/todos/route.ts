import { dbConnect } from "@/lib/dbConnect";
import { createTodoType, deleteTodoType, updateTodoType } from "@/lib/types";
import { Todo } from "@/schemas/Todo";
import { User } from "@/schemas/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    const body: createTodoType = await request.json();
    if (!body.title || !body.date || !body.userId) {
      return NextResponse.json(
        { error: "Todo title, user id and date are required" },
        { status: 400 }
      );
    }
    const newTodo = await Todo.create({
      title: body.title,
      date: body.date,
    });

    await User.findByIdAndUpdate(
      body.userId,
      {
        $push: {
          todos: newTodo._id,
        },
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Todo created successfully", status: 201 },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    await dbConnect();
    const body: deleteTodoType = await request.json();
    if (!body.todoId || !body.userId) {
      return NextResponse.json(
        { error: "tod id and user id are required" },
        { status: 400 }
      );
    }
    await User.findByIdAndUpdate(
      body.userId,
      {
        $pull: {
          todos: body.todoId,
        },
      },
      { new: true }
    );

    await Todo.findByIdAndDelete(body.todoId);
    return NextResponse.json(
      { message: "Todo deleted successfully", status: 201 },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    await dbConnect();
    const body: updateTodoType = await request.json();
    if (!body.status || !body.todoId) {
      return NextResponse.json(
        { error: " todo status and id is required" },
        { status: 400 }
      );
    }

    await Todo.findByIdAndUpdate(
      body.todoId,
      {
        status: body.status,
      },
      { new: true }
    );
    return NextResponse.json(
      { message: "todo update successful", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
};
