"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Headphones, Play, Pause, Clock, ArrowLeft, X, 
  SkipBack, SkipForward, Volume2, VolumeX 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

interface PodcastEpisode {
  id: string
  title: string
  description: string
  duration: string
  date: string
  audioUrl: string
}

interface Podcast {
  id: string
  title: string
  description: string
  image: string
  duration: string
  episodeCount: number
  frequency: string
  episodes: PodcastEpisode[]
}

const podcasts: Podcast[] = [
  {
    id: "1",
    title: "La Matinale",
    description: "Toute l'actualité du matin avec nos journalistes. Informations locales, nationales et internationales pour bien commencer votre journée.",
    image: "/images/matinale.jpg",
    duration: "1h 30min",
    episodeCount: 245,
    frequency: "Quotidien",
    episodes: [
      {
        id: "1-1",
        title: "La Matinale - 13 mars 2026",
        description: "Les dernières nouvelles du jour",
        duration: "1:45:30",
        date: "13 mars 2026",
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/matinale-cIaDrgqSuVYs1nWZ1nIo8G9NHr0Vl6.mp3"
      },
      {
        id: "1-2",
        title: "La Matinale - 12 mars 2026",
        description: "Actualités et analyses",
        duration: "1:42:15",
        date: "12 mars 2026",
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/matinale-cIaDrgqSuVYs1nWZ1nIo8G9NHr0Vl6.mp3"
      }
    ]
  },
  {
    id: "2",
    title: "Culture & Patrimoine",
    description: "Exploration de la culture haïtienne et internationale. Art, musique, littérature et traditions au cœur de nos émissions.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    duration: "55min",
    episodeCount: 120,
    frequency: "Hebdomadaire",
    episodes: [
      {
        id: "2-1",
        title: "Culture & Patrimoine - Spécial Carnaval",
        description: "Découverte des traditions du carnaval haïtien",
        duration: "52:18",
        date: "10 mars 2026",
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/culture-hD2byTE9Vm6GJfBClvyv5RvhrELgJK.mp3"
      }
    ]
  },
  {
    id: "3",
    title: "Débat du Jour",
    description: "Analyse et débat sur les sujets qui font l'actualité. Des experts et des personnalités discutent des enjeux de notre société.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop",
    duration: "45min",
    episodeCount: 180,
    frequency: "Quotidien",
    episodes: [
      {
        id: "3-1",
        title: "Débat du Jour - Politique économique",
        description: "Discussion sur les enjeux économiques actuels",
        duration: "45:00",
        date: "11 mars 2026",
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/matinale-cIaDrgqSuVYs1nWZ1nIo8G9NHr0Vl6.mp3"
      }
    ]
  },
  {
    id: "4",
    title: "Sport Hebdo",
    description: "Le résumé sportif de la semaine. Football, basketball, athlétisme et tous les sports haïtiens et internationaux.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop",
    duration: "40min",
    episodeCount: 95,
    frequency: "Hebdomadaire",
    episodes: [
      {
        id: "4-1",
        title: "Sport Hebdo - Semaine du 10 mars",
        description: "Tous les résultats sportifs de la semaine",
        duration: "38:22",
        date: "10 mars 2026",
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/culture-hD2byTE9Vm6GJfBClvyv5RvhrELgJK.mp3"
      }
    ]
  },
  {
    id: "5",
    title: "Économie & Développement",
    description: "Analyse des tendances économiques et des opportunités de développement pour Haïti et la région caribéenne.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
    duration: "50min",
    episodeCount: 78,
    frequency: "Hebdomadaire",
    episodes: [
      {
        id: "5-1",
        title: "Économie - Perspectives 2026",
        description: "Les tendances économiques pour l'année",
        duration: "48:15",
        date: "8 mars 2026",
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/matinale-cIaDrgqSuVYs1nWZ1nIo8G9NHr0Vl6.mp3"
      }
    ]
  },
  {
    id: "6",
    title: "Santé & Bien-être",
    description: "Conseils santé, prévention et bien-être avec des professionnels de la santé. Votre santé est notre priorité.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop",
    duration: "35min",
    episodeCount: 65,
    frequency: "Hebdomadaire",
    episodes: [
      {
        id: "6-1",
        title: "Santé - Prévention et conseils",
        description: "Comment rester en bonne santé",
        duration: "32:45",
        date: "7 mars 2026",
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/culture-hD2byTE9Vm6GJfBClvyv5RvhrELgJK.mp3"
      }
    ]
  },
  {
    id: "7",
    title: "Histoire d'Haïti",
    description: "Découvrez l'histoire riche et fascinante d'Haïti, de la révolution à nos jours. Des récits passionnants pour tous.",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400&h=400&fit=crop",
    duration: "60min",
    episodeCount: 45,
    frequency: "Mensuel",
    episodes: [
      {
        id: "7-1",
        title: "Histoire - La Révolution Haïtienne",
        description: "L'histoire de l'indépendance d'Haïti",
        duration: "58:30",
        date: "1 mars 2026",
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/matinale-cIaDrgqSuVYs1nWZ1nIo8G9NHr0Vl6.mp3"
      }
    ]
  },
  {
    id: "8",
    title: "Jeunesse & Avenir",
    description: "Une émission dédiée aux jeunes haïtiens. Éducation, carrières, entrepreneuriat et défis de la jeunesse d'aujourd'hui.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop",
    duration: "45min",
    episodeCount: 52,
    frequency: "Hebdomadaire",
    episodes: [
      {
        id: "8-1",
        title: "Jeunesse - Entrepreneuriat en Haïti",
        description: "Les opportunités pour les jeunes entrepreneurs",
        duration: "43:20",
        date: "9 mars 2026",
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/culture-hD2byTE9Vm6GJfBClvyv5RvhrELgJK.mp3"
      }
    ]
  },
]

export default function PodcastsPage() {
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null)
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleDurationChange = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("durationchange", handleDurationChange)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("durationchange", handleDurationChange)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentEpisode])

  const playEpisode = (podcast: Podcast, episode: PodcastEpisode) => {
    setSelectedPodcast(podcast)
    setCurrentEpisode(episode)
    setIsPlaying(true)
    setTimeout(() => {
      audioRef.current?.play()
    }, 100)
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
    setIsMuted(vol === 0)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds
    }
  }

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setIsPlaying(false)
    setCurrentEpisode(null)
    setSelectedPodcast(null)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-secondary py-16 md:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(200,16,46,0.3)_0%,_transparent_50%)]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 text-center">
            <Link 
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à l{"'"}accueil
            </Link>
            <Badge variant="outline" className="mb-4 border-accent text-accent">
              Podcasts & Replays
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Tous les podcasts
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Écoutez nos émissions en replay quand vous le souhaitez
            </p>
          </div>
        </section>

        {/* Podcasts Grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {podcasts.map((podcast) => (
                <article
                  key={podcast.id}
                  className="group cursor-pointer overflow-hidden rounded-xl bg-card p-4 shadow-lg transition-all hover:shadow-xl hover:ring-2 hover:ring-primary/20"
                  onClick={() => {
                    if (podcast.episodes.length > 0) {
                      playEpisode(podcast, podcast.episodes[0])
                    }
                  }}
                >
                  <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={podcast.image}
                      alt={podcast.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-110">
                        <Play className="ml-1 h-7 w-7" />
                      </div>
                    </div>
                    {/* Episode Badge */}
                    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      <Headphones className="h-3 w-3" />
                      {podcast.episodeCount} épisodes
                    </div>
                  </div>

                  <h3 className="mb-1 font-serif text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {podcast.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                    {podcast.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {podcast.duration}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {podcast.frequency}
                    </Badge>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Audio Element */}
      {currentEpisode && (
        <audio ref={audioRef} src={currentEpisode.audioUrl} />
      )}

      {/* Fixed Bottom Player */}
      {currentEpisode && selectedPodcast && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-secondary text-white shadow-2xl">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="flex items-center gap-4">
              {/* Podcast Image */}
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={selectedPodcast.image}
                  alt={selectedPodcast.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Episode Info */}
              <div className="hidden min-w-0 flex-1 sm:block">
                <h4 className="truncate font-medium text-white">
                  {currentEpisode.title}
                </h4>
                <p className="truncate text-sm text-white/60">
                  {selectedPodcast.title}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => skip(-15)}
                  className="h-8 w-8 text-white hover:bg-white/10"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  onClick={togglePlay}
                  className="h-10 w-10 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="ml-0.5 h-5 w-5" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => skip(15)}
                  className="h-8 w-8 text-white hover:bg-white/10"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Progress */}
              <div className="hidden flex-1 items-center gap-2 md:flex">
                <span className="w-12 text-right text-xs text-white/60">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/20 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
                />
                <span className="w-12 text-xs text-white/60">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Volume */}
              <div className="hidden items-center gap-2 lg:flex">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleMute}
                  className="h-8 w-8 text-white hover:bg-white/10"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/20 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
              </div>

              {/* Close Button */}
              <Button
                size="icon"
                variant="ghost"
                onClick={closePlayer}
                className="h-8 w-8 text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
