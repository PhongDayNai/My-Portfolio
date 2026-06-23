import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone'
};

module.exports = {
  allowedDevOrigins: ['192.168.0.105'],
}

export default nextConfig;
