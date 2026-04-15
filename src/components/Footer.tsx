import { Link } from 'react-router-dom'
import { Instagram, Facebook, Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Logo central */}
        <div className="text-center mb-12">
          <p className="font-display text-7xl md:text-9xl tracking-tight text-white opacity-90 select-none">
            PROTOTIPO<span className="text-crimson">.</span>
          </p>
          <div className="w-48 h-px bg-crimson mx-auto mt-6 mb-8" />
          <p className="text-zinc-400 text-sm font-body max-w-md mx-auto">
            Modelo de site para estúdio de tatuagem. Design moderno e profissional.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Navegação */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-crimson mb-4">NAVEGAÇÃO</h4>
            <ul className="space-y-2">
              {['Início', 'Sobre', 'Serviços', 'Artistas', 'Portfólio', 'Agendamento'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Início' ? '/' : item === 'Sobre' ? '/#sobre' : item === 'Serviços' ? '/#servicos' : item === 'Artistas' ? '/#artistas' : item === 'Portfólio' ? '/portfolio' : '/agendamento'} className="text-zinc-400 text-sm font-body hover:text-crimson transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-crimson mb-4">SERVIÇOS</h4>
            <ul className="space-y-2">
              {['Mandala', 'Tribal', 'Realismo', 'Blackwork', 'Piercing', 'Cover-up'].map((item) => (
                <li key={item}>
                  <span className="text-zinc-400 text-sm font-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-crimson mb-4">CONTATO</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-zinc-400 text-sm font-body">
                <MapPin size={15} className="text-crimson mt-0.5 shrink-0" />
                Rua das Artes, 420 – Centro<br />Boa Vista, RR
              </li>
              <li className="flex items-center gap-2.5 text-zinc-400 text-sm font-body">
                <Phone size={15} className="text-crimson shrink-0" />
                (95) 99999-0000
              </li>
              <li className="flex items-center gap-2.5 text-zinc-400 text-sm font-body">
                <Clock size={15} className="text-crimson shrink-0" />
                Seg–Sáb: 10h às 20h
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-crimson mb-4">SIGA-NOS</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://instagram.com/vitinhotattoo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 hover:border-crimson hover:text-crimson transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 hover:border-crimson hover:text-crimson transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://wa.me/5595999990000"
                className="w-10 h-10 border border-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 hover:border-crimson hover:text-crimson transition-all"
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </a>
            </div>
            <p className="text-zinc-500 text-xs font-body">@seuestudio</p>
          </div>
        </div>

        {/* Divisor */}
        <div className="relative flex items-center mb-8">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="px-4 font-display text-2xl text-crimson tracking-widest">✦ PROTOTIPO ✦</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-zinc-600 text-xs font-body">
          <p>© {new Date().getFullYear()} Protótipo de Site Tattoo. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-crimson transition-colors">Privacidade</a>
            <a href="#" className="hover:text-crimson transition-colors">Termos</a>
            <Link to="/agendamento" className="hover:text-crimson transition-colors">Agendar</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
