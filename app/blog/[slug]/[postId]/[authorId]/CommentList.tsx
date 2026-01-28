"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import avatarIcon from "@/public/icons/avatar_icon.png";
import { useAuthStore } from "@/app/store/useAuthStore";
import CommentMenu from "./CommentMenu";

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

      if (!res.ok) return;

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
        commentId,
      }),
    });

    if (!res.ok) return;

    const data = await res.json();

    if (data.success) {
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: commentContent }
            : comment
        )
      );
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

async function handleDeleteComment(commentId: string) {
  try {
    const res = await fetch(`/api/comments/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        commentId: commentId,
      }),
    });

    const data = await res.json();

    if (data.success) {
      getComments();
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

  return (
    <div className="py-2 px-2.5 md:w-[70vmin] flex flex-col items-center justify-center m-auto">
      <div className="w-full flex md:justify-start justify-center gap-3">
        {user.profilePic ? (
          <Image
            src={user?.profilePic}
            width={35}
            height={35}
            alt="profile pic"
            className="rounded-full max-h-10"
          />
        ) : (
          <Image
            src={avatarIcon}
            width={35}
            height={40}
            alt="profile pic"
            className="rounded-full max-h-10"
          />
        )}
        <textarea
          className="md:w-[45vmin] py-1 px-1 border-b resize-none overflow-hidden"
          value={commentContent}
          maxLength={200}
          rows={1}
          onChange={(e) => {
            setCommentContent(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />
      
        <button
          type="button"
          className="bg-(--color-primary) md:px-12 px-4 py-1.5 text-(--color-text) max-h-10"
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
                <div className="w-25 flex flex-col justify-center items-center text-[16px]">
                  {comment?.authorId?.profilePic ? (
                    <Image
                      src={comment?.authorId?.profilePic}
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
                  <h1 className="text-[14.5px]">
                    @{comment?.authorId?.username}
                  </h1>
                </div>

                {userId === comment?.authorId?._id ? <CommentMenu comment={comment} isAuthor={true} onEdit={(data) => handleEditComment(comment._id, data)} onDelete={() => handleDeleteComment(comment._id)} /> : <h1>{comment.content}</h1>}
                
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
