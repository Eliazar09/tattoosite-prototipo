import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, CheckCircle2, ChevronLeft, HelpCircle, Clock, AlertTriangle, MessageCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface FormData {
  nome: string
  email: string
  telefone: string
  comoConheceu: string
  estilo: string
  descricao: string
  parteCopo: string
  tamanho: string
  primeiraVez: string
  coverUp: string
  dias: string[]
  horario: string
  orcamento: string
  referencia: string
  termos: boolean
}

const initialForm: FormData = {
  nome: '', email: '', telefone: '', comoConheceu: '',
  estilo: '', descricao: '', parteCopo: '', tamanho: '',
  primeiraVez: 'nao', coverUp: 'nao',
  dias: [], horario: '', orcamento: '', referencia: '', termos: false,
}

const steps = ['Dados Pessoais', 'Sobre a Tattoo', 'Preferências', 'Confirmação']

const faq = [
  { q: 'Qual o prazo de resposta?', a: 'Respondemos em até 24 horas úteis após o agendamento.' },
  { q: 'Preciso pagar algum sinal?', a: 'Sim, cobramos 30% do valor total para confirmar a sessão.' },
  { q: 'Posso cancelar ou remarcar?', a: 'Com até 48h de antecedência sem custo. Cancelamentos com menos prazo perdem o sinal.' },
  { q: 'Como me preparar para a sessão?', a: 'Durma bem, alimente-se antes, hidrate-se e vista roupas confortáveis.' },
]

export default function AgendamentoPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const set = (field: keyof FormData, value: string | boolean | string[]) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const toggleDia = (dia: string) => {
    set('dias', form.dias.includes(dia) ? form.dias.filter(d => d !== dia) : [...form.dias, dia])
  }

  const canNext = () => {
    if (step === 0) return form.nome && form.email && form.telefone
    if (step === 1) return form.estilo && form.descricao && form.parteCopo
    if (step === 2) return form.dias.length > 0 && form.horario
    if (step === 3) return form.termos
    return true
  }

  const WHATSAPP = '5595999990000'

  const handleSubmit = () => {
    if (!form.termos) return

    const msg = [
      '🖤 *NOVO AGENDAMENTO — VITINHO TATTOO* 🖤',
      '',
      '*📋 DADOS DO CLIENTE*',
      `Nome: ${form.nome}`,
      `E-mail: ${form.email}`,
      `Telefone: ${form.telefone}`,
      form.comoConheceu ? `Como conheceu: ${form.comoConheceu}` : '',
      '',
      '*🎨 SOBRE A TATUAGEM*',
      `Estilo: ${form.estilo}`,
      `Descrição: ${form.descricao}`,
      `Parte do corpo: ${form.parteCopo}`,
      form.tamanho ? `Tamanho: ${form.tamanho}` : '',
      `Primeira tatuagem: ${form.primeiraVez === 'sim' ? 'Sim' : 'Não'}`,
      `Cover-up: ${form.coverUp === 'sim' ? 'Sim' : 'Não'}`,
      form.referencia ? `Referência: ${form.referencia}` : '',
      '',
      '*📅 PREFERÊNCIAS*',
      `Dias disponíveis: ${form.dias.join(', ')}`,
      `Horário: ${form.horario}`,
      form.orcamento ? `Orçamento estimado: ${form.orcamento}` : '',
      '',
      form.referencia ? '📸 *O cliente possui foto de referência — peça para enviar!*' : '',
    ].filter(Boolean).join('%0A')

    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
    setSubmitted(true)
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
            <ChevronRight size={12} />
            <span className="text-white">Agendamento</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-white tracking-wide">AGENDE SUA SESSÃO</h1>
          <p className="text-zinc-400 font-body text-sm mt-2">Dê o primeiro passo para sua nova arte</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-12 py-8 md:py-12">
        {submitted ? (
          <div className="max-w-lg mx-auto text-center py-20">
            <CheckCircle2 size={64} className="text-crimson mx-auto mb-6" />
            <h2 className="font-display text-4xl mb-3 tracking-wide">SOLICITAÇÃO ENVIADA!</h2>
            <p className="text-zinc-500 font-body text-sm leading-relaxed mb-3">
              Sua solicitação foi enviada direto para o WhatsApp do Vitinho. Aguarde o retorno para confirmar data e orçamento.
            </p>
            <p className="text-zinc-400 font-body text-xs mb-8">
              Se tiver fotos de referência, envie-as no chat do WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-crimson text-white px-8 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-crimson-dark transition-colors"
              >
                <MessageCircle size={16} />
                ABRIR WHATSAPP
              </a>
              <Link
                to="/"
                className="inline-block border-2 border-zinc-200 text-black px-8 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-50 transition-colors"
              >
                VOLTAR AO INÍCIO
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center gap-0 mb-3">
                  {steps.map((s, i) => (
                    <div key={s} className="flex items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-all shrink-0 ${
                        i < step ? 'bg-crimson text-white' : i === step ? 'bg-crimson text-white ring-4 ring-crimson/20' : 'bg-zinc-100 text-zinc-400'
                      }`}>
                        {i < step ? '✓' : i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 transition-all ${i < step ? 'bg-crimson' : 'bg-zinc-100'}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  {steps.map((s, i) => (
                    <span key={s} className={`text-xs font-body hidden sm:block ${i === step ? 'text-crimson font-semibold' : 'text-zinc-400'}`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step content */}
              <div className="bg-white border border-zinc-100 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm">
                {step === 0 && (
                  <div className="space-y-5">
                    <h2 className="font-display text-2xl tracking-wider mb-6 text-black">DADOS PESSOAIS</h2>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-crimson uppercase mb-2">Nome Completo *</label>
                      <input type="text" value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Seu nome completo" className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-crimson transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-crimson uppercase mb-2">E-mail *</label>
                      <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="seu@email.com" className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-crimson transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-crimson uppercase mb-2">Telefone / WhatsApp *</label>
                      <input type="tel" value={form.telefone} onChange={e => set('telefone', e.target.value)} placeholder="(00) 00000-0000" className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-crimson transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-crimson uppercase mb-2">Como nos conheceu?</label>
                      <select value={form.comoConheceu} onChange={e => set('comoConheceu', e.target.value)} className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-crimson transition-colors">
                        <option value="">Selecione...</option>
                        <option>Instagram</option>
                        <option>Indicação</option>
                        <option>Google</option>
                        <option>Facebook</option>
                        <option>Outro</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-5">
                    <h2 className="font-display text-2xl tracking-wider mb-6 text-black">SOBRE A TATTOO</h2>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-crimson uppercase mb-2">Estilo Desejado *</label>
                      <select value={form.estilo} onChange={e => set('estilo', e.target.value)} className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-crimson transition-colors">
                        <option value="">Selecione...</option>
                        {['Realismo', 'Blackwork', 'Tribal', 'Mandala', 'Geométrico', 'Aquarela', 'Fineline', 'Neotradicional', 'Outro'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-crimson uppercase mb-2">Descrição da Ideia *</label>
                      <textarea value={form.descricao} onChange={e => set('descricao', e.target.value)} placeholder="Descreva sua ideia..." rows={4} className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-crimson transition-colors resize-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-crimson uppercase mb-2">Orçamento Estimado</label>
                      <select value={form.orcamento} onChange={e => set('orcamento', e.target.value)} className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-crimson transition-colors">
                        <option value="">Não sei / sem preferência</option>
                        <option>Até R$ 300</option>
                        <option>R$ 300 – R$ 600</option>
                        <option>R$ 600 – R$ 1.000</option>
                        <option>R$ 1.000 – R$ 2.000</option>
                        <option>Acima de R$ 2.000</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-crimson uppercase mb-2">Referência / Inspiração</label>
                      <textarea value={form.referencia} onChange={e => set('referencia', e.target.value)} placeholder="Link ou descrição..." rows={2} className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-crimson transition-colors resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-body tracking-widest text-crimson uppercase mb-2">Parte do Corpo *</label>
                        <select value={form.parteCopo} onChange={e => set('parteCopo', e.target.value)} className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-crimson transition-colors">
                          <option value="">Selecione...</option>
                          {['Braço', 'Antebraço', 'Perna', 'Costas', 'Peito', 'Pescoço', 'Mão', 'Outro'].map(p => <option key={p}>{p}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-body tracking-widest text-crimson uppercase mb-2">Tamanho</label>
                        <select value={form.tamanho} onChange={e => set('tamanho', e.target.value)} className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-crimson transition-colors">
                          <option value="">Selecione...</option>
                          <option>Pequena (até 5cm)</option>
                          <option>Média (5-15cm)</option>
                          <option>Grande (15-25cm)</option>
                          <option>Extra-grande (25cm+)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <h2 className="font-display text-2xl tracking-wider mb-6 text-black">PREFERÊNCIAS</h2>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-crimson uppercase mb-2">Dias Disponíveis *</label>
                      <div className="flex flex-wrap gap-2">
                        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map(dia => (
                          <button key={dia} onClick={() => toggleDia(dia)} className={`px-4 py-2 rounded-lg text-sm font-body font-medium border-2 transition-all ${form.dias.includes(dia) ? 'bg-crimson text-white border-crimson' : 'border-zinc-200 text-zinc-600 hover:border-crimson'}`}>
                            {dia}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-crimson uppercase mb-2">Horário Preferido *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[{ label: 'Manhã', sub: '10h – 13h' }, { label: 'Tarde', sub: '13h – 18h' }].map(h => (
                          <button key={h.label} onClick={() => set('horario', h.label)} className={`p-4 rounded-xl border-2 text-left transition-all ${form.horario === h.label ? 'bg-crimson text-white border-crimson' : 'border-zinc-200 hover:border-crimson'}`}>
                            <p className={`font-body font-semibold text-sm ${form.horario === h.label ? 'text-white' : 'text-black'}`}>{h.label}</p>
                            <p className={`font-body text-xs mt-0.5 ${form.horario === h.label ? 'text-white/80' : 'text-zinc-400'}`}>{h.sub}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="font-display text-2xl tracking-wider mb-6 text-black">CONFIRMAÇÃO</h2>
                    <div className="space-y-3 mb-8">
                      {[{ label: 'Nome', value: form.nome }, { label: 'E-mail', value: form.email }, { label: 'Telefone', value: form.telefone }, { label: 'Estilo', value: form.estilo }, { label: 'Parte do Corpo', value: form.parteCopo }, { label: 'Dias', value: form.dias.join(', ') }, { label: 'Horário', value: form.horario }].map(item => (
                        <div key={item.label} className="flex justify-between py-2.5 border-b border-zinc-50">
                          <span className="font-body text-xs tracking-widest text-crimson uppercase">{item.label}</span>
                          <span className="font-body text-sm text-black font-medium">{item.value || '—'}</span>
                        </div>
                      ))}
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={form.termos} onChange={e => set('termos', e.target.checked)} className="mt-0.5 accent-crimson w-4 h-4 shrink-0" />
                      <span className="font-body text-sm text-zinc-600 leading-relaxed">
                        Concordo com os <a href="#" className="text-crimson underline">Termos de Serviço</a> e <a href="#" className="text-crimson underline">Política de Privacidade</a>.
                      </span>
                    </label>
                  </div>
                )}

                {/* Navigation */}
                <div className={`flex mt-8 ${step > 0 ? 'justify-between' : 'justify-end'}`}>
                  {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 text-sm font-body font-medium text-zinc-500 hover:text-crimson transition-colors">
                      <ChevronLeft size={16} /> Voltar
                    </button>
                  )}
                  {step < 3 ? (
                    <button onClick={() => canNext() && setStep(s => s + 1)} disabled={!canNext()} className="bg-crimson text-white px-8 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-crimson-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                      Continuar
                    </button>
                  ) : (
                    <button onClick={handleSubmit} disabled={!form.termos} className="bg-crimson text-white px-8 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-crimson-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                      CONFIRMAR AGENDAMENTO
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-zinc-50 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-crimson mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-sm font-semibold text-black mb-1">Tempo de resposta</p>
                    <p className="font-body text-xs text-zinc-500 leading-relaxed">Respondemos em até 24 horas úteis.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-crimson mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-sm font-semibold text-black mb-1">Política de cancelamento</p>
                    <p className="font-body text-xs text-zinc-500 leading-relaxed">Cancelamentos com menos de 48h perdem o sinal (30%).</p>
                  </div>
                </div>
              </div>

              <div className="border border-zinc-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <HelpCircle size={18} className="text-crimson" />
                  <h3 className="font-display text-lg tracking-widest">DÚVIDAS</h3>
                </div>
                <div className="space-y-3">
                  {faq.map((item, i) => (
                    <div key={i} className="border-b border-zinc-50 pb-3 last:border-0">
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left flex items-center justify-between gap-2">
                        <span className="font-body text-sm font-medium text-black">{item.q}</span>
                        <span className="text-crimson text-lg shrink-0">{openFaq === i ? '−' : '+'}</span>
                      </button>
                      {openFaq === i && <p className="font-body text-xs text-zinc-500 leading-relaxed mt-2">{item.a}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-crimson text-white rounded-2xl p-6 text-center">
                <p className="font-display text-xl tracking-wider mb-2">FALE CONOSCO</p>
                <p className="font-body text-xs text-white/70 mb-4">Prefere conversar diretamente?</p>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white text-crimson px-6 py-2.5 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-100 transition-colors">
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
