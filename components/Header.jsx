// 'use client';

// import { FilmIcon } from "lucide-react";
// import { Input } from "./ui/input";

// export default function Header() {
//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-md px-6 py-4 shadow-sm">
//       <div className="mx-auto flex max-w-7xl items-center justify-between">
//         {/* 🪧 Logo Section */}
//         <div className="flex items-center gap-2 text-teal-200">
//           <FilmIcon className="h-6 w-6 text-teal-300" />
//           <span className="text-xl font-semibold tracking-tight">MovieDB</span>
//         </div>

//         {/* 🔍 Search Bar */}
//         <div className="flex items-center gap-4">
//           <Input
//             type="text"
//             placeholder="Search movies..."
//             className="w-52 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-white placeholder:text-zinc-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/40 transition"
//           />
//         </div>
//       </div>
//     </header>
//   );
// }
'use client';

import { FilmIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border border-teal-100/10 bg-black/30 backdrop-blur-md px-6 py-4 rounded-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* 🪧 Logo */}
        <div className="flex items-center gap-2 text-teal-200">
          <FilmIcon className="h-6 w-6 text-teal-300" />
          <span className="text-xl font-semibold tracking-tight">MovieDB</span>
        </div>

    
      </div>
    </header>
  );
}
