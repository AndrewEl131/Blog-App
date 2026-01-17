import { posts } from "@/userDummyData";
import Image from "next/image";
import PostsFeed from "./PostsFeed";

export default function Home() {
  return (
    <main className="py-8 space-y-10">
      <div className="md:flex justify-evenly hidden">
        {/*  */}
        <div className="flex flex-col text-[#9E3B3B]">
          <div className="flex gap-1">
            <Image src={'/assets/Mountain.jpg'} width={380} height={200} alt="mountain" className="rounded-2xl" />
            <h1 className="text-[10vmin]">
              Real <br />
              Life
            </h1>
          </div>

          <div className="flex gap-1">
            <h1 className="text-[10vmin] pr-28">
              Begins <br />
              Here
            </h1>
            <Image src={'/assets/Coffe.jpg'} width={250} height={180} alt="mountain" className="rounded-2xl" />
          </div>
        </div>

        <div className="w-[20rem] flex flex-col gap-2">
          <div>
            <Image src={'/assets/beach.avif'} width={300} height={200} alt="beach" className="rounded-md" />
          </div>

          <div>
            <h1 className="text-[14px]">May 30, 2025</h1>
          </div>

          <div>
            <h1 className="text-2xl">
              Ocean Sewage Pollution Persists
            </h1>
          </div>

          <div>
            <p className="columns-2">Beachgoers warned to stay clear of popular summer destination.</p>
          </div>
        </div>
      </div>

      <PostsFeed />
    </main>
  );
}
