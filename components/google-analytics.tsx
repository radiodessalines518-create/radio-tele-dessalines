"use client"

import Script from "next/script"

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}

// Fonctions de tracking
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as Window & { gtag: (...args: unknown[]) => void }).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Tracking spécifique pour Radio Live
export const trackRadioPlay = () => {
  trackEvent("play", "Radio Live", "Stream Started")
}

export const trackRadioPause = () => {
  trackEvent("pause", "Radio Live", "Stream Paused")
}

export const trackRadioListenTime = (seconds: number) => {
  trackEvent("listen_time", "Radio Live", "Listen Duration", seconds)
}

// Tracking spécifique pour TV Live
export const trackTvPlay = () => {
  trackEvent("play", "TV Live", "Stream Started")
}

export const trackTvPause = () => {
  trackEvent("pause", "TV Live", "Stream Paused")
}

// Tracking spécifique pour Podcasts
export const trackPodcastPlay = (podcastTitle: string) => {
  trackEvent("play", "Podcast", podcastTitle)
}

export const trackPodcastComplete = (podcastTitle: string) => {
  trackEvent("complete", "Podcast", podcastTitle)
}

// Tracking spécifique pour Articles
export const trackArticleView = (articleTitle: string, category: string) => {
  trackEvent("view", "Article", `${category}: ${articleTitle}`)
}

export const trackArticleShare = (articleTitle: string, platform: string) => {
  trackEvent("share", "Article", `${platform}: ${articleTitle}`)
}

// Tracking spécifique pour Newsletter
export const trackNewsletterSignup = () => {
  trackEvent("signup", "Newsletter", "Form Submitted")
}

// Tracking spécifique pour Contact
export const trackContactFormSubmit = () => {
  trackEvent("submit", "Contact", "Form Submitted")
}
