import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectToDB from "@/lib/moongose";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export async function POST(req: Request) {
  await connectToDB();

  const { username, email, password, profilePic } = await req.json();

  if (!username || !email || !password)
    return NextResponse.json({ success: false, message: "Please fill fields" });

  const isMatch = await User.findOne({ email });

  if (isMatch)
    return NextResponse.json({ success: false, message: "User already exists on that email" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    profilePic,
  });

  const token = generateToken(newUser._id);

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
    console.log("✅ Token verified:", decoded.userId);
  } catch (err: any) {
    console.log("❌ Token self-verification failed:", err.message);
  }

  return NextResponse.json({ success: true, token, user: newUser });
}
