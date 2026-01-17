import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <main className="flex md:flex-row flex-col items-center justify-evenly md:h-[80vh] md:py-0 py-3">
      <div className="py-3 space-y-[15vmin]">
        <div className="flex flex-col gap-[3vmin] md:text-start text-center">
          <h1 className="text-5xl text-(--color-primary)">Get in Touch</h1>

          <h1 className="text-[18px]">I'd like to hear from you!</h1>

          <p className="text-gray-400 w-70">
            If you have any inquitires or just want to say hi, please use
            contact form!
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-8 text-[20px]">
            <i className="bx  bx-envelope-alt"></i>
            <h1>blogAppContact@mail.com</h1>
          </div>

          <div className="flex items-center gap-5 text-[20px] bg-(--color-primary) w-60">
            <i className='bx  bx-like'></i> 

            <Image src={'/icons/instagram-brands-solid-full.svg'} width={30} height={20} alt="igIcon" />
            <Image src={'/icons/facebook-brands-solid-full.svg'} width={30} height={20} alt="igIcon" />
            <Image src={'/icons/twitter-brands-solid-full.svg'} width={30} height={20} alt="fbIcon" />
            <Image src={'/icons/youtube-brands-solid-full.svg'} width={30} height={20} alt="igIcon" />
          </div>
        </div>
      </div>

      <div>
        <form className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" className="w-40 px-2 py-0.5 border" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" className="w-40 px-2 py-0.5 border" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="w-83 px-2 py-0.5 border" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message">Message</label>
            <textarea id="message" maxLength={80} className="w-83 px-2 py-1 h-20 border" />
          </div>

          <div className="w-83 flex justify-end">
            <button className="bg-(--color-primary) px-12 py-1.5 text-(--color-text)">Send</button>
          </div>
        </form>
      </div>
    </main>
  );
}
