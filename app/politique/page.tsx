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
    slug: "Dessalines en état d’alerte : Markens Larose interpelle",
    title: "Dessalines en état d’alerte : Markens Larose exhorte l’État central à agir face à l’effondrement des services publics",
    excerpt: "Au cours d’une intervention accordée à Radio Télé Dessalines, Markens Larose a appelé l’État central à assumer ses responsabilités face à la dégradation croissante des institutions publiques dans la commune de Dessalines, dénonçant la paralysie de plusieurs services essentiels et l’aggravation des conditions de vie de la population.",
    date: "11 Avril 2026",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    slug: "nouveau-programme-infrastructure",
    title: "Nouveau programme d'infrastructure annoncé",
    excerpt: "Le gouvernement dévoile un plan ambitieux de modernisation des routes et infrastructures publiques dans tout le pays.",
    date: "7 mars 2026",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    slug: "reforme-constitution-debats",
    title: "Réforme de la constitution: débats au parlement",
    excerpt: "Les parlementaires discutent des amendements proposés à la constitution nationale dans un climat de dialogue.",
    date: "5 mars 2026",
    image: "https://images.unsplash.com/photo-1575320181282-9afab399332c?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    slug: "visite-ministre-affaires-etrangeres",
    title: "Visite officielle du ministre des affaires étrangères",
    excerpt: "Le chef de la diplomatie haïtienne rencontre ses homologues pour renforcer les relations bilatérales.",
    date: "3 mars 2026",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    slug: "plan-decentralisation-administrative",
    title: "Plan de décentralisation administrative",
    excerpt: "Le gouvernement présente sa vision pour renforcer les capacités des collectivités territoriales.",
    date: "1 mars 2026",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    slug: "accord-cooperation-republique-dominicaine",
    title: "Accord de coopération avec la République Dominicaine",
    excerpt: "Les deux nations voisines signent un nouvel accord de coopération économique et sécuritaire.",
    date: "28 février 2026",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop",
  },
]

function PolitiquePageContent() {
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
            <Badge className="mb-4 bg-primary text-white">
              Politique
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
          <Link href="/politique">
            <Button className="mb-8">
              ← Retour aux actualités politiques
            </Button>
          </Link>

          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            {selectedArticle.excerpt}
          </p>

          <p className="text-lg leading-relaxed mb-6">
            La politique haïtienne traverse une période de transformation importante,
            avec de nombreux défis à relever pour l{"'"}avenir du pays.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            Les citoyens suivent avec attention les développements politiques
            qui façonneront l{"'"}avenir de la nation.
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
            Radio Télé Dessalines continue de suivre ces développements
            pour vous tenir informés en temps réel.
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
            <Badge className="mb-4 bg-primary text-primary-foreground">
              Politique
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Actualités politiques
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Suivez l{"'"}actualité politique d{"'"}Haïti et les décisions qui façonnent notre nation
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
                  <article className="overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:shadow-xl hover:ring-2 hover:ring-primary/20">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute left-4 top-4 bg-primary text-white">
                        Politique
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
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
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

export default function PolitiquePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    }>
      <PolitiquePageContent />
    </Suspense>
  )
}
