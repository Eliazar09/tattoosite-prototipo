import { useState, useEffect, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const testimonials = [
  {
    name: 'FERNANDA LIMA',
    sub: 'Cliente há 2 anos',
    text: 'A experiência foi incrível do início ao fim. O artista entendeu exatamente o que eu queria e o resultado ficou ainda melhor do que eu imaginava. Já voltei 3 vezes e sempre saio apaixonada!',
    rating: 5,
    initials: 'FL',
  },
  {
    name: 'RICARDO SOUZA',
    sub: 'Primeira tatuagem',
    text: 'Fiquei com muito medo por ser minha primeira tatuagem, mas a equipe foi extremamente atenciosa e cuidadosa. O ambiente é super limpo e profissional. Recomendo de olhos fechados!',
    rating: 5,
    initials: 'RS',
  },
  {
    name: 'JULIANA MARTINS',
    sub: 'Cover-up realizado',
    text: 'Tinha uma tatuagem antiga que eu não gostava mais e o artista fez um cover-up absolutamente lindo. Transformou algo que me incomodava em uma obra de arte. Sou eternamente grata!',
    rating: 5,
    initials: 'JM',
  },
  {
    name: 'BRUNO OLIVEIRA',
    sub: 'Cliente há 3 anos',
    text: 'Tenho 8 tatuagens e todas foram feitas aqui. A qualidade é consistente, o atendimento é sempre excelente e o ambiente é muito confortável. Não trocaria por nada!',
    rating: 5,
    initials: 'BO',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 6000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const go = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCurrent(i)
  }

  const t = testimonials[current]

  return (
    <section className="bg-crimson py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-body tracking-[0.3em] text-white/70 uppercase mb-3">Depoimentos</p>
          <h2 className="font-display text-5xl md:text-6xl tracking-wide text-white mb-3">O QUE DIZEM</h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-white/30" />
            <span className="text-white/50 text-lg">✦</span>
            <div className="h-px w-12 bg-white/30" />
          </div>
        </FadeIn>

        <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <Quote size={48} className="text-crimson/10 absolute top-6 left-8" />

          <div className="relative z-10">
            {/* Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {Array(t.rating).fill(null).map((_, i) => (
                <Star key={i} size={18} className="text-crimson fill-crimson" />
              ))}
            </div>

            {/* Text */}
            <p
              className="text-zinc-600 font-body text-base md:text-lg leading-relaxed italic text-center mb-8 min-h-[80px] transition-all duration-500"
              key={current}
            >
              "{t.text}"
            </p>

            {/* Client */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-crimson text-white flex items-center justify-center font-display text-lg">
                {t.initials}
              </div>
              <div>
                <p className="font-display text-lg tracking-wider text-black">{t.name}</p>
                <p className="text-crimson text-xs font-body">{t.sub}</p>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-7 bg-crimson' : 'w-3 bg-zinc-300'}`}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => go((current - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-crimson transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go((current + 1) % testimonials.length)}
            className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-crimson transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
