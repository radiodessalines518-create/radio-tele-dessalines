"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Newspaper, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    title: "Écoutez Radio Télé Dessalines en direct",
    subtitle: "La voix de Dessalines depuis 2005 - 96.7 FM | Chaine 17 | DC.TV 68",
    buttonText: "Écouter en direct",
    buttonHref: "#radio-live",
    icon: Play,
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1920&h=1080&fit=crop",
  },
  {
    id: 2,
    title: "Les dernières actualités d'Haïti et du monde",
    subtitle: "Restez informé avec nos journalistes sur le terrain.",
    buttonText: "Voir les actualités",
    buttonHref: "/actualites",
    icon: Newspaper,
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=1080&fit=crop",
  },
  {
    id: 3,
    title: "Regardez nos émissions et reportages vidéo",
    subtitle: "Découvrez notre contenu exclusif en images.",
    buttonText: "Voir les vidéos",
    buttonHref: "#videos",
    icon: Video,
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&h=1080&fit=crop",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-secondary md:h-[600px] lg:h-[700px]">
      {/* Background Image */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-transform duration-500 md:h-24 md:w-24">
          <Icon className="h-10 w-10 text-white md:h-12 md:w-12" />
        </div>

        {/* Title */}
        <h1
          key={`title-${currentSlide}`}
          className="mb-4 max-w-4xl animate-in fade-in slide-in-from-bottom-4 font-serif text-3xl font-bold leading-tight text-white duration-700 md:text-5xl lg:text-6xl text-balance"
        >
          {slide.title}
        </h1>

        {/* Subtitle */}
        <p
          key={`subtitle-${currentSlide}`}
          className="mb-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 text-lg text-white/80 delay-100 duration-700 md:text-xl text-balance"
        >
          {slide.subtitle}
        </p>

        {/* CTA Button */}
        <Link
          href={slide.buttonHref}
          key={`button-${currentSlide}`}
          className="animate-in fade-in slide-in-from-bottom-4 delay-200 duration-700"
        >
          <Button
            size="lg"
            className="group bg-accent px-8 py-6 text-base font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:scale-105 md:text-lg"
          >
            {slide.buttonText}
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:left-8"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:right-8"
        aria-label="Slide suivant"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-3 w-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "w-8 bg-accent"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
