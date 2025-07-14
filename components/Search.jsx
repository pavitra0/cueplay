"use client";

import { useEffect, useState } from "react";
import { Card, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import Image from "next/image";
import { searchMovies, searchMoviesTmdb } from "../actions/searchMovies";
import Link from "next/link";
import Loader from "./Loader";

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCardId, setLoadingCardId] = useState(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        fetchMovies(query);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const savedQuery = localStorage.getItem("searchQuery") || "";
    const savedResults = JSON.parse(
      localStorage.getItem("searchResults") || "[]"
    );
    if (savedQuery) setQuery(savedQuery);
    if (savedResults.length) setResults(savedResults);
  }, []);

  useEffect(() => {
    localStorage.setItem("searchQuery", query);
    localStorage.setItem("searchResults", JSON.stringify(results));
  }, [query, results]);

  async function fetchMovies(searchTerm) {
    setLoading(true);
    try {
      const movies = await searchMovies(searchTerm);
      setResults(movies.description || []);
       await searchMoviesTmdb(searchTerm)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleCardClick = (imdbId) => {
    setLoadingCardId(imdbId);
  };
  

  return (
    <div className="relative z-10 px-4 py-10 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-4">
            <Input
              className="flex-1 bg-white/10 text-white placeholder:text-gray-300 border border-white/30 text-center focus:ring-2 focus:ring-white/40 focus:outline-none transition-all"
              placeholder="Type movies or shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {results.map((movie) => (
              <Card
                key={movie["id"]}
                className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-0 overflow-hidden shadow-lg transition"
              >
                <Link
                  href={`/${movie["imdbId"]}`}
                  className="group block relative"
                  onClick={() => handleCardClick(movie["imdbId"])}
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden">
                    {movie["photo_url"] ? (
                      <Image
                        src={movie["photo_url"][0]}
                        alt={movie["title"]}
                        fill
                        className="object-cover rounded-2xl p-2 transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-white flex items-center justify-center transition-transform duration-500 group-hover:scale-110 object-cover">
                        Image Not Found
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 pointer-events-none">
                    <CardTitle className="text-white text-lg">
                      {movie["title"]}
                    </CardTitle>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400">
                        {movie["type"].charAt(0).toUpperCase() +
                          movie["type"].slice(1).toLowerCase()}
                      </p>
                      <p className="text-sm text-gray-400">
                        {movie['year']}
                      </p>
                    </div>
                  </div>

                  {loadingCardId === movie["imdbId"] && (
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
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
