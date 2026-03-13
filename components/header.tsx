"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Écouter en direct", href: "#radio-live" },
  { label: "TV Live", href: "/tv" },
  { label: "Actualités", href: "/actualites" },
  { label: "Politique", href: "/politique" },
  { label: "Sport", href: "/sport" },
  { label: "Culture", href: "/culture" },
  { label: "Podcasts", href: "/podcasts" },
  { label: "Premium", href: "/premium", premium: true },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-secondary text-secondary-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-20 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-rtd.png"
            alt="Radio Télé Dessalines"
            width={60}
            height={60}
            className="h-12 w-auto lg:h-14"
          />
          <div className="hidden flex-col sm:flex">
            <span className="font-serif text-base font-bold leading-tight text-white lg:text-lg">
              Radio Télé
            </span>
            <span className="font-serif text-sm font-bold leading-tight text-accent lg:text-base">
              Dessalines
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                'premium' in item && item.premium
                  ? "px-3 py-2 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                  : "px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
              }
            >
              {item.label}
              {'premium' in item && item.premium && (
                <span className="ml-1 rounded bg-accent/20 px-1.5 py-0.5 text-xs">PRO</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Live Badge */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link href="#radio-live" className="flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 transition-colors hover:bg-primary/30">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
            </span>
            <span className="text-sm font-semibold text-white">LIVE 96.7 FM</span>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 xl:hidden">
          <Link href="#radio-live" className="flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            <span className="text-xs font-semibold text-white">LIVE</span>
          </Link>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-secondary text-white">
              <div className="flex flex-col gap-6 pt-8">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/logo-rtd.png"
                    alt="Radio Télé Dessalines"
                    width={50}
                    height={50}
                    className="h-12 w-auto"
                  />
                  <div className="flex flex-col">
                    <span className="font-serif text-base font-bold leading-tight">Radio Télé</span>
                    <span className="font-serif text-sm font-bold leading-tight text-accent">Dessalines</span>
                  </div>
                </div>
                
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-4 flex items-center gap-2 rounded-full bg-primary/20 px-4 py-3">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                  </span>
                  <span className="text-sm font-semibold text-white">LIVE 96.7 FM</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
