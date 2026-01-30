import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connectToDB } from "@/lib/mongoose";
import cloudinary from "@/lib/cloudinary";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export async function POST(req: Request) {
  await connectToDB();

  const formData = await req.formData();

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const profilePic = formData.get("profilePic") as File | null;

  if (!username || !email || !password) {
    return NextResponse.json(
      { success: false, message: "Please fill fields" },
      { status: 400 },
    );
  }

  const isMatch = await User.findOne({ email });
  if (isMatch) {
    return NextResponse.json(
      { success: false, message: "User already exists" },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let imageUrl = null;
  if (profilePic) {
    const buffer = Buffer.from(await profilePic.arrayBuffer());

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "profilePics" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    imageUrl = upload.secure_url;
  }

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    profilePic: imageUrl,
  });

  const token = generateToken(newUser._id);

  const res = NextResponse.json({
    success: true,
    user: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profilePic: newUser.profilePic,
      createdAt: newUser.createdAt,
    },
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
