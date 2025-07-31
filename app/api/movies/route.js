// app/api/movies/route.js
import { fetchFromTMDB } from "@/lib/tmdb";

export const config = {
  runtime: "nodejs",
  regions: ["iad1"],
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const allowed = ["popular", "top_rated", "now_playing", "upcoming"];
  if (!category || !allowed.includes(category)) {
    return new Response(JSON.stringify({ error: "Invalid category" }), {
      status: 400,
    });
  }

  try {
    const data = await fetchFromTMDB(`movie/${category}`);
    return new Response(JSON.stringify({ results: data.results }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Category error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
