"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import avatarIcon from "@/public/icons/avatar_icon.png";
import LikeButton from "../../../../(main)/LikeButton";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CommentList from "./CommentList";
import { useAuthStore } from "@/app/store/useAuthStore";
import Link from "next/link";

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
  const [selectedDelete, setSelectedDelete] = useState(false);

  const { slug, postId, authorId } = useParams<{
    slug: string;
    postId: string;
    authorId: string;
  }>();

  const router = useRouter();
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

  async function deletePost() {
    try {
      const res = await fetch(`/api/post/${slug}/${authorId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) return;

      setSelectedDelete(false);
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <main className="py-[3.5vmin] flex flex-col justify-center items-center">
      <div className="w-[70vmin] px-2.5 py-2.5 m-auto flex flex-col gap-3 mt-[10vmin]">
        <div className="flex justify-between">
          {user._id === post?.authorId?._id ? (
            <>
              <div className="flex items-center gap-4">
                <Image
                  src={post?.authorId?.profilePic || avatarIcon}
                  width={40}
                  height={40}
                  alt="profile picture"
                  className="rounded-full"
                />
                <div className="relative lg:flex hidden group">
                  <i className="cursor-pointer bx bx-dots-vertical-rounded text-[22px]" />

                  <div className="absolute right-0 top-full w-28 rounded-md bg-[#282142] border border-gray-600 text-sm text-gray-100 hidden group-hover:block z-20">
                    <Link href={`/edit-post/${postId}/${authorId}/${slug}`}>
                      <p className="px-3 py-2 hover:bg-gray-700 cursor-pointer">
                        Edit
                      </p>
                    </Link>
                    <p
                      className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => setSelectedDelete(true)}
                    >
                      Delete
                    </p>
                  </div>
                </div>
              </div>

              {/* MOBILE MENU */}
              <div className="relative lg:hidden flex flex-col pt-2.5">
                <details className="relative">
                  <summary className="list-none cursor-pointer">
                    <i className="bx bx-dots-vertical-rounded text-[22px]" />
                  </summary>

                  <div className="absolute right-0 top-full w-28 rounded-md bg-[#282142] border border-gray-600 text-sm text-gray-100 z-20">
                    <Link href={`/edit-post/${postId}/${authorId}/${slug}`}>
                      <p className="px-3 py-2 hover:bg-gray-700 cursor-pointer">
                        Edit
                      </p>
                    </Link>
                    <p
                      className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => setSelectedDelete(true)}
                    >
                      Delete
                    </p>
                  </div>
                </details>
              </div>
            </>
          ) : (
            <Image
              src={post?.authorId?.profilePic || avatarIcon}
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

      {/* Modal */}
      {selectedDelete && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-sm text-center flex flex-col gap-4">
            <h2 className="text-xl font-semibold">
              Are you sure that you want to delete post?
            </h2>
            <button
              onClick={deletePost}
              className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition"
            >
              Delete
            </button>
            <button
              onClick={() => setSelectedDelete(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
