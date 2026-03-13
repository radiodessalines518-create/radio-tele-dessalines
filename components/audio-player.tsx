'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface AudioPlayerProps {
  src: string
  title: string
  artist?: string
  thumbnail?: string
  onEnded?: () => void
}

export function AudioPlayer({
  src,
  title,
  artist,
  thumbnail,
  onEnded,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([80])
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleEnded = () => {
      setIsPlaying(false)
      onEnded?.()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('ended', handleEnded)

    audio.volume = isMuted ? 0 : volume[0] / 100

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [volume, isMuted, onEnded])

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        setIsLoading(true)
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error('[v0] Erreur de lecture audio:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }
  }

  const handleSeek = (newTime: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime[0]
      setCurrentTime(newTime[0])
    }
  }

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, currentTime - 15)
    }
  }

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, currentTime + 15)
    }
  }

  return (
    <div className="w-full bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 backdrop-blur-sm border border-primary/20 animate-fade-in-up">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Affichage des informations */}
      <div className="flex items-center gap-4 mb-4">
        {thumbnail && (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-lg">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-semibold text-foreground truncate">{title}</h3>
          {artist && <p className="text-sm text-muted-foreground">{artist}</p>}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-3 space-y-1">
        <Slider
          value={[currentTime]}
          onValueChange={handleSeek}
          max={duration || 100}
          step={0.1}
          className="w-full card-hover-subtle"
          aria-label="Position dans la lecture"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Contrôles */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={skipBackward}
            className="button-glow"
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            onClick={togglePlay}
            className="bg-primary hover:bg-primary/90 text-primary-foreground button-glow"
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
            onClick={skipForward}
            className="button-glow"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsMuted(!isMuted)}
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
            className="w-20"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  )
}
