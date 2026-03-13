import { NextRequest, NextResponse } from "next/server"

const PAYPAL_API_URL = process.env.PAYPAL_MODE === "live" 
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com"

// Get PayPal access token
async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials not configured")
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error_description || "Failed to get PayPal access token")
  }

  return data.access_token
}

// Create PayPal order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = "USD" } = body

    // Validate amount
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Le montant doit etre superieur a $1" },
        { status: 400 }
      )
    }

    const accessToken = await getAccessToken()

    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
            },
            description: `Don a Radio Tele Dessalines - $${amount}`,
          },
        ],
        application_context: {
          brand_name: "Radio Tele Dessalines",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://radioteledessalines.ht"}/donation/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://radioteledessalines.ht"}/donation/cancel`,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] PayPal create order error:", data)
      return NextResponse.json(
        { error: "Erreur lors de la creation de la commande PayPal" },
        { status: 500 }
      )
    }

    // Find approval URL
    const approvalUrl = data.links?.find(
      (link: { rel: string; href: string }) => link.rel === "approve"
    )?.href

    return NextResponse.json({
      success: true,
      orderId: data.id,
      approvalUrl: approvalUrl,
    })
  } catch (error) {
    console.error("[v0] PayPal error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la creation de la commande PayPal" },
      { status: 500 }
    )
  }
}

// Capture PayPal payment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID manquant" },
        { status: 400 }
      )
    }

    const accessToken = await getAccessToken()

    const response = await fetch(
      `${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] PayPal capture error:", data)
      return NextResponse.json(
        { error: "Erreur lors de la capture du paiement" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      status: data.status,
      payerId: data.payer?.payer_id,
      amount: data.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value,
    })
  } catch (error) {
    console.error("[v0] PayPal capture error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la capture du paiement" },
      { status: 500 }
    )
  }
}
