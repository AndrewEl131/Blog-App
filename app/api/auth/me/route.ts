import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";
import { cookies } from "next/headers";

interface JwtPayload {
  userId: string;
}

export async function GET(req: Request) {
  try {
    await connectToDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 },
      );
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) throw new Error("JWT_SECRET missing");

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await User.findById(decoded.userId).select(
      "_id username email profilePic createdAt",
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();

    const token = req.headers
      .get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 },
      );
    }

    const JWT_SECRET = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const formData = await req.formData();
    const username = formData.get("username") as string | null;
    const file = formData.get("profilePic") as File | null;

    const updateData: any = {};
    if (username) updateData.username = username;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "profilePics" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });

      updateData.profilePic = uploadResult.secure_url;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "Nothing to update" },
        { status: 400 },
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: updateData },
      {
        new: true,
        select: "_id username email profilePic createdAt",
      },
    );

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid token or request" },
      { status: 401 },
    );
  }
}
