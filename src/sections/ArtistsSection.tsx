import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, CalendarCheck } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { searchPhotos, PexelsPhoto } from '../data/pexels'

const ARTIST = {
  name: 'ARTISTA PRINCIPAL',
  role: 'TATUADOR SÊNIOR',
  bio: 'Especialista em criar peças únicas e personalizadas. Cada trabalho é tratado com atenção especial, transformando ideias em arte permanente na pele. Com vasta experiência no mercado, já realizou milhares de tattoos exclusivas.',
  specialties: ['Old School', 'Japonês', 'Neo Trad', 'Dotwork', 'Lettering', 'Realismo'],
  instagram: '@seuestudio',
}

export default function ArtistsSection() {
  const [photo, setPhoto] = useState<PexelsPhoto | null>(null)

  useEffect(() => {
    searchPhotos('professional tattoo artist portrait man', 5).then(p => {
      if (p.length > 0) setPhoto(p[0])
    })
  }, [])

  return (
    <section id="artistas" className="bg-zinc-50 py-14 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-body tracking-[0.3em] text-crimson uppercase mb-3">A artista</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wide text-black mb-3">NOSSO TIME</h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-crimson" />
            <span className="text-crimson text-lg">✦</span>
            <div className="h-px w-12 bg-crimson" />
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-zinc-100 max-h-[540px] border-2 border-crimson/20">
                {photo ? (
                  <img
                    src={photo.src.portrait || photo.src.large}
                    alt={ARTIST.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-200 flex items-center justify-center">
                    <span className="font-display text-5xl text-crimson">ARTISTA</span>
                  </div>
                )}
              </div>
              <a
                href={`https://instagram.com/${ARTIST.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-crimson/10 transition-colors border border-crimson/20"
              >
                <Instagram size={14} className="text-crimson" />
                <span className="font-body text-xs font-medium text-black">@seuestudio</span>
              </a>
            </div>

            {/* Info */}
            <div>
              <p className="font-body text-xs tracking-[0.3em] text-crimson uppercase mb-4">Fundador do Estúdio</p>
              <h3 className="font-display text-3xl md:text-5xl tracking-wide text-black mb-2">{ARTIST.name}</h3>
              <p className="font-body text-xs tracking-widest text-crimson uppercase mb-6">{ARTIST.role}</p>
              <p className="font-body text-sm text-zinc-600 leading-relaxed mb-8">{ARTIST.bio}</p>

              <p className="font-body text-xs tracking-[0.2em] text-crimson uppercase mb-3">Especialidades</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {ARTIST.specialties.map(s => (
                  <span
                    key={s}
                    className="border-2 border-crimson/30 text-crimson text-xs font-body font-medium px-4 py-1.5 rounded-full tracking-wider hover:bg-crimson hover:text-white transition-all"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <Link
                to="/agendamento"
                className="inline-flex items-center gap-2 bg-crimson text-white px-8 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-crimson-dark transition-colors"
              >
                <CalendarCheck size={16} />
                AGENDAR SESSÃO
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
