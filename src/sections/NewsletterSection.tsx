import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import FadeIn from '../components/FadeIn'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSent(true)
      setEmail('')
    }
  }

  return (
    <section id="contato" className="bg-black py-20 lg:py-28 relative overflow-hidden">
      {/* Red gradient decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-crimson/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-crimson/10 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto px-6 md:px-12 text-center relative z-10">
        <FadeIn>
          <p className="text-xs font-body tracking-[0.3em] text-crimson uppercase mb-4">Fique por dentro</p>
          <h2 className="font-display text-5xl md:text-6xl tracking-wide text-white mb-4">
            INSCREVA-SE NA<br />NEWSLETTER
          </h2>
          <p className="text-zinc-400 font-body text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Receba novidades sobre tatuagens, inspirações de design e conteúdo exclusivo diretamente no seu e-mail.
          </p>

          {sent ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <CheckCircle2 size={48} className="text-crimson" />
              <p className="font-display text-2xl text-white tracking-wider">INSCRITO COM SUCESSO!</p>
              <p className="text-zinc-400 text-sm font-body">Em breve você receberá novidades do nosso estúdio.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="flex-1 bg-transparent border border-zinc-700 text-white placeholder-zinc-600 px-5 py-3 rounded-lg font-body text-sm focus:outline-none focus:border-crimson transition-colors"
              />
              <button
                type="submit"
                className="bg-crimson text-white px-6 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-crimson-dark transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                <Send size={14} />
                INSCREVER
              </button>
            </form>
          )}

          <p className="text-zinc-700 text-xs font-body mt-5 tracking-wider">
            Sem spam. Cancele quando quiser.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
