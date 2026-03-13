'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface HLSPlayerProps {
  streamUrl: string
  title: string
  isLive?: boolean
  autoPlay?: boolean
}

export function HLSPlayer({
  streamUrl,
  title,
  isLive = true,
  autoPlay = false,
}: HLSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [volume, setVolume] = useState([100])
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Support native HLS avec HTML5 video
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl
    } else if (streamUrl.includes('youtube.com') || streamUrl.includes('youtu.be')) {
      // Pour YouTube, on utilise iframe
      console.log('[v0] YouTube stream détecté')
    }

    video.volume = isMuted ? 0 : volume[0] / 100
  }, [streamUrl, volume, isMuted])

  const togglePlay = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        setIsLoading(true)
        try {
          await videoRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error('[v0] Erreur de lecture:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }
  }

  const toggleFullscreen = async () => {
    if (containerRef.current) {
      try {
        if (!isFullscreen) {
          await containerRef.current.requestFullscreen()
          setIsFullscreen(true)
        } else {
          await document.exitFullscreen()
          setIsFullscreen(false)
        }
      } catch (error) {
        console.error('[v0] Erreur fullscreen:', error)
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-lg overflow-hidden group animate-fade-in-up"
    >
      {/* Badge LIVE */}
      {isLive && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full animate-pulse-glow">
          <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
          <span className="text-xs font-semibold">EN DIRECT</span>
        </div>
      )}

      {/* Vidéo */}
      <video
        ref={videoRef}
        className="w-full aspect-video bg-black"
        onClick={togglePlay}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
      />

      {/* Contrôles */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Barre de progression */}
        <div className="mb-3">
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-full"
            aria-label="Volume"
          />
        </div>

        {/* Boutons de contrôle */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={togglePlay}
              className="hover:bg-white/20 button-glow"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin">
                  <Play className="h-5 w-5" />
                </div>
              ) : isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMuted(!isMuted)}
              className="hover:bg-white/20"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>

            <span className="text-sm font-medium">{volume[0]}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{title}</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleFullscreen}
              className="hover:bg-white/20"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
