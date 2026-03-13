"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, ExternalLink, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  youtubeId: string
}

// Vidéos avec ID YouTube pour intégration - Chaîne Radio Télé Dessalines
const videos: Video[] = [
  {
    id: "1",
    title: "Journal du soir - 10 mars 2026",
    thumbnail: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=350&h=200&fit=crop",
    duration: "25:30",
    youtubeId: "h_A-lDV8Ba4",
  },
  {
    id: "2",
    title: "Débat politique - Les enjeux économiques",
    thumbnail: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=350&h=200&fit=crop",
    duration: "45:15",
    youtubeId: "h_A-lDV8Ba4",
  },
  {
    id: "3",
    title: "Reportage: Agriculture à Dessalines",
    thumbnail: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=350&h=200&fit=crop",
    duration: "18:45",
    youtubeId: "JEUitgybSlA",
  },
  {
    id: "4",
    title: "Interview exclusive - Maire de Dessalines",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=350&h=200&fit=crop",
    duration: "32:00",
    youtubeId: "EPTskq-Wwcc",
  },
  {
    id: "5",
    title: "Culture: Carnaval 2026",
    thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=350&h=200&fit=crop",
    duration: "22:10",
    youtubeId: "7KJyw256DQM",
  },
  {
    id: "6",
    title: "Sport: Match de la semaine",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=350&h=200&fit=crop",
    duration: "15:20",
    youtubeId: "uGQPCywCKWc",
  },
]

export function VideosSection() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  return (
    <section id="videos" className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              Vidéos
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Nos dernières vidéos
            </h2>
            <p className="mt-2 text-muted-foreground">
              Retrouvez nos émissions, reportages et interviews
            </p>
          </div>
          <Button
            variant="outline"
            className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <a
              href="https://youtube.com/@radioteledessalines"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir la chaîne YouTube
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
        </div>

        {/* Videos Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <article
              key={video.id}
              className="group cursor-pointer overflow-hidden rounded-xl bg-card shadow-md transition-all hover:shadow-xl"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                    <Play className="ml-1 h-8 w-8" />
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                  {video.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* YouTube Video Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-accent"
              >
                <X className="h-8 w-8" />
                <span className="sr-only">Fermer</span>
              </button>
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <p className="mt-4 text-center text-white">{selectedVideo.title}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
