import RSS from 'rss'

// Articles pour le flux RSS
const articles = [
  {
    id: 'radio-article',
    title: 'Radio Télé Dessalines : Une histoire au cœur de l\'actualité haïtienne',
    description: 'Créée le 15 mars 2005 par Wesley Jean David, Radio Télé Dessalines est l\'une des institutions médiatiques les plus respectées d\'Haïti.',
    url: 'https://radioteledessalines.ht/actualites/radio-article',
    author: 'Wesley Jean David',
    pubDate: new Date('2026-03-15'),
    category: 'politique',
  },
  {
    id: 'enjeux-elections-legislatives-haiti',
    title: 'Les enjeux des élections législatives en Haïti',
    description: 'Analyse approfondie des défis et perspectives pour les prochaines élections législatives haïtiennes.',
    url: 'https://radioteledessalines.ht/actualites/enjeux-elections-legislatives-haiti',
    author: 'Samson Janvier',
    pubDate: new Date('2026-03-10'),
    category: 'politique',
  },
  {
    id: 'football-dessalines-victoire',
    title: 'Football: Dessalines remporte une importante victoire',
    description: 'Le club de Dessalines se qualifie pour les quarts de finale du championnat national.',
    url: 'https://radioteledessalines.ht/actualites/football-dessalines-victoire',
    author: 'Samuel Dorcely',
    pubDate: new Date('2026-03-12'),
    category: 'sport',
  },
  {
    id: 'festival-culturel-haiti',
    title: 'Festival culturel: Célébration de l\'héritage haïtien',
    description: 'Dessalines accueille un grand festival de trois jours célébrant la musique, la danse et l\'art traditionnels haïtiens.',
    url: 'https://radioteledessalines.ht/actualites/festival-culturel-haiti',
    author: 'Fritznal André',
    pubDate: new Date('2026-03-08'),
    category: 'culture',
  },
]

// Créer le générateur RSS
export const feed = new RSS({
  title: 'Radio Télé Dessalines - Actualités',
  description: 'Station de radio et télévision haïtienne - 96.7 FM et DC.TV 68',
  feed_url: 'https://radioteledessalines.ht/api/rss',
  site_url: 'https://radioteledessalines.ht',
  language: 'fr',
  image_url: 'https://radioteledessalines.ht/images/logo-rtd.png',
  managingEditor: 'info@radioteledessalines.ht',
  webMaster: 'webmaster@radioteledessalines.ht',
  pubDate: new Date(),
  ttl: 60,
})

// Ajouter les articles au flux
articles.forEach((article) => {
  feed.item({
    title: article.title,
    description: article.description,
    url: article.url,
    author: article.author,
    date: article.pubDate,
    categories: [article.category],
    guid: article.id,
  })
})
