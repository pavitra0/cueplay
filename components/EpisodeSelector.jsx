"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import {FiPlay } from "react-icons/fi"; 

export default function EpisodeSelector({
  id,
  currentSeason,
  currentEpisode,
  seasons = [],
}) {
  const validSeasons = useMemo(
    () =>
      Array.isArray(seasons)
        ? seasons.filter(
            (s) =>
              typeof s.season !== "undefined" &&
              s.season !== null &&
              Array.isArray(s.episodes) &&
              s.episodes.length > 0
          )
        : [],
    [seasons]
  );

  const initialSeason =
    (currentSeason && currentSeason.toString()) ||
    (validSeasons[0] && validSeasons[0].season.toString()) ||
    "";
  const [season, setSeason] = useState(initialSeason);

  const seasonData = useMemo(
    () => validSeasons.find((s) => s.season.toString() === season),
    [season, validSeasons]
  );
  const episodes = seasonData?.episodes || [];

  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredEpisodes = useMemo(
    () =>
      episodes.filter(
        (ep) =>
          ep.name?.toLowerCase().includes(search.toLowerCase()) ||
          ep.summary?.toLowerCase().includes(search.toLowerCase())
      ),
    [episodes, search]
  );

  const handleEpisodeClick = (epNumber) => {
     const targetUrl = `/watch/${id}/${season}/${epNumber}`;
  if (window.location.pathname === targetUrl) return;
  router.push(targetUrl);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 backdrop-blur-md  border border-white/20 shadow-xl rounded-xl flex flex-col gap-6">
      {/* Top Controls */}
      <div className="flex flex-row justify-between items-center gap-4">
        {/* Season Selector */}
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="bg-[#222] text-white px-4 py-2 rounded-md text-base outline-none"
        >
          {validSeasons.map((s) => (
            <option key={s.season} value={s.season.toString()}>
              Season {s.season}
            </option>
          ))}
        </select>

        {/* Search */}
        <div className="flex flex-row gap-2 items-center w-2/3">
          <input
            type="text"
            placeholder="Search episode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-[#222] text-white px-2 py-2 rounded-md "
          />
        </div>
      </div>

      {/* Episodes List */}
      <div className="flex flex-col gap-4 overflow-y-auto hide-scrollbar max-h-[30rem] pr-2">
        {filteredEpisodes.map((ep) => (
          <div
            onClick={() => handleEpisodeClick(ep.number.toString())}
            aria-label={`Go to Episode ${ep.number}: ${ep.name}`}
            key={ep.number}
            className="flex flex-row items-center bg-[#232323] cursor-pointer rounded-lg p-4 gap-4 shadow-sm hover:bg-[#2a2a2a] transition"
          >
            {/* Episode Image with overlay */}
            <div className="relative w-28 h-20 flex-shrink-0 rounded-md overflow-hidden bg-black/40">
              {ep.image && ep.image.medium && (
                <img
                  src={ep.image.medium}
                  alt={ep.name}
                  className="object-cover w-full h-full"
                />
              )}
              {/* Play icon overlay */}
              <span className="absolute inset-0 flex items-center justify-center">
                <FiPlay className="text-white/80 text-2xl bg-black/50 rounded-full p-1" />
              </span>
              {/* Episode number badge */}
              <span className="absolute bottom-2 left-2 bg-black/80 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold border border-white/20">
                {ep.number}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="font-bold text-lg text-white mb-1">{ep.name}</div>
              <div className="text-sm text-gray-300 line-clamp-2">
                {ep.summary
                  ? ep.summary.replace(/<[^>]+>/g, "")
                  : "No description available."}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
