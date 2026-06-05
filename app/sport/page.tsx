"use client"

import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Calendar, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Spinner } from "@/components/ui/spinner"

const articles = [
  {
    id: 1,
    slug: "victoire-equipe-nationale-football",
    title: "Real Madrid domine Manchester City lors du match aller",
    excerpt: "Mercredi 11 mars, Real Madrid a imposé sa loi face à Manchester City avec un score net de 3-0, laissant les fans impatients pour le match retour à l'Etihad Stadium.",
    date: "Melege Fils Louis. Journaliste sportif.          mercredi 11 mars 2026",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    slug: "championnat-basketball-resultats",
    title: "Championnat national de basketball: résultats",
    excerpt: "Les équipes s'affrontent dans la phase finale du championnat national avec des matchs palpitants.",
    date: "8 mars 2026",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    slug: "marathon-port-au-prince-record",
    title: "Marathon de Port-au-Prince: record battu",
    excerpt: "Un athlète haïtien bat le record du marathon national dans une performance exceptionnelle.",
    date: "6 mars 2026",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    slug: "nouvelle-generation-talents-football",
    title: "Nouvelle génération de talents du football haïtien",
    excerpt: "Les jeunes espoirs du football national impressionnent lors des sélections pour l'équipe junior.",
    date: "4 mars 2026",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    slug: "competition-internationale-volleyball",
    title: "Compétition internationale de volleyball",
    excerpt: "L'équipe nationale de volleyball participe au tournoi caribéen avec de grandes ambitions.",
    date: "2 mars 2026",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    slug: "inauguration-stade-dessalines",
    title: "FC Barcelone vs Newcastle : Un Match Retour Crucial en Ligue des Champions",
    excerpt: "Le mercredi 18 mars 2026, le FC Barcelone reçoit Newcastle United pour le match retour des huitièmes de finale de la Ligue des Champions, avec un score aller de 1-1 qui laisse tout ouvert avant cette rencontre décisive.",
    date: "mercredi 18 mars 2026",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop",
  },
]

function SportPageContent() {
  const searchParams = useSearchParams()
  const articleId = searchParams.get("article")

  const selectedArticle = articles.find(
    (a) => a.id.toString() === articleId
  )

  if (selectedArticle) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />

        <section className="relative w-full h-[50vh] md:h-[55vh]">
          <Image
            src={selectedArticle.image}
            alt={selectedArticle.title}
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center px-4 max-w-4xl">
            <Badge className="mb-4 bg-green-600 text-white">
              Sport
            </Badge>

            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {selectedArticle.title}
            </h1>

            <p className="text-white/80 mt-4">
              {selectedArticle.date}
            </p>
          </div>
        </section>

        <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
          <Link href="/sport">
            <Button className="mb-8 bg-green-600 hover:bg-green-700">
              ← Retour aux actualités sportives
            </Button>
          </Link>

          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            {selectedArticle.excerpt}
          </p>

      
        </main>

        <Footer />
      </div>
    )
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
            <Badge className="mb-4 bg-green-600 text-white">
              Sport
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Actualités sportives
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Toute l{"'"}actualité du sport haïtien et international
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`?article=${article.id}`}
                  className="group block"
                >
                  <article className="overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:shadow-xl hover:ring-2 hover:ring-green-600/20">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute left-4 top-4 bg-green-600 text-white">
                        Sport
                      </Badge>
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                      </div>
                      <h2 className="mb-2 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-green-600">
                        {article.title}
                      </h2>
                      <p className="mb-4 line-clamp-2 text-muted-foreground">
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center text-green-600">
                        Lire l{"'"}article
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                Charger plus d{"'"}articles
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function SportPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    }>
      <SportPageContent />
    </Suspense>
  )
}
