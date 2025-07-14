import { getMovie } from "@/actions/getMovies";
import { fetchTMDBData } from "@/actions/playerFetch";
import { BackButton } from "@/components/BackButton";
import EpisodeSelector from "@/components/EpisodeSelector";
import organizeEpisodes from "@/lib/episodesFunction";
import { getEpisodes } from "@/lib/tvMaze";
import { MoveLeft, MoveLeftIcon } from "lucide-react";

export default async function VideoPlayerPage({ params }) {
  const { id, season, episode } = await params;
  const safeSeason = Math.max(1, parseInt(season || "1") || 1);
  const safeEpisode = Math.max(1, parseInt(episode || "1") || 1);

  let shortData, mainData, posterData, poster, type;
  let episodesData,
    formatedEpisodes = null;

  try {
    ({ shortData, mainData, posterData } = await getMovie(id));
    type = shortData?.["@type"];
    console.log("short", shortData, "main", mainData);

    if (type === "TVSeries") {
      episodesData = await getEpisodes(
        shortData.alternateName || shortData.name
      );
      formatedEpisodes = episodesData?._embedded?.episodes
        ? organizeEpisodes(episodesData._embedded.episodes)
        : { seasons: [] };
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#18181c] via-[#23232a] to-black p-6">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
          <div className="text-5xl font-bold mb-4 text-red-400 drop-shadow animate-pulse">
            🚫
          </div>
          <h1 className="text-2xl font-semibold mb-2 text-white">
            Movie Not Found
          </h1>
          <p className="text-center max-w-lg mb-6 text-red-200 font-medium">
            The IMDb ID you entered is incorrect or does not exist.
          </p>
          <BackButton>
            <MoveLeftIcon />
          </BackButton>
        </div>
      </div>
    );
  }

  poster = posterData?.description[0]?.backdrops;
  const results = await fetchTMDBData(
    shortData.alternateName || shortData.name
  );
  const playerId = results[0]?.id || null; // Safely get first result's ID

  console.log("playerId", playerId);

  const getVideoUrl = () => {
    if (!id) return "";
    if (type === "Movie") {
      return `https://vidora.su/movie/${id}?colour=ff384c&autoplay=true&autonextepisode=true&backbutton=https%3A%2F%2Fcueplay.vercel.app%2F&pausescreen=true`;
    } else if (type === "TVSeries") {
      return `https://vidora.su/tv/${id}/${safeSeason}/${safeEpisode}?colour=ff384c&autoplay=true&autonextepisode=true&backbutton=https%3A%2F%2Fcueplay.vercel.app%2F&pausescreen=true`;
    }
    return "";
  };
  // const getVideoUrl = () => {
  //   if (!id) return "";
  //   if (type === "Movie") {
  //     return `https://player.videasy.net/movie/${id}`;
  //   } else if (type === "TVSeries") {
  //     return `https://vidora.su/tv/${id}/${safeSeason}/${safeEpisode}?colour=ff384c&autoplay=true&autonextepisode=true&backbutton=https%3A%2F%2Fcueplay.vercel.app%2F&pausescreen=true`;
  //   }
  //   return "";
  // };

  return (
    <div className="relative min-h-screen w-full  flex flex-col items-center justify-center py-8 px-2">
      {poster && (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <img
            src={poster[Math.floor(Math.random() * poster.length)]}
            alt={shortData.name}
            className="w-full h-full object-cover blur brightness-100 scale-100 select-none"
            style={{ transform: "scale(1.1)" }} // Ensures scale even if Tailwind class not present
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
      <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border-2 mt-14 border-white/20 shadow-2xl bg-black/80 mb-8">
        <iframe
          src={getVideoUrl()}
          allowFullScreen
          className="w-full h-full"
          title="Video Player"
        />
      </div>

      {/* Episode Selector */}
      {type === "TVSeries" && formatedEpisodes && (
        <div className="w-full max-w-3xl mt-0">
          <EpisodeSelector
            id={id}
            currentSeason={safeSeason}
            currentEpisode={safeEpisode}
            seasons={formatedEpisodes.seasons}
          />
        </div>
      )}
    </div>
  );
}
