"use client"

import Link from "next/link"
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PremiumCancelPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-lg text-center">
          <div className="rounded-2xl bg-card p-8 shadow-lg">
            {/* Cancel Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>

            <h1 className="font-serif text-2xl font-bold">
              Paiement annule
            </h1>

            <p className="mt-4 text-muted-foreground">
              Votre paiement a ete annule. Aucun montant n{"'"}a ete debite de votre compte.
            </p>

            <div className="mt-8 rounded-lg bg-muted/50 p-4">
              <h3 className="flex items-center justify-center gap-2 font-semibold">
                <HelpCircle className="h-4 w-4" />
                Besoin d{"'"}aide ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Si vous avez rencontre un probleme lors du paiement, n{"'"}hesitez pas a nous contacter. Notre equipe est la pour vous aider.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/premium">
                <Button className="w-full" size="lg">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour aux plans Premium
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full">
                  Contacter le support
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="w-full">
                  Retour a l{"'"}accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
