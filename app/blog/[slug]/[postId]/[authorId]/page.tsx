"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import avatarIcon from "@/public/icons/avatar_icon.png";
import LikeButton from "../../../../(main)/LikeButton";
import { useParams } from "next/navigation";
import CommentList from "./CommentList";
import { useAuthStore } from "@/app/store/useAuthStore";

type Post = {
  _id: string;
  title: string;
  desc?: string | null;
  image?: string | null;
  authorId: {
    _id: string;
    profilePic: string | null;
    username: string;
  }
  slug: string;
  likes: number;
  likedBy: Array<string>;
  createdAt: string;
};

type Comment = {
  _id: string;
  postId: string;
  content: string;
  author: string;
  likes?: number;
  likedBy: Array<string>;
  createdAt: string;
};

export default function BlogPage() {
  const [post, setPost] = useState<Post | null>(null);
  const { slug, postId, authorId } = useParams<{ slug: string; postId: string, authorId: string }>();

  const { user } = useAuthStore();

  if (!user) return;

  async function getPost() {
    try {
      const res = await fetch(`/api/post/${slug}/${authorId}`);

      if (!res.ok) return;

      const data = await res.json();

      setPost(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <main className="py-[3.5vmin]">
      <div className="w-[70vmin] px-2.5 py-2.5 m-auto flex flex-col gap-3">
        <div className="flex justify-between">
          {user._id === post?.authorId._id ? (
            <div className="flex items-center gap-4">
              <Image
              src={post?.authorId.profilePic || avatarIcon}
              width={40}
              height={40}
              alt="profile picture"
              className="rounded-full"
            />
              <i className="text-4xl text-(--color-primary) cursor-pointer bx  bx-pencil-circle"></i>
            </div>
          ) : (
            <Image
              src={post?.authorId.profilePic || avatarIcon}
              width={40}
              height={40}
              alt="profile picture"
              className="rounded-full"
            />
          )}
          <h1 className="text-2xl">{post?.title}</h1>
        </div>

        <div>
          {post?.image && (
            <Image
              src={post.image}
              width={600}
              height={550}
              alt="image"
              className="m-auto rounded-md"
            />
          )}
          {post?.desc && <p>{post.desc}</p>}
        </div>
        <hr className="text-rose-500" />
        <div className="flex items-center gap-3.5">
          {post && (
            <LikeButton
              slug={post.slug}
              initialLikes={post.likes}
              likedBy={post.likedBy}
            />
          )}
        </div>
      </div>
      <CommentList postId={postId} />
    </main>
  );
}
