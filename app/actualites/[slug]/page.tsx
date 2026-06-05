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
    title: "Dessalines en état d’alerte : Markens Larose interpelle l’État central sur la dégradation des services publics",
    excerpt: "Au cours d’une intervention accordée à Radio Télé Dessalines, Markens Larose a appelé l’État central à assumer ses responsabilités face à la dégradation croissante des institutions publiques dans la commune de Dessalines, dénonçant la paralysie de plusieurs services essentiels et l’aggravation des conditions de vie de la population.",
  content: `
<section style="margin: 2rem 0;">
  <h2>Dessalines en état d’alerte face à la dégradation institutionnelle</h2>
  <p><strong>DESSALINES, HAÏTI</strong> — La situation préoccupante qui prévaut actuellement dans la commune de Dessalines continue de susciter de nombreuses réactions au sein de la population locale. Lors d’une intervention accordée à Radio Télé Dessalines, l’acteur communautaire Markens Larose a lancé un appel pressant aux autorités centrales afin qu’elles interviennent face à la dégradation avancée des services publics et au dysfonctionnement de plusieurs institutions étatiques dans la commune.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Un cri d’alarme lancé au micro de Radio Télé Dessalines</h2>
  <p>Au micro de Radio Télé Dessalines, Markens Larose a dénoncé ce qu’il qualifie de crise structurelle affectant profondément le fonctionnement de la commune. Selon ses déclarations, plusieurs services administratifs peinent à répondre aux besoins de la population, tandis que certaines institutions publiques fonctionnent avec de sérieuses limitations, faute de moyens et d’encadrement adéquat.</p>
  <p>« Une commune comme Dessalines ne peut continuer à évoluer dans un tel état d’abandon administratif. L’État central doit assumer ses responsabilités et agir sans délai », a déclaré Markens Larose.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Des services publics en grande difficulté</h2>
  <p>Intervenant sur les ondes de Radio Télé Dessalines, il a dressé un tableau préoccupant de la situation locale, évoquant notamment la faiblesse des structures administratives, les insuffisances observées dans certains services de santé, les difficultés rencontrées dans le secteur éducatif ainsi que la détérioration de plusieurs infrastructures communautaires.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Une population confrontée à une précarité croissante</h2>
  <p>Toujours selon les propos recueillis par Radio Télé Dessalines, Markens Larose estime que cette dégradation généralisée impacte lourdement le quotidien des habitants. Il soutient qu’en l’absence d’institutions publiques pleinement fonctionnelles, la population se retrouve privée de plusieurs services essentiels et exposée à une précarité grandissante.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Dessalines, une commune historique négligée</h2>
  <p>L’intervenant a également rappelé l’importance historique de Dessalines dans le patrimoine national haïtien. Il souligne qu’il est inconcevable qu’une commune d’une telle portée symbolique soit confrontée à un niveau aussi élevé de négligence institutionnelle.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Appel à un plan d’intervention urgent</h2>
  <p>Face à cette situation, Markens Larose a exhorté les autorités compétentes à mettre en place un plan d’intervention urgent visant à rétablir le fonctionnement normal des institutions locales, renforcer les capacités administratives et améliorer durablement la qualité des services publics offerts à la population.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Une attente forte de la population</h2>
  <p>Cette prise de parole, relayée par Radio Télé Dessalines, intervient dans un contexte où plusieurs citoyens de la commune expriment également leurs inquiétudes face à la détérioration continue de leur cadre de vie et au manque de réponses concrètes des autorités.</p>
  <p>Alors que les attentes de la population demeurent fortes, les habitants de Dessalines espèrent désormais que cet appel sera entendu par les instances concernées et qu’il débouchera sur des actions concrètes.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Un message qui interpelle les autorités</h2>
  <p>Pour de nombreux observateurs, le message transmis à travers Radio Télé Dessalines reflète une exigence de plus en plus pressante : celle de voir l’État restaurer sa présence et son efficacité dans une commune confrontée à des défis structurels majeurs.</p>
</section>
`,
   category: "politique",
date: "11 mars 2026",
author: "Wesley Jean David",
image: "/images/markens-larose.jpg",
},
  {
    slug: "victoire-equipe-nationale-football",
    title: "Real Madrid domine Manchester City lors du match aller",
    excerpt: "Mercredi 11 mars, Real Madrid a imposé sa loi face à Manchester City avec un score net de 3-0, laissant les fans impatients pour le match retour à l'Etihad Stadium.",
   content: `
<section style="margin: 2rem 0;">
  <h2>Real Madrid Domine Manchester City : Une Soirée Magique au Santiago Bernabéu</h2>
  <p>Mercredi 11 mars 2026, le monde du football avait les yeux rivés sur le Santiago Bernabéu pour l’un des chocs les plus attendus de la Ligue des Champions. Le Real Madrid recevait Manchester City dans un duel entre deux géants du football européen. Les supporters madrilènes espéraient une grande performance de leur équipe, et ils n’ont pas été déçus.</p>
  <p>Dès les premières minutes, l’intensité du match était évidente. Les deux équipes ont tenté d’imposer leur style de jeu, mais rapidement le Real Madrid a pris le contrôle du rythme et a montré une grande maîtrise tactique face aux joueurs de Manchester City.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Une Bataille au Milieu de Terrain</h2>
  <p>Le milieu de terrain madrilène a joué un rôle déterminant dans la rencontre. Avec l’expérience de Luka Modrić et Toni Kroos, combinée à l’énergie et à la puissance de Federico Valverde, le Real Madrid a réussi à contrôler la circulation du ballon et à limiter les offensives de Manchester City.</p>
  <p>Les Citizens ont essayé de développer leur jeu basé sur la possession, mais la pression constante exercée par les Madrilènes a empêché les joueurs anglais de trouver des espaces dangereux.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Federico Valverde, Héros de la Rencontre</h2>
  <p>La grande star de la soirée a été sans aucun doute Federico Valverde. Le milieu uruguayen a réalisé une performance exceptionnelle en inscrivant trois buts, offrant au Real Madrid une victoire éclatante devant son public.</p>
  <p>Son premier but est arrivé après une action rapide qui a surpris la défense de Manchester City. Quelques minutes plus tard, Valverde a doublé la mise avec une frappe précise qui n’a laissé aucune chance au gardien adverse.</p>
  <p>Avant la fin de la rencontre, il a complété son triplé avec un troisième but spectaculaire, déclenchant une explosion de joie dans les tribunes du Santiago Bernabéu.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Une Victoire Importante pour le Real Madrid</h2>
  <p>Avec ce score impressionnant de 3-0, le Real Madrid a démontré une grande solidité collective. La défense madrilène a également été irréprochable, empêchant les attaquants de Manchester City de se créer de véritables occasions dangereuses.</p>
  <p>Le gardien madrilène a été vigilant chaque fois que nécessaire, tandis que l’équipe a su exploiter efficacement les contre-attaques et les moments clés du match.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Manchester City Face à un Grand Défi</h2>
  <p>Pour Manchester City, cette défaite représente un sérieux revers. L’équipe devra maintenant analyser ses erreurs et préparer une stratégie efficace pour le match retour. Malgré ce résultat difficile, les Citizens restent capables de surprendre grâce à leur talent offensif et à leur expérience dans les grandes compétitions européennes.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Le Match Retour à l’Etihad Stadium</h2>
  <p>Le match retour à l’Etihad Stadium promet d’être extrêmement intense. Manchester City devra marquer plusieurs buts pour espérer renverser la situation, tandis que le Real Madrid cherchera à défendre son avantage et à sécuriser sa qualification.</p>
  <p>Les supporters du monde entier attendent déjà avec impatience cette deuxième confrontation qui pourrait offrir encore plus de suspense et de spectacle.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Une Nuit Européenne Inoubliable</h2>
  <p>Cette rencontre restera comme l’une des grandes soirées européennes du Real Madrid cette saison. La performance exceptionnelle de Federico Valverde et la solidité collective de l’équipe ont permis au club madrilène de prendre une avance importante dans cette confrontation.</p>
  <p>Mais en Ligue des Champions, rien n’est jamais totalement décidé. Les amateurs de football savent que chaque match peut réserver des surprises, et le duel entre le Real Madrid et Manchester City n’a peut-être pas encore livré tous ses secrets.</p>
</section>
    `,
    category: "sport",
    date: "mercredi 11 mars 2026",
    author: "Melege Fils Louis",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop",
    youtubeVideoId: "Cg-WCfnNtcw",
  },
  {
    slug: "festival-musique-racine-dessalines",
    title: "Radyo Tele Desalin (RTD) : yon patrimwàn vivan nan komin Desalin",
    excerpt: "Nan tout kominote, Radyo Tele Desalin se yon enstitisyon ki make istwa lokal la depi 2005.",
    content: `
<section style="margin: 2rem 0;">
  <h2>Radyo Tele Desalin (RTD) : Yon patrimwàn vivan nan komin Desalin</h2>
  <p>Nan tout kominote, gen kèk enstitisyon ki depase senp fonksyon yo pou yo vin tounen yon pati nan memwa kominote sa yo. Se sa k rive nan ka Radyo Tele Desalin, youn nan pi ansyen radyo ak premye chanèl televizyon ki te etabli nan komin Desalin.</p>
  <p>Radyo Tele Desalin pa sèlman fè pati radyo ki pi ansyen yo nan komin nan, li tou se premye chanèl televizyon Premye kapital nwa konnen nan istwa modèn li nan zafè telekominikasyon.</p>
  <p>15 mas 2005 se yon dat istorik nan istwa modèn site enperyal la kote nan 21èm syèk la ki se syèk teknoloji, pou premye fwa komin Desalin ta pral konnen enplantasyon premye chanèl televizyon li. Se pat yon aza men se sou angajman ak detèminisyon yon jèn gason, teknisyen nan telekominikasyon, pitit komin Desalin ki rele Jean Wesley David ki te gen avèl Jodanest David ki te akouche pwojè sila nan site enperyal la nan ri Pérodin, yon senp aksyon ki pral chanje lavi moun nan kominote a.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Premye difizyon ak pasyon ekip la</h2>
  <p>"Nou te lanse sou Chèn 3 avèk yon emetè atizanal, nou te kòmanse premye difizyon yo ak anpil difikilte, men nou te gen yon ekip tele pasyone ki te akeyi inisyativ la ak fyète ki te konn fè aktivite kiltirèl, espòtif an dirèk." – Pawòl David Jean Wesley, direktè/fondatè Tele Desalin.</p>
  <p>Avan fondasyon Tele Desalin an 2005, li pat toujou fasil pou moun nan kominote a. Te toujou gen gwo difikilte pou popilasyon desalinyèn nan te suiv emisyon televize, gade fim oswa match basketball ak football, men gras ak prezans Tele Desalin sitiyasyon an ta pral chanje konplètman.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Etap 2006–2010</h2>
  <p>Direktè Wesley kontinye: "Nan ane 2006 pou rive 2010 se ta pral yon lòt etap, sitou nan fenomèn feyton ki t ap fè aktyalite nan moman an. Nan lokal nou te genyen nan ri Jak Premye a, nou te mete yon televizyon deyò nan lari a pou moun ki pat gen televizyon yo gade feyton ak match. Se te yon moman ki make lespri m, sitou nan epòk chanpyona Basketball (NBA). Don Aristote ak Guy Patrick de konikè ki te konn eksplike match sa yo, san nou pap bliye chanpyona ewopeyen yo sitou (Ligues des champions) ki te konn eksplike pa kèk konikè tankou Melège Louis, Samuel Dorcely, Charmat Alcide, Pierre Miguel, Chérétas Destin, Saliba Andréville."</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Radyo Desalin</h2>
  <p>Kanta pou radyo a li menm, An aprè Radyo (Future ak Messie) ki se pi ansyen yo, Radyo Desalin rantre pami lis ansyen yo tou nan komin nan; li ta pral fonde kèk mwa aprè tele a nan mwa septanm 2005.</p>
  <p>"Yon lane pita, Jodanest te ale Etazini. Mwen te rete ak yon ekip ki te gen Ducasse Mercy, Patrick Charles, Marc Desius, Carline, Eugénie Fabienne, Rolane Charlot ki te konn prezante yon emisyon ki te rele (Clip au rendez-vous), Patrick Cadestin te konn prezante (Parenthèse). Nou pap bliye emisyon (Pawòl Pale) ki te konn anime pa Samuel Dorcely, (Parole et Tendresse) ak Jean René, Doktè Orleus emisyon sante, Fritznal (emisyon espò) ak plizyè lòt emisyon. M pap bliye tou, gwo bourad Carlos Love (Carlos Saint Fleur) youn nan fondatè Radyo Future te ban mwen nan pakou sa yo tou." – Pawòl Wesley David.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Telekominikasyon nan Desalin</h2>
  <p>Sa vle di nan sa ki gen pou wè ak telekominikasyon (chanèl televizyon) nan Desalin gen de epòk: yon epòk avan Tele Desalin kote pat gen okenn chanèl televizyon ak aprè inogirasyon tele a kote tout moun te vin gen aksè ak gade televizyon fasilman.</p>
  <p>Tele Desalin pa sèlman premye chanèl televizyon nan site enperyal la men li se enstitisyon ki revolisyone zafè telekominikasyon nan istwa modèn site enperyal la.</p>
  <p>Depi plizyè deseni, sòti 2005 pou rive 2026, 21 lane depi Radyo Tele Desalin ap jwe yon wòl enpòtan nan lavi sitwayen yo. Li sèvi tankou yon espas enfòmasyon, edikasyon ak ekspresyon pou popilasyon an.</p>
</section>

<section style="margin: 2rem 0;">
  <h2>Jodi a ak demen</h2>
  <p>Jounen jodya, Radyo Tele Desalin toujou kanpe djougan pou kontinye akonpanye popilasyon an nan sa ki gen pou wè ak enfòmasyon ak kominikasyon. Sòti nan emetè atizanal an 2005 pou rive jodya, radyo a genyen ekipman pwofesyonèl, wonnpòte ak sit entènèt. Radyo Tele Desalin pap desèvi sèlman komin Desalin men tout lòt komin nan depatman Latibonit tankou Sen Mak, Vèrèt, Ti Rivyè, Lestè, Pon Sonde, Dedin elatriye. Li vini yon echantiyon, yon senbòl, yon kanal pou menm Ayisyen ki nan dyaspora, kote yo ka vwayaje nan site enperyal la, premye kapital nwa monn lan, menm si yo pa monte avyon.</p>

  <p>Direktè/fondatè David Wesley fini pou di: "21 lane sa yo pa travay ak efò yon sèl moun, menm si m pap ka site tout non, men moun tankou Paschaly Chery, Fritznal André, Guerby Demeus, Charlot, Sandy, Wilson Benoît, Samson Janvier, Kevin Alexis, Gana Jean Baptiste ak tout lòt moun m pa site yo jwe gwo wòl nan sa Radyo a ak Tele a ye jodya. Radyo Tele Desalin se yon lekòl ak yon patrimwàn pou moun Desalin."</p>

  <p>Nou pa dwe janm bliye anpil evènman sosyal, kiltirèl ak sivik nan komin nan te jwenn viziblite yo atravè mikwo ak ekran Radyo Tele Desalin. Nan sans sa a, enstitisyon sa a pa sèlman yon medya. Li se yon patrimwàn vivan, paske li kontinye sèvi kominote a chak jou; yon patrimwàn istorik, paske li make istwa medya lokal komin nan, epi tou yon patrimwàn kiltirèl, paske li patisipe nan pwomosyon idantite ak kilti vil Desalin. Nan yon vil ki gen yon gwo eritaj istorik tankou Desalin, li enpòtan pou sitwayen yo aprann rekonèt ak pwoteje enstitisyon ki pote memwa kolektif yo. Valorize Radyo Tele Desalin se pa sèlman soutni yon medya lokal, men tou se pwoteje yon pati nan istwa ak kilti komin nan. Se poutèt sa, li nesesè pou tout pitit Desalin yo pran konsyans sou valè enstitisyon sa a, soutni li epi kontinye fè li viv pou jenerasyon kap vini yo.</p>
</section>

    `,
    category: "culture",
    date: "15 mars 2026",
    author: "Fidano Daméus.",
    image: "https://images.unsplash.com/photo-1700508671735-d724d59ea4b5?q=80&w=1200&fit=crop",
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
  {
  slug: "victoire-equipe-nationale-football",
  title: "Real Madrid domine Manchester City lors du match aller",
  excerpt: "Mercredi 11 mars, Real Madrid a imposé sa loi face à Manchester City avec un score net de 3-0, laissant les fans impatients pour le match retour à l'Etihad Stadium.",
  content: `
    <section style="margin: 2rem 0;">
      <h2>Résumé du match</h2>
      <p>Ici, écrivez le contenu complet de l'article sportif...</p>
    </section>
  `,
  category: "sport",
  date: "mercredi 11 mars 2026",
  author: "Melege Fils Louis",
  image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop",
  youtubeVideoId: "Cg-WCfnNtcw",
},
{
  slug: "championnat-basketball-resultats",
  title: "Championnat national de basketball: résultats",
  excerpt: "Les équipes s'affrontent dans la phase finale du championnat national avec des matchs palpitants.",
  content: `
    <section style="margin: 2rem 0;">
      <h2>Résultats et analyses</h2>
      <p>Ici, écrivez le contenu complet de l'article sportif...</p>
    </section>
  `,
  category: "sport",
  date: "8 mars 2026",
  author: "Nom de l'auteur",
  image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=600&fit=crop",
},
{
  slug: "marathon-port-au-prince-record",
  title: "Marathon de Port-au-Prince: record battu",
  excerpt: "Un athlète haïtien bat le record du marathon national dans une performance exceptionnelle.",
  content: `
    <section style="margin: 2rem 0;">
      <h2>Détails du marathon</h2>
      <p>Ici, écrivez le contenu complet de l'article sportif...</p>
    </section>
  `,
  category: "sport",
  date: "6 mars 2026",
  author: "Nom de l'auteur",
  image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=600&fit=crop",
},
{
  slug: "inauguration-stade-dessalines",
  title: "FC Barcelone vs Newcastle : Un Match Retour Crucial en Ligue des Champions",
  excerpt: "Le mercredi 18 mars 2026, le FC Barcelone reçoit Newcastle United pour le match retour des huitièmes de finale de la Ligue des Champions, avec un score aller de 1-1 qui laisse tout ouvert avant cette rencontre décisive.",
  content: `
    {selectedArticle && selectedArticle.slug === "inauguration-stade-dessalines" && (
  <section style={{ margin: "2rem 0" }}>
    <h2>Le match à venir</h2>
    <p>
      Le mercredi 18 mars 2026, FC Barcelona affronte Newcastle United dans un match important des huitièmes de finale de la UEFA Champions League. Cette rencontre constitue le match retour après un premier duel très disputé.
    </p>
    <p>
      Lors du match aller joué à Newcastle, les deux équipes se sont quittées sur un score de 1-1, après une égalisation du Barça dans les dernières secondes sur penalty. Tout reste donc ouvert avant cette confrontation décisive.
    </p>
    <h3>Les confrontations entre les deux clubs</h3>
    <p>
      Barcelone et Newcastle se sont affrontés 6 fois dans l’histoire de la Ligue des champions.
      <br />Victoires de Barcelone : 4
      <br />Victoires de Newcastle : 1
      <br />Match nul : 1
    </p>
    <h3>Les enjeux pour Barcelone</h3>
    <p>
      Pour le FC Barcelone, l’objectif est clair : se qualifier pour les quarts de finale et confirmer son statut de grand club européen. Jouer ce match à domicile représente aussi un avantage important pour les Catalans, qui veulent imposer leur jeu et profiter du soutien de leurs supporters.
    </p>
    <h3>Les enjeux pour Newcastle</h3>
    <p>
      De son côté, Newcastle United rêve de réaliser un exploit. Le club anglais veut prouver qu’il peut rivaliser avec les grandes équipes européennes et écrire une nouvelle page de son histoire en se qualifiant pour le tour suivant.
    </p>
    <h3>Un duel très attendu</h3>
    <p>
      Avec un score de 1-1 à l’aller, ce match retour s’annonce très ouvert et intense. Chaque équipe devra tout donner pour décrocher la qualification et continuer l’aventure dans la Ligue des champions.
    </p>
    <p><strong>Samuel Dorcély Journaliste sportif</strong></p>
  </section>
)}
  `,
  category: "sport",
  date: "mercredi 18 mars 2026",
  author: " Samuel Dorcély Journaliste sportif",
  image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=600&fit=crop",
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
