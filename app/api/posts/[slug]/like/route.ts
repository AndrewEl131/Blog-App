import connectToDB from "@/lib/moongose";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDB();

    const { userId } = await req.json();
    const slug = (await params).slug;
    console.log(slug);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId required" },
        { status: 400 }
      );
    }

    const post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    const alreadyLiked = post.likedBy.includes(userId);

    if (alreadyLiked) {
      post.likedBy.pull(userId);
      post.likes -= 1;
    } else {
      post.likedBy.push(userId);
      post.likes += 1;
    }

    await post.save();

    return NextResponse.json({
      success: true,
      likes: post.likes,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
