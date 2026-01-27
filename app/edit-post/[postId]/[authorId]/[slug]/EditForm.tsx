"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import avatarIcon from "@/public/icons/avatar_icon.png";
import Link from "next/link";

type Props = {
  postId: string;
  authorId: string;
  slug: string;
};

type Post = {
  _id: string;
  title: string;
  desc?: string | null;
  image?: string | null;
  authorId: {
    _id: string;
    profilePic: string | null;
    username: string;
  };
  slug: string;
  likes: number;
  likedBy: Array<string>;
  createdAt: string;
};

export default function EditForm({ postId, authorId, slug }: Props) {
  const [post, setPost] = useState<Post | null>(null);
  const [formType, setFormType] = useState("text");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [err, setErr] = useState("");

  const [selectedImg, setSelectedImg] = useState<File | null>(null);

  async function getPost() {
    try {
      const res = await fetch(`/api/post/${slug}/${authorId}`);

      if (!res.ok) return;

      const data = await res.json();

      setPost(data);
      setTitle(data.title);
      if (data.image) {
        setFormType("image");
      } else {
        setFormType("text");
        setText(data.desc);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function updatePost() {
    try {
      const res = await fetch(`/api/post/${slug}/${authorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          desc: text,
          image: selectedImg,
        }),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <form className="px-8 py-8 w-2xl space-y-8 rounded-2xl shadow-[0px_4px_12px_0px_rgba(34,17,0,0.56)]">
      <div className="w-full flex justify-between gap-1 text-3xl">
        <Image
          src={post?.authorId.profilePic || avatarIcon}
          width={40}
          height={40}
          alt="profile picture"
          className="rounded-full"
        />
        <h1>{title}</h1>
      </div>

      <div className="w-full flex flex-col gap-1 items-center text-3xl">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="border-b w-85 text-[17px]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {formType == "image" ? (
        <div className="w-full flex flex-col gap-1 items-center text-3xl">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            id="image"
            className="border w-85 text-[17px]"
          />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-1 items-center text-3xl">
          <label htmlFor="title">Text</label>
          <textarea
            id="text"
            maxLength={185}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border-b w-85 h-20 text-[17px] overflow-y-hidden"
          />
        </div>
      )}

      <div className="w-full flex justify-center text-red-600 text-2xl">
        {err && <p>{err}</p>}
      </div>

      <div className="w-full flex justify-evenly">
        <button
          type="button"
          className="bg-(--color-primary) px-12 py-1.5 text-(--color-text)"
          onClick={updatePost}
        >
          Save
        </button>

        <Link href={`/blog/${post?.slug}/${post?._id}/${post?.authorId?._id}`}>
          <button type="button" className="px-12 py-1.5 border">
            cancel
          </button>
        </Link>
      </div>
    </form>
  );
}
