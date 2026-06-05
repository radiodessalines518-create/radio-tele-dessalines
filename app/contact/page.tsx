"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Send, ArrowLeft, Radio, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Informations de contact
const CONTACT_INFO = {
  email: "contact@radioteledessalines.com",
  phone: "+1(329) 225-3618",
  address: "Dessalines, Artibonite, Haïti",
  frequency: "96.7 FM",
  channel: "Canal 17",
  dcTv: "DC.TV 68",
}

type FormStatus = "idle" | "submitting" | "success" | "error"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setErrorMessage(data.error || "Une erreur est survenue")
        setTimeout(() => setStatus("idle"), 5000)
      }
    } catch {
      setStatus("error")
      setErrorMessage("Erreur de connexion. Veuillez réessayer.")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-secondary py-16 md:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(200,16,46,0.3)_0%,_transparent_50%)]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 text-center">
            <Link 
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à l{"'"}accueil
            </Link>
            <Badge variant="outline" className="mb-4 border-accent text-accent">
              Contact
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Contactez-nous
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Vous avez une question, une suggestion ou souhaitez nous contacter? 
              N{"'"}hésitez pas à nous écrire, nous vous répondrons dans les plus brefs délais.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
                  <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
                    Envoyez-nous un message
                  </h2>
                  
                  {status === "success" ? (
                    <div className="rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-green-800 dark:text-green-400">
                        Message envoyé avec succès!
                      </h3>
                      <p className="text-green-700 dark:text-green-300">
                        Merci pour votre message. Vous recevrez une confirmation par email et nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  ) : status === "error" ? (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                      <div className="flex items-center gap-3">
                        <XCircle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                        <div>
                          <h3 className="font-semibold text-red-800 dark:text-red-400">
                            Erreur lors de l{"'"}envoi
                          </h3>
                          <p className="text-sm text-red-700 dark:text-red-300">
                            {errorMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {status !== "success" && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                          Nom <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Votre nom complet"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          minLength={2}
                          className="h-12"
                          disabled={status === "submitting"}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-12"
                          disabled={status === "submitting"}
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                          Sujet <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="Sujet de votre message"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          minLength={3}
                          className="h-12"
                          disabled={status === "submitting"}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Écrivez votre message ici..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          minLength={10}
                          rows={6}
                          className="resize-none"
                          disabled={status === "submitting"}
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full bg-primary py-6 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Envoyer le message
                          </>
                        )}
                      </Button>

                      <p className="text-center text-sm text-muted-foreground">
                        Les champs marqués d{"'"}un <span className="text-red-500">*</span> sont obligatoires
                      </p>
                    </form>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="order-1 lg:order-2">
                <div className="mb-8">
                  <Image
                    src="/images/logo-rtd.png"
                    alt="Radio Télé Dessalines"
                    width={120}
                    height={120}
                    className="mb-6 h-24 w-auto"
                  />
                  <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
                    Informations de contact
                  </h2>
                  <p className="text-muted-foreground">
                    Radio Télé Dessalines est à votre écoute. Contactez-nous par email, 
                    téléphone ou rendez-nous visite à Dessalines.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted/70">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <a 
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted/70">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Téléphone</h3>
                      <a 
                        href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {CONTACT_INFO.phone}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted/70">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Localisation</h3>
                      <p className="text-muted-foreground">
                        {CONTACT_INFO.address}
                      </p>
                    </div>
                  </div>

                  {/* Frequencies */}
                  <div className="flex items-start gap-4 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted/70">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent/20">
                      <Radio className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Fréquences</h3>
                      <p className="text-muted-foreground">
                        {CONTACT_INFO.frequency} | {CONTACT_INFO.channel} | {CONTACT_INFO.dcTv}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted/70">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Horaires</h3>
                      <p className="text-muted-foreground">
                        En direct 24h/24, 7j/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
