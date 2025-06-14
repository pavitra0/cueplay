function organizeEpisodes(episodes) {
  // First, group episodes by season
  const seasonsMap = episodes.reduce((acc, episode) => {
    const seasonNumber = episode.season;
    if (!acc[seasonNumber]) {
      acc[seasonNumber] = [];
    }
    acc[seasonNumber].push({
      id: episode.id,
      name: episode.name,
      number: episode.number,
      url: episode.url,
      airdate: episode.airdate,
      airstamp: episode.airstamp,
      airtime: episode.airtime,
      runtime: episode.runtime,
      rating: episode.rating,
      summary: episode.summary,
      image: episode.image,
      _links: episode._links
    });
    return acc;
  }, {});

  // Convert the map to an array of season objects
  const seasons = Object.keys(seasonsMap)
    .sort((a, b) => Number(a) - Number(b))
    .map(seasonNumber => ({
      season: Number(seasonNumber),
      episodes: seasonsMap[seasonNumber].sort((a, b) => a.number - b.number)
    }));

  return { seasons };
}

export default organizeEpisodes;
