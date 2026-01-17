"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Post = {
  _id: string;
  title: string;
  desc?: string | null;
  image?: string | null;
  slug: string;
  likes: number;
  likedBy: Array<string>;
  createdAt: string;
};

export default function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [postTitles, setPostTitles] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<string[]>([]);

  const router = useRouter();

  async function getPosts() {
    try {
      const res = await fetch("http://localhost:3000/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const initializeData = () => {
    setPostTitles(posts.map((item) => item.title));
  };

  function handleSearch(text: string) {
    setSearch(text);

    if (!text.trim()) {
      setSearchList([]);
      return;
    }

    const filteredTitles = posts
      .filter((post) => post.title.toLowerCase().includes(text.toLowerCase()))
      .map((post) => post.title);

    setSearchList(filteredTitles);
  }

  // ----------- Input Methods ------------- //

  const handleInputFocus = () => {
    setIsSearchOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const handleCloseSearch = () => {
    setIsAnimating(false);
    setTimeout(() => setIsSearchOpen(false), 300);
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    initializeData();
  }, [posts]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.querySelector('.search-container');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        handleCloseSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isSearchOpen]);

  // -------------- Searched Item Click ------------- //

  function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

  function handleSearchClick(title: string){
    const slug = createSlug(title);
    const post = posts.find((item) => item.slug === slug);

    router.push(`/blog/${slug}/${post?._id}`);
  }

  return (
    <div className="relative hidden md:flex items-center gap-2 search-container">
      <i className="text-(--color-text) text-[2.4vmin] mt-3.5 bx bx-search"></i>

      <input
        type="text"
        className="w-[35vmin] p-2 border-b border-b-(--color-text) text-(--color-text)"
        onFocus={handleInputFocus}
        onChange={(e) => handleSearch(e.target.value)}
        value={search}
      />

      {isSearchOpen && (
        <div 
          className={`
            absolute top-full left-0 mt-2 w-full 
            bg-[#faf7f7] z-50 
            overflow-hidden
            ${isAnimating ? 'animate-slide-in' : 'animate-slide-out'}
          `}
          style={{
            maxHeight: '30vh',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '0 0 8px 8px'
          }}
        >
          <div className="overflow-y-auto max-h-[30vh]">
            {searchList.length > 0 ? (
              searchList.map((item, index) => (
                <div 
                  key={index} 
                  className="p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150 border-b border-gray-200 last:border-b-0"
                  onClick={() => {
                    handleSearchClick(item)
                    setSearch(item);
                    handleCloseSearch();
                  }}
                >
                  <h1 className="text-gray-800 font-medium">{item}</h1>
                </div>
              ))
            ) : search.trim() ? (
              <div className="p-3 text-center text-gray-500">
                No results found
              </div>
            ) : (
              <div className="p-3 text-center text-gray-500">
                Type to search...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}