"use client"

import { useState } from "react"
import { Heart, X, CreditCard, DollarSign, Smartphone, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const DONATION_AMOUNTS = [5, 10, 25, 50, 100]

type PaymentStatus = "idle" | "loading" | "success" | "error"

interface DonationButtonProps {
  variant?: "default" | "floating" | "inline"
  className?: string
}

export function DonationButton({ variant = "default", className = "" }: DonationButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25)
  const [customAmount, setCustomAmount] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const getAmount = () => {
    return customAmount ? parseFloat(customAmount) : selectedAmount || 0
  }

  const handleStripePayment = async () => {
    const amount = getAmount()
    if (amount < 1) {
      setStatusMessage("Le montant minimum est de $1")
      setPaymentStatus("error")
      return
    }

    setPaymentStatus("loading")
    setStatusMessage("Redirection vers le paiement securise...")

    try {
      const response = await fetch("/api/donate/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "usd",
          successUrl: `${window.location.origin}/donation/success`,
          cancelUrl: `${window.location.origin}/donation/cancel`,
        }),
      })

      const data = await response.json()

      if (data.success && data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || "Erreur lors de la creation du paiement")
      }
    } catch (error) {
      console.error("Stripe error:", error)
      setPaymentStatus("error")
      setStatusMessage("Erreur lors du paiement. Veuillez reessayer.")
      setTimeout(() => setPaymentStatus("idle"), 3000)
    }
  }

  const handlePayPalPayment = async () => {
    const amount = getAmount()
    if (amount < 1) {
      setStatusMessage("Le montant minimum est de $1")
      setPaymentStatus("error")
      return
    }

    setPaymentStatus("loading")
    setStatusMessage("Connexion a PayPal...")

    try {
      const response = await fetch("/api/donate/paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "USD",
        }),
      })

      const data = await response.json()

      if (data.success && data.approvalUrl) {
        window.location.href = data.approvalUrl
      } else {
        throw new Error(data.error || "Erreur lors de la creation de la commande PayPal")
      }
    } catch (error) {
      console.error("PayPal error:", error)
      setPaymentStatus("error")
      setStatusMessage("Erreur PayPal. Veuillez reessayer.")
      setTimeout(() => setPaymentStatus("idle"), 3000)
    }
  }

  const handleMonCashPayment = () => {
    const amount = getAmount()
    if (amount < 1) {
      setStatusMessage("Le montant minimum est de $1")
      setPaymentStatus("error")
      return
    }

    // MonCash integration - show instructions
    setPaymentStatus("success")
    setStatusMessage(`Envoyez $${amount} USD via MonCash au: +509 3XXX-XXXX. Reference: RTD-DON`)
    
    // Copy to clipboard
    navigator.clipboard?.writeText("+509 3XXX-XXXX")
  }

  const resetStatus = () => {
    setPaymentStatus("idle")
    setStatusMessage("")
  }

  if (variant === "floating") {
    return (
      <>
        {/* Floating Button */}
        <button
          onClick={() => {
            setIsOpen(true)
            resetStatus()
          }}
          className={cn(
            "fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl",
            "animate-pulse-glow",
            className
          )}
          aria-label="Faire un don"
        >
          <Heart className="h-6 w-6" />
        </button>

        {/* Modal */}
        {isOpen && (
          <DonationModal
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
            customAmount={customAmount}
            setCustomAmount={setCustomAmount}
            onStripePayment={handleStripePayment}
            onPayPalPayment={handlePayPalPayment}
            onMonCashPayment={handleMonCashPayment}
            paymentStatus={paymentStatus}
            statusMessage={statusMessage}
            onClose={() => {
              setIsOpen(false)
              resetStatus()
            }}
          />
        )}
      </>
    )
  }

  if (variant === "inline") {
    return (
      <div className={cn("rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6", className)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold">Soutenez Radio Tele Dessalines</h3>
            <p className="text-sm text-muted-foreground">Votre contribution nous aide a continuer</p>
          </div>
        </div>

        {/* Status Message */}
        {paymentStatus !== "idle" && (
          <div className={cn(
            "mb-4 p-3 rounded-lg flex items-center gap-2",
            paymentStatus === "loading" && "bg-blue-50 text-blue-700",
            paymentStatus === "success" && "bg-green-50 text-green-700",
            paymentStatus === "error" && "bg-red-50 text-red-700"
          )}>
            {paymentStatus === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {paymentStatus === "success" && <CheckCircle className="h-4 w-4" />}
            {paymentStatus === "error" && <AlertCircle className="h-4 w-4" />}
            <span className="text-sm">{statusMessage}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {DONATION_AMOUNTS.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount)
                setCustomAmount("")
                resetStatus()
              }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                selectedAmount === amount
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              ${amount}
            </button>
          ))}
          <input
            type="number"
            placeholder="Autre"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value)
              setSelectedAmount(null)
              resetStatus()
            }}
            className="w-20 rounded-full border px-3 py-2 text-sm text-center"
            min="1"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handlePayPalPayment}
            disabled={paymentStatus === "loading"}
            className="flex-1 min-w-[120px] bg-[#0070BA] hover:bg-[#005ea6]"
          >
            {paymentStatus === "loading" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <DollarSign className="mr-2 h-4 w-4" />
            )}
            PayPal
          </Button>
          <Button
            onClick={handleStripePayment}
            disabled={paymentStatus === "loading"}
            className="flex-1 min-w-[120px] bg-[#635BFF] hover:bg-[#5851db]"
          >
            {paymentStatus === "loading" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="mr-2 h-4 w-4" />
            )}
            Carte
          </Button>
          <Button
            onClick={handleMonCashPayment}
            disabled={paymentStatus === "loading"}
            className="flex-1 min-w-[120px] bg-[#E31837] hover:bg-[#c41530]"
          >
            <Smartphone className="mr-2 h-4 w-4" />
            MonCash
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true)
          resetStatus()
        }}
        className={cn("bg-primary hover:bg-primary/90", className)}
      >
        <Heart className="mr-2 h-4 w-4" />
        Faire un don
      </Button>

      {isOpen && (
        <DonationModal
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
          customAmount={customAmount}
          setCustomAmount={setCustomAmount}
          onStripePayment={handleStripePayment}
          onPayPalPayment={handlePayPalPayment}
          onMonCashPayment={handleMonCashPayment}
          paymentStatus={paymentStatus}
          statusMessage={statusMessage}
          onClose={() => {
            setIsOpen(false)
            resetStatus()
          }}
        />
      )}
    </>
  )
}

interface DonationModalProps {
  selectedAmount: number | null
  setSelectedAmount: (amount: number | null) => void
  customAmount: string
  setCustomAmount: (amount: string) => void
  onStripePayment: () => void
  onPayPalPayment: () => void
  onMonCashPayment: () => void
  paymentStatus: PaymentStatus
  statusMessage: string
  onClose: () => void
}

function DonationModal({
  selectedAmount,
  setSelectedAmount,
  customAmount,
  setCustomAmount,
  onStripePayment,
  onPayPalPayment,
  onMonCashPayment,
  paymentStatus,
  statusMessage,
  onClose,
}: DonationModalProps) {
  const amount = customAmount ? parseFloat(customAmount) : selectedAmount || 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted"
          disabled={paymentStatus === "loading"}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-serif text-2xl font-bold">Soutenez-nous</h2>
          <p className="mt-2 text-muted-foreground">
            Votre contribution aide Radio Tele Dessalines a continuer sa mission d{"'"}information et de divertissement.
          </p>
        </div>

        {/* Status Message */}
        {paymentStatus !== "idle" && (
          <div className={cn(
            "mb-4 p-4 rounded-lg flex items-center gap-3",
            paymentStatus === "loading" && "bg-blue-50 text-blue-700 dark:bg-blue-900/20",
            paymentStatus === "success" && "bg-green-50 text-green-700 dark:bg-green-900/20",
            paymentStatus === "error" && "bg-red-50 text-red-700 dark:bg-red-900/20"
          )}>
            {paymentStatus === "loading" && <Loader2 className="h-5 w-5 animate-spin flex-shrink-0" />}
            {paymentStatus === "success" && <CheckCircle className="h-5 w-5 flex-shrink-0" />}
            {paymentStatus === "error" && <AlertCircle className="h-5 w-5 flex-shrink-0" />}
            <span className="text-sm">{statusMessage}</span>
          </div>
        )}

        {/* Montants */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">
            Choisissez un montant
          </label>
          <div className="grid grid-cols-5 gap-2">
            {DONATION_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setSelectedAmount(amt)
                  setCustomAmount("")
                }}
                disabled={paymentStatus === "loading"}
                className={cn(
                  "rounded-lg py-3 text-sm font-semibold transition-all",
                  selectedAmount === amt
                    ? "bg-primary text-white shadow-lg"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                ${amt}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <input
              type="number"
              placeholder="Montant personnalise (USD)"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount(null)
              }}
              disabled={paymentStatus === "loading"}
              className="w-full rounded-lg border px-4 py-3 text-center"
              min="1"
            />
          </div>
        </div>

        {/* Methodes de paiement */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">
            Methode de paiement
          </label>
          
          {/* PayPal */}
          <Button
            onClick={onPayPalPayment}
            disabled={amount < 1 || paymentStatus === "loading"}
            className="w-full justify-start text-left bg-[#0070BA] hover:bg-[#005ea6]"
          >
            {paymentStatus === "loading" ? (
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            ) : (
              <DollarSign className="mr-3 h-5 w-5" />
            )}
            <span className="flex-1">PayPal</span>
            <span className="text-white/80">${amount || 0}</span>
          </Button>

          {/* Stripe (Carte bancaire) */}
          <Button
            onClick={onStripePayment}
            disabled={amount < 1 || paymentStatus === "loading"}
            className="w-full justify-start text-left bg-[#635BFF] hover:bg-[#5851db]"
          >
            {paymentStatus === "loading" ? (
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            ) : (
              <CreditCard className="mr-3 h-5 w-5" />
            )}
            <span className="flex-1">Carte bancaire</span>
            <span className="text-white/80">${amount || 0}</span>
          </Button>

          {/* MonCash */}
          <Button
            onClick={onMonCashPayment}
            disabled={amount < 1 || paymentStatus === "loading"}
            className="w-full justify-start text-left bg-[#E31837] hover:bg-[#c41530]"
          >
            <Smartphone className="mr-3 h-5 w-5" />
            <span className="flex-1">MonCash (Haiti)</span>
            <span className="text-white/80">${amount || 0}</span>
          </Button>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Paiement securise SSL 256-bit. Votre don est deductible des impots.
        </p>
      </div>
    </div>
  )
}

export { DonationButton }
