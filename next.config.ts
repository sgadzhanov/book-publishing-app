import type { NextConfig } from "next"
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      // UploadThing CDN — stores user-uploaded profile images
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'qaia50i9a6.ufs.sh',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.ufs.sh',
        port: '',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
