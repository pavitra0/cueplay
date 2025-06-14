"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function BackButton({ children, className = "" }) {
  const router = useRouter();

  return (
    <Button
      type="button"
      aria-label="Go back"
      className={`
        !p-0
        flex items-center justify-center
        w-10 h-10
        rounded-full
        bg-white/15
        backdrop-blur-md
        border border-white/30
        text-white
        shadow-lg
        transition-all
        hover:bg-white/25
        hover:shadow-xl
        focus:ring-2 focus:ring-white/40 focus:outline-none
        active:scale-95
        ${className}
      `}
      onClick={() => router.back()}
    >
      {children}
    </Button>
  );
}
