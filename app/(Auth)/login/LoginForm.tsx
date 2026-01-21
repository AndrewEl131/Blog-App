"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import avatarIcon from "@/public/icons/avatar_icon.png";
import Image from "next/image";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [selectedImg, setIsSelectedImg] = useState<File | null>(null);

  const [showPassword, setShowPassword] = useState(false);


  const [authForm, setAuthForm] = useState("login");

  const router = useRouter();

  const { setUser } = useAuthStore();

  async function login() {
    try {
      if (!email || !password) return setError("Please fill fields");

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) return (setUser(data.user), router.push("/"));
    } catch (error: any) {
      console.log(error.message);
    }
  }

 async function register() {
  try {
    if (!email || !password || !username)
      return setError("Please fill fields");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (selectedImg) formData.append("profilePic", selectedImg);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Register failed");

    const data = await res.json();

    setUser(data.user);
    router.push("/");
  } catch (err: any) {
    setError(err.message);
  }
}


  return (
    <form className="w-96 px-3.5 py-10 flex flex-col items-center justify-center gap-5 shadow-[-1px_3px_5px_0px_rgba(0,0,0,0.29)]">
      <div>
        <h1 className="text-4xl">
          {authForm == "login" ? "Login" : "Register"}
        </h1>
      </div>
      {authForm === "register" && (
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="w-3xs py-1 px-1 text-[16px] border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="#email">Email</label>
        <input
          type="email"
          id="email"
          className="w-3xs py-1 px-1 text-[16px] border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1 w-3xs relative">
        <label htmlFor="#username">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="username"
          className="w-3xs py-1 px-1 text-[16px] border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className="absolute right-1 top-10.5 cursor-pointer bx  bx-eye" onClick={() => setShowPassword((prev) => !prev)}></i>
      </div>
      {authForm === "register" && (
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
            src={selectedImg ? URL.createObjectURL(selectedImg) : avatarIcon}
            alt=""
            width={80}
            height={80}
            className={`w-12 h-12 ${selectedImg && "rounded-full"}`}
          />
          upload profile image
        </label>
      )}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <input type="checkbox" />
        <p>Agree to the terms of use & privacy policy.</p>
      </div>
      <div>{error && <p>{error}</p>}</div>
      <div>
        <button
          type="button"
          className="w-42 px-3 py-0.5 bg-[#6262ec] text-amber-50 hover:bg-[#6c6cf1] duration-200 border"
          onClick={authForm === "login" ? login : register}
        >
          {authForm === "login" ? "Log In" : "Register"}
        </button>
      </div>
      <div className="text-[15px]">
        {authForm == "login"
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <span
          onClick={() => setAuthForm("register")}
          className="text-blue-500 cursor-pointer text-decoration-line: underline hover:text-blue-400"
        >
          {authForm === "login" ? "Log in now" : "Register Now"}
        </span>
      </div>
    </form>
  );
}
