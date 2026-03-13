import { motion } from 'motion/react'

const NAV_LINKS = ['Missions', 'Technology', 'About', 'Contact'] as const

export function Navbar() {
  return (
    <motion.nav
      className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16"
      initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay: 0.05 }}
    >
      <div className="flex items-center justify-between">

        {/* ── Logo ── */}
        <div className="liquid-glass rounded-full h-12 w-12 flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
          >
            <circle cx="16" cy="16" r="6" fill="white" fillOpacity="0.9" />
            <circle cx="16" cy="16" r="12" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx="16" cy="16" r="15" stroke="white" strokeOpacity="0.15" strokeWidth="0.5" />
            <line x1="4"  y1="16" x2="28" y2="16" stroke="white" strokeOpacity="0.25" strokeWidth="0.5" />
            <line x1="16" y1="4"  x2="16" y2="28" stroke="white" strokeOpacity="0.25" strokeWidth="0.5" />
          </svg>
        </div>

        {/* ── Center Links ── */}
        <div className="hidden md:flex liquid-glass rounded-full px-6 py-2.5 items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="px-3 py-1 text-sm font-body font-light text-white/70 hover:text-white rounded-full transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* ── Right CTA ── */}
        <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-white font-body text-sm font-medium flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
          Book A Mission
          <span className="liquid-glass rounded-full h-6 w-6 inline-flex items-center justify-center text-white/70">
            <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 10L10 2M10 2H4M10 2v6" />
            </svg>
          </span>
        </button>

      </div>
    </motion.nav>
  )
}
