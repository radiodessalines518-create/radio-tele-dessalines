"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

// Responsables de la radio
const responsables = [
  { id: 1, name: "Samson Janvier", role: "Designer", logo: "/images/samson.jpg" },
  { id: 2, name: "Fritznal André", role: "Journaliste sportif", logo: "/images/fritznal.jpg" },
  { id: 3, name: "Melege Fils Louis", role: "Journaliste sportif", logo: "/images/melege.jpg" },
  { id: 4, name: "Samuel Dorcely", role: "Directeur sportif", logo: "/images/samuel.jpg" },
  { id: 5, name: "Jean Wesley David", role: "PDG", logo: "/images/wesley.jpg" },
  { id: 6, name: "Charmat Alcide", role: "Journaliste sportif", logo: "/images/charmat.jpg" },
  { id: 7, name: "Brunel René", role: "Présentateur", logo: "/images/fidano.jpg" },
  { id: 8, name: "Lunna E.David", role: "ADM", logo: "/images/jean.jpg" },
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