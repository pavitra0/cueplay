"use client";

import Image from "next/image";
import { Card, CardTitle } from "./ui/card";

export default function MovieCard({ movie, loadingCardId, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  return (
    <Card className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg transition">
      <div className="group block cursor-pointer" onClick={handleClick}>
        <div className="relative w-full aspect-[2/3]">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // or backdrop_path
              alt={movie.title || movie.name}
              width={300}
              height={450}
              className="rounded-xl w-full h-auto object-cover"
               sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
              priority={loadingCardId === movie.id}
              placeholder="blur"
              blurDataURL="/placeholder.png"
            />
          ) : (
            <div className="text-white text-center pt-10">No Image</div>
          )}
        </div>

        <div className="absolute inset-0 flex flex-col justify-end bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 pointer-events-none">
          <CardTitle className="text-white text-lg truncate">
            {movie.title || movie.name}
          </CardTitle>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{movie.media_type?.toUpperCase() || "Movie"}</span>
            <span>
              {(movie.release_date || movie.first_air_date || "").slice(0, 4)}
            </span>
          </div>
        </div>

        {loadingCardId === movie.id && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-2xl z-50">
            <div className="loader">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
              <div className="bar4"></div>
              <div className="bar5"></div>
              <div className="bar6"></div>
              <div className="bar7"></div>
              <div className="bar8"></div>
              <div className="bar9"></div>
              <div className="bar10"></div>
              <div className="bar11"></div>
              <div className="bar12"></div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
