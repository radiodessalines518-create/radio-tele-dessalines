"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Star, Crown, Zap, Radio, Tv, Headphones, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

const PREMIUM_PLANS = [
  {
    id: "basic",
    name: "Supporter",
    price: 2.99,
    interval: "mois",
    description: "Soutenez la radio et profitez d'avantages exclusifs",
    icon: Star,
    color: "from-blue-500 to-blue-600",
    features: [
      "Ecoute sans publicite",
      "Badge Supporter sur le chat",
      "Acces aux replays",
      "Newsletter exclusive",
    ],
    notIncluded: [
      "Podcasts exclusifs",
      "Telechargement hors ligne",
      "Acces anticipé aux emissions",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 5.99,
    interval: "mois",
    description: "L'experience complete Radio Tele Dessalines",
    icon: Crown,
    color: "from-primary to-red-600",
    popular: true,
    features: [
      "Tout le plan Supporter",
      "Podcasts et contenus exclusifs",
      "Telechargement hors ligne",
      "Acces anticipe aux emissions",
      "Badge Premium sur le chat",
      "Invitations aux evenements",
    ],
    notIncluded: [],
  },
  {
    id: "vip",
    name: "VIP",
    price: 14.99,
    interval: "mois",
    description: "Pour les vrais passionnes de Radio Tele Dessalines",
    icon: Zap,
    color: "from-accent to-yellow-500",
    features: [
      "Tout le plan Premium",
      "Acces aux coulisses",
      "Rencontre avec les animateurs",
      "Mention speciale a l'antenne",
      "Produits derives exclusifs",
      "Support prioritaire",
      "Badge VIP dore sur le chat",
    ],
    notIncluded: [],
  },
]

const PREMIUM_BENEFITS = [
  {
    icon: Radio,
    title: "Radio sans pub",
    description: "Ecoutez la radio 96.7 FM en direct sans aucune interruption publicitaire",
  },
  {
    icon: Headphones,
    title: "Podcasts exclusifs",
    description: "Acces a des interviews, debats et emissions disponibles uniquement pour les membres",
  },
  {
    icon: Tv,
    title: "TV en HD",
    description: "Regardez DC.TV 68 en qualite HD avec moins de buffering",
  },
  {
    icon: Download,
    title: "Telechargement",
    description: "Telechargez vos emissions preferees pour les ecouter hors ligne",
  },
]

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly")

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId)
    // Integration avec Stripe/PayPal pour le paiement
    alert(`Redirection vers le paiement pour le plan ${planId}...`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary via-secondary/95 to-background py-20">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            Nouveau
          </Badge>
          <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Passez a <span className="text-accent">Premium</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Profitez d{"'"}une experience exclusive avec Radio Tele Dessalines. 
            Sans publicite, avec du contenu exclusif et des avantages VIP.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={cn("text-sm", billingInterval === "monthly" ? "text-white" : "text-white/50")}>
              Mensuel
            </span>
            <button
              onClick={() => setBillingInterval(billingInterval === "monthly" ? "yearly" : "monthly")}
              className="relative h-8 w-14 rounded-full bg-white/20 transition-colors"
            >
              <span
                className={cn(
                  "absolute top-1 h-6 w-6 rounded-full bg-accent transition-all",
                  billingInterval === "yearly" ? "left-7" : "left-1"
                )}
              />
            </button>
            <span className={cn("text-sm", billingInterval === "yearly" ? "text-white" : "text-white/50")}>
              Annuel <Badge variant="secondary" className="ml-1">-20%</Badge>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {PREMIUM_PLANS.map((plan) => {
              const Icon = plan.icon
              const price = billingInterval === "yearly" 
                ? (plan.price * 12 * 0.8).toFixed(2)
                : plan.price.toFixed(2)
              const interval = billingInterval === "yearly" ? "an" : "mois"

              return (
                <div
                  key={plan.id}
                  className={cn(
                    "relative rounded-2xl border bg-card p-8 transition-all hover:shadow-xl",
                    plan.popular && "border-primary shadow-lg scale-105 z-10"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-white shadow-lg">
                        Plus populaire
                      </Badge>
                    </div>
                  )}

                  <div className={cn(
                    "mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                    plan.color
                  )}>
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

                  <div className="my-6">
                    <span className="text-4xl font-bold">${price}</span>
                    <span className="text-muted-foreground">/{interval}</span>
                  </div>

                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    className={cn(
                      "w-full",
                      plan.popular
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-secondary hover:bg-secondary/90"
                    )}
                  >
                    Choisir {plan.name}
                  </Button>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-muted-foreground">
                        <X className="mt-0.5 h-5 w-5 flex-shrink-0" />
                        <span className="text-sm line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold md:text-4xl">
            Pourquoi passer a Premium ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Decouvrez tous les avantages de l{"'"}abonnement Premium Radio Tele Dessalines
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PREMIUM_BENEFITS.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="rounded-xl bg-card p-6 text-center transition-all hover:shadow-lg"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center font-serif text-3xl font-bold">
            Questions frequentes
          </h2>

          <div className="mt-8 space-y-4">
            {[
              {
                q: "Comment fonctionne l'abonnement ?",
                a: "Votre abonnement est renouvele automatiquement chaque mois ou chaque annee selon votre choix. Vous pouvez annuler a tout moment depuis votre espace membre.",
              },
              {
                q: "Puis-je changer de plan ?",
                a: "Oui, vous pouvez upgrader ou downgrader votre plan a tout moment. La difference de prix sera ajustee au prorata.",
              },
              {
                q: "Comment annuler mon abonnement ?",
                a: "Vous pouvez annuler votre abonnement a tout moment depuis votre espace membre. Vous continuerez a beneficier des avantages jusqu'a la fin de la periode payee.",
              },
              {
                q: "Quels moyens de paiement acceptez-vous ?",
                a: "Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal et MonCash pour Haiti.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-lg border bg-card p-4"
              >
                <summary className="cursor-pointer font-medium">
                  {faq.q}
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-primary/90 to-primary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            Pret a passer a Premium ?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Rejoignez des milliers de membres qui profitent deja de l{"'"}experience complete Radio Tele Dessalines.
          </p>
          <Button
            size="lg"
            onClick={() => handleSubscribe("premium")}
            className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Crown className="mr-2 h-5 w-5" />
            Commencer maintenant
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
