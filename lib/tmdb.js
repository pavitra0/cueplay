// lib/tmdb.js
export async function fetchFromTMDB(path, params = {}) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB API key is missing");

  const url = new URL(`https://api.themoviedb.org/3/${path}`);
  url.searchParams.set("api_key", apiKey);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString());

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`TMDB error: ${res.status} - ${error}`);
  }

  return res.json();
}
