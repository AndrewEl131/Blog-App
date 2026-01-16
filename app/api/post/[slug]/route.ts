import connectToDB from "@/lib/moongose";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDB();

  const { slug } = await params;

  const post = await Post.findOne({ slug });

  if (!post) {
    return NextResponse.json(
      { success: false, message: "Post not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}
