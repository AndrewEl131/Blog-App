import React from "react";
import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import Search from "./Search";

export default function Header() {
  return (
    <div className="flex flex-col">
      <div className=" md:flex items-center justify-evenly hidden">
      <Image
        src={"/icons/blogApp-icon-med.png"}
        width={80}
        height={80}
        alt="icon"
      />
      <h1 className="text-[2.5vmin] font-medium">Always here</h1>
    </div>
      <div>
        <header className="bg-(--color-primary) flex md:justify-around justify-between md:items-start items-center px-12">
          <Search />
          <ul className="md:flex gap-[8.5vmin] py-4 text-[2vmin] text-(--color-text) hidden">
            <li className="hover-line">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover-line">
              <Link href={"/about"}>About</Link>
            </li>
            <li className="hover-line">
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li className="hover-line">
              <Link href={"/profile"}>Profile</Link>
            </li>
          </ul>

          <BurgerMenu />
        </header>
      </div>
    </div>
  );
}
