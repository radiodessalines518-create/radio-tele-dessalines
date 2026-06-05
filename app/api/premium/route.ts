import { NextRequest, NextResponse } from "next/server"

// Stripe Price IDs pour chaque plan - A configurer dans Stripe Dashboard
const STRIPE_PRICE_IDS = {
  // Plans mensuels
  basic_monthly: process.env.STRIPE_PRICE_BASIC_MONTHLY || "price_basic_monthly",
  premium_monthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY || "price_premium_monthly",
  vip_monthly: process.env.STRIPE_PRICE_VIP_MONTHLY || "price_vip_monthly",
  // Plans annuels
  basic_yearly: process.env.STRIPE_PRICE_BASIC_YEARLY || "price_basic_yearly",
  premium_yearly: process.env.STRIPE_PRICE_PREMIUM_YEARLY || "price_premium_yearly",
  vip_yearly: process.env.STRIPE_PRICE_VIP_YEARLY || "price_vip_yearly",
}

export async function POST(request: NextRequest) {
  try {
    const { planId, interval } = await request.json()

    // Validation des parametres
    if (!planId || !["basic", "premium", "vip"].includes(planId)) {
      return NextResponse.json(
        { error: "Plan invalide" },
        { status: 400 }
      )
    }

    if (!interval || !["monthly", "yearly"].includes(interval)) {
      return NextResponse.json(
        { error: "Intervalle invalide" },
        { status: 400 }
      )
    }

    // Verifier la cle Stripe
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Configuration Stripe manquante" },
        { status: 500 }
      )
    }

    // Selectionner le Price ID correspondant
    const priceKey = `${planId}_${interval}` as keyof typeof STRIPE_PRICE_IDS
    const priceId = STRIPE_PRICE_IDS[priceKey]

    // Noms des plans pour l'affichage
    const planNames: Record<string, string> = {
      basic: "Supporter",
      premium: "Premium",
      vip: "VIP",
    }

    // Prix pour le mode test (en centimes)
    const testPrices: Record<string, number> = {
      basic_monthly: 299,
      premium_monthly: 599,
      vip_monthly: 1499,
      basic_yearly: 2870,
      premium_yearly: 5750,
      vip_yearly: 14390,
    }

    // URL de base
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    // Creer la session Stripe Checkout
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "mode": "subscription",
        "success_url": `${baseUrl}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
        "cancel_url": `${baseUrl}/premium/cancel`,
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        "metadata[plan]": planId,
        "metadata[interval]": interval,
        "subscription_data[metadata][plan]": planId,
        "subscription_data[metadata][interval]": interval,
        "allow_promotion_codes": "true",
        "billing_address_collection": "required",
        "customer_creation": "always",
      }).toString(),
    })

    if (!response.ok) {
      // Si le Price ID n'existe pas, creer une session avec prix dynamique (mode test)
      const fallbackResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "mode": "subscription",
          "success_url": `${baseUrl}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
          "cancel_url": `${baseUrl}/premium/cancel`,
          "line_items[0][price_data][currency]": "usd",
          "line_items[0][price_data][product_data][name]": `Radio Tele Dessalines - Plan ${planNames[planId]}`,
          "line_items[0][price_data][product_data][description]": `Abonnement ${interval === "yearly" ? "annuel" : "mensuel"} au plan ${planNames[planId]}`,
          "line_items[0][price_data][unit_amount]": testPrices[priceKey].toString(),
          "line_items[0][price_data][recurring][interval]": interval === "yearly" ? "year" : "month",
          "line_items[0][quantity]": "1",
          "metadata[plan]": planId,
          "metadata[interval]": interval,
          "allow_promotion_codes": "true",
          "billing_address_collection": "required",
          "customer_creation": "always",
        }).toString(),
      })

      if (!fallbackResponse.ok) {
        const errorData = await fallbackResponse.json()
        console.error("[v0] Stripe error:", errorData)
        return NextResponse.json(
          { error: "Erreur lors de la creation de la session de paiement" },
          { status: 500 }
        )
      }

      const fallbackSession = await fallbackResponse.json()
      return NextResponse.json({ url: fallbackSession.url })
    }

    const session = await response.json()
    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error("[v0] Premium API error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// GET pour verifier le statut d'une session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID manquant" },
        { status: 400 }
      )
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Configuration Stripe manquante" },
        { status: 500 }
      )
    }

    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      {
        headers: {
          "Authorization": `Bearer ${stripeSecretKey}`,
        },
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: "Session non trouvee" },
        { status: 404 }
      )
    }

    const session = await response.json()

    return NextResponse.json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email,
      plan: session.metadata?.plan,
      interval: session.metadata?.interval,
    })

  } catch (error) {
    console.error("[v0] Premium session check error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
