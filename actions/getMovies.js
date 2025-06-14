"use server";

export async function getMovie(id) {
  if (!id || typeof id !== "string" || !id.trim()) {
    throw new Error("Movie ID is required");
  }

  // Fetch movie details
  let res;
  try {
    res = await fetch(
      `https://imdb.iamidiotareyoutoo.com/search?tt=${encodeURIComponent(id)}`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );
  } catch (err) {
    throw new Error("Network error while fetching movie details");
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch movie details: ${res.status} ${res.statusText}`);
  }

  let data;
  try {
    data = await res.json();
  } catch (err) {
    throw new Error("Invalid JSON response from movie details");
  }

  const shortData = data.short;
  const mainData = data.main;

  // Defensive: If no movie found, return early
  if (!shortData?.name) {
    return { shortData: null, mainData: null, posterData: null };
  }

  // Fetch poster data using the movie's name
  let posterResponse;
  try {
    posterResponse = await fetch(
      `https://imdb.iamidiotareyoutoo.com/justwatch?q=${encodeURIComponent(shortData.name)}`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );
  } catch (err) {
    throw new Error("Network error while fetching poster");
  }

  if (!posterResponse.ok) {
    throw new Error(`Failed to fetch poster: ${posterResponse.status} ${posterResponse.statusText}`);
  }

  let posterData;
  try {
    posterData = await posterResponse.json();
  } catch (err) {
    throw new Error("Invalid JSON response from poster fetch");
  }

  return { shortData, mainData, posterData };
}
