import { motion } from 'framer-motion'

// ─── ChevronUp Icon local SVG ────────────────────────────────────────────────

const ChevronUpIcon = ({ size = 16, className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
)

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full border-t border-[#1e1e30]/60 bg-[#080810]"
      aria-label="Footer"
    >
      <div className="container-content py-12 flex flex-col items-center justify-center text-center">
        {/* Back to Top button */}
        <motion.button
          onClick={handleBackToTop}
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="group flex flex-col items-center gap-1 mb-8 text-text-muted hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#080810] rounded-lg p-2"
          aria-label="Back to top"
        >
          <span className="text-[0.65rem] tracking-[0.2em] font-semibold uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            Back to Top
          </span>
          <ChevronUpIcon className="group-hover:scale-110 transition-transform duration-300" />
        </motion.button>

        {/* Footer content */}
        <div className="space-y-2 text-xs md:text-sm text-text-muted select-none">
          <p className="font-medium tracking-wide">
            &copy; 2026 Kalanidhi Namboothiri. All rights reserved.
          </p>
          <p className="opacity-70 font-medium">
            Designed &amp; Developed by Kalanidhi.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
