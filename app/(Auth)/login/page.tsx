import React from "react";
import Image from "next/image";
import LoginForm from "./LoginForm";

export default function loginPage() {
  return (
    <div className="h-screen flex">
      <div className="w-[50vw] h-full flex justify-center items-center">
        <Image
          src={"/assets/Poster.png"}
          width={1100}
          height={1100}
          alt="poster"
        />
      </div>

      <div className="w-[50vw] h-full text-[20px] flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
