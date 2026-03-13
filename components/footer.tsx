"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Tv, Send, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickLinks = [
  { label: "Accueil", href: "/" },
  { label: "Actualités", href: "/actualites" },
  { label: "Politique", href: "/politique" },
  { label: "Sport", href: "/sport" },
  { label: "Culture", href: "/culture" },
  { label: "Vidéos", href: "#videos" },
  { label: "Podcasts", href: "/podcasts" },
  { label: "Contact", href: "/contact" },
]

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/radioteledessalines", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/rtdessalines", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/radioteledessalines", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@radioteledessalines", label: "YouTube" },
]

// Informations de contact
const CONTACT_INFO = {
  email: "contact@radioteledessalines.com",
  phone: "+1 (329) 225-3618",
  address: "Dessalines, Artibonite, Haïti",
  frequency: "96.7 FM",
  channel: "Canal 17",
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/images/logo-rtd.png"
                alt="Radio Télé Dessalines"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold leading-tight text-white">
                  Radio Télé
                </span>
                <span className="font-serif text-sm font-bold leading-tight text-accent">
                  Dessalines
                </span>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-white/70">
              Radio Télé Dessalines est une institution médiatique créée le 15 mars 2005. 
              Elle est située à Dessalines, berceau de l{"'"}indépendance haïtienne et 
              première capitale noire indépendante du monde.
            </p>
            <p className="text-sm leading-relaxed text-white/70">
              Fidèle à sa mission d{"'"}informer, d{"'"}éduquer et de divertir, Radio Télé 
              Dessalines diffuse ses émissions en créole et en français sur la bande FM 
              à la fréquence {CONTACT_INFO.frequency} ainsi qu{"'"}en Very High Frequency (VHF), {CONTACT_INFO.channel}.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-bold text-white">
              Navigation rapide
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-bold text-white">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-white/70 transition-colors hover:text-accent"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-accent" />
                <a 
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  className="text-sm text-white/70 transition-colors hover:text-accent"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-sm text-white/70">
                  {CONTACT_INFO.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Tv className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-sm text-white/70">
                  {CONTACT_INFO.frequency} | {CONTACT_INFO.channel}
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold text-white">
                Suivez-nous
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-primary hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-bold text-white">
              Abonnez-vous à notre newsletter
            </h3>
            <p className="mb-4 text-sm text-white/70">
              Recevez les dernières actualités, émissions et informations 
              importantes directement dans votre boîte mail.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-accent focus:ring-accent"
              />
              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground transition-all hover:bg-accent/90 hover:scale-[1.02]"
              >
                <Send className="mr-2 h-4 w-4" />
                S{"'"}abonner
              </Button>
            </form>
            {isSubscribed && (
              <p className="mt-3 text-sm text-green-400">
                Merci pour votre inscription!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <p className="text-sm text-white/60">
                © 2026 Radio Télé Dessalines
              </p>
              <p className="text-sm text-white/60">
                Tous droits réservés.
              </p>
              <p className="mt-1 text-xs text-white/40">
                Site web développé par Samson Janvier
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 md:items-end">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                <span className="text-sm text-white/60">
                  En direct 24h/24
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/40">
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-accent">
                  {CONTACT_INFO.email}
                </a>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="hover:text-accent">
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
