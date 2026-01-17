import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <main className="flex flex-col gap-[5vmin] py-[3.5vmin]">
      <div className="md:w-[70%] w-full m-auto space-y-3 text-[#9E3B3B]">
        <h1 className="text-7xl text-center ">About Us</h1>
        <hr />
      </div>
      <div className="flex justify-evenly">
        <div className="md:w-85 flex flex-col gap-3 md:px-0 px-2">
          <h1 className="text-5xl">Our Team</h1>

          <p>
            Our team currently consists of one dedicated individual — me. I
            handle everything from idea generation and design to development and
            problem-solving. Working solo allows me to stay focused, flexible,
            and fully involved in every detail of the project. While the team is
            small for now, the vision is big, and this project is built with
            growth, learning, and passion in mind.
          </p>
        </div>
        <div>
          <Image src={"/assets/joe.jpg"} width={300} height={200} alt="" className="md:block hidden" />
        </div>
      </div>

      <div className="flex justify-evenly">
        <div>
          <Image src={"/assets/work.jpg"} width={300} height={200} alt="" className="md:block hidden" />
        </div>

        <div className="md:w-85 flex flex-col gap-3  md:px-0 px-2">
          <h1 className="text-5xl">Our Story</h1>

          <p>
            My story began at the end of 2024, when I started learning coding. I
            began building websites to improve my GitHub profile and to showcase
            my skills and experience. Each project represents a step in my
            growth, curiosity, and passion for development.
          </p>
        </div>
      </div>
    </main>
  );
}
