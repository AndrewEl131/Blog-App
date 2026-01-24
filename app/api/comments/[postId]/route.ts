import connectToDB from "@/lib/moongose";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  await connectToDB();
  const { postId } = await params;

  const comments = await Comment.find({ postId }).populate({
    path: "authorId",
    select: "username profilePic",
    model: "User",
  });

  console.log("POPULATED COMMENT:", comments);

  return NextResponse.json({ comments });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    await connectToDB();

    const { postId } = await params;
    const { content, authorId } = await req.json();

    if (!postId || !content || !authorId) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 },
      );
    }

    const comment = await Comment.create({
      postId: new mongoose.Types.ObjectId(postId),
      content,
      authorId: new mongoose.Types.ObjectId(authorId),
    });

    const populatedComment = await Comment.findById(comment._id).populate(
      "authorId",
      "username profilePic",
    );

    return NextResponse.json({
      success: true,
      comments: [populatedComment],
    });
  } catch (error: any) {
    console.error("CREATE COMMENT ERROR:", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  await connectToDB();
  const { postId } = await params;

  const { content, commentId } = await req.json();

  const newComment = await Comment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true },
  );

  return NextResponse.json(newComment)
}
