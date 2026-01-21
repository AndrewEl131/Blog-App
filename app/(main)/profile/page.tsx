"use client";

import React, { useState } from "react";
import Image from "next/image";
import avatarIcon from "@/public/icons/avatar_icon.png";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function page() {
  const { user } = useAuthStore();
  
  const [selectedImg, setIsSelectedImg] = useState<File | null>(null);
  const [username, setUserName] = useState(user?.username);

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-5/6 max-w-2xl px-3 py-8 flex gap-1 mb-50">
        <form className="flex flex-col gap-10 w-[50%]">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl">Profile details</h3>
            <label
              htmlFor="avatar"
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setIsSelectedImg(file);
                }}
                type="file"
                id="avatar"
                accept=".png, .jpg, .jpeg"
                hidden
              />
              <Image
                src={
                  selectedImg ? URL.createObjectURL(selectedImg) : avatarIcon
                }
                alt=""
                className={`w-12 h-12 ${selectedImg && "rounded-full"}`}
              />
              upload profile image
            </label>
          </div>
          <div>
            <input
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              type="text"
              required
              placeholder="Your name"
              className="p-2 w-82 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <button className="bg-(--color-primary) px-12 py-1.5 text-(--color-text)">Save</button>
          </div>
        </form>
        <div className="flex justify-center items-center w-[50%]">
            <Image src={user?.profilePic || avatarIcon} alt="" width={120} height={120} className="rounded-full" />
        </div>
      </div>
    </main>
  );
}
