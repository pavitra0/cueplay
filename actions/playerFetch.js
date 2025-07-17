export async function fetchTMDBData(query) {
  try {
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer
      ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      : '';

    const res = await fetch(`${baseUrl}/api/get-id?query=${encodeURIComponent(query)}`);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to fetch data');
    }

    const data = await res.json();

    if (data.results && Array.isArray(data.results)) {
      return data.results;
    }

    return [];
  } catch (error) {
    console.error('Error fetching TMDB data:', error.message);
    return [];
  }
}
