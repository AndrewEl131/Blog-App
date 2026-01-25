import connectToDB from "@/lib/moongose";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string; authorId: string }> },
) {
  await connectToDB();

  const { slug, authorId } = await params;

  const post = await Post.findOne({ slug }).populate({
    path: "authorId",
    select: "username profilePic",
    model: "User",
  });

  if (!post) {
    return NextResponse.json(
      { success: false, message: "Post not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(post);
}
