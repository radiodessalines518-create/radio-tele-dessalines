"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Category = "all" | "politique" | "sport" | "culture" | "international"

interface Article {
  id: number
  slug: string
  title: string
  excerpt: string
  category: Category
  date: string
  image: string
  featured?: boolean
}

const articles: Article[] = [
  {
    id: 1,
    slug: "radio-article",
    title: "Radio Télé Dessalines : Une histoire au cœur de l'actualité haïtienne",
    excerpt: "Créée le 15 mars 2005, Radio Télé Dessalines est l'une des institutions médiatiques les plus respectées d'Haïti.",
    category: "politique",
    date: "11 mars 2026",
    image: "/images/radio-dessalines.jpg",
    featured: true,
  },
  {
    id: 2,
    slug: "victoire-equipe-nationale-football",
    title: "Real Madrid domine Manchester City lors du match aller",
    excerpt: "Mercredi 11 mars, Real Madrid a imposé sa loi face à Manchester City avec un score net de 3-0, laissant les fans impatients pour le match retour à l'Etihad Stadium.",
    category: "sport",
    date: "mercredi 11 mars 2026",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    slug: "festival-musique-racine-dessalines",
    title: "Radyo Tele Desalin (RTD) : yon patrimwàn vivan nan komin Desalin",
    excerpt: "Nan tout kominote, Radyo Tele Desalin se yon enstitisyon ki make istwa lokal la depi 2005",
    category: "culture",
    date: "15 mars 2026",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    slug: "sommet-economique-caricom",
    title: "Sommet économique de la CARICOM",
    excerpt: "Les dirigeants caribéens se réunissent pour discuter de coopération régionale...",
    category: "international",
    date: "8 mars 2026",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
  },
]

const categories: { value: Category; label: string; href: string }[] = [
  { value: "all", label: "Toutes", href: "/actualites" },
  { value: "politique", label: "Politique", href: "/politique" },
  { value: "sport", label: "Sport", href: "/sport" },
  { value: "culture", label: "Culture", href: "/culture" },
  { value: "international", label: "International", href: "/actualites" },
]

const categoryColors: Record<Category, string> = {
  all: "bg-muted",
  politique: "bg-primary",
  sport: "bg-green-600",
  culture: "bg-purple-600",
  international: "bg-blue-600",
}

export function NewsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((article) => article.category === activeCategory)

  const featuredArticle = filteredArticles.find((a) => a.featured) || filteredArticles[0]
  const otherArticles = filteredArticles.filter((a) => a.id !== featuredArticle?.id)

  const currentCategoryHref = categories.find(c => c.value === activeCategory)?.href || "/actualites"

  return (
    <section id="actualites" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              Actualités
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Les dernières informations
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured Article */}
          {featuredArticle && (
            <article className="group relative overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:shadow-xl lg:row-span-2">
              <Link href="/actualites/radio-article" className="block">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[500px]">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <Badge
                      className={cn(
                        "mb-3 text-white",
                        categoryColors[featuredArticle.category]
                      )}
                    >
                      {featuredArticle.category.charAt(0).toUpperCase() +
                        featuredArticle.category.slice(1)}
                    </Badge>
                    <h3 className="mb-2 font-serif text-2xl font-bold text-white md:text-3xl text-balance">
                      {featuredArticle.title}
                    </h3>
                    <p className="mb-4 text-white/80">{featuredArticle.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Calendar className="h-4 w-4" />
                        {featuredArticle.date}
                      </div>
                      <span className="inline-flex items-center text-white hover:text-accent transition-colors">
                        Lire l{"'"}article
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Other Articles */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
            {otherArticles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/actualites/${article.slug}`}
                className="group block"
              >
                <article className="flex overflow-hidden rounded-xl bg-card shadow-md transition-all hover:shadow-lg">
                  <div className="relative h-32 w-32 flex-shrink-0 sm:h-36 sm:w-36">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-4">
                    <Badge
                      className={cn(
                        "mb-2 w-fit text-xs text-white",
                        categoryColors[article.category]
                      )}
                    >
                      {article.category.charAt(0).toUpperCase() +
                        article.category.slice(1)}
                    </Badge>
                    <h4 className="mb-1 line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                      {article.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </div>
                      <span className="text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Lire
                        <ChevronRight className="ml-1 inline h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            size="lg"
            className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link href={currentCategoryHref}>
              {activeCategory === "all" && "Voir toutes les actualités"}
              {activeCategory === "politique" && "Voir toute la politique"}
              {activeCategory === "sport" && "Voir tout le sport"}
              {activeCategory === "culture" && "Voir toute la culture"}
              {activeCategory === "international" && "Voir toutes les actualités"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}