"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";

export default function LikeButton({
  slug,
  initialLikes,
  likedBy,
}: {
  slug: string;
  initialLikes: number;
  likedBy: Array<string>;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [displayLikes, setDisplayLikes] = useState(initialLikes);
  const [animate, setAnimate] = useState(false);
  const previousLikesRef = useRef(initialLikes);

  const { user } = useAuthStore();
  const router = useRouter();

  if(!user) return;

  const userId = user._id;

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    const res = await fetch(`/api/posts/${slug}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });

    const data = await res.json();

    if (data.success) {
      // Store previous likes for animation
      previousLikesRef.current = likes;
      
      // Update the actual likes
      setLikes(data.likes);
      
      // Start animation
      setAnimate(true);
      
      // Update liked state
      setIsLiked(prev => !prev);
      
      // Reset animation after it completes
      setTimeout(() => {
        setAnimate(false);
        previousLikesRef.current = data.likes;
      }, 300);
    }

    setLoading(false);
  };

  // Animate the number change
  useEffect(() => {
    if (animate) {
      const duration = 300; // ms
      const start = previousLikesRef.current;
      const end = likes;
      const steps = 20;
      const stepTime = duration / steps;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(start + (end - start) * easeOut);
        
        setDisplayLikes(currentValue);
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setDisplayLikes(end);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    } else {
      setDisplayLikes(likes);
    }
  }, [animate, likes]);

  useEffect(() => {
    if (likedBy.includes(user._id)) {
      setIsLiked(true);
    }
  }, [likedBy]);

  return (
    <div className="flex items-center gap-1">
      <i
        className={`text-[22px] text-[#9E3B3B] cursor-pointer transition-all duration-300 ${
          isLiked 
            ? "bx bxs-heart scale-110" 
            : "bx bx-heart"
        } ${loading ? "opacity-50" : ""}`}
        onClick={handleLike}
      ></i>
      
      <div className="relative">
        {/* Previous number sliding out */}
        <p 
          className={`text-[22px] text-[#9E3B3B] transition-all duration-300 absolute ${
            animate 
              ? isLiked 
                ? "opacity-0 -translate-y-2 scale-90" 
                : "opacity-0 translate-y-2 scale-90"
              : "opacity-0"
          }`}
        >
          {previousLikesRef.current}
        </p>
        
        {/* Current number sliding in */}
        <p 
          className={`text-[22px] text-[#9E3B3B] transition-all duration-300 ml-1.5 ${
            animate 
              ? isLiked 
                ? "translate-y-0 opacity-100" 
                : "translate-y-0 opacity-100"
              : ""
          }`}
        >
          {displayLikes}
        </p>
      </div>
    </div>
  );
}