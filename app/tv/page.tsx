"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Tv,
  Maximize2,
  Volume2,
  VolumeX,
  Search,
  Heart,
  Globe,
  Star,
  Filter,
  ChevronDown,
  Play,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Types
interface Channel {
  id: string
  name: string
  logo: string
  country: string
  countryCode: string
  category: string
  streamUrl: string
  streamType: "youtube" | "hls" | "iframe"
  currentShow?: string
}

// Liste des chaines TV internationales
const channels: Channel[] = [
  // Haiti
  {
    id: "rtd",
    name: "Radio Télé Dessalines",
    logo: "/images/logo-rtd.png",
    country: "Haiti",
    countryCode: "HT",
    category: "Local",
    streamUrl: "jfKfPfyJRdk",
    streamType: "youtube",
    currentShow: "Journal du soir",
  },
  {
    id: "tnh",
    name: "Télévision Nationale d'Haiti",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/TNH_logo.svg/200px-TNH_logo.svg.png",
    country: "Haiti",
    countryCode: "HT",
    category: "National",
    streamUrl: "TNHLive",
    streamType: "youtube",
  },
  // France
  {
    id: "france24",
    name: "France 24",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/France_24_logo.svg/200px-France_24_logo.svg.png",
    country: "France",
    countryCode: "FR",
    category: "News",
    streamUrl: "l8PMl7tUDIE",
    streamType: "youtube",
    currentShow: "Le Journal",
  },
  {
    id: "tv5monde",
    name: "TV5 Monde",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/TV5MONDE_logo.svg/200px-TV5MONDE_logo.svg.png",
    country: "France",
    countryCode: "FR",
    category: "International",
    streamUrl: "TV5MONDELive",
    streamType: "youtube",
  },
  {
    id: "bfmtv",
    name: "BFM TV",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/BFM_TV_logo.svg/200px-BFM_TV_logo.svg.png",
    country: "France",
    countryCode: "FR",
    category: "News",
    streamUrl: "bfmtv",
    streamType: "youtube",
  },
  // USA
  {
    id: "cnn",
    name: "CNN International",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/CNN_International_logo.svg/200px-CNN_International_logo.svg.png",
    country: "USA",
    countryCode: "US",
    category: "News",
    streamUrl: "cnni",
    streamType: "youtube",
  },
  {
    id: "abc",
    name: "ABC News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/ABC_News_solid_black_logo.svg/200px-ABC_News_solid_black_logo.svg.png",
    country: "USA",
    countryCode: "US",
    category: "News",
    streamUrl: "w_Ma8oQLmSM",
    streamType: "youtube",
  },
  // UK
  {
    id: "bbc",
    name: "BBC World News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_World_Service_red.svg/200px-BBC_World_Service_red.svg.png",
    country: "UK",
    countryCode: "GB",
    category: "News",
    streamUrl: "bbcworld",
    streamType: "youtube",
  },
  {
    id: "skynews",
    name: "Sky News",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Sky_News_2021.svg/200px-Sky_News_2021.svg.png",
    country: "UK",
    countryCode: "GB",
    category: "News",
    streamUrl: "9Auq9mYxFEE",
    streamType: "youtube",
  },
  // Spain
  {
    id: "rtve",
    name: "RTVE 24h",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Logo_TVE-24h.svg/200px-Logo_TVE-24h.svg.png",
    country: "Espagne",
    countryCode: "ES",
    category: "News",
    streamUrl: "rtve24h",
    streamType: "youtube",
  },
  // Qatar
  {
    id: "aljazeera",
    name: "Al Jazeera English",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Al_Jazeera_English.svg/200px-Al_Jazeera_English.svg.png",
    country: "Qatar",
    countryCode: "QA",
    category: "News",
    streamUrl: "gCNeDWCI0vo",
    streamType: "youtube",
  },
  // Germany
  {
    id: "dw",
    name: "DW News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Deutsche_Welle_symbol_2012.svg/200px-Deutsche_Welle_symbol_2012.svg.png",
    country: "Allemagne",
    countryCode: "DE",
    category: "News",
    streamUrl: "dw",
    streamType: "youtube",
  },
  // Sports
  {
    id: "eurosport",
    name: "Eurosport",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Eurosport_logo_%282015%29.svg/200px-Eurosport_logo_%282015%29.svg.png",
    country: "International",
    countryCode: "INT",
    category: "Sports",
    streamUrl: "eurosport",
    streamType: "youtube",
  },
  // Music
  {
    id: "mtv",
    name: "MTV Live",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/MTV_2021_%28brand_version%29.svg/200px-MTV_2021_%28brand_version%29.svg.png",
    country: "USA",
    countryCode: "US",
    category: "Music",
    streamUrl: "mtvlive",
    streamType: "youtube",
  },
]

// Categories et pays
const categories = ["Tous", "Local", "National", "News", "International", "Sports", "Music"]
const countries = [
  { code: "ALL", name: "Tous les pays", flag: "🌍" },
  { code: "HT", name: "Haiti", flag: "🇭🇹" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "US", name: "USA", flag: "🇺🇸" },
  { code: "GB", name: "UK", flag: "🇬🇧" },
  { code: "ES", name: "Espagne", flag: "🇪🇸" },
  { code: "DE", name: "Allemagne", flag: "🇩🇪" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "INT", name: "International", flag: "🌐" },
]

export default function TVPage() {
  const [selectedChannel, setSelectedChannel] = useState<Channel>(channels[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedCountry, setSelectedCountry] = useState("ALL")
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Charger les favoris depuis localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("rtd-tv-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Sauvegarder les favoris
  const toggleFavorite = useCallback((channelId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
      localStorage.setItem("rtd-tv-favorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }, [])

  // Filtrer les chaines
  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Tous" || channel.category === selectedCategory
    const matchesCountry = selectedCountry === "ALL" || channel.countryCode === selectedCountry
    const matchesFavorites = !showFavoritesOnly || favorites.includes(channel.id)
    return matchesSearch && matchesCategory && matchesCountry && matchesFavorites
  })

  // Fullscreen
  const toggleFullscreen = () => {
    const container = document.getElementById("tv-player-container")
    if (container) {
      if (!document.fullscreenElement) {
        container.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="mx-auto max-w-7xl px-4">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <Badge className="mb-4 bg-primary text-primary-foreground">
              <Globe className="mr-2 h-3 w-3" />
              TV MONDIALE
            </Badge>
            <h1 className="font-serif text-3xl font-bold md:text-4xl">
              TV Live Multi-Source
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Regardez les chaines TV du monde entier en direct. Selectionnez par pays ou categorie.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Player Section - Left/Main */}
            <div className="lg:col-span-2">
              <div
                id="tv-player-container"
                className="relative overflow-hidden rounded-2xl bg-black shadow-2xl"
              >
                {/* Live Badge */}
                <div className="absolute left-4 top-4 z-20">
                  <Badge className="bg-primary px-3 py-1 text-sm font-bold text-white animate-pulse-glow">
                    <span className="relative mr-2 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                    </span>
                    EN DIRECT
                  </Badge>
                </div>

                {/* YouTube/HLS Player */}
                <div className="relative aspect-video w-full bg-black">
                  {selectedChannel.streamType === "youtube" ? (
                    <iframe
                      key={selectedChannel.id}
                      src={`https://www.youtube.com/embed/${selectedChannel.streamUrl}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
                      title={selectedChannel.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : selectedChannel.streamType === "hls" ? (
                    <video
                      key={selectedChannel.id}
                      src={selectedChannel.streamUrl}
                      autoPlay
                      muted={isMuted}
                      controls
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : (
                    <iframe
                      key={selectedChannel.id}
                      src={selectedChannel.streamUrl}
                      title={selectedChannel.name}
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  )}
                </div>

                {/* Controls Bar */}
                <div className="flex items-center justify-between bg-gradient-to-t from-black to-black/90 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white p-1">
                      <Image
                        src={selectedChannel.logo}
                        alt={selectedChannel.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{selectedChannel.name}</p>
                      <p className="text-xs text-white/60">
                        {selectedChannel.currentShow || selectedChannel.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(selectedChannel.id)}
                      className={cn(
                        "h-9 w-9 hover:bg-white/20",
                        favorites.includes(selectedChannel.id)
                          ? "text-red-500"
                          : "text-white"
                      )}
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5",
                          favorites.includes(selectedChannel.id) && "fill-current"
                        )}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                      className="h-9 w-9 text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleFullscreen}
                      className="h-9 w-9 text-white hover:bg-white/20"
                    >
                      <Maximize2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Channel Info Card */}
              <div className="mt-4 rounded-xl bg-card p-4 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold">{selectedChannel.name}</h2>
                    <p className="text-muted-foreground">
                      {selectedChannel.country} - {selectedChannel.category}
                    </p>
                    {selectedChannel.currentShow && (
                      <p className="mt-2 text-sm">
                        <span className="font-medium">En cours:</span> {selectedChannel.currentShow}
                      </p>
                    )}
                  </div>
                  <Button
                    variant={favorites.includes(selectedChannel.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFavorite(selectedChannel.id)}
                    className={cn(
                      favorites.includes(selectedChannel.id) && "bg-red-500 hover:bg-red-600"
                    )}
                  >
                    <Heart className={cn(
                      "mr-2 h-4 w-4",
                      favorites.includes(selectedChannel.id) && "fill-current"
                    )} />
                    {favorites.includes(selectedChannel.id) ? "Favori" : "Ajouter aux favoris"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Channel List - Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 rounded-2xl bg-card p-4 shadow-lg">
                {/* Search & Filters */}
                <div className="mb-4 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Rechercher une chaine..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Filter Toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full justify-between"
                  >
                    <span className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtres
                    </span>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      showFilters && "rotate-180"
                    )} />
                  </Button>

                  {/* Filters Panel */}
                  {showFilters && (
                    <div className="space-y-3 rounded-lg bg-muted/50 p-3">
                      {/* Favorites Toggle */}
                      <Button
                        variant={showFavoritesOnly ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className="w-full"
                      >
                        <Star className={cn(
                          "mr-2 h-4 w-4",
                          showFavoritesOnly && "fill-current"
                        )} />
                        Mes favoris ({favorites.length})
                      </Button>

                      {/* Country Filter */}
                      <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">Pays</p>
                        <div className="flex flex-wrap gap-1">
                          {countries.map(country => (
                            <Button
                              key={country.code}
                              variant={selectedCountry === country.code ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedCountry(country.code)}
                              className="h-7 px-2 text-xs"
                            >
                              {country.flag}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Category Filter */}
                      <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">Categorie</p>
                        <div className="flex flex-wrap gap-1">
                          {categories.map(cat => (
                            <Button
                              key={cat}
                              variant={selectedCategory === cat ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedCategory(cat)}
                              className="h-7 px-2 text-xs"
                            >
                              {cat}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Channel List */}
                <div className="max-h-[500px] space-y-2 overflow-y-auto pr-1">
                  {filteredChannels.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      <Tv className="mx-auto mb-2 h-8 w-8 opacity-50" />
                      <p>Aucune chaine trouvee</p>
                    </div>
                  ) : (
                    filteredChannels.map(channel => (
                      <button
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all",
                          selectedChannel.id === channel.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/50 hover:bg-muted"
                        )}
                      >
                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-white p-1">
                          <Image
                            src={channel.logo}
                            alt={channel.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{channel.name}</p>
                          <p className={cn(
                            "text-xs",
                            selectedChannel.id === channel.id
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          )}>
                            {channel.country}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {favorites.includes(channel.id) && (
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          )}
                          {selectedChannel.id === channel.id && (
                            <Play className="h-4 w-4 fill-current" />
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </div>

                {/* Channel Count */}
                <div className="mt-3 border-t pt-3 text-center text-xs text-muted-foreground">
                  {filteredChannels.length} chaine{filteredChannels.length !== 1 ? "s" : ""} disponible{filteredChannels.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
