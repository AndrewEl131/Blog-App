"use client";

import React, { useState } from "react";
import Image from "next/image";
import avatarIcon from "@/public/icons/avatar_icon.png";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function page() {
  const router = useRouter();

  const { user, setUser, logout } = useAuthStore();

  const [selectedImg, setIsSelectedImg] = useState<File | null>(null);
  const [username, setUserName] = useState(user?.username);

  const [error, setError] = useState("");

  const imageSrc =
    user?.profilePic && user.profilePic.startsWith("http")
      ? user.profilePic
      : user?.profilePic
        ? `/${user.profilePic}`
        : avatarIcon;

  async function updateProfile() {
    try {
      if (!selectedImg && !username) return setError("Please fill fields");

      const formData = new FormData();
      if (username) formData.append("username", username);
      if (selectedImg) formData.append("profilePic", selectedImg);

      const res = await fetch("/api/auth/me", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();

      setUser(data.user);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  }

  async function handleLogout() {
    const res = await fetch('/api/auth/logout', {
      method: "POST",
      headers: {"Content-Type": "application/json"}
    })

    const data = await res.json();

    if(data.success){
      logout();
      router.push("/")
    }
    
  }

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-5/6 max-w-2xl px-3 py-8 flex lg:flex-row lg:justify-start justify-center flex-col lg:space-y-0 space-y-5 gap-1 mb-50">
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
                className={` ${selectedImg && "rounded-full"}`}
                width={50}
                height={50}
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
          <div className="flex gap-3">
            <button
              type="button"
              className="bg-(--color-primary) px-12 py-1.5 text-(--color-text)"
              onClick={updateProfile}
            >
              Save
            </button>

            <button
              type="button"
              className="px-10 py-1.5 border text-(--color-primary) font-semibold"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
          {error && (
            <div>
              <p>{error}</p>
            </div>
          )}
        </form>
        <div className=" flex justify-center items-center lg:w-[50%]">
          <Image
            src={imageSrc}
            alt=""
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>
      </div>
    </main>
  );
}
