"use client";

import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import avatarIcon from "@/public/icons/avatar_icon.png";
import LikeButton from "./LikeButton";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  desc?: string | null;
  image?: string | null;
  slug: string;
  likes: number;
  likedBy: Array<string>;
  createdAt: string;
};

export default function PostsFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  async function getPosts() {
    try {
      const res = await fetch("http://localhost:3000/api/posts");

      if (!res.ok) return;

      const data = await res.json();

      setPosts(data);
    } catch (error: any) {
      return console.log(error.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {posts.map((post, index) => (
        <div
          key={post._id}
          className="w-[70vmin] px-2.5 py-2.5 m-auto flex flex-col gap-3 border-b border-b-rose-500/10"
        >
          <div className="flex justify-between">
            <Image
              src={avatarIcon}
              width={40}
              height={40}
              alt="profile picture"
              className="rounded-full"
            />
            <h1 className="text-2xl">{post.title}</h1>
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
            <LikeButton
              slug={post.slug}
              initialLikes={post.likes}
              likedBy={post.likedBy}
            />
            <Link href={`/blog/${post.slug}/${post._id}`} className="mt-1">
              <i className="text-[3vmin] text-[#9E3B3B] cursor-pointer bx  bx-message-circle-dots"></i>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
