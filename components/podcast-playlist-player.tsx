"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Shuffle,
  ListMusic,
  X,
  ChevronUp,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface Track {
  id: string
  title: string
  artist: string
  image: string
  duration: string
  audio: string
}

interface PodcastPlaylistPlayerProps {
  tracks: Track[]
  initialTrackIndex?: number
  onClose?: () => void
}

export function PodcastPlaylistPlayer({ 
  tracks, 
  initialTrackIndex = 0,
  onClose 
}: PodcastPlaylistPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(console.error)
    }
  }, [currentTrackIndex, isPlaying])

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        await audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    } else {
      playNext()
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setIsMuted(value[0] === 0)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.7
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const playNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * tracks.length)
      setCurrentTrackIndex(randomIndex)
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
    }
  }

  const playPrevious = () => {
    if (currentTime > 3) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
      }
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
    }
  }

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index)
    setIsPlaying(true)
    setShowPlaylist(false)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-lg"
        >
          <Play className="h-4 w-4" />
          {currentTrack.title.slice(0, 20)}...
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl bg-secondary shadow-2xl md:inset-x-auto">
      <audio
        ref={audioRef}
        src={currentTrack.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Main Player */}
      <div className="p-4">
        {/* Header with controls */}
        <div className="mb-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(true)}
            className="h-8 w-8 text-secondary-foreground/70 hover:text-secondary-foreground"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={cn(
                "h-8 w-8 text-secondary-foreground/70 hover:text-secondary-foreground",
                showPlaylist && "text-accent"
              )}
            >
              <ListMusic className="h-4 w-4" />
            </Button>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-secondary-foreground/70 hover:text-secondary-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Track Info */}
        <div className="mb-4 flex items-center gap-4">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={currentTrack.image}
              alt={currentTrack.title}
              fill
              className="object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-4 w-1 animate-pulse rounded-full bg-accent"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="truncate font-semibold text-secondary-foreground">
              {currentTrack.title}
            </h4>
            <p className="truncate text-sm text-secondary-foreground/70">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-xs text-secondary-foreground/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Left controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsShuffle(!isShuffle)}
              className={cn(
                "h-8 w-8 text-secondary-foreground/70",
                isShuffle && "text-accent"
              )}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
          </div>

          {/* Center controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={playPrevious}
              className="h-10 w-10 text-secondary-foreground"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              onClick={togglePlay}
              className="h-12 w-12 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 pl-0.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={playNext}
              className="h-10 w-10 text-secondary-foreground"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsRepeat(!isRepeat)}
              className={cn(
                "h-8 w-8 text-secondary-foreground/70",
                isRepeat && "text-accent"
              )}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Volume */}
        <div className="mt-3 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="h-8 w-8 text-secondary-foreground/70"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>

      {/* Playlist Panel */}
      {showPlaylist && (
        <div className="max-h-64 overflow-y-auto border-t border-secondary-foreground/10 p-2">
          <h5 className="mb-2 px-2 text-sm font-semibold text-secondary-foreground/70">
            Playlist ({tracks.length} titres)
          </h5>
          {tracks.map((track, index) => (
            <button
              key={track.id}
              onClick={() => selectTrack(index)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-secondary-foreground/10",
                index === currentTrackIndex && "bg-accent/20"
              )}
            >
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded">
                <Image
                  src={track.image}
                  alt={track.title}
                  fill
                  className="object-cover"
                />
                {index === currentTrackIndex && isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-2 w-0.5 animate-pulse rounded-full bg-accent"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn(
                  "truncate text-sm font-medium",
                  index === currentTrackIndex ? "text-accent" : "text-secondary-foreground"
                )}>
                  {track.title}
                </p>
                <p className="truncate text-xs text-secondary-foreground/60">
                  {track.artist}
                </p>
              </div>
              <span className="text-xs text-secondary-foreground/50">
                {track.duration}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
