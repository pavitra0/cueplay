'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Search,
  Clapperboard,
  User,
} from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components/ui/input';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/categories', label: 'Browse', icon: Clapperboard },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (value) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    try {
      const res = await fetch(`/api/search?q=${value}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <>
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-3 rounded-2xl shadow-xl flex gap-8 justify-center items-center max-w-md w-[95%] sm:w-[400px]">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className="flex flex-col items-center text-xs group">
              <Icon
                size={22}
                className={`transition-all ${
                  active ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}
              />
              <span
                className={`mt-1 ${
                  active ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}

        {/* Search Dialog Trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex flex-col items-center text-xs group">
              <Search size={22} className="text-gray-400 group-hover:text-white" />
              <span className="mt-1 text-gray-400 group-hover:text-white">Search</span>
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-lg w-full bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-white text-lg">Search</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Search something..."
              className="mt-2 bg-white/10 text-white border-white/20 placeholder:text-gray-400"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
            <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2">
              {query && results.length > 0 ? (
                results.map((item) => (
                  <Link
                    key={item.id}
                    href={`/movie/${item.imdbId}`}
                    className="block p-3 bg-white/5 hover:bg-white/20 rounded-md text-white"
                  >
                    {item.title}
                  </Link>
                ))
              ) : query ? (
                <p className="text-sm text-gray-300">No results found.</p>
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
      </nav>
    </>
  );
}
