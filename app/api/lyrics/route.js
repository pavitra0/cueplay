export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const artist = searchParams.get("artist");
  const title = searchParams.get("title");

  try {
    const res = await fetch(`https://dab.yeet.su/api/lyrics?artist=${artist}&title=${title}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": "https://google.com"
      },
      cache: "no-store"
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `Upstream error ${res.status}` }), { status: 502 });
    }

    const data = await res.json();
    return Response.json(data);

  } catch (err) {
    return new Response(JSON.stringify({ error: "Fetch failed", details: err.message }), { status: 500 });
  }
}
