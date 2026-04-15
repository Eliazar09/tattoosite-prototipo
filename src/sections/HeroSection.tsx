import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchVideos, getBestVideoFile } from '../data/pexels'

const FALLBACK_VIDEO = 'https://player.vimeo.com/external/292490785.hd.mp4?s=e7e84c2e2eb8ff4c2a33e6d99b9e57f61fd8ffd4&profile_id=175&oauth2_token_id=57447761'

const lines = ['INK & ART', 'STUDIO']

function AnimatedHeading() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <h1
      className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-4"
      style={{ letterSpacing: '-0.02em' }}
    >
      {lines.map((line, li) =>
        line.split('').map((char, ci) => {
          const delay = 200 + li * line.length * 30 + ci * 30
          return (
            <span
              key={`${li}-${ci}`}
              className="inline-block"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-18px)',
                transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
                whiteSpace: char === ' ' ? 'pre' : undefined,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          )
        }).concat(li < lines.length - 1 ? [<br key={`br-${li}`} />] : [])
      )}
    </h1>
  )
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoSrc, setVideoSrc] = useState('')
  const [subtitleVis, setSubtitleVis] = useState(false)
  const [btnVis, setBtnVis] = useState(false)
  const [cardVis, setCardVis] = useState(false)

  useEffect(() => {
    searchVideos('tattoo machine ink close up', 3).then(videos => {
      if (videos.length > 0) {
        const src = getBestVideoFile(videos[0])
        setVideoSrc(src)
      } else {
        setVideoSrc(FALLBACK_VIDEO)
      }
    })

    setTimeout(() => setSubtitleVis(true), 800)
    setTimeout(() => setBtnVis(true), 1200)
    setTimeout(() => setCardVis(true), 1400)
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-black flex flex-col">
      {/* Background video */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      )}

      {/* Red gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-crimson/10 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          {/* Left */}
          <div>
            <div className="text-white">
              <AnimatedHeading />
            </div>

            <p
              className="text-white/70 text-base md:text-lg mb-6 max-w-lg font-body"
              style={{
                opacity: subtitleVis ? 1 : 0,
                transform: subtitleVis ? 'none' : 'translateY(20px)',
                transition: 'opacity 1000ms ease, transform 1000ms ease',
              }}
            >
              Estúdio especializado em tatuagens exclusivas e personalizadas.
              Transformamos suas ideias em arte permanente.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3"
              style={{
                opacity: btnVis ? 1 : 0,
                transform: btnVis ? 'none' : 'translateY(20px)',
                transition: 'opacity 1000ms ease, transform 1000ms ease',
              }}
            >
              <Link
                to="/agendamento"
                className="bg-crimson text-white px-8 py-4 sm:py-3 rounded-lg font-medium font-body text-sm tracking-wider hover:bg-crimson-dark transition-colors text-center"
              >
                Agendar Sessão
              </Link>
              <Link
                to="/portfolio"
                className="glass-dark-solid border border-white/20 text-white px-8 py-4 sm:py-3 rounded-lg font-medium font-body text-sm tracking-wider hover:bg-crimson hover:border-crimson transition-colors text-center"
              >
                Ver Portfólio
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="hidden lg:flex justify-end">
            <div
              className="glass-dark-solid border border-crimson/30 px-6 py-4 rounded-xl glow-red"
              style={{
                opacity: cardVis ? 1 : 0,
                transform: cardVis ? 'none' : 'translateY(20px)',
                transition: 'opacity 1000ms ease, transform 1000ms ease',
              }}
            >
              <p className="text-white text-xl md:text-2xl font-light font-body tracking-wide">
                Arte • Estilo • Personalidade
              </p>
              <p className="text-crimson text-sm font-body mt-1">
                Tatuagens exclusivas desde 2016
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
