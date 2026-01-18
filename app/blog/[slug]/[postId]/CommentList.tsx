"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import avatarIcon from "@/public/icons/avatar_icon.png";
import { log } from "util";

type Comment = {
  _id: string;
  postId: string;
  content: string;
  author: string;
  likes?: number;
  likedBy: Array<string>;
  createdAt: string;
};

type CommentListProps = {
  postId: string;
};

export default function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState("");

  async function getComments() {
    try {
      const res = await fetch(`/api/comments/${postId}`);

      if (!res.ok) return;

      const data = await res.json();

      console.log(data);

      setComments(data.comments);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handleComment() {
    try {
      let userId = localStorage.getItem("userId");

      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem("userId", userId);
      }

      const res = await fetch(`/api/comments/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content: commentContent,
          author: userId,
        }),
      });

      const data = await res.json();

      console.log(data);

      setComments((prev) => [...prev, ...data.comments]);
      
      setCommentContent("");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getComments();
  }, [postId]);

  return (
    <div className="py-2 px-2.5 md:w-[70vmin] flex flex-col items-center justify-center m-auto">
      <div className="w-full flex md:justify-start justify-center gap-3">
        <Image
          src={avatarIcon}
          width={35}
          height={30}
          alt="profile picture"
          className="rounded-full"
        />
        <input
          type="text"
          className="md:w-[35vmin] py-0.5 px-1 border-b columns-auto"
          value={commentContent}
          maxLength={50}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <button
          type="button"
          className="bg-(--color-primary) md:px-12 px-4 py-1.5 text-(--color-text)"
          onClick={handleComment}
        >
          Comment
        </button>
      </div>

      <div className="w-[70vmin] space-y-3">
        {Array.isArray(comments) ? (
          comments.map((comment: Comment) => (
            <React.Fragment key={comment?._id}>
              <div
                className="w-full flex items-center text-[2vmin] py-2 px-2.5 gap-3 columns-auto mt-4"
              >
                <div className="flex flex-col justify-center items-center text-[14px]">
                  <Image
                    src={avatarIcon}
                    width={35}
                    height={30}
                    alt="profile picture"
                    className="rounded-full"
                  />
                  <h1>Test User</h1>
                </div>
                <h1 className="w-[50vmin] flex-1 min-w-0 wrap-break-word">
                  {comment?.content}
                </h1>
                <div className="relative group">
                  <i className="cursor-pointer bx bx-dots-vertical-rounded text-[22px]" />

                  <div className="absolute right-0 top-full  w-28 rounded-md bg-[#282142] border border-gray-600 text-sm text-gray-100 hidden group-hover:block z-20">
                    <p className="px-3 py-2 hover:bg-gray-700 cursor-pointer">
                      Edit
                    </p>
                    <p className="px-3 py-2 hover:bg-gray-700 cursor-pointer">
                      Delete
                    </p>
                  </div>
                </div>
              </div>
              <hr className="text-gray-300" />
            </React.Fragment>
          ))
        ) : (
          <div>Error</div>
        )}
      </div>
    </div>
  );
}
