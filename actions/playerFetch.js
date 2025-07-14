export async function fetchTMDBData(query) {
  try {
    const res = await fetch(`/api/get-id?query=${encodeURIComponent(query)}`);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to fetch data');
    }

    const data = await res.json();

    console.log(data)
    // If you're expecting results array
    if (data && Array.isArray(data)) {
      return data // Return full list of search results
    }

    // Fallback
    return [];
  } catch (error) {
    console.error('Error fetching TMDB data:', error.message);
    return [];
  }
}
