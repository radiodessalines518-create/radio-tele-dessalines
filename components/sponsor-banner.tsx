"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"

interface SponsorAd {
  id: string
  src: string
  alt: string
  link: string
  sponsor: string
}

// Configuration des publicites - Remplacez par vos vrais sponsors
const sponsorAds: SponsorAd[] = [
  {
    id: "ad1",
    src: "/ads/banner-1.jpg",
    alt: "Publicite Sponsor 1",
    link: "https://sponsor1.com",
    sponsor: "Sponsor 1",
  },
  {
    id: "ad2",
    src: "/ads/banner-2.jpg",
    alt: "Publicite Sponsor 2",
    link: "https://sponsor2.com",
    sponsor: "Sponsor 2",
  },
  {
    id: "ad3",
    src: "/ads/banner-3.jpg",
    alt: "Publicite Sponsor 3",
    link: "https://sponsor3.com",
    sponsor: "Sponsor 3",
  },
]

interface SponsorBannerProps {
  src?: string
  alt?: string
  link?: string
  className?: string
  size?: "small" | "medium" | "large"
  random?: boolean
}

export function SponsorBanner({
  src,
  alt,
  link,
  className = "",
  size = "medium",
  random = false,
}: SponsorBannerProps) {
  const [currentAd, setCurrentAd] = useState<SponsorAd | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (random) {
      // Selectionner une publicite aleatoire
      const randomIndex = Math.floor(Math.random() * sponsorAds.length)
      setCurrentAd(sponsorAds[randomIndex])
    } else if (src && link) {
      setCurrentAd({
        id: "custom",
        src,
        alt: alt || "Publicite",
        link,
        sponsor: alt || "Sponsor",
      })
    } else {
      setCurrentAd(sponsorAds[0])
    }
  }, [src, alt, link, random])

  if (!isVisible || !currentAd) return null

  const sizeClasses = {
    small: "h-[60px] md:h-[90px]",
    medium: "h-[90px] md:h-[120px]",
    large: "h-[120px] md:h-[250px]",
  }

  return (
    <div className={`relative my-4 overflow-hidden rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 p-1 ${className}`}>
      <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
        <span className="rounded bg-black/50 px-2 py-0.5 text-[10px] text-white/70">
          Publicite
        </span>
        <button
          onClick={() => setIsVisible(false)}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white/70 transition-colors hover:bg-black/70 hover:text-white"
          aria-label="Fermer la publicite"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      
      <Link
        href={currentAd.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-lg transition-transform hover:scale-[1.01]"
      >
        <div className={`relative w-full ${sizeClasses[size]}`}>
          <Image
            src={currentAd.src}
            alt={currentAd.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority={false}
          />
        </div>
      </Link>
      
      <p className="mt-1 text-center text-[10px] text-muted-foreground">
        Sponsorise par {currentAd.sponsor}
      </p>
    </div>
  )
}

// Composant pour afficher plusieurs bannieres en rotation
export function SponsorBannerRotating({
  className = "",
  interval = 5000,
  size = "medium",
}: {
  className?: string
  interval?: number
  size?: "small" | "medium" | "large"
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsorAds.length)
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  if (!isVisible || sponsorAds.length === 0) return null

  const currentAd = sponsorAds[currentIndex]

  const sizeClasses = {
    small: "h-[60px] md:h-[90px]",
    medium: "h-[90px] md:h-[120px]",
    large: "h-[120px] md:h-[250px]",
  }

  return (
    <div className={`relative my-4 overflow-hidden rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 p-1 ${className}`}>
      <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
        <span className="rounded bg-black/50 px-2 py-0.5 text-[10px] text-white/70">
          Publicite
        </span>
        <button
          onClick={() => setIsVisible(false)}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white/70 transition-colors hover:bg-black/70 hover:text-white"
          aria-label="Fermer la publicite"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      
      <Link
        href={currentAd.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-lg transition-all duration-500"
      >
        <div className={`relative w-full ${sizeClasses[size]}`}>
          <Image
            src={currentAd.src}
            alt={currentAd.alt}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority={false}
          />
        </div>
      </Link>
      
      {/* Indicateurs de pagination */}
      <div className="mt-2 flex justify-center gap-1">
        {sponsorAds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? "w-4 bg-primary"
                : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Aller a la publicite ${index + 1}`}
          />
        ))}
      </div>
      
      <p className="mt-1 text-center text-[10px] text-muted-foreground">
        Sponsorise par {currentAd.sponsor}
      </p>
    </div>
  )
}

// Composant sidebar pour les publicites carrees
export function SponsorSquare({
  src,
  alt,
  link,
  className = "",
}: {
  src?: string
  alt?: string
  link?: string
  className?: string
}) {
  const [isVisible, setIsVisible] = useState(true)
  
  const adData = src && link
    ? { src, alt: alt || "Publicite", link, sponsor: alt || "Sponsor" }
    : sponsorAds[Math.floor(Math.random() * sponsorAds.length)]

  if (!isVisible) return null

  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-muted/50 to-muted/30 p-1 ${className}`}>
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={() => setIsVisible(false)}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white/70 transition-colors hover:bg-black/70 hover:text-white"
          aria-label="Fermer"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      
      <Link
        href={adData.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-lg"
      >
        <div className="relative aspect-square w-full">
          <Image
            src={adData.src}
            alt={adData.alt}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="300px"
          />
        </div>
      </Link>
      
      <p className="mt-1 text-center text-[10px] text-muted-foreground">
        Publicite - {adData.sponsor}
      </p>
    </div>
  )
}
