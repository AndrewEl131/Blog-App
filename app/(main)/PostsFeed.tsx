"use client";

import React, { useEffect, useState } from "react";
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
  likedBy: string[];
  createdAt: string;
  authorId: {
    _id: string;
    username: string;
    profilePic?: string | null;
  };
};

export default function PostsFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostUrl, setSelectedPostUrl] = useState<string | null>(null);

  async function getPosts() {
    try {
      const res = await fetch("http://localhost:3000/api/posts");
      if (!res.ok) return;
      const data = await res.json();
      setPosts(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  const handleCopyUrl = () => {
    if (selectedPostUrl) {
      navigator.clipboard.writeText(selectedPostUrl);
      alert("URL copied to clipboard!");
      setSelectedPostUrl(null); // close modal after copying
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => {
        const blogUrl = `${window.location.origin}/blog/${post.slug}/${post._id}`;

        return (
          <div
            key={post._id}
            className="w-[70vmin] px-2.5 py-2.5 m-auto flex flex-col gap-3 border-b border-b-rose-500/10"
          >
            <div className="flex justify-between items-center gap-2">
              {post.authorId?.profilePic ? (
                <Image
                  src={post.authorId.profilePic}
                  width={40}
                  height={40}
                  alt="profile pic"
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={avatarIcon}
                  width={40}
                  height={40}
                  alt="profile pic"
                  className="rounded-full"
                />
              )}
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
              <LikeButton slug={post.slug} initialLikes={post.likes} likedBy={post.likedBy} />
              <Link href={`/blog/${post.slug}/${post._id}`} className="mt-1.5">
                <i className="text-[22px] text-[#9E3B3B] cursor-pointer bx bx-message-circle-dots"></i>
              </Link>
              <i
                className="text-[22px] text-[#9E3B3B] cursor-pointer bx bx-arrow-out-up-right-circle"
                onClick={() => setSelectedPostUrl(blogUrl)}
              ></i>
            </div>
          </div>
        );
      })}

      {/* Modal */}
      {selectedPostUrl && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-sm text-center flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Copy Blog URL</h2>
            <input
              type="text"
              value={selectedPostUrl}
              readOnly
              className="border p-2 rounded w-full text-center"
            />
            <button
              onClick={handleCopyUrl}
              className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition"
            >
              Copy
            </button>
            <button
              onClick={() => setSelectedPostUrl(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
