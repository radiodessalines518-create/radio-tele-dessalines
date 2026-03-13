import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Types pour les données du formulaire
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Validation des données
function validateFormData(data: ContactFormData): { valid: boolean; error?: string } {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: "Le nom est requis (minimum 2 caractères)" }
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { valid: false, error: "L'adresse email n'est pas valide" }
  }
  if (!data.subject || data.subject.trim().length < 3) {
    return { valid: false, error: "Le sujet est requis (minimum 3 caractères)" }
  }
  if (!data.message || data.message.trim().length < 10) {
    return { valid: false, error: "Le message est requis (minimum 10 caractères)" }
  }
  return { valid: true }
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()

    // Validation des données
    const validation = validateFormData(body)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = body

    // Configuration du transporteur SMTP
    // Variables d'environnement requises:
    // - SMTP_HOST: Serveur SMTP (ex: smtp.gmail.com)
    // - SMTP_PORT: Port SMTP (ex: 587)
    // - SMTP_USER: Email utilisateur SMTP
    // - SMTP_PASSWORD: Mot de passe d'application
    // - CONTACT_EMAIL: Email de réception des messages
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Email HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C8102E, #8B0000); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #C8102E; }
            .message { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #C8102E; }
            .footer { text-align: center; padding: 15px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Radio Télé Dessalines</h1>
              <p>Nouveau message de contact</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Nom:</span>
                <p>${name}</p>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <p><a href="mailto:${email}">${email}</a></p>
              </div>
              <div class="field">
                <span class="label">Sujet:</span>
                <p>${subject}</p>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="message">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            <div class="footer">
              <p>Ce message a été envoyé via le formulaire de contact du site Radio Télé Dessalines</p>
              <p>96.7 FM | Chaine 17 | DC.TV 68</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Envoi de l'email
    await transporter.sendMail({
      from: `"Radio Télé Dessalines" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `[Contact RTD] ${subject}`,
      text: `
Nouveau message de contact - Radio Télé Dessalines

Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}

---
Ce message a été envoyé via le formulaire de contact du site Radio Télé Dessalines
96.7 FM | Chaine 17 | DC.TV 68
      `,
      html: htmlContent,
    })

    // Email de confirmation à l'expéditeur
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C8102E, #8B0000); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; padding: 15px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Radio Télé Dessalines</h1>
              <p>Confirmation de votre message</p>
            </div>
            <div class="content">
              <p>Bonjour ${name},</p>
              <p>Nous avons bien reçu votre message concernant: <strong>${subject}</strong></p>
              <p>Notre équipe vous répondra dans les plus brefs délais.</p>
              <p>Merci de votre confiance.</p>
              <p>Cordialement,<br>L'équipe Radio Télé Dessalines</p>
            </div>
            <div class="footer">
              <p>Radio Télé Dessalines - 96.7 FM | Chaine 17 | DC.TV 68</p>
              <p>Dessalines, Artibonite, Haïti</p>
            </div>
          </div>
        </body>
      </html>
    `

    await transporter.sendMail({
      from: `"Radio Télé Dessalines" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Confirmation de votre message - Radio Télé Dessalines",
      text: `
Bonjour ${name},

Nous avons bien reçu votre message concernant: ${subject}

Notre équipe vous répondra dans les plus brefs délais.

Merci de votre confiance.

Cordialement,
L'équipe Radio Télé Dessalines

---
Radio Télé Dessalines - 96.7 FM | Chaine 17 | DC.TV 68
Dessalines, Artibonite, Haïti
      `,
      html: confirmationHtml,
    })

    return NextResponse.json({
      success: true,
      message: "Message envoyé avec succès!",
    })
  } catch (error) {
    console.error("[v0] Erreur lors de l'envoi du message:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
      },
      { status: 500 }
    )
  }
}
