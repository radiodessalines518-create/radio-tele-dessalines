import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = "usd", successUrl, cancelUrl } = body

    // Validate amount
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Le montant doit etre superieur a $1" },
        { status: 400 }
      )
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "Don a Radio Tele Dessalines",
              description: `Merci pour votre don de $${amount} a Radio Tele Dessalines`,
              images: ["https://radioteledessalines.ht/images/logo-rtd.png"],
            },
            unit_amount: Math.round(amount * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL || "https://radioteledessalines.ht"}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL || "https://radioteledessalines.ht"}/donation/cancel`,
      metadata: {
        type: "donation",
        amount: amount.toString(),
      },
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error("[v0] Stripe error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la creation de la session de paiement" },
      { status: 500 }
    )
  }
}

// Verify payment status
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

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return NextResponse.json({
      success: true,
      status: session.payment_status,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      customerEmail: session.customer_details?.email,
    })
  } catch (error) {
    console.error("[v0] Stripe verification error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la verification du paiement" },
      { status: 500 }
    )
  }
}
