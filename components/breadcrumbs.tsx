"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href: string
}

const pathLabels: Record<string, string> = {
  actualites: "Actualités",
  politique: "Politique",
  sport: "Sport",
  culture: "Culture",
  podcasts: "Podcasts",
  contact: "Contact",
  "radio-article": "Radio Télé Dessalines",
}

export function Breadcrumbs() {
  const pathname = usePathname()
  
  if (pathname === "/") return null

  const segments = pathname.split("/").filter(Boolean)
  
  const breadcrumbs: BreadcrumbItem[] = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    return { label, href }
  })

  // JSON-LD pour les rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://radioteledessalines.ht",
      },
      ...breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: `https://radioteledessalines.ht${item.href}`,
      })),
    ],
  }

  return (
    <>
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Fil d'Ariane"
        className="bg-muted/50 py-3"
      >
        <div className="mx-auto max-w-7xl px-4">
          <ol className="flex flex-wrap items-center gap-1 text-sm">
            {/* Home */}
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
              >
                <Home className="h-4 w-4" />
                <span className="sr-only">Accueil</span>
              </Link>
            </li>

            {breadcrumbs.map((item, index) => (
              <li key={item.href} className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                {index === breadcrumbs.length - 1 ? (
                  <span
                    className="font-medium text-foreground"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
}

// Composant pour les rich snippets d'articles
export function ArticleJsonLd({
  title,
  description,
  image,
  datePublished,
  author,
  url,
}: {
  title: string
  description: string
  image: string
  datePublished: string
  author: string
  url: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Radio Télé Dessalines",
      logo: {
        "@type": "ImageObject",
        url: "https://radioteledessalines.ht/images/logo-rtd.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// Composant pour les rich snippets de podcasts
export function PodcastJsonLd({
  title,
  description,
  image,
  duration,
  datePublished,
  audioUrl,
}: {
  title: string
  description: string
  image: string
  duration: string
  datePublished: string
  audioUrl: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: title,
    description: description,
    image: image,
    duration: duration,
    datePublished: datePublished,
    associatedMedia: {
      "@type": "MediaObject",
      contentUrl: audioUrl,
    },
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Radio Télé Dessalines Podcasts",
      url: "https://radioteledessalines.ht/podcasts",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
