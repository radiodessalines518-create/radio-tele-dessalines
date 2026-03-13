"use client"

import { useState, useRef, useEffect } from "react"
import { 
  MessageCircle, 
  X, 
  Send, 
  ThumbsUp, 
  Heart, 
  Smile,
  Users,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  user: string
  text: string
  timestamp: Date
  reactions?: { type: string; count: number }[]
}

interface LiveChatProps {
  roomName?: string
  isLive?: boolean
}

// Simulation de messages
const generateMockMessages = (): Message[] => [
  {
    id: "1",
    user: "Jean Pierre",
    text: "Excellente émission ce matin !",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    reactions: [{ type: "like", count: 3 }],
  },
  {
    id: "2",
    user: "Marie Claire",
    text: "Pouvez-vous parler de la situation économique ?",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    reactions: [{ type: "heart", count: 1 }],
  },
  {
    id: "3",
    user: "Paul Antoine",
    text: "Bonjour de Dessalines !",
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
  },
]

export function LiveChat({ roomName = "Live Radio", isLive = true }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(generateMockMessages())
  const [newMessage, setNewMessage] = useState("")
  const [username, setUsername] = useState("")
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(true)
  const [viewerCount, setViewerCount] = useState(127)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulation de viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 5) - 2)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !username) return

    const message: Message = {
      id: Date.now().toString(),
      user: username,
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleReaction = (messageId: string, reactionType: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions?.find((r) => r.type === reactionType)
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions?.map((r) =>
                r.type === reactionType ? { ...r, count: r.count + 1 } : r
              ),
            }
          }
          return {
            ...msg,
            reactions: [...(msg.reactions || []), { type: reactionType, count: 1 }],
          }
        }
        return msg
      })
    )
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  }

  const reactionIcons: Record<string, React.ReactNode> = {
    like: <ThumbsUp className="h-3 w-3" />,
    heart: <Heart className="h-3 w-3" />,
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90"
      >
        <MessageCircle className="h-6 w-6" />
        {isLive && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-accent"></span>
          </span>
        )}
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 overflow-hidden rounded-2xl bg-card shadow-2xl md:w-96">
      {/* Header */}
      <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-5 w-5" />
          <div>
            <h3 className="font-semibold">{roomName}</h3>
            <div className="flex items-center gap-2 text-xs text-primary-foreground/80">
              {isLive && (
                <Badge variant="secondary" className="bg-accent text-accent-foreground px-1.5 py-0">
                  LIVE
                </Badge>
              )}
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {viewerCount} spectateurs
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Username Prompt */}
      {showUsernamePrompt && (
        <div className="border-b border-border p-4">
          <p className="mb-2 text-sm text-muted-foreground">
            Entrez votre nom pour participer :
          </p>
          <div className="flex gap-2">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Votre nom..."
              className="flex-1"
            />
            <Button
              onClick={() => username && setShowUsernamePrompt(false)}
              size="sm"
              disabled={!username}
            >
              OK
            </Button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="h-72 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="mb-4 animate-fade-in-up"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-semibold text-foreground">
                {message.user}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTime(message.timestamp)}
              </span>
            </div>
            <p className="mt-1 text-sm text-foreground/80">{message.text}</p>
            
            {/* Reactions */}
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => handleReaction(message.id, "like")}
                className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted/80"
              >
                <ThumbsUp className="h-3 w-3" />
                {message.reactions?.find((r) => r.type === "like")?.count || 0}
              </button>
              <button
                onClick={() => handleReaction(message.id, "heart")}
                className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted/80"
              >
                <Heart className="h-3 w-3" />
                {message.reactions?.find((r) => r.type === "heart")?.count || 0}
              </button>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={username ? "Votre message..." : "Entrez d'abord votre nom"}
            disabled={!username || showUsernamePrompt}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || !username || showUsernamePrompt}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Quick Reactions */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Réactions rapides:</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2"
            onClick={() => {
              if (username) {
                const msg: Message = {
                  id: Date.now().toString(),
                  user: username,
                  text: "Super !",
                  timestamp: new Date(),
                }
                setMessages((prev) => [...prev, msg])
              }
            }}
            disabled={!username || showUsernamePrompt}
          >
            <ThumbsUp className="h-4 w-4 mr-1" /> Super
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2"
            onClick={() => {
              if (username) {
                const msg: Message = {
                  id: Date.now().toString(),
                  user: username,
                  text: "Bravo !",
                  timestamp: new Date(),
                }
                setMessages((prev) => [...prev, msg])
              }
            }}
            disabled={!username || showUsernamePrompt}
          >
            <Heart className="h-4 w-4 mr-1" /> Bravo
          </Button>
        </div>
      </div>
    </div>
  )
}
