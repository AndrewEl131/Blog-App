"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  return (
    <>
      <div className="md:hidden flex">
        <Image
          src={"/icons/blogApp-icon-med.png"}
          width={70}
          height={70}
          alt="icon"
        />
      </div>
      <div className="md:hidden flex">
        <i
          className="text-[6vmin] text-(--color-text) bx  bx-menu-wide"
          onClick={() => setIsOpen(true)}
        ></i>
      </div>

      {isOpen && (
        <div className="md:hidden absolute right-0 top-0 w-[27vmin] min-h-screen bg-(--color-primary) py-3">
          <div>
            <i
              className="text-[7vmin] text-(--color-text) bx  bx-caret-big-left"
              onClick={() => setIsOpen(false)}
            ></i>
          </div>
          <ul className="flex flex-col items-center gap-[8.5vmin] py-5 text-[5vmin] text-(--color-text)">
            <li className="hover-line">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover-line">
              <Link href={"/create"}>Create Post</Link>
            </li>
            <li className="hover-line">
              <Link href={"/about"}>About</Link>
            </li>
            <li className="hover-line">
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
