"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import avatarIcon from "@/public/icons/avatar_icon.png";
import { useAuthStore } from "@/app/store/useAuthStore";

type Comment = {
  _id: string;
  postId: string;
  content: string;
  authorId: {
    _id: string;
    username: string;
    profilePic: string;
  };
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

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const { user } = useAuthStore();

  async function getComments() {
    try {
      const res = await fetch(`/api/comments/${postId}`);

      if (!res.ok) return;

      const data = await res.json();

      setComments(data.comments);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (!user) return;
    getComments();
  }, [postId]);

  if (!user) {
    return null;
  }

  const userId = user._id;

  async function handleComment() {
    try {
      const res = await fetch(`/api/comments/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: commentContent,
          authorId: user?._id,
        }),
      });

      const data = await res.json();

      if (Array.isArray(data.comments)) {
        setComments((prev) => [...prev, ...data.comments]);
      }

      setCommentContent("");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handleEditComment(commentId: string, commentContent: string) {
    try {
      const res = await fetch(`/api/comments/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: commentContent,
          commentId: commentId,
        }),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="py-2 px-2.5 md:w-[70vmin] flex flex-col items-center justify-center m-auto">
      <div className="w-full flex md:justify-start justify-center gap-3">
        {user.profilePic ? (
          <Image
            src={user.profilePic}
            width={35}
            height={35}
            alt="profile pic"
            className="rounded-full"
          />
        ) : (
          <Image
            src={avatarIcon}
            width={35}
            height={40}
            alt="profile pic"
            className="rounded-full"
          />
        )}
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
              <div className="w-full flex items-center text-[2vmin] py-2 px-2.5 gap-3 columns-auto mt-4">
                <div className="flex flex-col justify-center items-center text-[16px]">
                  {comment.authorId?.profilePic ? (
                    <Image
                      src={comment.authorId.profilePic}
                      width={35}
                      height={35}
                      alt="profile pic"
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src={avatarIcon}
                      width={35}
                      height={40}
                      alt="profile pic"
                      className="rounded-full"
                    />
                  )}
                  <h1>@{comment.authorId.username}</h1>
                </div>
                {editingCommentId === comment._id ? (
                  <>
                  <input
                    type="text"
                    value={editingContent}
                    maxLength={50}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="w-[50vmin] flex-1 border-b bg-transparent outline-none"
                  />
                  <button onClick={() => handleEditComment(comment._id, editingContent)}>Save</button>
                  </>
                ) : (
                  <h1 className="w-[50vmin] flex-1 min-w-0 wrap-break-words">
                    {comment.content}
                  </h1>
                )}

                {userId == comment.authorId._id && (
                  <>
                    <div className="relative group">
                      <i className="cursor-pointer bx bx-dots-vertical-rounded text-[22px]" />

                      <div className="absolute right-0 top-full  w-28 rounded-md bg-[#282142] border border-gray-600 text-sm text-gray-100 hidden group-hover:block z-20">
                        <p
                          className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            setEditingCommentId(comment._id);
                            setEditingContent(comment.content);
                          }}
                        >
                          Edit
                        </p>
                        <p className="px-3 py-2 hover:bg-gray-700 cursor-pointer">
                          Delete
                        </p>
                      </div>
                    </div>
                  </>
                )}
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
