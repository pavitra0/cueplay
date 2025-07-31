"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MovieCard from "./MovieCard";
import Loader from "./Loader";
import { searchMovies } from "@/actions/searchMovies";

const CATEGORIES = [
  { key: "popular", title: "🔥 Popular" },
  { key: "top_rated", title: "⭐ Top Rated" },
  { key: "upcoming", title: "🎟️ Upcoming" },
  { key: "now_playing", title: "🎬 Now Playing" },
];

export default function CategorySection() {
  const router = useRouter();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingCardId, setLoadingCardId] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      const results = {};
      try {
        await Promise.all(
          CATEGORIES.map(async ({ key }) => {
            const res = await fetch(`/api/movies?category=${key}`);
            const json = await res.json();
            results[key] = json.results || [];
          })
        );
        setData(results);
      } catch (e) {
        console.error("Error fetching categories:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  const handleCardClick = async (movie) => {
    setLoadingCardId(movie.id);

    try {
      const data = await searchMovies(movie.title || movie.name);
      const imdbId = data?.description?.[0]?.imdbId;

      if (imdbId) {
        router.push(`/${imdbId}`);
      } else {
        console.warn("IMDb ID not found for:", movie);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoadingCardId(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-16">
      {CATEGORIES.map(({ key, title }) => {
        const movies = data[key] || [];
        if (!movies.length) return null;

        return (
          <div key={key} className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              {title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isLoading={loadingCardId === movie.id}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
