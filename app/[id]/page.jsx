
import { getMovie } from "../../actions/getMovies";
import Image from "next/image";
import Link from "next/link";
import { BackButton } from "../../components/BackButton";
import {
  FaPlay,
  FaStar,
  FaClock,
} from "react-icons/fa";
import { Calendar, MoveLeft, MoveLeftIcon } from "lucide-react";
import { decode } from "html-entities";


export default async function MoviePage({ params }) {
let season = 1
let episode = 1

  const { shortData, mainData, posterData } = await getMovie(params.id);

  const poster = posterData.description[0]?.backdrops;


  
  if (!shortData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#18181c] via-[#23232a] to-black p-6">
  <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
    <div className="text-5xl font-bold mb-4 text-red-400 drop-shadow animate-pulse">🚫</div>
    <h1 className="text-2xl font-semibold mb-2 text-white">Movie Not Found</h1>
    <p className="text-center max-w-lg mb-6 text-red-200 font-medium">
      The IMDb ID you entered is incorrect or does not exist.
    </p>
 <BackButton><MoveLeftIcon /></BackButton>
  </div>
</div>

    );
  }

  const genres = Array.isArray(shortData.genre)
    ? shortData.genre
    : [shortData.genre];

  return (
  <div className="relative min-h-screen text-white">
    <div className="absolute top-4 left-4 z-50 text-white">
  
        <BackButton >
          <MoveLeft className="w-5 h-5" />
        </BackButton>
       </div>



    <img
      src={ poster[Math.floor(Math.random() * poster.length)]}
      alt={shortData.name}
      className="absolute inset-0 w-full h-full object-cover z-[-10] brightness-50"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50 z-[-5]" />

    {/* Content Wrapper */}
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col md:flex-row items-center gap-10 p-6 md:p-10 rounded-xl  max-w-5xl w-full">
        {/* Poster */}
        <div className="w-full md:w-[260px] flex-shrink-0 rounded-lg overflow-hidden flex justify-center items-center">
         {shortData?.image ? <Image
            src={shortData.image}
            alt={shortData.name}
            width={260}
            height={390}
            className="rounded-lg justify-center object-cover"
          />: "No Image Found"}
        </div>

        {/* Movie Details */}
        <div className="flex-1 text-center">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {shortData.name}
          </h1>

          {/* Metadata */}
      <div className="flex flex-wrap justify-center items-center gap-4 text-base mb-6">
  {/* Release Year Only */}
  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm transition hover:bg-white/20">
    <Calendar className="text-red-400 h-4 w-4" />
    <span className="font-semibold text-white drop-shadow">
      {new Date(shortData.datePublished).getFullYear()}
    </span>
  </div>

  {/* Rating - Bolded */}
  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm transition hover:bg-white/20">
    <FaStar className="text-red-400" />
    <span className="font-semibold text-white drop-shadow">
      {shortData.aggregateRating?.ratingValue || "N/A"}
      {shortData.aggregateRating?.ratingValue && (
        <span className="text-white/70">/10</span>
      )}
    </span>
  </div>

  {/* Real Duration (Assuming mainData has duration) */}
  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm transition hover:bg-white/20">
    <FaClock className="text-red-400 " />
    <span className="font-semibold text-white drop-shadow">
      {posterData.description[0]?.runtime + 'm' || "Unknown"}
    </span>
  </div>
</div>


          {/* Genres */}
          <div className="flex flex-wrap justify-center  gap-2 mb-4">
            {genres.map((genre, idx) => (
              <span
                key={idx}
                className="bg-red-700/60 text-red-300 px-3 py-1 text-xs rounded-md font-semibold"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6">{decode(shortData.description)}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              href={`/watch/${params.id}/${season}/${episode}`}
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-white text-black rounded-full w-12 h-12 hover:bg-gray-200 transition"
            >
              <FaPlay size={20} />
            </Link>

      
          </div>
        </div>
      </div>
    </div>
  </div>
);

}
