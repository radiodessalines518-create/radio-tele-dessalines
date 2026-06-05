"use client"

import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RadioArticle() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Bannière rouge avec slogan */}
      <section className="bg-primary py-2 text-center">
        <p className="text-primary-foreground font-medium text-sm">
          Radio Télé Dessalines des gens distingués
        </p>
      </section>

      {/* Titre de l'article */}
      <section className="py-12 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground leading-tight max-w-3xl mx-auto text-balance">
          Radio Télé Dessalines : <br />
          Une histoire au cœur de l{"'"}actualité haïtienne
        </h1>
      </section>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-6 space-y-12">

        {/* Section Création et origine */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Création et origine</h2>
          <p className="text-muted-foreground leading-relaxed">
            Créée le 15 mars 2005 par Wesley Jean David, Radio Télé Dessalines est l{"'"}une des institutions médiatiques les plus respectées d{"'"}Haïti. Située à Dessalines, berceau de l{"'"}indépendance haïtienne et première capitale noire indépendante du monde, la station s{"'"}est rapidement imposée comme une voix incontournable pour l{"'"}information, l{"'"}éducation et le divertissement.
          </p>
          <div className="relative h-96 w-full overflow-hidden rounded-xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/radio-dessalines-W4JuWZCv0Vn5IYx10cKwJgfatLVNdY.jpg"
              alt="Vue aérienne de Dessalines, Haïti"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center italic">
            Vue aérienne de la ville de Dessalines, première capitale noire indépendante du monde
          </p>
        </section>

        {/* Section Les débuts passionnés */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Les débuts passionnés</h2>
          <p className="text-muted-foreground leading-relaxed">
            C{"'"}est avec un cœur rempli de joie et de reconnaissance que je veux donner un témoignage fort et puissant envers la création de la première station Télévision dans la première capitale noire du monde et envers mes collaborateurs. Radio Télé Dessalines a été fondée le 15 mars 2005 par deux frères : Jean Wesley David et Jodanest David, avec un émetteur artisanal qui émettait des images sur la chaîne 3 sans résistance et tombait en panne à tout moment, avec une équipe passionnée et sans expérience.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Un an plus tard, mon frère et collaborateur a quitté le pays pour se rendre aux États-Unis. Je suis resté l{"'"}unique leader de l{"'"}équipe. À cette époque, seule la TNH chaîne 10 arrivait via un relais du côté de la Gonâve. Pour capter la télévision nationale, il fallait une antenne puissante. Avec l{"'"}arrivée de la 3, il était beaucoup plus facile. Tout le monde criait de joie, et d{"'"}autres captaient les images avec difficulté. Malgré tout, nous n{"'"}avons jamais lâché prise.
          </p>
          <div className="relative h-80 w-full overflow-hidden rounded-xl">
            <Image
  src="/images/studio-rtd.jpg"
  alt="Studio Radio Télé Dessalines"
  fill
  className="object-cover"
/>
          </div>
          <p className="text-sm text-muted-foreground text-center italic">
            L’équipe de Radio Télé Dessalines au studio.
          </p>
        </section>

        {/* Section Les premiers collaborateurs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Les premiers collaborateurs</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nous continuons à progresser avec notre équipe passionnée pour la radio et la télévision. Nous n{"'"}oublierons jamais les anciens collaborateurs : Marc Desius Ducasse, Patrick Charles, Rolane, Carline Eugénie, Bergues, Fabienne, Wilson Benoît, Paschaly, Saliba, Wilson Cadet, Carlos St Fleur, Destin, etc.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Ceux qui travaillent d{"'"}arrache-pied pour le progrès de Radio Télé Dessalines sont : Samuel Dorcely, Melege Louis Fils, Charmat Alcide, Fritznal André, Samson Janvier, Guerby, Charlot, Jordens, Orleus Richelson, Kevin.
          </p>
          <div className="relative h-80 w-full overflow-hidden rounded-xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/radio-team-7ZxFCTU9ALfwnrRwMvnwpU1Lkodri5.jpg"
              alt="Équipe Radio Télé Dessalines"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center italic">
            L{"'"}esprit d{"'"}équipe et la solidarité au cœur de Radio Télé Dessalines
          </p>
        </section>

        {/* Section Émissions phares */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Émissions phares et programmes</h2>
          <p className="text-muted-foreground leading-relaxed">
            Dès sa création, la station a su capter l{"'"}attention du public avec des émissions emblématiques telles que <strong>Pawòl Pale</strong>, <strong>Soirée des Amis</strong> et <strong>Parole et Tendresse</strong>. Les retransmissions en direct de compétitions sportives, notamment le football et le basketball, ont également contribué à bâtir une audience fidèle.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Chaque émission est conçue pour répondre aux besoins et aux attentes de la communauté, qu{"'"}il s{"'"}agisse d{"'"}actualités, de culture ou de divertissement.
          </p>
        </section>

        {/* Section Témoignages */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Témoignages et impact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Les auditeurs et téléspectateurs témoignent régulièrement de l{"'"}importance de Radio Télé Dessalines dans leur quotidien. La station a joué un rôle crucial dans la sensibilisation de la population sur des sujets éducatifs, sanitaires et sportifs, consolidant ainsi son image de média responsable et proche de la communauté.
          </p>
        </section>

        {/* Section Aujourd'hui et demain */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Aujourd{"'"}hui et demain</h2>
          <p className="text-muted-foreground leading-relaxed">
            Aujourd{"'"}hui, Radio Télé Dessalines continue d{"'"}innover et de proposer du contenu varié. Grâce à son équipe dévouée, elle reste un pilier de l{"'"}information et du divertissement en Haïti. La station envisage également de développer de nouveaux programmes multimédias pour atteindre un public encore plus large.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En somme, Radio Télé Dessalines est bien plus qu{"'"}une simple station : elle est le témoin vivant de l{"'"}histoire, de la culture et de l{"'"}engagement citoyen en Haïti.
          </p>
          <div className="relative h-80 w-full overflow-hidden rounded-xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/radio-broadcast-DaVEbEjjM4RHIjQGRQCT974KpMU9Xv.jpg"
              alt="Studio de diffusion Radio Télé Dessalines"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center italic">
            Le studio moderne de diffusion de Radio Télé Dessalines
          </p>
        </section>

      </main>

      <Footer />
    </div>
  )
}
