import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: 'Radio Télé Dessalines | 96.7 FM - La voix de Dessalines',
  description: 'Radio Télé Dessalines est une institution médiatique créée le 15 mars 2005, située à Dessalines, berceau de l\'indépendance haïtienne. Écoutez en direct sur 96.7 FM et regardez nos émissions TV sur DC.TV 68.',
  keywords: ['Radio Dessalines', 'Télé Dessalines', 'Haiti', 'Actualités Haiti', '96.7 FM', 'Radio Haiti', 'DC.TV 68', 'Podcast Haiti'],
  generator: 'v0.app',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_HT',
    url: 'https://radioteledessalines.ht',
    siteName: 'Radio Télé Dessalines',
    title: 'Radio Télé Dessalines | 96.7 FM - La voix de Dessalines',
    description: 'Station de radio et télévision haïtienne. Écoutez en direct 96.7 FM et suivez nos actualités, débats politiques, sports et culture.',
    images: [
      {
        url: '/images/logo-rtd.png',
        width: 1200,
        height: 630,
        alt: 'Radio Télé Dessalines Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@radioteledessalines',
    title: 'Radio Télé Dessalines | 96.7 FM',
    description: 'La voix de Dessalines - Station de radio et télévision haïtienne',
    creator: '@radioteledessalines',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#C8102E',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Google AdSense - Remplacez ADSENSE_CLIENT_ID par votre ID */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXX'}`}
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BroadcastService',
              name: 'Radio Télé Dessalines',
              url: 'https://radioteledessalines.ht',
              logo: 'https://radioteledessalines.ht/images/logo-rtd.png',
              sameAs: [
                'https://www.facebook.com/radioteledessalines',
                'https://twitter.com/radioteledessalines',
                'https://youtube.com/@radioteledessalines',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+509-1234-5678',
                contactType: 'Customer Support',
              },
              description: 'Station de radio et télévision haïtienne. 96.7 FM et DC.TV 68',
              areaServed: 'HT',
              broadcastFrequency: '96.7 FM',
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
