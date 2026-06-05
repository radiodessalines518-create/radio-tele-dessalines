'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface RadioPlayerProps {
  src: string
  title: string
  artist?: string
  thumbnail?: string
}

export function RadioPlayer({
  src,
  title,
  artist,
  thumbnail,
}: RadioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([80])
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 🎧 Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100
    }
  }, [volume, isMuted])

  // 🎧 Play / Pause
  const togglePlay = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    setIsLoading(true)

    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error('Erreur lecture radio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 🎧 Mute
  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  return (
    <div className="w-full bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20 backdrop-blur-sm">

      {/* 🎧 AUDIO STREAM */}
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        crossOrigin="anonymous"
      />

      {/* INFO */}
      <div className="flex items-center gap-4 mb-4">
        {thumbnail && (
          <div className="w-16 h-16 rounded-lg overflow-hidden">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
            />

            {isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-semibold text-foreground truncate">
            {title}
          </h3>
          {artist && (
            <p className="text-sm text-muted-foreground">
              {artist}
            </p>
          )}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-between">

        {/* PLAY BUTTON */}
        <Button
          size="icon"
          onClick={togglePlay}
          disabled={isLoading}
          className={cn(
            "bg-primary hover:bg-primary/90 text-white"
          )}
        >
          {isLoading ? (
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
          ) : isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>

        {/* VOLUME */}
        <div className="flex items-center gap-2">

          <Button
            size="icon"
            variant="ghost"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>

          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
}