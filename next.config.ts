import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/fantasy", destination: "/world-cup", permanent: true },
      {
        source: "/fantasy/matches",
        destination: "/world-cup/predict",
        permanent: true,
      },
      {
        source: "/fantasy/leaderboard",
        destination: "/world-cup/leaderboard",
        permanent: true,
      },
      {
        source: "/fantasy/dashboard",
        destination: "/world-cup/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
