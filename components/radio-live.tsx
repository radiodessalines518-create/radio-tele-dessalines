"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

// Configuration du streaming - Remplacer par l'URL du serveur de streaming
const STREAM_CONFIG = {
  streamUrl: "https://stream.zeno.fm/5dcar3tdcd0uv",
  frequency: "96.7",
  channel: "17",
  dcTv: "68",
};

export function RadioLive() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([80])
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100
    }
  }, [volume, isMuted])

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
          console.error("[v0] Erreur de lecture:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <section id="radio-live" className="bg-secondary py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-secondary to-primary/20 p-1">
          <div className="rounded-xl bg-secondary/95 p-6 backdrop-blur-sm md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
              {/* Logo RTD with Premium Glow Effect */}
              <div className="relative flex items-center justify-center">
                {isPlaying && (
                  <div className="absolute h-36 w-36 rounded-full radio-conic-ring radio-ring-rotating md:h-44 md:w-44 opacity-60" />
                )}
                {isPlaying && (
                  <div className="absolute h-32 w-32 rounded-full border-2 border-primary/50 radio-ring-pulsing md:h-40 md:w-40" />
                )}
                {isPlaying && (
                  <>
                    <div className="absolute h-28 w-28 rounded-full border border-primary/40 sound-wave md:h-36 md:w-36" />
                    <div className="absolute h-28 w-28 rounded-full border border-accent/30 sound-wave-delayed-1 md:h-36 md:w-36" />
                    <div className="absolute h-28 w-28 rounded-full border border-primary/20 sound-wave-delayed-2 md:h-36 md:w-36" />
                  </>
                )}
                <div
                  className={cn(
                    "relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm md:h-36 md:w-36 transition-all duration-300",
                    isPlaying && "radio-glow-active"
                  )}
                >
                  <Image
                    src="/images/logo-rtd.png"
                    alt="Radio Télé Dessalines"
                    width={120}
                    height={120}
                    className={cn(
                      "h-24 w-auto md:h-28 transition-transform duration-300",
                      isPlaying && "scale-105"
                    )}
                  />
                </div>
              </div>

              {/* Info & Controls */}
              <div className="flex flex-1 flex-col items-center gap-4 text-center md:items-start md:text-left">
                <div>
                  <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                      En direct
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
                    Radio Télé Dessalines
                  </h2>
                  <p className="text-lg text-accent">{STREAM_CONFIG.frequency} FM</p>
                  <p className="mt-1 text-sm text-white/60">
                    Chaine {STREAM_CONFIG.channel} | DC.TV {STREAM_CONFIG.dcTv}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={togglePlay}
                    size="lg"
                    disabled={isLoading}
                    className={cn(
                      "h-14 w-14 rounded-full p-0 transition-all hover:scale-105",
                      isPlaying
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    {isLoading ? (
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="ml-1 h-6 w-6" />
                    )}
                    <span className="sr-only">{isPlaying ? "Pause" : "Lecture"}</span>
                  </Button>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      <span className="sr-only">{isMuted ? "Activer le son" : "Couper le son"}</span>
                    </Button>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="w-24 md:w-32"
                    />
                  </div>
                </div>
              </div>

              {/* Frequency Display */}
              <div className="hidden rounded-lg bg-black/30 p-4 text-center lg:block">
                <div className="font-mono text-4xl font-bold text-accent">{STREAM_CONFIG.frequency}</div>
                <div className="text-sm text-white/60">FM</div>
                <div className="mt-2 border-t border-white/10 pt-2">
                  <div className="text-xs text-white/40">Chaine {STREAM_CONFIG.channel}</div>
                  <div className="text-xs text-white/40">DC.TV {STREAM_CONFIG.dcTv}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={STREAM_CONFIG.streamUrl} preload="none" />

        {/* Spotify Playlist Section */}
        <div className="mt-8">
          <div className="rounded-2xl bg-gradient-to-r from-[#1DB954]/20 via-secondary to-[#1DB954]/20 p-1">
            <div className="rounded-xl bg-secondary/95 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DB954]">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white md:text-2xl">
                    Écoutez la playlist officielle de Radio Télé Dessalines sur Spotify
                  </h3>
                  <p className="text-sm text-white/60">
                    Profitez de notre sélection musicale en parallèle du direct FM
                  </p>
                </div>
              </div>
              
              {/* Spotify Embed */}
              <div className="overflow-hidden rounded-xl shadow-lg">
                <iframe
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                  title="Playlist Spotify Radio Tele Dessalines"
                />
              </div>
              
              <p className="mt-4 text-center text-xs text-white/40">
                La playlist Spotify fonctionne indépendamment du streaming FM live. Vous pouvez écouter les deux simultanément.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}