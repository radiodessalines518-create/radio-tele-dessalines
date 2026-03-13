"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

// Responsables de la radio
const responsables = [
  { id: 1, name: "Samson Janvier", role: "Designer", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/samson-YqWany6bvBjd9STj9Utnj9XFVoX2kY.jpg" },
  { id: 2, name: "Samuel Dorcely", role: "Directeur sportif", logo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80" },
  { id: 3, name: "Fritznal André", role: "Journaliste sportif", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fritznal-771cDSf7WhQkzn39puFOOCgzRdTRbo.jpg" },
  { id: 4, name: "Wesley Jean David", role: "PDG", logo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&q=80" },
  { id: 5, name: "Melege Fils Louis", role: "Journaliste sportif", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/melege-w9yrP0TG7tfYtg7Fx5KvlYQv7wzvFE.jpg" },
  { id: 6, name: "Charmat Alcide", role: "Journaliste sportif", logo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop&q=80" },
  { id: 7, name: "Fidano Dameus", role: "Technicien", logo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80" },
  { id: 8, name: "Jean Pierre", role: "Animateur", logo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&h=200&fit=crop&q=80" },
]

// Double the array for seamless scroll
const duplicatedResponsables = [...responsables, ...responsables]

export function SponsorsSection() {
  return (
    <section className="border-y border-border bg-muted/50 py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <Badge variant="outline" className="mb-4 border-accent text-accent-foreground bg-accent/10">
            Notre Équipe
          </Badge>
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Nos responsables et membres clés
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Découvrez notre équipe à Radio Télé Dessalines
          </p>
        </div>

        {/* Animated Carousel */}
        <div className="relative mb-10">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-muted/50 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-muted/50 to-transparent" />

          <div className="group flex overflow-hidden">
            <div className="flex animate-scroll gap-8 hover:[animation-play-state:paused]">
              {duplicatedResponsables.map((resp, index) => (
                <div
                  key={`${resp.id}-${index}`}
                  className="flex w-48 flex-shrink-0 flex-col items-center gap-3 text-center"
                >
                  {/* Photo */}
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg transition-transform hover:scale-105">
                    <Image
                      src={resp.logo}
                      alt={resp.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Nom */}
                  <p className="font-semibold text-primary text-sm">{resp.name}</p>

                  {/* Role */}
                  <p className="text-xs text-muted-foreground">{resp.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="mb-4 text-muted-foreground">
            Intéressé par un partenariat avec Radio Télé Dessalines?
          </p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link href="/contact">
              <Mail className="mr-2 h-4 w-4" />
              Contactez-nous
            </Link>
          </Button>
        </div>
      </div>

      {/* Carousel Animation Styles */}
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
