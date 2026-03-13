"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, RefreshCw, ExternalLink, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Category = "all" | "politique" | "sport" | "culture" | "international" | "economie" | "education"

interface AggregatedNews {
  id: string
  title: string
  excerpt: string
  category: Category
  date: string
  image: string
  source: string
  sourceUrl: string
  url: string
}

// Sources RSS simulées - En production, utiliser des APIs RSS réelles
const NEWS_SOURCES = [
  { name: "Le Nouvelliste", category: "politique" as Category },
  { name: "Haiti Libre", category: "international" as Category },
  { name: "Alter Presse", category: "economie" as Category },
  { name: "Loop Haiti", category: "culture" as Category },
]

// Simulation de news agrégées
const generateMockNews = (): AggregatedNews[] => [
  {
    id: "agg-1",
    title: "Nouvelles mesures économiques annoncées par le gouvernement",
    excerpt: "Le Premier ministre a présenté un plan de relance économique visant à stimuler la croissance...",
    category: "economie",
    date: new Date().toLocaleDateString("fr-FR"),
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    source: "Le Nouvelliste",
    sourceUrl: "https://lenouvelliste.com",
    url: "#",
  },
  {
    id: "agg-2",
    title: "Coopération régionale : Haiti au sommet de la CARICOM",
    excerpt: "Les dirigeants caribéens discutent des enjeux de développement durable et de sécurité...",
    category: "international",
    date: new Date().toLocaleDateString("fr-FR"),
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
    source: "Haiti Libre",
    sourceUrl: "https://haitilibre.com",
    url: "#",
  },
  {
    id: "agg-3",
    title: "Festival de jazz de Port-au-Prince : édition record",
    excerpt: "Plus de 50 artistes nationaux et internationaux se produiront lors de cette édition...",
    category: "culture",
    date: new Date().toLocaleDateString("fr-FR"),
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=250&fit=crop",
    source: "Loop Haiti",
    sourceUrl: "https://loophaiti.com",
    url: "#",
  },
  {
    id: "agg-4",
    title: "Nouveau programme d'éducation numérique lancé",
    excerpt: "Le ministère de l'éducation annonce un partenariat pour équiper les écoles en matériel informatique...",
    category: "education",
    date: new Date().toLocaleDateString("fr-FR"),
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    source: "Alter Presse",
    sourceUrl: "https://alterpresse.org",
    url: "#",
  },
  {
    id: "agg-5",
    title: "Les Grenadiers en préparation pour les éliminatoires",
    excerpt: "L'équipe nationale de football intensifie ses entraînements en vue des prochaines qualifications...",
    category: "sport",
    date: new Date().toLocaleDateString("fr-FR"),
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
    source: "Haiti Libre",
    sourceUrl: "https://haitilibre.com",
    url: "#",
  },
  {
    id: "agg-6",
    title: "Débat parlementaire sur la réforme constitutionnelle",
    excerpt: "Les députés examinent les propositions d'amendements à la constitution...",
    category: "politique",
    date: new Date().toLocaleDateString("fr-FR"),
    image: "https://images.unsplash.com/photo-1575540325855-4b5d285a3845?w=400&h=250&fit=crop",
    source: "Le Nouvelliste",
    sourceUrl: "https://lenouvelliste.com",
    url: "#",
  },
]

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "politique", label: "Politique" },
  { value: "sport", label: "Sport" },
  { value: "culture", label: "Culture" },
  { value: "international", label: "International" },
  { value: "economie", label: "Économie" },
  { value: "education", label: "Éducation" },
]

const categoryColors: Record<Category, string> = {
  all: "bg-muted",
  politique: "bg-primary",
  sport: "bg-green-600",
  culture: "bg-purple-600",
  international: "bg-blue-600",
  economie: "bg-amber-600",
  education: "bg-teal-600",
}

export function NewsAggregator() {
  const [news, setNews] = useState<AggregatedNews[]>([])
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchNews = useCallback(async () => {
    setIsLoading(true)
    // Simulation d'appel API - En production, appeler votre API RSS
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setNews(generateMockNews())
    setLastUpdate(new Date())
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  // Auto-refresh toutes les 5 minutes
  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(() => {
      fetchNews()
    }, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [autoRefresh, fetchNews])

  const filteredNews =
    activeCategory === "all"
      ? news
      : news.filter((item) => item.category === activeCategory)

  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge variant="outline" className="mb-3 border-primary text-primary">
              Fil d{"'"}actualités
            </Badge>
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Actualités agrégées
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Dernière mise à jour : {lastUpdate.toLocaleTimeString("fr-FR")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchNews}
              disabled={isLoading}
              className="gap-2"
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              Actualiser
            </Button>
            <Button
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={cn(autoRefresh && "bg-green-600 hover:bg-green-700")}
            >
              Auto-refresh: {autoRefresh ? "ON" : "OFF"}
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={activeCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.value)}
              className={cn(
                "transition-all",
                activeCategory === category.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/10 hover:text-primary"
              )}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item, index) => (
            <article
              key={item.id}
              className="group animate-fade-in-up overflow-hidden rounded-xl bg-card shadow-md transition-all hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge
                  className={cn(
                    "absolute left-3 top-3 text-white",
                    categoryColors[item.category]
                  )}
                >
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </Badge>
              </div>

              <div className="p-4">
                <h3 className="mb-2 line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </div>
                  <Link
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    {item.source}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sources Info */}
        <div className="mt-10 rounded-xl bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Sources partenaires</h3>
          <div className="flex flex-wrap gap-3">
            {NEWS_SOURCES.map((source) => (
              <Badge key={source.name} variant="secondary" className="px-3 py-1">
                {source.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
