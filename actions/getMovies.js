"use server";

export async function getMovie(id) {
  if (!id || typeof id !== "string" || !id.trim()) {
    return { error: "Movie ID is required" };
  }

  try {
    // Fetch movie details
    const res = await fetch(
      `https://imdb.iamidiotareyoutoo.com/search?tt=${encodeURIComponent(id)}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return { error: `Failed to fetch movie details: ${res.status} ${res.statusText}` };
    }

    const data = await res.json().catch(() => null);
    if (!data) {
      return { error: "Invalid JSON response from movie details" };
    }

    const shortData = data.short;
    const mainData = data.main;

    if (!shortData?.name) {
      return { shortData: null, mainData: null, posterData: null };
    }

    // Fetch poster data
    const posterResponse = await fetch(
      `https://imdb.iamidiotareyoutoo.com/justwatch?q=${encodeURIComponent(shortData.name)}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );

    if (!posterResponse.ok) {
      return { shortData, mainData, posterData: null, error: "Poster fetch failed" };
    }

    const posterData = await posterResponse.json().catch(() => null);

    return { shortData, mainData, posterData };

  } catch (err) {
    // Catch network or unexpected errors
    return { error: `Network error: ${err.message}`, shortData: null, mainData: null, posterData: null };
  }
}
