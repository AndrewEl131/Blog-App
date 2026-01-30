import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-(--color-primary) text-(--color-text) w-full flex md:flex-row flex-col md:justify-evenly md:items-center md:px-0 px-2 py-10">
      <div>
        <Image
          src={"/icons/blogApp-icon-med.png"}
          width={120}
          height={100}
          alt="logo"
        />
      </div>

      <div>
        <div className="px-3 space-y-[2vmin]">
          <div className="text-2xl">
            <h1>Navigation</h1>
            <hr />
          </div>

          <div className="text-[18.5px]">
            <ul className="space-y-[0.5vmin]">
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
          </div>
        </div>
      </div>

      <div>
        <div className="px-3 space-y-[2vmin] mb-7.5">
          <div className="text-2xl">
            <h1>Contact</h1>
            <hr />
          </div>

          <div className="text-[18.5px]">
            <ul className="space-y-[0.5vmin]">
              <li className="hover-line flex items-center gap-2">
                <i className="bx  bx-envelope-alt"></i>
                <h1>blogAppContact@mail.com</h1>
              </li>
              <li className="hover-line flex items-center gap-2">
                <i className="bx  bx-phone"></i>
                <h1>+000 987 321</h1>
              </li>
              <li className="hover-line flex items-center gap-2">
                <i className="bx  bx-home-alt-3"></i>
                <h1>Georgia, Country, street 2</h1>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="px-3 space-y-[2vmin]">
          <div className="text-2xl">
            <h1>Social</h1>
            <hr />
          </div>

          <div className="text-[18.5px]">
            <ul className="space-y-[0.5vmin]">
              <li className="hover-line flex items-center gap-2">
                <Image
                  src={"/icons/instagram-brands-solid-full.svg"}
                  width={30}
                  height={20}
                  alt="igIcon"
                />
                <h1>@BlogAppIg</h1>
              </li>
              <li className="hover-line flex items-center gap-2">
                <Image
                  src={"/icons/facebook-brands-solid-full.svg"}
                  width={30}
                  height={20}
                  alt="igIcon"
                />
                <h1>BlogApp</h1>
              </li>
              <li className="hover-line flex items-center gap-2">
                <Image
                  src={"/icons/twitter-brands-solid-full.svg"}
                  width={30}
                  height={20}
                  alt="fbIcon"
                />
                <h1>@BlogApp</h1>
              </li>
              <li className="hover-line flex items-center gap-2">
                <Image
                  src={"/icons/youtube-brands-solid-full.svg"}
                  width={30}
                  height={20}
                  alt="igIcon"
                />
                <h1>BlogApp - new</h1>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
