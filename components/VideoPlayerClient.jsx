"use client";

import { useEffect, useState } from "react";
import { fetchTMDBData } from "@/actions/playerFetch";
import { BackButton } from "@/components/BackButton";
import EpisodeSelector from "@/components/EpisodeSelector";
import { MoveLeft } from "lucide-react";

export default function VideoPlayerClient({
  id,
  shortData,
  type,
  season,
  episode,
  poster,
  formatedEpisodes,
}) {
  const [tmdbId, setTmdbId] = useState(null);

  useEffect(() => {
    const cacheKey = `tmdbId-${id}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      setTmdbId(cached);
    } else {
      (async () => {
        const results = await fetchTMDBData(shortData.alternateName || shortData.name);
        const foundId = results?.[0]?.id;
        if (foundId) {
          setTmdbId(foundId);
          localStorage.setItem(cacheKey, foundId);
        }
      })();
    }
  }, [id, shortData]);

  const getVideoUrl = () => {
    if (!id || !tmdbId) return "";
    return type === "Movie"
      ? `https://player.vidpro.top/embed/movie/${tmdbId}`
      : `https://player.vidpro.top/embed/tv/${tmdbId}/${season}/${episode}`;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center py-8 px-2">
      {poster.length > 0 && (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <img
            src={poster[Math.floor(Math.random() * poster.length)]}
            alt={shortData.name}
            className="w-full h-full object-cover blur brightness-100 scale-100 select-none"
            style={{ transform: "scale(1.1)" }}
            draggable={false}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
      )}

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <BackButton>
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-2 shadow-lg hover:bg-white/20 transition">
            <MoveLeft className="w-5 h-5 text-white" />
          </div>
        </BackButton>
      </div>

      {/* Video Player */}
      {tmdbId && (
        <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border-2 mt-14 border-white/20 shadow-2xl bg-black/80 mb-8">
          <iframe
            src={getVideoUrl()}
            allowFullScreen
            className="w-full h-full"
            title="Video Player"
          />
        </div>
      )}

      {/* Episode Selector */}
      {type === "TVSeries" && formatedEpisodes && (
        <div className="w-full max-w-3xl mt-0">
          <EpisodeSelector
            id={id}
            currentSeason={season}
            currentEpisode={episode}
            seasons={formatedEpisodes.seasons}
          />
        </div>
      )}
    </div>
  );
}
