import connectToDB from "@/lib/moongose";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function GET() {
  await connectToDB();
  const posts = await Post.find()
  .populate("authorId", "username profilePic")
  .sort({ createdAt: -1 });

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    await connectToDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string | null;
    const type = formData.get("type") as string;
    const image = formData.get("image") as File | null;
    const authorId = formData.get("authorId") as string;

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title required" },
        { status: 400 }
      );
    }

    const user = await User.findById(authorId);


    let imageUrl = null;

    if (type === "image" && image) {
      const buffer = Buffer.from(await image.arrayBuffer());

      const upload = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "posts" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      imageUrl = upload.secure_url;
    }

    const newPost = await Post.create({
      title,
      desc: type === "text" ? desc : null,
      image: imageUrl,
      slug: createSlug(title),
      authorId
    });

    return NextResponse.json(newPost, { status: 201 });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

