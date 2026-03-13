import { feed } from '@/lib/rss-feed'

export async function GET() {
  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=UTF-8',
      'Cache-Control': 'max-age=3600, must-revalidate',
    },
  })
}
