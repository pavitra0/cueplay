export async function getEpisodes(showQuery) {
  // Step 1: Search for the show by name
  const searchUrl = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(showQuery)}&embed=episodes`;

  const searchRes = await fetch(searchUrl, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!searchRes.ok) {
    throw new Error("Failed to fetch show data");
  }

  const episodesData = searchRes.json()

  return episodesData

}