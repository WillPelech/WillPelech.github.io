/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Will_Pelech.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Will_Pelech.github.io/' : '',
}

module.exports = nextConfig 