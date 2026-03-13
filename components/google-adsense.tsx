"use client"

import { useEffect } from "react"

interface AdSenseProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical"
  fullWidthResponsive?: boolean
  className?: string
}

// Configuration AdSense - Remplacez par votre ID client
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXX"

export function GoogleAdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
}: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - adsbygoogle is injected by Google AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error("AdSense error:", error)
    }
  }, [])

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}

// Composant pour banniere publicitaire horizontale
export function AdBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`my-6 overflow-hidden rounded-lg bg-muted/30 p-2 ${className}`}>
      <div className="text-center text-xs text-muted-foreground mb-1">Publicite</div>
      <GoogleAdSense
        adSlot="HORIZONTAL_BANNER_SLOT"
        adFormat="horizontal"
        className="min-h-[90px]"
      />
    </div>
  )
}

// Composant pour pub carree dans la sidebar
export function AdSquare({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-lg bg-muted/30 p-2 ${className}`}>
      <div className="text-center text-xs text-muted-foreground mb-1">Publicite</div>
      <GoogleAdSense
        adSlot="SQUARE_AD_SLOT"
        adFormat="rectangle"
        className="min-h-[250px]"
      />
    </div>
  )
}

// Composant pour pub dans les articles
export function AdInArticle({ className = "" }: { className?: string }) {
  return (
    <div className={`my-8 overflow-hidden rounded-lg border border-border/50 bg-muted/20 p-4 ${className}`}>
      <div className="text-center text-xs text-muted-foreground mb-2">Contenu sponsorise</div>
      <GoogleAdSense
        adSlot="IN_ARTICLE_SLOT"
        adFormat="auto"
        className="min-h-[200px]"
      />
    </div>
  )
}

// Script AdSense a ajouter dans le layout
export function AdSenseScript() {
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  )
}
