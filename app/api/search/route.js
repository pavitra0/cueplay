// app/api/search/route.js
import { fetchFromTMDB } from "@/lib/tmdb";

export const config = {
  runtime: "nodejs",
  regions: ["iad1"],
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ error: "Query is required" }), {
      status: 400,
    });
  }

  try {
    const data = await fetchFromTMDB("search/multi", { query });
    return new Response(JSON.stringify({ results: data.results }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Search error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
