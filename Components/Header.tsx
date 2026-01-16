import React from "react";
import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col">
      <div className=" flex items-center justify-evenly">
        <Image
          src={"/icons/blogApp-icon-med.png"}
          width={80}
          height={80}
          alt="icon"
        />
        <h1 className="text-[2.5vmin] font-medium">Always here</h1>
      </div>

      <div>
        <header className="bg-(--color-primary) flex justify-around px-12">
          <div className="flex items-center gap-2">
            <i className="text-(--color-text) text-[2.3vmin] bx  bx-search"></i>
            <input
              type="text"
              className="w-[35vmin] p-2 border-b border-b-(--color-text) text-(--color-text)"
            />
          </div>

          <ul className="flex gap-[8.5vmin] py-4 text-[2vmin] text-(--color-text)">
            <li className="hover-line">
              <Link href={'/'}>Home</Link>
              </li>
            <li className="hover-line">
              <Link href={'/create'}>
              Create Post
              </Link>
              </li>
            <li className="hover-line">
              <Link href={'/about'}>About</Link>
              </li>
            <li className="hover-line">
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </header>
      </div>
    </div>
  );
}
