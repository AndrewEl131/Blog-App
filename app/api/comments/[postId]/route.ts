import connectToDB from "@/lib/moongose";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  await connectToDB();
  const { postId } = await params;

  const comments = await Comment.find({ postId });

  return NextResponse.json({ comments });
}


export async function POST(
  req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  await connectToDB();
  const { postId } = await params;
  const { content, author } = await req.json();

  if (!content || !author) {
    return NextResponse.json({ success: false });
  }

  const comment = await Comment.create({
    postId,
    content,
    author,
  });

  return NextResponse.json({ comment });
}

