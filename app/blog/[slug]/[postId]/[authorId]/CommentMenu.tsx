"use client";

import { useState } from "react";

type Comment = {
  _id: string;
  content: string;
};

type CommentMenuProps = {
  comment: Comment;
  isAuthor: boolean;
  onEdit: (content: string) => void;
  onDelete: () => void;
};

export default function CommentMenu({
  comment,
  isAuthor,
  onEdit,
  onDelete,
}: CommentMenuProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  if (!isAuthor) return null;

  return (
    <>
      {/* content / edit */}
      {isEditing ? (
        <>
          <textarea
            value={content}
            maxLength={200}
            rows={1}
            onChange={(e) => {
              setContent(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            className="w-[50vmin] flex-1 border-b bg-transparent outline-none resize-none"
          />

          <button
            className="bg-(--color-primary) px-12 py-1.5 text-(--color-text)"
            onClick={() => {
              onEdit(content);
              setIsEditing(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <h1 className="w-[50vmin] flex-1 min-w-0 break-words">
          {comment.content}
        </h1>
      )}

      {/* DESKTOP MENU */}
      <div className="relative lg:flex flex-col hidden group">
        <i className="cursor-pointer bx bx-dots-vertical-rounded text-[22px]" />

        <div className="absolute right-0 top-full w-28 rounded-md bg-[#282142] border border-gray-600 text-sm text-gray-100 hidden group-hover:block z-20">
          <p
            className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </p>
          <p
            className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
            onClick={onDelete}
          >
            Delete
          </p>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className="relative lg:hidden flex flex-col">
        <details className="relative">
          <summary className="list-none cursor-pointer">
            <i className="bx bx-dots-vertical-rounded text-[22px]" />
          </summary>

          <div className="absolute right-0 top-full w-28 rounded-md bg-[#282142] border border-gray-600 text-sm text-gray-100 z-20">
            <p
              className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </p>
            <p
              className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={onDelete}
            >
              Delete
            </p>
          </div>
        </details>
      </div>
    </>
  );
}
