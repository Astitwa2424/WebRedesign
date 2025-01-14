import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Safely handle URL parsing for remote patterns
      ...(() => {
        try {
          if (!NEXT_PUBLIC_SERVER_URL) return []
          const url = new URL(NEXT_PUBLIC_SERVER_URL)
          return [
            {
              hostname: url.hostname,
              protocol: url.protocol.replace(':', ''),
            },
          ]
        } catch (e) {
          console.warn('Invalid URL in remotePatterns config, skipping:', e.message)
          return []
        }
      })(),
    ],
  },
  reactStrictMode: true,
  redirects,
  env: {
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    NEXT_PUBLIC_SERVER_URL: NEXT_PUBLIC_SERVER_URL,
  },
}

export default withPayload(nextConfig)
