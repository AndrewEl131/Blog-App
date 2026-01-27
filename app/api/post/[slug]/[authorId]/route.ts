import connectToDB from "@/lib/moongose";
import Post from "@/models/Post";
import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";
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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string; authorId: string }> },
) {
  await connectToDB();

  const { title, desc, image } = await req.json();

  const { slug, authorId } = await params;
  const post = await Post.findOne({ slug });

  if (!post) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  if (post.authorId.toString() !== authorId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  if (title !== undefined) post.title = title;
  if (desc !== undefined) post.desc = desc;

  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "posts" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    post.image = upload.secure_url;
  }

  await post.save();

  return NextResponse.json({ post });
}
