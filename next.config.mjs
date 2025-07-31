/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ 
      protocol:'https',
      hostname:"m.media-amazon.com",
     },{ 
      protocol:'https',
      hostname:"banner2.cleanpng.com",
     },{ 
      protocol:'https',
      hostname:"static.tvmaze.com",
     },
     {
      protocol:'https',
      hostname:'images.justwatch.com'
     },
     {
      protocol:'https',
      hostname:'image.tmdb.org'
     }
    ],
  },
};

export default nextConfig;
