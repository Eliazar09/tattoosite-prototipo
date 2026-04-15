import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ZoomIn, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FadeIn from '../components/FadeIn'
import { searchPhotos, PexelsPhoto } from '../data/pexels'

const categories = ['Todos', 'Old School', 'Neo Trad', 'Oriental', 'Dotwork', 'Cinza', 'Biomecânica']

const categoryQueries: Record<string, string> = {
  Todos: 'tattoo professional portfolio',
  'Old School': 'traditional old school tattoo anchor',
  'Neo Trad': 'neotraditional tattoo roses',
  Oriental: 'asian oriental dragon tattoo',
  Dotwork: 'dotwork stippling tattoo art',
  Cinza: 'black grey shading tattoo',
  Biomecânica: 'biomechanical tattoo cyber',
}

export default function PortfolioPage() {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([])
  const [active, setActive] = useState('Todos')
  const [loading, setLoading] = useState(false)
  const [lightbox, setLightbox] = useState<{ photo: PexelsPhoto; index: number } | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    searchPhotos(categoryQueries[active] || 'tattoo', 24).then(p => {
      setPhotos(p)
      setLoading(false)
      setPage(1)
    })
  }, [active])

  const loadMore = () => {
    setPage(p => p + 1)
  }

  const displayedPhotos = photos.slice(0, page * 12)

  const navigateLightbox = (dir: 'prev' | 'next') => {
    if (!lightbox) return
    const newIndex = dir === 'prev'
      ? (lightbox.index - 1 + displayedPhotos.length) % displayedPhotos.length
      : (lightbox.index + 1) % displayedPhotos.length
    setLightbox({ photo: displayedPhotos[newIndex], index: newIndex })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="relative h-56 md:h-72 bg-black overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-crimson/20 to-black" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-2 text-zinc-400 font-body text-xs tracking-widest mb-4">
            <Link to="/" className="hover:text-white transition-colors">Início</Link>
            <ChevronLeft size={12} className="rotate-180" />
            <span className="text-white">Portfólio</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-white tracking-wide">NOSSO TRABALHO</h1>
          <p className="text-zinc-400 font-body text-sm mt-2">Galeria de tattoos realizadas</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
        {/* Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <Filter size={16} className="text-crimson mr-2" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium tracking-wider transition-all duration-200 ${
                active === cat
                  ? 'bg-crimson text-white'
                  : 'border-2 border-crimson text-crimson hover:bg-crimson hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(12).fill(null).map((_, i) => (
              <div key={i} className={`bg-zinc-200 animate-pulse rounded-xl ${i % 3 === 0 ? 'h-72' : 'h-52'}`} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedPhotos.map((photo, i) => (
                <FadeIn key={photo.id} delay={i * 50}>
                  <div
                    className="gallery-item relative rounded-xl overflow-hidden cursor-pointer aspect-[3/4] group border-2 border-transparent hover:border-crimson transition-all"
                    onClick={() => setLightbox({ photo, index: i })}
                  >
                    <img
                      src={photo.src.large}
                      alt={photo.alt || 'Tattoo'}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="overlay absolute inset-0 bg-crimson/70 flex flex-col items-center justify-center gap-2">
                      <ZoomIn size={28} className="text-white" />
                      <span className="text-white/80 text-xs font-body tracking-wider">Ver detalhes</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {displayedPhotos.length < photos.length && (
              <div className="text-center mt-10">
                <button
                  onClick={loadMore}
                  className="bg-crimson text-white px-10 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-crimson-dark transition-colors"
                >
                  CARREGAR MAIS
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-crimson transition-colors z-10"
            onClick={() => setLightbox(null)}
            aria-label="Fechar"
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-crimson transition-colors z-10 p-2"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
          >
            <ChevronLeft size={40} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-crimson transition-colors z-10 p-2"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
          >
            <ChevronRight size={40} />
          </button>
          <div className="max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.photo.src.large2x}
              alt={lightbox.photo.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-body text-sm">{lightbox.photo.alt || 'Tattoo'}</p>
              <p className="text-zinc-500 text-xs font-body">Foto por {lightbox.photo.photographer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
