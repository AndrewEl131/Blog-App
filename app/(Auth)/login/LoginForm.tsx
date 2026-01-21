"use client"

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const { setUser } = useAuthStore();

    async function login() {
        try {
            if(!email || !password) return setError("Please fill fields");

            const res = await fetch('/api/auth/login', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })

            const data = await res.json();
            
            if(data.success) return (
              setUser(data.user),
              router.push('/')
            )

        } catch (error: any) {
            console.log(error.message);
        }
    }

  return (
    <form className="w-96 px-3.5 py-10 flex flex-col items-center justify-center gap-5 shadow-[-1px_3px_5px_0px_rgba(0,0,0,0.29)]">
      <div>
        <h1 className="text-4xl">Login</h1>
      </div>
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
          type="password"
          id="username"
          className="w-3xs py-1 px-1 text-[16px] border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className="absolute right-1 top-10.5 cursor-pointer bx  bx-eye"></i>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <input type="checkbox" />
        <p>Agree to the terms of use & privacy policy.</p>
      </div>
      <div>
        {error && (<p>{error}</p>)}
      </div>
      <div>
        <button type="button" className="w-42 px-3 py-0.5 bg-[#6262ec] text-amber-50 hover:bg-[#6c6cf1] duration-200 border" onClick={login}>
          Log In
        </button>
      </div>
    </form>
  );
}
