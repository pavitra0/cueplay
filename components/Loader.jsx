export default function Loader() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg animate-pulse flex flex-col"
        >
          <div className="w-full aspect-[2/3] bg-gray-800 rounded-2xl p-2 mb-3" />
         
        </div>
      ))}
    </div>
  );
}