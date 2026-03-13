"use client"

import { useState } from "react"
import Image from "next/image"
import { Headphones, Play, Clock, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Podcast {
  id: string
  title: string
  description: string
  image: string
  duration: string
  episode: number
  audio: string
}

// Liste des podcasts
const podcasts: Podcast[] = [
  {
    id: "1",
    title: "La Matinale - Programme du jour",
    description: "Retrouvez l'actualité du matin et les sujets qui font l'opinion",
    image: "/images/matinale.jpg",
    duration: "1:45:30",
    episode: 245,
    audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/matinale-cIaDrgqSuVYs1nWZ1nIo8G9NHr0Vl6.mp3",
  },
  {
    id: "2",
    title: "Culture et Patrimoine Haïtien",
    description: "Explorez la richesse culturelle et l'héritage haïtien avec nos experts",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    duration: "52:18",
    episode: 180,
    audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/culture-hD2byTE9Vm6GJfBClvyv5RvhrELgJK.mp3",
  },
  {
    id: "3",
    title: "Débat Politique et Société",
    description: "Analyse approfondie des enjeux politiques contemporains",
    image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=400&h=300&fit=crop",
    duration: "1:23:45",
    episode: 120,
    audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/matinale-cIaDrgqSuVYs1nWZ1nIo8G9NHr0Vl6.mp3",
  },
  {
    id: "4",
    title: "Sport et Loisirs",
    description: "Les derniers résultats sportifs et les événements marquants",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop",
    duration: "58:22",
    episode: 95,
    audio: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/culture-hD2byTE9Vm6GJfBClvyv5RvhrELgJK.mp3",
  },
]

// Double array pour le défilement infini
const duplicatedPodcasts = [...podcasts, ...podcasts]

export function PodcastsSection() {
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null)

  return (
    <section id="podcasts" className="bg-background py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Podcasts & Replays
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Écoutez nos émissions en replay
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Retrouvez toutes nos émissions quand vous le souhaitez
          </p>
        </div>

        {/* Carousel Podcast */}
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

          <div className="flex overflow-hidden">
            <div className="flex animate-scroll-podcasts gap-6">
              {duplicatedPodcasts.map((podcast, idx) => (
                <div
                  key={`${podcast.id}-${idx}`}
                  className="flex w-64 flex-shrink-0 flex-col gap-2 rounded-xl bg-card p-4 shadow-md transition-all hover:shadow-xl"
                >
                  {/* Image Podcast */}
                  <div className="relative h-40 w-full overflow-hidden rounded-lg">
                    <Image
                      src={podcast.image}
                      alt={podcast.title}
                      fill
                      className="object-cover"
                    />

                    {/* Play button */}
                    <button
                      onClick={() => setCurrentPodcast(podcast)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                        <Play className="h-6 w-6 text-black" />
                      </div>
                    </button>

                    {/* Episode badge */}
                    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs text-white">
                      <Headphones className="h-3 w-3" />
                      Ép. {podcast.episode}
                    </div>
                  </div>

                  <h3 className="font-semibold text-foreground text-sm line-clamp-2">{podcast.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{podcast.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {podcast.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {currentPodcast && (
        <div className="fixed bottom-6 left-1/2 z-50 w-[95%] max-w-md -translate-x-1/2 rounded-xl bg-secondary p-4 shadow-xl">
          <div className="flex items-center justify-between text-secondary-foreground mb-2">
            <div className="flex items-center gap-2 text-sm">
              <Headphones className="h-4 w-4" />
              <span className="line-clamp-1">{currentPodcast.title}</span>
            </div>
            <button
              onClick={() => setCurrentPodcast(null)}
              className="text-secondary-foreground/70 hover:text-secondary-foreground"
            >
              <X size={18} />
            </button>
          </div>

          <audio controls autoPlay className="w-full">
            <source src={currentPodcast.audio} type="audio/mpeg" />
          </audio>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes scroll-podcasts {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-podcasts {
          animation: scroll-podcasts 40s linear infinite;
        }
        .animate-scroll-podcasts:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
