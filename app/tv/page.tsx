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
    name: "Télé Dessalines",
    logo: "/images/logo-rtd.png",
    country: "Haiti",
    countryCode: "HT",
    category: "Local",
    streamUrl: "DiwB6LL0FOo?si",
    streamType: "youtube",
    currentShow: "Journal du soir",
  },
  {
    id: "tnh",
    name: "Télévision Nationale d'Haiti",
    logo: "/images/tv/tnh.jpg",
    country: "Haiti",
    countryCode: "HT",
    category: "National",
    streamUrl: "e5nAORVpdQQ",
    streamType: "youtube",
  },
  // France
  {
  id: "france24hls",
  name: "France 24 Live (HLS)",
  logo: "/images/tv/france24.jpg",
  country: "France",
  countryCode: "FR",
  category: "News",
  streamUrl: "https://live.france24.com/hls/live/2037179/F24_FR_HI_HLS/master_5000.m3u8",
  streamType: "hls",
},
  {
    id: "tv5monde",
    name: "TV5 Monde",
    logo: "/images/tv/tv5monde.jpg",
    country: "France",
    countryCode: "FR",
    category: "International",
    streamUrl: "OrpC-JH61Xk",
    streamType: "youtube",
  },
  {
    id: "bfmtv",
    name: "BFM TV",
    logo: "/images/tv/bfmtv.jpg",
    country: "France",
    countryCode: "FR",
    category: "News",
    streamUrl: "TwjQipQz1ik",
    streamType: "youtube",
  },
  // USA
  {
    id: "cnn",
    name: "CNN International",
    logo: "/images/tv/cnn.jpg",
    country: "USA",
    countryCode: "US",
    category: "News",
    streamUrl: "wz0QlqLxPuQ",
    streamType: "youtube",
  },
  {
  id: "abc",
  name: "ABC News Live",
  logo: "/images/tv/abc.jpg",
  country: "USA",
  countryCode: "US",
  category: "News",
  streamUrl: "https://abcnews.com/live",
  streamType: "iframe",
},
  // UK
  {
    id: "bbc",
    name: "BBC World News",
    logo: "/images/tv/bbc.jpg",
    country: "UK",
    countryCode: "GB",
    category: "News",
    streamUrl: "iYtaatZwnjU?si",
    streamType: "youtube",
  },
  {
    id: "skynews",
    name: "Sky News",
    logo: "/images/tv/skynews.jpg",
    country: "UK",
    countryCode: "GB",
    category: "News",
    streamUrl: "YDvsBbKfLPA",
    streamType: "youtube",
  },
  // Spain
  {
    id: "rtve",
    name: "RTVE 24h",
    logo: "/images/tv/rtve.jpg",
    country: "Espagne",
    countryCode: "ES",
    category: "News",
    streamUrl: "ku09JnYKhz0",
    streamType: "youtube",
  },
  // Qatar
  {
    id: "aljazeera",
    name: "Al Jazeera English",
    logo: "/images/tv/aljazeera.jpg",
    country: "Qatar",
    countryCode: "QA",
    category: "News",
    streamUrl: "gCNeDWCI0vo?si",
    streamType: "youtube",
  },
  // Germany
  {
    id: "dw",
    name: "DW News",
    logo: "/images/tv/dw.jpg",
    country: "Allemagne",
    countryCode: "DE",
    category: "News",
    streamUrl: "LuKwFajn37U?si",
    streamType: "youtube",
  },
  // Sports
  {
    id: "eurosport",
    name: "Eurosport",
    logo: "/images/tv/eurosport.jpg",
    country: "International",
    countryCode: "INT",
    category: "Sports",
    streamUrl: "KXqQ7tOiCUU?si",
    streamType: "youtube",
  },
  // Music
  {
    id: "mtv",
    name: "MTV Live",
    logo: "/images/tv/mtv.jpg",
    country: "USA",
    countryCode: "US",
    category: "Music",
    streamUrl: "bVfjaH4wXpE?si",
    streamType: "youtube",
  },
  {
  id: "euronews",
  name: "Euronews Live",
  logo: "/images/tv/euronews.jpg",
  country: "Europe",
  countryCode: "INT",
  category: "News",
  streamUrl: "https://a-cdn.klowdtv.com/live3/euronews_720p/playlist.m3u8",
  streamType: "hls",
},

{
  id: "nasa",
  name: "NASA TV",
  logo: "/images/tv/nasa.jpg",
  country: "USA",
  countryCode: "US",
  category: "International",
  streamUrl: "https://nasatv-lh.akamaihd.net/i/NASA_101@319270/master.m3u8",
  streamType: "hls",
},

{
  id: "bloomberg",
  name: "Bloomberg TV",
  logo: "/images/tv/bloomberg.jpg",
  country: "USA",
  countryCode: "US",
  category: "News",
  streamUrl: "https://bloomberg-bloomberg-1-fr.samsung.wurl.com/manifest/playlist.m3u8",
  streamType: "hls",
},

{
  id: "cgtn",
  name: "CGTN News",
  logo: "/images/tv/cgtn.jpg",
  country: "China",
  countryCode: "INT",
  category: "News",
  streamUrl: "https://live.cgtn.com/1000/prog_index.m3u8",
  streamType: "hls",
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
