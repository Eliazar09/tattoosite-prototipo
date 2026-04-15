import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck, MessageCircle } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { searchPhotos, PexelsPhoto } from '../data/pexels'

const services = [
  { name: 'Old School', query: 'old school traditional tattoo' },
  { name: 'Japonês', query: 'japanese irezumi tattoo' },
  { name: 'Retratos', query: 'portrait tattoo realistic' },
  { name: 'Lettering', query: 'lettering script tattoo' },
  { name: 'Minimalista', query: 'minimalist fine line tattoo' },
  { name: '3D', query: '3d hyper realistic tattoo' },
]

export default function ServicesSection() {
  const [photos, setPhotos] = useState<(PexelsPhoto | null)[]>(Array(6).fill(null))
  const [featured, setFeatured] = useState<PexelsPhoto | null>(null)

  useEffect(() => {
    services.forEach((s, i) => {
      searchPhotos(s.query, 3).then(p => {
        if (p.length > 0) {
          setPhotos(prev => {
            const next = [...prev]
            next[i] = p[0]
            return next
          })
        }
      })
    })
    searchPhotos('tattoo full sleeve japanese dragon', 3).then(p => {
      if (p.length > 0) setFeatured(p[Math.floor(Math.random() * p.length)])
    })
  }, [])

  return (
    <section id="servicos" className="bg-[#0A0A0A] py-14 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-body tracking-[0.3em] text-crimson uppercase mb-3">O que fazemos</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide text-white mb-3">NOSSOS SERVIÇOS</h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-crimson" />
            <span className="text-crimson text-lg">✦</span>
            <div className="h-px w-12 bg-crimson" />
          </div>
        </FadeIn>

        {/* Grid 6 services */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {services.map((s, i) => (
            <FadeIn key={s.name} delay={i * 80}>
              <Link to="/agendamento" className="gallery-item group relative rounded-xl overflow-hidden cursor-pointer aspect-square bg-zinc-800 block border border-crimson/20">
                {photos[i] ? (
                  <img
                    src={photos[i]!.src.medium}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 animate-pulse" />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-white font-body text-xs font-semibold tracking-wider">{s.name.toUpperCase()}</span>
                </div>
                <div className="overlay absolute inset-0 bg-crimson/80 flex flex-col items-center justify-center gap-2 p-3">
                  <span className="text-white font-display text-xl tracking-wider">{s.name}</span>
                  <span className="text-white/90 font-body text-xs tracking-widest border border-white/50 px-3 py-1 rounded-full">Agendar</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* CTA strip */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 py-6 border-y border-crimson/20">
            <Link
              to="/agendamento"
              className="flex items-center gap-2 bg-crimson text-white px-7 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-crimson-dark transition-colors w-full sm:w-auto justify-center"
            >
              <CalendarCheck size={16} />
              AGENDAR SESSÃO
            </Link>
            <a
              href="https://wa.me/5595999990000?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20uma%20tatuagem."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-crimson text-crimson px-7 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-crimson hover:text-white transition-all w-full sm:w-auto justify-center"
            >
              <MessageCircle size={16} />
              SOLICITAR ORÇAMENTO
            </a>
          </div>
        </FadeIn>

        {/* Featured */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-zinc-900 rounded-2xl overflow-hidden border border-crimson/20">
            <div className="h-72 lg:h-96 bg-zinc-800 overflow-hidden">
              {featured ? (
                <img
                  src={featured.src.large}
                  alt="Tatuagem Realista"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 animate-pulse" />
              )}
            </div>
            <div className="p-6 md:p-8 lg:p-12">
              <p className="text-xs font-body tracking-[0.3em] text-crimson uppercase mb-3">Destaque</p>
              <h3 className="font-display text-4xl md:text-5xl tracking-wide text-white mb-4">
                FULL SLEEVE & PAINEL
              </h3>
              <p className="text-zinc-400 font-body text-sm leading-relaxed mb-6">
                Especialistas em tattoos de grande porte. Criamos mangas completas, painéis de costas e projetos que contam uma história única em sua pele.
              </p>
              <p className="text-zinc-400 font-body text-sm leading-relaxed mb-8">
                Cada traço é cuidadosamente executado por nossos artistas especializados, garantindo resultados que surpreendem e emocionam.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/agendamento"
                  className="flex items-center gap-2 bg-crimson text-white px-7 py-2.5 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-crimson-dark transition-all duration-300"
                >
                  <CalendarCheck size={15} />
                  AGENDAR
                </Link>
                <a
                  href="https://wa.me/5595999990000?text=Ol%C3%A1!%20Tenho%20interesse%20em%20uma%20tatuagem%20realista.%20Pode%20me%20passar%20um%20or%C3%A7amento%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-2 border-crimson text-crimson px-7 py-2.5 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-crimson hover:text-white transition-all duration-300"
                >
                  <MessageCircle size={15} />
                  ORÇAMENTO
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
