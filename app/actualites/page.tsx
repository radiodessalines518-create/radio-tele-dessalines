"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronRight, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

const allArticles = [
  {
    id: 1,
    slug: "enjeux-elections-legislatives-haiti",
    title: "Les enjeux des élections législatives en Haïti",
    excerpt: "Analyse approfondie des défis et perspectives pour les prochaines élections législatives qui se profilent à l'horizon politique haïtien.",
    category: "politique",
    date: "11 mars 2026",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    slug: "victoire-equipe-nationale-football",
    title: "Victoire historique pour l'équipe nationale de football",
    excerpt: "Les Grenadiers s'imposent face à leur adversaire dans un match décisif pour les qualifications.",
    category: "sport",
    date: "10 mars 2026",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    slug: "festival-musique-racine-dessalines",
    title: "Radyo Tele Desalin (RTD) : yon patrimwàn vivan nan komin Desalin",
    excerpt: "Nan tout kominote, Radyo Tele Desalin se yon enstitisyon ki make istwa lokal la depi 2005.",
    category: "culture",
    date: "15 mars 2026",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    slug: "sommet-economique-caricom",
    title: "Sommet économique de la CARICOM",
    excerpt: "Les dirigeants caribéens se réunissent pour discuter de coopération régionale et de développement économique.",
    category: "international",
    date: "8 mars 2026",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    slug: "nouveau-programme-infrastructure",
    title: "Nouveau programme d'infrastructure annoncé",
    excerpt: "Le gouvernement dévoile un plan ambitieux de modernisation des routes et infrastructures publiques.",
    category: "politique",
    date: "7 mars 2026",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    slug: "exposition-art-contemporain-haitien",
    title: "Exposition d'art contemporain haïtien",
    excerpt: "Des artistes locaux présentent leurs œuvres dans une exposition unique célébrant la créativité haïtienne.",
    category: "culture",
    date: "6 mars 2026",
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&h=500&fit=crop",
  },
  // Additional articles for load more
  {
    id: 7,
    slug: "initiative-agricole-artibonite",
    title: "Initiative agricole dans l'Artibonite",
    excerpt: "Un nouveau projet vise à moderniser les pratiques agricoles dans la région pour améliorer les rendements.",
    category: "economie",
    date: "5 mars 2026",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=500&fit=crop",
  },
  {
    id: 8,
    slug: "conference-education-port-au-prince",
    title: "Conférence sur l'éducation à Port-au-Prince",
    excerpt: "Les acteurs du secteur éducatif discutent des réformes nécessaires pour améliorer le système scolaire.",
    category: "education",
    date: "4 mars 2026",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop",
  },
  {
    id: 9,
    slug: "tournoi-basketball-dessalines",
    title: "Tournoi de basketball inter-régional à Dessalines",
    excerpt: "Les meilleures équipes de la région s'affrontent dans un tournoi passionnant.",
    category: "sport",
    date: "3 mars 2026",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop",
  },
  {
    id: 10,
    slug: "nouvelle-loi-environnement",
    title: "Nouvelle loi sur la protection de l'environnement",
    excerpt: "Le parlement adopte une loi ambitieuse pour la préservation des ressources naturelles d'Haïti.",
    category: "politique",
    date: "2 mars 2026",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=500&fit=crop",
  },
  {
    id: 11,
    slug: "festival-film-haitien",
    title: "Festival du film haïtien 2026",
    excerpt: "Célébration du cinéma haïtien avec des projections, des débats et des rencontres avec les réalisateurs.",
    category: "culture",
    date: "1 mars 2026",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop",
  },
  {
    id: 12,
    slug: "accord-commercial-republique-dominicaine",
    title: "Nouvel accord commercial avec la République Dominicaine",
    excerpt: "Les deux pays voisins signent un accord pour faciliter les échanges commerciaux et renforcer la coopération.",
    category: "international",
    date: "28 février 2026",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
  },
]

const categories = [
  { value: "all", label: "Toutes", href: "/actualites" },
  { value: "politique", label: "Politique", href: "/politique" },
  { value: "sport", label: "Sport", href: "/sport" },
  { value: "culture", label: "Culture", href: "/culture" },
  { value: "international", label: "International", href: "/actualites" },
  { value: "economie", label: "Économie", href: "/actualites" },
  { value: "education", label: "Éducation", href: "/actualites" },
]

const categoryColors: Record<string, string> = {
  politique: "bg-primary",
  sport: "bg-green-600",
  culture: "bg-purple-600",
  international: "bg-blue-600",
  economie: "bg-orange-600",
  education: "bg-teal-600",
}

const categoryLabels: Record<string, string> = {
  politique: "Politique",
  sport: "Sport",
  culture: "Culture",
  international: "International",
  economie: "Économie",
  education: "Éducation",
}

const ARTICLES_PER_PAGE = 6

export default function ActualitesPage() {
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)

  const visibleArticles = allArticles.slice(0, visibleCount)
  const hasMoreArticles = visibleCount < allArticles.length

  const handleLoadMore = async () => {
    setIsLoading(true)
    // Simulate loading delay for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 500))
    setVisibleCount((prev) => Math.min(prev + ARTICLES_PER_PAGE, allArticles.length))
    setIsLoading(false)
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
              Actualités
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Toutes les actualités
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Restez informé avec les dernières nouvelles d{"'"}Haïti et du monde
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b bg-muted/30 py-4">
          <div className="mx-auto max-w-7xl px-4">
            <nav className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <Link
                  key={category.value}
                  href={category.href}
                  className={cn(
                    "relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                    category.value === "all"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-background text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  )}
                >
                  {category.label}
                  {category.value === "all" && (
                    <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-accent" />
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visibleArticles.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/actualites/${article.slug}`}
                  className={cn(
                    "group block",
                    index >= visibleCount - ARTICLES_PER_PAGE && "animate-fade-in-up"
                  )}
                  style={{
                    animationDelay: index >= visibleCount - ARTICLES_PER_PAGE 
                      ? `${(index - (visibleCount - ARTICLES_PER_PAGE)) * 100}ms` 
                      : "0ms"
                  }}
                >
                  <article className="overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:shadow-xl hover:ring-2 hover:ring-primary/20">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge
                        className={`absolute left-4 top-4 text-white ${categoryColors[article.category] || "bg-muted"}`}
                      >
                        {categoryLabels[article.category] || article.category}
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
                      <span className="inline-flex items-center text-primary">
                        Lire l{"'"}article
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {hasMoreArticles && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    `Charger plus d'articles (${allArticles.length - visibleCount} restants)`
                  )}
                </Button>
              </div>
            )}

            {/* All loaded message */}
            {!hasMoreArticles && visibleCount > ARTICLES_PER_PAGE && (
              <div className="mt-12 text-center">
                <p className="text-muted-foreground">
                  Vous avez vu tous les {allArticles.length} articles
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
