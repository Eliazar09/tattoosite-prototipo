import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import CountUp from '../components/CountUp'
import { searchPhotos, PexelsPhoto } from '../data/pexels'

const perks = [
  'Equipe premiada e reconhecida',
  'Mais de 12 anos no mercado',
  'Tintas importadas e esterilizadas',
  'Ambiente 100% higienizado',
  'Atendimento personalizado',
]

const stats = [
  { end: 5000, prefix: '+', suffix: '', label: 'Tattoos' },
  { end: 2500, prefix: '+', suffix: '', label: 'Clientes' },
  { end: 12, prefix: '', suffix: '+', label: 'Anos' },
  { end: 10, prefix: '', suffix: '', label: 'Prêmios' },
]

export default function AboutSection() {
  const [photo, setPhoto] = useState<PexelsPhoto | null>(null)

  useEffect(() => {
    searchPhotos('tattoo studio interior dark', 5).then(photos => {
      if (photos.length > 0) setPhoto(photos[0])
    })
  }, [])

  return (
    <section id="sobre" className="bg-white py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section title */}
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-body tracking-[0.3em] text-crimson uppercase mb-3">Nossa História</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide mb-3 text-black">SOBRE NÓS</h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-crimson" />
            <span className="text-crimson text-lg">✦</span>
            <div className="h-px w-12 bg-crimson" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left – Image */}
          <FadeIn direction="left" className="relative">
            <div className="relative inline-block w-full">
              <div
                className="rounded-2xl overflow-hidden shadow-2xl border-2 border-crimson/20"
                style={{ transform: 'rotate(-2deg)' }}
              >
                {photo ? (
                  <img
                    src={photo.src.large}
                    alt="Estúdio Vitinho"
                    className="w-full h-[480px] object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-[480px] bg-zinc-100 flex items-center justify-center">
                    <span className="font-display text-6xl text-crimson">PROTOTIPO</span>
                  </div>
                )}
              </div>
              {/* Signature overlay */}
              <div
                className="absolute -bottom-4 -right-4 bg-crimson text-white px-5 py-3 rounded-xl shadow-xl"
                style={{ transform: 'rotate(2deg)' }}
              >
                <p className="font-display text-2xl tracking-wider">Est. 2016</p>
              </div>
            </div>
          </FadeIn>

          {/* Right – Text */}
          <FadeIn direction="right" delay={200}>
            <p className="text-xs font-body tracking-[0.3em] text-crimson uppercase mb-3">Quem somos</p>
            <h3 className="font-display text-3xl md:text-4xl tracking-wide mb-5 text-black">
              ANOS DE EXPERIÊNCIA PREMIADA
            </h3>
            <p className="text-zinc-500 font-body text-base leading-relaxed mb-4">
              Nosso Estúdio nasceu da paixão pela arte e pelo desejo de criar tatuagens que vão além do simples desenho — são histórias gravadas na pele para sempre.
            </p>
            <p className="text-zinc-500 font-body text-base leading-relaxed mb-6">
              Com uma equipe de artistas altamente qualificados e um ambiente sofisticado, oferecemos uma experiência única e personalizada para cada cliente.
            </p>

            {/* Perks */}
            <ul className="space-y-3 mb-8">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 font-body text-sm text-zinc-700">
                  <CheckCircle size={17} className="text-crimson shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-crimson/20">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-3xl md:text-4xl text-crimson leading-none">
                    <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="text-zinc-400 text-xs font-body mt-1 tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
