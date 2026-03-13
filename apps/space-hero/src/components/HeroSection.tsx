import { motion } from 'motion/react'
import { Navbar } from './Navbar'

/* ─────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────── */
const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwlXH07IWA1P/hf_20260306_115329_5e00c9c5-4d69-49b7-94c3-9c31c60bb644.mp4'

/* ─────────────────────────────────────────────────────────────────
   Heading words config
   serif: true  → Instrument Serif italic  (elegant, large)
   serif: false → Barlow 600              (strong, precise)
───────────────────────────────────────────────────────────────── */
interface Word {
  text: string
  serif?: boolean
  break?: boolean   // insert line break before this word
}

const HEADING_WORDS: Word[] = [
  { text: 'Journey' },
  { text: 'Beyond' },
  { text: 'the' },
  { text: 'Known,' },
  { text: 'Into',   serif: true, break: true },
  { text: 'the',    serif: true },
  { text: 'Stars',  serif: true },
]

/* ─────────────────────────────────────────────────────────────────
   Partners strip
───────────────────────────────────────────────────────────────── */
const PARTNERS = ['Artemis', 'Orion', 'Starship', 'Gateway', 'Lunar-X'] as const

/* ─────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* ══════════════════════════════════════
          VIDEO BACKGROUND — z-0
      ══════════════════════════════════════ */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={VIDEO_URL}
        poster="/images/hero_bg.jpeg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* ══════════════════════════════════════
          LIGHT OVERLAY — z-0
      ══════════════════════════════════════ */}
      <div className="absolute inset-0 bg-black/5 z-0" />

      {/* ══════════════════════════════════════
          ALL CONTENT WRAPPER — z-10
      ══════════════════════════════════════ */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* ── Navbar ── */}
        <Navbar />

        {/* ── Hero Body ── */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 pb-24 pt-28">

          {/* ── Top Announcement Pill ── */}
          <motion.div
            className="flex items-center gap-2.5 mb-10"
            initial={{ filter: 'blur(10px)', opacity: 0, y: 16 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold font-body tracking-wide">
              New
            </span>
            <span className="text-sm text-white/90 font-body font-light pr-1 tracking-wide">
              Maiden Crewed Voyage to Mars Arrives 2026
            </span>
          </motion.div>

          {/* ── Main Heading — word by word ── */}
          <h1 className="flex flex-wrap justify-center items-baseline gap-x-[0.22em] gap-y-1 leading-none text-5xl md:text-7xl lg:text-8xl xl:text-9xl mb-4 max-w-5xl">
            {HEADING_WORDS.map((word, i) => (
              <motion.span
                key={i}
                className={[
                  'inline-block',
                  word.serif
                    ? 'font-heading italic text-white'
                    : 'font-body font-semibold text-white tracking-tight',
                  word.break ? 'basis-full' : '',
                ].join(' ')}
                initial={{ filter: 'blur(5px)', opacity: 0.5, y: -5 }}
                animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.1 }}
              >
                {/* Line break word is invisible — just creates a new row */}
                {word.text}
              </motion.span>
            ))}
          </h1>

          {/* ── Subheading paragraph ── */}
          <motion.p
            className="mt-1 text-sm md:text-base text-white/85 max-w-2xl font-body font-light leading-tight"
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Discover the universe in ways once unimaginable. Our pioneering vessels and
            breakthrough engineering bring deep-space exploration within reach—secure and
            extraordinary.
          </motion.p>

          {/* ── CTA Buttons ── */}
          <motion.div
            className="flex items-center gap-4 md:gap-6 mt-8 flex-wrap justify-center"
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {/* Primary */}
            <button className="liquid-glass-strong rounded-full px-8 py-3.5 text-white font-body font-medium text-sm tracking-wide hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200">
              Book Your Journey
            </button>

            {/* Secondary */}
            <button className="liquid-glass rounded-full px-8 py-3.5 text-white/85 font-body font-light text-sm tracking-wide flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200">
              <span className="liquid-glass rounded-full h-5 w-5 inline-flex items-center justify-center">
                <svg viewBox="0 0 10 10" fill="currentColor" className="h-2.5 w-2.5 ml-0.5">
                  <path d="M2 1.5l6 3.5-6 3.5z" />
                </svg>
              </span>
              Explore Missions
            </button>
          </motion.div>

        </div>

        {/* ══════════════════════════════════════
            PARTNERS STRIP — bottom of hero
        ══════════════════════════════════════ */}
        <motion.div
          className="pb-10 px-8 lg:px-16"
          initial={{ filter: 'blur(8px)', opacity: 0, y: 12 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="liquid-glass rounded-full px-8 py-3.5 flex items-center justify-center gap-8 md:gap-12 flex-wrap max-w-3xl mx-auto">
            <span className="text-[10px] font-body font-light text-white/40 uppercase tracking-[0.18em] shrink-0">
              Partners
            </span>
            {PARTNERS.map((name) => (
              <span
                key={name}
                className="font-body font-light text-xs text-white/55 tracking-widest uppercase"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
