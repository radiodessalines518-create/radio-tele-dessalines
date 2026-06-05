import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) {
      return NextResponse.json(
        { success: false, error: "DATABASE_URL is missing" },
        { status: 500 }
      )
    }

    const sql = neon(databaseUrl)

    const body = await request.json()
    const { name, email, subject, message } = body || {}

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Tous les champs sont requis." },
        { status: 400 }
      )
    }

    await sql`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject}, ${message})
    `

    return NextResponse.json({
      success: true,
      message: "Message envoyé avec succès",
    })

  } catch (error) {
    console.error("Database Error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur lors de l'enregistrement.",
      },
      { status: 500 }
    )
  }
}