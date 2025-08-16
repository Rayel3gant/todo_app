import { dbConnect } from "@/lib/dbConnect";
import { loginType } from "@/lib/types";
import { User } from "@/schemas/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    await dbConnect();
    const body: loginType = await request.json();
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const userDetails = await User.findOne({
      email: body.email,
    });
    if (!userDetails) {
      return NextResponse.json({ error: "email not found" }, { status: 400 });
    }
    const passwordCheck = await bcrypt.compare(
      body.password,
      userDetails.password
    );

    if (passwordCheck) {
      const token = jwt.sign(
        { id: userDetails._id, email: userDetails.email },
         process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      return NextResponse.json(
        { message: "Login successful", token },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "incorrect password" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
};
