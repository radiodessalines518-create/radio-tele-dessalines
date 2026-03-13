"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Heart, Home, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

function DonationSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [paymentInfo, setPaymentInfo] = useState<{
    amount: number
    currency: string
    status: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function verifyPayment() {
      if (sessionId) {
        try {
          const response = await fetch(`/api/donate/stripe?session_id=${sessionId}`)
          const data = await response.json()
          if (data.success) {
            setPaymentInfo({
              amount: data.amount,
              currency: data.currency?.toUpperCase() || "USD",
              status: data.status,
            })
          }
        } catch (error) {
          console.error("Error verifying payment:", error)
        }
      }
      setLoading(false)
    }
    verifyPayment()
  }, [sessionId])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "J'ai fait un don a Radio Tele Dessalines!",
        text: "Soutenez Radio Tele Dessalines, la voix de Dessalines depuis 2005.",
        url: "https://radioteledessalines.ht",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center">
          {/* Success Animation */}
          <div className="relative mx-auto mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-green-500/20 animate-ping" />
            </div>
            <div className="relative flex h-32 w-32 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
          </div>

          <h1 className="font-serif text-3xl font-bold mb-4 text-green-600">
            Merci pour votre don!
          </h1>

          {loading ? (
            <div className="animate-pulse">
              <div className="h-6 bg-muted rounded w-3/4 mx-auto mb-2" />
              <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
            </div>
          ) : paymentInfo ? (
            <div className="mb-6 rounded-2xl bg-green-50 dark:bg-green-900/20 p-6">
              <p className="text-lg text-muted-foreground mb-2">
                Votre contribution de
              </p>
              <p className="text-4xl font-bold text-green-600">
                ${paymentInfo.amount} {paymentInfo.currency}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                a ete recue avec succes
              </p>
            </div>
          ) : (
            <div className="mb-6 rounded-2xl bg-green-50 dark:bg-green-900/20 p-6">
              <p className="text-lg">
                Votre don a ete recu avec succes!
              </p>
            </div>
          )}

          <p className="text-muted-foreground mb-8">
            Grace a votre generosite, Radio Tele Dessalines peut continuer sa mission 
            d{"'"}information et de divertissement pour la communaute haitienne.
          </p>

          {/* Heart Animation */}
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="h-6 w-6 text-primary animate-bounce"
                style={{ animationDelay: `${i * 100}ms` }}
                fill="currentColor"
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Retour a l{"'"}accueil
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
              className="w-full sm:w-auto"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Partager
            </Button>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Un recu sera envoye a votre adresse email. 
            Pour toute question, contactez-nous a contact@radioteledessalines.ht
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    }>
      <DonationSuccessContent />
    </Suspense>
  )
}
