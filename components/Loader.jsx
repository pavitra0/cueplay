export default function Loader() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
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