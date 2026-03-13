import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react"

// Types
type Category = "politique" | "sport" | "culture" | "international"

interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  category: Category
  date: string
  author: string
  image: string
  youtubeVideoId?: string
}

// Articles database - A remplacer par une vraie base de donnees
const articles: Article[] = [
  {
    slug: "radio-article",
    title: "Radio Télé Dessalines : Une histoire au cœur de l'actualité haïtienne",
    excerpt: "Créée le 15 mars 2005 par Wesley Jean David, Radio Télé Dessalines est l'une des institutions médiatiques les plus respectées d'Haïti.",
    content: `
      <section style="margin: 2rem 0;">
        <h2>Création et origine</h2>
        <p>Créée le 15 mars 2005 par Wesley Jean David, Radio Télé Dessalines est l'une des institutions médiatiques les plus respectées d'Haïti. Située à Dessalines, berceau de l'indépendance haïtienne et première capitale noire indépendante du monde, la station s'est rapidement imposée comme une voix incontournable pour l'information, l'éducation et le divertissement.</p>
      </section>

      <section style="margin: 2rem 0;">
        <h2>Les débuts passionnés</h2>
        <p>C'est avec un cœur rempli de joie et de reconnaissance que je veux donner un témoignage fort et puissant envers la création de la première station Télévision dans la première capitale noire du monde et envers mes collaborateurs. Radio Télé Dessalines a été fondée le 15 mars 2005 par deux frères : Jean Wesley David et Jodanest David.</p>
      </section>

      <section style="margin: 2rem 0;">
        <h2>Les premiers collaborateurs</h2>
        <p>Nous n'oublierons jamais les anciens collaborateurs : Marc Desius Ducasse, Patrick Charles, Rolane, Carline Eugénie, Bergues, Fabienne, Wilson Benoît, Paschaly, Saliba, Wilson Cadet, Carlos St Fleur, Destin, etc.</p>
        <p>Ceux qui travaillent d'arrache-pied pour le progrès de Radio Télé Dessalines sont : Samuel Dorcely, Melege Louis Fils, Charmat Alcide, Fritznal André, Samson Janvier, Guerby, Charlot, Jordens, Orleus Richelson, Kevin.</p>
      </section>

      <section style="margin: 2rem 0;">
        <h2>Aujourd'hui et demain</h2>
        <p>Aujourd'hui, Radio Télé Dessalines continue d'innover et de proposer du contenu varié. Grâce à son équipe dévouée, elle reste un pilier de l'information et du divertissement en Haïti.</p>
      </section>
    `,
    category: "politique",
    date: "15 mars 2026",
    author: "Wesley Jean David",
    image: "/images/radio-dessalines.jpg",
  },
  {
    slug: "radio-tele-dessalines-histoire",
    title: "Radio Télé Dessalines : Une histoire au cœur de l'actualité haïtienne",
    excerpt: "Créée le 15 mars 2005 par Wesley Jean David, Radio Télé Dessalines est l'une des institutions médiatiques les plus respectées d'Haïti.",
    content: `
      <section style="margin: 2rem 0;">
        <h2>Création et origine</h2>
        <p>Créée le 15 mars 2005 par Wesley Jean David, Radio Télé Dessalines est l'une des institutions médiatiques les plus respectées d'Haïti. Située à Dessalines, berceau de l'indépendance haïtienne et première capitale noire indépendante du monde, la station s'est rapidement imposée comme une voix incontournable pour l'information, l'éducation et le divertissement.</p>
      </section>

      <section style="margin: 2rem 0;">
        <h2>Les débuts passionnés</h2>
        <p>C'est avec un cœur rempli de joie et de reconnaissance que je veux donner un témoignage fort et puissant envers la création de la première station Télévision dans la première capitale noire du monde et envers mes collaborateurs. Radio Télé Dessalines a été fondée le 15 mars 2005 par deux frères : Jean Wesley David et Jodanest David, avec un émetteur artisanal qui émettait des images sur la chaîne 3 sans résistance et tombait en panne à tout moment, avec une équipe passionnée et sans expérience.</p>
        <p>Un an plus tard, mon frère et collaborateur a quitté le pays pour se rendre aux États-Unis. Je suis resté l'unique leader de l'équipe. À cette époque, seule la TNH chaîne 10 arrivait via un relais du côté de la Gonâve. Pour capter la télévision nationale, il fallait une antenne puissante. Avec l'arrivée de la 3, il était beaucoup plus facile. Tout le monde criait de joie, et d'autres captaient les images avec difficulté. Malgré tout, nous n'avons jamais lâché prise.</p>
      </section>

      <section style="margin: 2rem 0;">
        <h2>Les premiers collaborateurs</h2>
        <p>Nous continuons à progresser avec notre équipe passionnée pour la radio et la télévision. Nous n'oublierons jamais les anciens collaborateurs : Marc Desius Ducasse, Patrick Charles, Rolane, Carline Eugénie, Bergues, Fabienne, Wilson Benoît, Paschaly, Saliba, Wilson Cadet, Carlos St Fleur, Destin, etc.</p>
        <p>Ceux qui travaillent d'arrache-pied pour le progrès de Radio Télé Dessalines sont : Samuel Dorcely, Melege Louis Fils, Charmat Alcide, Fritznal André, Samson Janvier, Guerby, Charlot, Jordens, Orleus Richelson, Kevin.</p>
      </section>

      <section style="margin: 2rem 0;">
        <h2>Émissions phares et programmes</h2>
        <p>Dès sa création, la station a su capter l'attention du public avec des émissions emblématiques telles que <strong>Pawòl Pale</strong>, <strong>Soirée des Amis</strong> et <strong>Parole et Tendresse</strong>. Les retransmissions en direct de compétitions sportives, notamment le football et le basketball, ont également contribué à bâtir une audience fidèle.</p>
        <p>Chaque émission est conçue pour répondre aux besoins et aux attentes de la communauté, qu'il s'agisse d'actualités, de culture ou de divertissement.</p>
      </section>

      <section style="margin: 2rem 0;">
        <h2>Témoignages et impact</h2>
        <p>Les auditeurs et téléspectateurs témoignent régulièrement de l'importance de Radio Télé Dessalines dans leur quotidien. La station a joué un rôle crucial dans la sensibilisation de la population sur des sujets éducatifs, sanitaires et sportifs, consolidant ainsi son image de média responsable et proche de la communauté.</p>
      </section>

      <section style="margin: 2rem 0;">
        <h2>Aujourd'hui et demain</h2>
        <p>Aujourd'hui, Radio Télé Dessalines continue d'innover et de proposer du contenu varié. Grâce à son équipe dévouée, elle reste un pilier de l'information et du divertissement en Haïti. La station envisage également de développer de nouveaux programmes multimédias pour atteindre un public encore plus large.</p>
        <p>En somme, Radio Télé Dessalines est bien plus qu'une simple station : elle est le témoin vivant de l'histoire, de la culture et de l'engagement citoyen en Haïti.</p>
      </section>
    `,
    category: "politique",
    date: "15 mars 2026",
    author: "Wesley Jean David",
    image: "/images/radio-dessalines.jpg",
  },
  {
    slug: "enjeux-elections-legislatives-haiti",
    title: "Les enjeux des elections legislatives en Haiti",
    excerpt: "Analyse approfondie des defis et perspectives pour les prochaines elections...",
    content: `
      <p>Les prochaines elections legislatives en Haiti representent un moment crucial pour l'avenir democratique du pays. Dans un contexte politique complexe, les citoyens haitiens se preparent a exercer leur droit de vote pour elire leurs representants.</p>
      
      <h2>Les principaux enjeux</h2>
      <p>Parmi les enjeux majeurs de ces elections, on retrouve la question de la securite, le developpement economique et la lutte contre la corruption. Les candidats devront presenter des programmes concrets pour repondre aux attentes de la population.</p>
      
      <h2>Les perspectives</h2>
      <p>Malgre les defis, de nombreux observateurs restent optimistes quant a la capacite du peuple haitien a organiser des elections libres et transparentes. La communaute internationale a exprime son soutien au processus electoral.</p>
      
      <p>Radio Tele Dessalines continuera de suivre de pres l'evolution de la situation et de vous informer en temps reel sur les developpements politiques du pays.</p>
    `,
    category: "politique",
    date: "11 mars 2026",
    author: "Jean-Baptiste Pierre",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=600&fit=crop",
  },
  {
    slug: "victoire-equipe-nationale-football",
    title: "Victoire historique pour l'equipe nationale de football",
    excerpt: "Les Grenadiers s'imposent face a leur adversaire dans un match decisif...",
    content: `
      <p>L'equipe nationale de football d'Haiti, les Grenadiers, a remporte une victoire historique hier soir dans un match decisif pour les qualifications. Cette victoire marque un tournant dans le football haitien.</p>
      
      <h2>Un match memorable</h2>
      <p>Des la premiere minute, les Grenadiers ont montre leur determination. Avec un jeu offensif et une defense solide, ils ont domine leur adversaire tout au long du match.</p>
      
      <h2>Les reactions</h2>
      <p>Le coach de l'equipe s'est dit "extremement fier" de la performance de ses joueurs. Les supporters haitiens a travers le monde ont celebre cette victoire avec joie et fierte.</p>
      
      <p>Cette victoire renforce les espoirs de qualification pour la prochaine competition internationale majeure.</p>
    `,
    category: "sport",
    date: "10 mars 2026",
    author: "Marc Antoine",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop",
    youtubeVideoId: "dQw4w9WgXcQ",
  },
  {
    slug: "festival-musique-racine-dessalines",
    title: "Festival de musique racine a Dessalines",
    excerpt: "Un evenement culturel majeur celebrant les traditions musicales haitiennes...",
    content: `
      <p>Le Festival de musique racine de Dessalines a attire des milliers de visiteurs cette annee. Cet evenement annuel celebre les traditions musicales haitiennes et met en lumiere les artistes locaux.</p>
      
      <h2>Une programmation riche</h2>
      <p>Le festival a presente une variete d'artistes, des musiciens traditionnels aux groupes contemporains qui fusionnent les rythmes racine avec des sonoritees modernes.</p>
      
      <h2>L'importance culturelle</h2>
      <p>Ce festival joue un role crucial dans la preservation et la promotion de la culture haitienne. Il permet aux jeunes generations de decouvrir et d'apprecier leur heritage musical.</p>
      
      <p>L'evenement a egalement attire des touristes nationaux et internationaux, contribuant au developpement economique de la region de Dessalines.</p>
    `,
    category: "culture",
    date: "9 mars 2026",
    author: "Marie Claire Joseph",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop",
  },
  {
    slug: "sommet-economique-caricom",
    title: "Sommet economique de la CARICOM",
    excerpt: "Les dirigeants caribeens se reunissent pour discuter de cooperation regionale...",
    content: `
      <p>Les dirigeants des pays membres de la CARICOM se sont reunis pour un sommet economique historique. Haiti etait represente au plus haut niveau lors de ces discussions cruciales.</p>
      
      <h2>Les themes abordes</h2>
      <p>Les discussions ont porte sur le renforcement de la cooperation economique regionale, le developpement du commerce intra-caribeen et les strategies communes face aux defis climatiques.</p>
      
      <h2>Les accords conclus</h2>
      <p>Plusieurs accords ont ete signes, notamment sur la facilitation des echanges commerciaux et la creation d'un fonds regional pour le developpement des infrastructures.</p>
      
      <p>Ces accords devraient avoir un impact positif sur l'economie haitienne dans les annees a venir.</p>
    `,
    category: "international",
    date: "8 mars 2026",
    author: "Paul Edouard",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop",
  },
  {
    slug: "nouveau-programme-infrastructure",
    title: "Nouveau programme d'infrastructure annonce",
    excerpt: "Le gouvernement devoile un plan ambitieux de modernisation des routes...",
    content: `
      <p>Le gouvernement haitien a annonce un nouveau programme ambitieux de modernisation des infrastructures routieres. Ce plan prevoit la rehabilitation de plusieurs axes routiers majeurs.</p>
      
      <h2>Les details du programme</h2>
      <p>Le programme comprend la construction de nouvelles routes, la rehabilitation des axes existants et l'amelioration de l'eclairage public dans plusieurs villes.</p>
      
      <h2>Le financement</h2>
      <p>Le financement provient de sources diversifiees, incluant des partenariats public-prive et l'aide internationale. Le budget total est estime a plusieurs millions de dollars.</p>
      
      <p>Les travaux devraient debuter dans les prochains mois et s'etaler sur plusieurs annees.</p>
    `,
    category: "politique",
    date: "7 mars 2026",
    author: "Jean-Baptiste Pierre",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop",
  },
  {
    slug: "exposition-art-contemporain-haitien",
    title: "Exposition d'art contemporain haitien",
    excerpt: "Des artistes locaux presentent leurs oeuvres dans une exposition unique...",
    content: `
      <p>Une nouvelle exposition d'art contemporain haitien a ouvert ses portes au public. Cette exposition met en lumiere le talent et la creativite des artistes haitiens.</p>
      
      <h2>Les artistes exposes</h2>
      <p>L'exposition presente les oeuvres de plus de vingt artistes, melangeant peinture, sculpture et art numerique. Chaque artiste apporte sa vision unique de la realite haitienne.</p>
      
      <h2>L'accueil du public</h2>
      <p>L'exposition a recu un accueil enthousiaste du public et des critiques. Elle contribue a promouvoir l'art haitien sur la scene internationale.</p>
      
      <p>L'exposition sera ouverte au public pendant trois mois et des visites guidees sont disponibles sur reservation.</p>
    `,
    category: "culture",
    date: "6 mars 2026",
    author: "Marie Claire Joseph",
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=1200&h=600&fit=crop",
  },
]

const categoryColors: Record<Category, string> = {
  politique: "bg-primary",
  sport: "bg-green-600",
  culture: "bg-purple-600",
  international: "bg-blue-600",
}

// Generate static params for all articles
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

// Generate metadata for each article
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  
  if (!article) {
    return {
      title: "Article non trouve | Radio Tele Dessalines",
    }
  }
  
  return {
    title: `${article.title} | Radio Tele Dessalines`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  
  if (!article) {
    notFound()
  }
  
  // Get related articles from the same category
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3)
  
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Article Header */}
      <article className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[40vh] min-h-[300px] md:h-[50vh]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Back Button */}
          <div className="absolute left-4 top-4 md:left-8 md:top-8">
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 hover:text-white"
              asChild
            >
              <Link href="/actualites">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Link>
            </Button>
          </div>
          
          {/* Article Meta on Image */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
            <div className="mx-auto max-w-4xl">
              <Badge className={`mb-4 text-white ${categoryColors[article.category]}`}>
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </Badge>
              <h1 className="mb-4 font-serif text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl text-balance">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {article.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {article.date}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Share Buttons */}
          <div className="mb-8 flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Partager:</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* YouTube Video if available */}
          {article.youtubeVideoId && (
            <div className="mb-8 overflow-hidden rounded-xl">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${article.youtubeVideoId}`}
                  title={article.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          )}
          
          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Tags / Category */}
          <div className="mt-12 border-t border-border pt-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Categories:</span>
              <Link href={`/${article.category}`}>
                <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </Badge>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-border bg-muted/50 py-12">
            <div className="mx-auto max-w-7xl px-4">
              <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
                Articles similaires
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/actualites/${related.slug}`}
                    className="group overflow-hidden rounded-xl bg-card shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <Badge
                        className={`mb-2 text-xs text-white ${categoryColors[related.category]}`}
                      >
                        {related.category.charAt(0).toUpperCase() + related.category.slice(1)}
                      </Badge>
                      <h3 className="line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                        {related.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{related.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
      
      <Footer />
    </main>
  )
}
