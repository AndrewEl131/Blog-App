"use client";

import { useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function CreatePostForm() {
  const [type, setType] = useState<"text" | "image">("text");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [frontError, setFrontError] = useState<string | null>(null);

  const { user, setUser } = useAuthStore();

  async function CreatePost() {
    try {
      if (!user) {
        setFrontError("Please login to create a post");
        return;
      }

      if (type === "text" && !desc) {
        setFrontError("Please fill field");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("type", type);
      formData.append("authorId", user._id);

      if (type === "text") {
        formData.append("desc", desc || "");
      }

      if (type === "image" && image) {
        formData.append("image", image);
      }

      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.text();
        console.error(err);
        return;
      }

      const data = await res.json();
      console.log(data);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <form className="w-2xl flex flex-col items-center justify-center gap-20 py-15 shadow-[0px_2px_10px_-1px_rgba(31,23,23,0.53)]">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-2xl">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          className="w-70 px-2 py-1 border"
          placeholder="Enter a title..."
        />
      </div>

      {type === "image" && (
        <div className="flex flex-col gap-2">
          <label htmlFor="img" className="text-2xl">
            Image
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            id="img"
            className="w-70 px-2 py-1 border placeholder:text-gray-400"
          />
        </div>
      )}

      {type === "text" && (
        <div className="flex flex-col gap-1">
          <label htmlFor="text" className="text-2xl">
            Text
          </label>
          <textarea
            id="text"
            value={desc || ""}
            onChange={(e) => setDesc(e.target.value)}
            maxLength={100}
            className="w-70 px-2 py-1.5 h-20 border"
            placeholder="Enter a text..."
          />
        </div>
      )}

      <div className="flex gap-5.5">
        <button
          className={`${type === "image" ? "bg-(--color-primary)" : "bg-gray-500"} px-12 py-1.5 text-(--color-text)`}
          type="button"
          onClick={() => setType("image")}
        >
          Image
        </button>
        <button
          className={`${type === "text" ? "bg-(--color-primary)" : "bg-gray-500"} px-12 py-1.5 text-(--color-text)`}
          type="button"
          onClick={() => setType("text")}
        >
          Text
        </button>
      </div>

      {frontError && <h1>{frontError}</h1>}

      <div>
        <button
          type="button"
          className="bg-(--color-primary) px-12 py-1.5 text-(--color-text)"
          onClick={CreatePost}
        >
          Create Post
        </button>
      </div>
    </form>
  );
}
