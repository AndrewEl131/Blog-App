import User from "@/models/User";
import { NextResponse } from "next/server";
import connectToDB from "@/lib/moongose";
import { middleware } from "../../Middleware";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/utils";

export async function POST(req: Request) {
  await connectToDB();

  const { email, password } = await req.json();
  const user = await User.findOne({ email });

  if (!user)
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 },
    );

  const isPasswordRight = await bcrypt.compare(password, user.password);

  if (!isPasswordRight) {
    return NextResponse.json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = generateToken(user._id);

  const res = NextResponse.json({
    success: true,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    },
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
