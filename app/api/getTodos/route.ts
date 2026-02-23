import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/schemas/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    if (!body.userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const userTodos = await User.findById(body.userId).populate("todos").exec();
    const todos = userTodos.todos || [];
    return NextResponse.json(
      { message: "Login successful", todos },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message || error.toString() },
      { status: 500 }
    );
  }
}
