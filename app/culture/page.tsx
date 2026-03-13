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
    title: "Festival de musique racine à Dessalines",
    excerpt: "Un événement culturel majeur célébrant les traditions musicales haïtiennes avec des artistes locaux et internationaux.",
    date: "9 mars 2026",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    title: "Exposition d'art contemporain haïtien",
    excerpt: "Des artistes locaux présentent leurs œuvres dans une exposition unique célébrant la créativité haïtienne.",
    date: "6 mars 2026",
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    title: "Célébration du patrimoine culinaire haïtien",
    excerpt: "Un festival gastronomique met en lumière les saveurs et traditions culinaires de notre pays.",
    date: "4 mars 2026",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    title: "Théâtre: nouvelle pièce sur l'histoire de Dessalines",
    excerpt: "Une production théâtrale retrace la vie du fondateur de la nation haïtienne.",
    date: "2 mars 2026",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    title: "Carnaval 2026: les préparatifs battent leur plein",
    excerpt: "Les groupes musicaux et les bandes à pied se préparent pour la grande fête nationale.",
    date: "28 février 2026",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    title: "Sortie du nouveau livre d'un auteur haïtien primé",
    excerpt: "L'écrivain haïtien présente son nouveau roman qui explore l'identité caribéenne contemporaine.",
    date: "25 février 2026",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=500&fit=crop",
  },
]

function CulturePageContent() {
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
            <Badge className="mb-4 bg-purple-600 text-white">
              Culture
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
          <Link href="/culture">
            <Button className="mb-8">
              ← Retour aux actualités
            </Button>
          </Link>

          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            {selectedArticle.excerpt}
          </p>

          <p className="text-lg leading-relaxed mb-6">
            La culture haïtienne est reconnue dans toute la Caraïbe pour sa richesse,
            sa créativité et son héritage historique.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            Les festivals, expositions et événements culturels permettent de célébrer
            cette diversité artistique.
          </p>

          <div className="my-10">
            <Image
              src={selectedArticle.image}
              alt="illustration"
              width={900}
              height={500}
              className="rounded-xl"
            />
          </div>

          <p className="text-lg leading-relaxed">
            Grâce à ces initiatives culturelles, Haïti continue d{"'"}inspirer le monde
            par sa créativité et son authenticité.
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
            <Badge className="mb-4 bg-purple-600 text-white">
              Culture
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Actualités culturelles
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Découvrez la richesse culturelle d{"'"}Haïti: art, musique, littérature et patrimoine
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute left-4 top-4 bg-purple-600 text-white">
                      Culture
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </div>
                    <h2 className="mb-2 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {article.title}
                    </h2>
                    <p className="mb-4 line-clamp-2 text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <Link href={`?article=${article.id}`}>
                      <Button variant="ghost" className="p-0 text-primary">
                        Lire l{"'"}article
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
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

export default function CulturePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    }>
      <CulturePageContent />
    </Suspense>
  )
}
