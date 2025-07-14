"use server";

export async function searchMovies(query) {
  if (!query || typeof query !== "string" || !query.trim()) {
    throw new Error("Query is required");
  }

  const url = `https://imdb.iamidiotareyoutoo.com/justwatch?q=${encodeURIComponent(query)}`;

  let response;
  try {
    response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });
  } catch (err) {
    throw new Error("Network error while fetching movies");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  try {
    return await response.json();
  } catch (err) {
    throw new Error("Invalid JSON response from movie search");
  }
}


export async function searchMoviesTmdb(query) {
  if (!query || typeof query !== "string" || !query.trim()) {
    throw new Error("Query is required");
  }

  const apiKey = process.env.TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${apiKey}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to search movies: ${res.status}`);
    }

    const data = await res.json();

    // Simplify results
    console.log(data)
    return data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    }));
  } catch (err) {
    console.error("TMDB searchMovies error:", err.message);
   
  }
}

searchMoviesTmdb('the walking dead')