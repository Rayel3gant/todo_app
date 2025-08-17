import { dbConnect } from "@/lib/dbConnect";
import { signupType } from "@/lib/types";
import { User } from "@/schemas/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    await dbConnect();
    const body: signupType = await request.json();
    if (!body.email || !body.password || !body.username) {
      return NextResponse.json(
        { error: "Email , Username and password are required" },
        { status: 400 }
      );
    }

    const userDetails = await User.findOne({
      email: body.email,
    });
    if (userDetails) {
      return NextResponse.json({ error: "User exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    await User.create({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully" , status:201 },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
};
