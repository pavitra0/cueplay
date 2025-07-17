export const config = {
  runtime: "nodejs",
  regions: ["iad1"], // US East region to avoid TMDB block in India
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ error: "Query is required" }), {
      status: 400,
    });
  }

  const apiKey = process.env.TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      console.error("TMDB Error:", res.status, errorText);
      return new Response(JSON.stringify({ error: `TMDB error: ${res.status}` }), {
        status: res.status,
      });
    }

    const data = await res.json();

    // ✅ Return full results array
    return new Response(JSON.stringify({ results: data.results }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Fetch failed:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch from TMDB" }), {
      status: 500,
    });
  }
}
