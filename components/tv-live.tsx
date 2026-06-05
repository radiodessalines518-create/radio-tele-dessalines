"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tv, Maximize2, Volume2, VolumeX } from "lucide-react"

// Configuration - Remplacer par votre URL de stream
const TV_STREAM_CONFIG = {
  youtubeVideoId: "hqzu1b30VXY", // ID de la vidéo YouTube live - A remplacer
  // Ou utiliser une URL de stream direct:
  // streamUrl: "https://votre-stream-url.m3u8"
}

export function TvLive() {
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    const videoContainer = document.getElementById("tv-live-container")
    if (videoContainer) {
      if (!document.fullscreenElement) {
        videoContainer.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  return (
    <section id="tv-live" className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            <span className="relative mr-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
            LIVE TV
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            Regarder la TV en direct
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            Suivez Télé Dessalines en direct sur votre écran
          </p>
        </div>

        {/* Video Player Container */}
        <div 
          id="tv-live-container"
          className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        >
          {/* Live Badge */}
          <div className="absolute left-4 top-4 z-10">
            <Badge className="bg-primary px-3 py-1 text-sm font-bold text-white">
              <span className="relative mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>
              LIVE TV
            </Badge>
          </div>

          {/* YouTube Embed Player */}
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${TV_STREAM_CONFIG.youtubeVideoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
              title="Radio Télé Dessalines - Live TV"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between bg-black/90 px-4 py-3">
            <div className="flex items-center gap-3">
              <Tv className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-semibold text-white">Télé Dessalines</p>
                <p className="text-xs text-white/60">Canal 17 | DC.TV 68</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="h-9 w-9 text-white hover:bg-white/20 hover:text-white"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="h-9 w-9 text-white hover:bg-white/20 hover:text-white"
              >
                <Maximize2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white/10 p-4 text-center">
            <p className="text-2xl font-bold text-accent">24/7</p>
            <p className="text-sm text-white/70">Diffusion continue</p>
          </div>
          <div className="rounded-xl bg-white/10 p-4 text-center">
            <p className="text-2xl font-bold text-accent">HD</p>
            <p className="text-sm text-white/70">Qualité vidéo</p>
          </div>
          <div className="rounded-xl bg-white/10 p-4 text-center">
            <p className="text-2xl font-bold text-accent">Canal 17</p>
            <p className="text-sm text-white/70">Chaîne locale</p>
          </div>
        </div>
      </div>
    </section>
  )
}
