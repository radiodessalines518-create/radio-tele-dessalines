"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Crown, Loader2, ArrowRight, Radio, Tv, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

interface SessionData {
  status: string
  payment_status: string
  customer_email: string
  plan: string
  interval: string
}

function PremiumSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/premium?session_id=${sessionId}`)
        if (response.ok) {
          const data = await response.json()
          setSessionData(data)
        } else {
          setError("Session non trouvee")
        }
      } catch {
        setError("Erreur de verification")
      } finally {
        setLoading(false)
      }
    }

    verifySession()
  }, [sessionId])

  const planNames: Record<string, string> = {
    basic: "Supporter",
    premium: "Premium",
    vip: "VIP",
  }

  const planIcons: Record<string, React.ReactNode> = {
    basic: <Crown className="h-8 w-8" />,
    premium: <Crown className="h-8 w-8" />,
    vip: <Crown className="h-8 w-8" />,
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-lg text-center">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Verification de votre paiement...</p>
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-card p-8 shadow-lg">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                <Crown className="h-10 w-10 text-yellow-600" />
              </div>
              <h1 className="font-serif text-2xl font-bold">Verification en cours</h1>
              <p className="mt-4 text-muted-foreground">
                Votre paiement est en cours de traitement. Vous recevrez un email de confirmation sous peu.
              </p>
              <Link href="/">
                <Button className="mt-6">
                  Retour a l{"'"}accueil
                </Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl bg-card p-8 shadow-lg">
              {/* Success Animation */}
              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-25" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
              </div>

              <h1 className="font-serif text-3xl font-bold text-green-600">
                Bienvenue dans la famille Premium !
              </h1>

              {sessionData && (
                <div className="mt-4 rounded-lg bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    Plan souscrit
                  </p>
                  <p className="text-lg font-semibold">
                    {planNames[sessionData.plan] || "Premium"} - {sessionData.interval === "yearly" ? "Annuel" : "Mensuel"}
                  </p>
                  {sessionData.customer_email && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Email: {sessionData.customer_email}
                    </p>
                  )}
                </div>
              )}

              <p className="mt-6 text-muted-foreground">
                Merci pour votre soutien ! Vous avez maintenant acces a tous les avantages Premium de Radio Tele Dessalines.
              </p>

              {/* Benefits */}
              <div className="mt-8 grid gap-4 text-left">
                <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                  <Radio className="h-5 w-5 text-primary" />
                  <span className="text-sm">Radio 96.7 FM sans publicite</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                  <Tv className="h-5 w-5 text-primary" />
                  <span className="text-sm">TV DC.TV 68 en HD</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                  <Headphones className="h-5 w-5 text-primary" />
                  <span className="text-sm">Podcasts et contenus exclusifs</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link href="/">
                  <Button className="w-full" size="lg">
                    Commencer a ecouter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/podcasts">
                  <Button variant="outline" className="w-full">
                    Decouvrir les podcasts exclusifs
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function PremiumSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <PremiumSuccessContent />
    </Suspense>
  )
}
