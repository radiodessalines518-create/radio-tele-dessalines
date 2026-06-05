"use client"

import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Calendar, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Spinner } from "@/components/ui/spinner"

const articles = [
  {
    id: 1,
    title: "Radyo Tele Desalin (RTD) : yon patrimwàn vivan nan komin Desalin",
    excerpt: "Nan tout kominote, Radyo Tele Desalin se yon enstitisyon ki make istwa lokal la depi 2005.",
    date: "Fidano Daméus      15 mars 2026",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    title: "9 Avril, Yon dat enpòtan nan istwa Ayiti ak Vil Desalin",
    excerpt: "1804 make desizyon Desalin pou fòtifye peyi a ak sis fò nan vil Desalin pou pwoteje endepandans Ayiti. Jodi a, patrimwàn sa yo neglije e mande plis pwoteksyon.",
    date: "9 Avril 2026",
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    title: "Célébration du patrimoine culinaire haïtien",
    excerpt: "Un festival gastronomique met en lumière les saveurs et traditions culinaires de notre pays.",
    date: "4 mars 2026",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    title: "Théâtre: nouvelle pièce sur l'histoire de Dessalines",
    excerpt: "Une production théâtrale retrace la vie du fondateur de la nation haïtienne.",
    date: "2 mars 2026",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    title: "Carnaval 2026: les préparatifs battent leur plein",
    excerpt: "Les groupes musicaux et les bandes à pied se préparent pour la grande fête nationale.",
    date: "28 février 2026",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    title: "Sortie du nouveau livre d'un auteur haïtien primé",
    excerpt: "L'écrivain haïtien présente son nouveau roman qui explore l'identité caribéenne contemporaine.",
    date: "25 février 2026",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=500&fit=crop",
  },
]

function CulturePageContent() {
  const searchParams = useSearchParams()
  const articleId = searchParams.get("article")

  const selectedArticle = articles.find(
    (a) => a.id.toString() === articleId
  )

  if (selectedArticle) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />

        <section className="relative w-full h-[50vh] md:h-[55vh]">
          <Image
            src={selectedArticle.image}
            alt={selectedArticle.title}
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center px-4 max-w-4xl">
            <Badge className="mb-4 bg-purple-600 text-white">
              Culture
            </Badge>

            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {selectedArticle.title}
            </h1>

            <p className="text-white/80 mt-4">
              {selectedArticle.date}
            </p>
          </div>
        </section>

        <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
          <Link href="/culture">
            <Button className="mb-8">
              ← Retour aux actualités
            </Button>
          </Link>

          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            {selectedArticle.excerpt}
          </p>
<section style={{ margin: "2rem 0" }}>
  <h2 className="text-2xl font-bold mb-6">
  content: `
  9 Avril, Yon dat enpòtan nan istwa Hayti ak Vil Desalin</h2>

  <p className="text-lg leading-relaxed mb-6">
    Nan istwa chak pèp, chak dat istorik jwe yon gwo wòl kiseswa pou raple bravou ak sakrifis zansèt yo kiseswa pou rejere konsyans jenerasyon k ap dòmi ak sa k ap vini. 9 Avril 1804 se youn nan dat sa yo. Se pa yon dat nou dwe pase alalejè ni pran pou jwèt, se yon dat ki merite leve kanpe konsyans nou, reveye memwa nou, epi rasanble fyète nou kòm Desalinyen ak kòm Ayisyen.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Aprè endepandans peyi a, youn nan pi gwo sousi Jan Jak Desalin, chèf lame endijèn nan ak fondatè nasyon an, sete pwoteje endepandans sa ki te pran ak san, ak kouraj, detèminasyon ak bravou. Li te konnen byen nan pwen libète pa janm garanti pou tout tan si pa gen mezi pou defann li.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Se nan sans sa, nan dat 9 Avril 1804, nan vil Desalin, ki te kapital peyi a nan epòk la, li te pran yon desizyon istorik : Dekrè fòtifikasyon an. Yon aksyon estratejik ki te vize konstwi fò atravè tout peyi a pou anpeche nenpòt tantativ retou lame fransèz yo sou tè lib Hayti a.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Men sa nou dwe sonje, sa nou dwe kenbe nan memwa nou : Premyèman, komin Desalin, kòm kapital peyi a ak katye jeneral lame endijèn, te nan sant tout gwo desizyon estratejik pou pwoteje nasyon an. Se pa t yon vil tankou lòt yo, se te kè rezistans lan, sèvo planifikasyon an, ak senbòl souverènte Hayti.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Dezyèmman, nan tout listwa Hayti, Desalin rete jiskaprezan inik komin ki gen plis fò ki konstwi ladan li (6 fò). Sa pa t fèt pa aza. Rezon an te klè : yon kapital dwe byen pwoteje kont tout menas. Chak fò te tankou yon je ki veye, yon bra ki pare pou defann, yon temwen vivan detèminasyon zansèt yo.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Demi douzèn fò sa yo ki chita sou mòn Desalin mete ansanm pou fòme yon sistèm defans tèt chaje ki patko janm fèt avan sou zile a. Youn ladan yo ki se premye a se Fò Kilbite / Culbuté, ki se inik ladan yo ki konstui nan plèn. Li konstui nan pye mòn ki mennen nan dezyèm fò a ki rele Deside. Kilbite se yon fò ki te konstui pou gen kontwòl sous dlo ki elimante palè enperyal la. Sous enperyal se youn nan pi ansyen sous ki genyen nan komin nan, ki chita kòl anndan fò Kilbite, ki gen yon repitasyon mistik ak senbolik. Fò sa tou te estoke poud a kanon pou lame endijèn nan.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Dezyèm fò a ki rele Deside / Décidé se te syèj desizyon militè lame endijèn nan. Li te sèvi kòm sant anpil desizyon estratejik militè pou lame endijèn nan espesyalman katriyèm demi brigad la ki te syeje nan vil Desalin.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Twazyèm fò a, Inosan / Innocent, pote non premye pitit Desalin ki te sòlda nan lame endijèn nan epi ki te gen kòmand fò sa. Li te gen kontwòl total sou kapital la ak yon pati nan plèn Latibonit.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Katriyèm fò a, Madanm / Madame, te fèt an onè premye Enperatris la Klè Erez. Se li ki pi gwo e li te sèvi kòm espas rankont ak repozwa.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Senkyèm nan, Dòko / Doco, te bay yon pwoteksyon espesyal ni pou fò Madanm ni pou vil la, pandan li te kontwole tout rantre ak sòti ki bay sou komin Desalin ak zòn ki antoure l yo.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Dènye a, Fen di monn / Fin du monde, se yon fò mistik, senbolik, misterye ki bay yon kontwòl total sou tout Latibonit. Se li menm ki pi wo e li te sèvi kòm dènye ranfò ak dènye liy defans pou kapital la.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Lè n ap gade jan sis fò sa yo konekte ak lòt, pozisyon yo ak espas yo pwoteje, nou rive konprann poukisa Jan Jak Desalin te chwazi komin Desalin pou plante kapital yon peyi ki te fenk soti nan lagè.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Men, malgre tout enpòtans istorik sa yo, reyalite jounen jodi a fè mal. Depi 1804 rive 2026, sa fè 222 lane, men toujou pa gen yon plan klè ni yon jesyon serye pou sit istorik sa yo.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Fò yo abandone. Yo rete san siveyans. Sitwayen antre ladan yo jan yo vle, fè sa yo vle, pafwa menm detwi pati nan estrikti orijinal yo. Sa ki te fèt ak san ak sakrifis jodi a ap pèdi nan neglijans ak inyorans.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Youn nan reyalite ki pi boulvèsan an se ke sèlman nan lane 2017 youn ladan yo, Fò Inosan, rive enskri kòm patrimwàn nasyonal.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Sa poze kestyon ki merite repons : Poukisa tout lòt fò yo poko jwenn rekonesans yo kòm patrimwàn nasyonal malgre enpòtans istorik yo?
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Nan batay sa a, jenès la gen yon gwo wòl pou jwe. Asosyasyon tankou Desalin Sou Tanbou (DST) ap mennen travay sansibilizasyon pou pwoteje sit istorik yo epi valorize memwa zansèt yo.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Yo menm rive ekri yon petisyon pou mande imòtalizasyon dat 9 Avril la, pou fè li tounen yon dat selebrasyon ofisyèl nan komin nan.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    OTD (Office Tourisme Dessalines) ap travay tou pou devlope touris ak fè popilasyon an akapare patrimwàn istorik sa yo.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    9 Avril merite plis pase yon senp rapèl. Li merite aksyon konkrè. Li merite antre nan pwogram lekòl yo pou chak timoun konnen istwa fò yo epi pwoteje eritaj sa.
  </p>

  <p className="text-lg leading-relaxed mb-6">
    Paske, jan nou dwe toujou sonje li : “Diyite ak fyète pa fèt nan chita gade, men nan valorize epi pwoteje memwa zansèt yo.”
  </p>

  <p className="text-lg leading-relaxed">
    Lespri Jan Desalin vivan toujou. Li nan chak fò, nan chak wòch, nan chak souf van k ap pase sou tè Desalin. 9 Avril pa dwe yon dat ki dòmi nan liv listwa. Li dwe yon flanm ki limen nan kè nou. Yon apèl pou nou leve, sonje, epi aji.
  </p>

  <p className="text-lg font-semibold mt-8">
    — Fidano Daméus, Pasyone Istwa
  </p>
`,
</section>
        </main>

        <Footer />
      </div>
    )
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
            <Badge className="mb-4 bg-purple-600 text-white">
              Culture
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Actualités culturelles
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Découvrez la richesse culturelle d{"'"}Haïti: art, musique, littérature et patrimoine
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute left-4 top-4 bg-purple-600 text-white">
                      Culture
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </div>
                    <h2 className="mb-2 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {article.title}
                    </h2>
                    <p className="mb-4 line-clamp-2 text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <Link href={`?article=${article.id}`}>
                      <Button variant="ghost" className="p-0 text-primary">
                        Lire l{"'"}article
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              >
                Charger plus d{"'"}articles
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function CulturePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    }>
      <CulturePageContent />
    </Suspense>
  )
}
