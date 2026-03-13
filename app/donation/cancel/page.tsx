import Link from "next/link"
import { XCircle, ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DonationCancelPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center">
          {/* Cancel Icon */}
          <div className="relative mx-auto mb-8">
            <div className="flex h-32 w-32 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
              <XCircle className="h-16 w-16 text-white" />
            </div>
          </div>

          <h1 className="font-serif text-3xl font-bold mb-4">
            Don annule
          </h1>

          <p className="text-muted-foreground mb-8">
            Votre don n{"'"}a pas ete complete. Si vous avez rencontre un probleme, 
            n{"'"}hesitez pas a reessayer ou a nous contacter.
          </p>

          <div className="rounded-2xl bg-muted/50 p-6 mb-8">
            <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="text-sm">
              Chaque don, meme petit, nous aide a continuer notre mission 
              d{"'"}informer et de divertir la communaute haitienne.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour a l{"'"}accueil
              </Button>
            </Link>
            <Link href="/#radio-live">
              <Button size="lg" className="w-full sm:w-auto">
                <Heart className="mr-2 h-4 w-4" />
                Reessayer
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Besoin d{"'"}aide? Contactez-nous a contact@radioteledessalines.ht
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
