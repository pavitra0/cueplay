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
