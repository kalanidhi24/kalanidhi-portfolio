import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '../utils/animations'
import DotGrid from '../components/reactbits/DotGrid'

// ─── Lucide Icons in local SVG form to avoid package dependency conflicts ─────

const LinkedinIcon = ({ size, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GithubIcon = ({ size, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const DiscordIcon = ({ size, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const TwitterIcon = ({ size, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
)

const MailIcon = ({ size, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

// ─── Contact Info ───────────────────────────────────────────────────────────

const contactLinks = [
  {
    name: 'LinkedIn',
    username: 'kalanidhi-n',
    url: 'https://www.linkedin.com/in/kalanidhi-n/',
    Icon: LinkedinIcon,
  },
  {
    name: 'GitHub',
    username: 'kalanidhi24',
    url: 'https://github.com/kalanidhi24',
    Icon: GithubIcon,
  },
  {
    name: 'Discord',
    username: 'knidhiii',
    url: 'https://discord.com/users/knidhiii',
    Icon: DiscordIcon,
  },
  {
    name: 'X (Twitter)',
    username: '@Kalanidhiiii',
    url: 'https://x.com/Kalanidhiiii',
    Icon: TwitterIcon,
  },
  {
    name: 'Email',
    username: 'kalanidhinamboothiri@gmail.com',
    url: 'mailto:kalanidhinamboothiri@gmail.com',
    Icon: MailIcon,
  },
]

// ─── Single Contact Card ─────────────────────────────────────────────────────

function ContactCard({ link }) {
  const [hovered, setHovered] = useState(false)
  const { name, username, url, Icon } = link

  // Detect desktop/laptop screens to dynamically adjust hover spacing
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 1024)
      const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center justify-center h-36 rounded-2xl border border-white/[0.08] bg-[#0c0c18]/90 backdrop-blur-sm hover:border-accent/40 hover:shadow-[0_10px_35px_rgba(99,102,241,0.15)] transition-all duration-300 group overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Icon + Platform Name wrapper — shifts up on hover */}
      <motion.div
        animate={{ y: hovered ? (isDesktop ? -22 : -12) : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex flex-col items-center gap-2.5"
      >
        <Icon
          size={24}
          className="text-text-secondary group-hover:text-accent transition-colors duration-300"
          aria-hidden="true"
        />
        <span className="text-sm font-semibold text-text-primary tracking-wide">
          {name}
        </span>
      </motion.div>

      {/* Username / Handle reveal — fades and shifts in on hover */}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? (isDesktop ? 28 : 16) : 24,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="absolute text-xs text-text-muted font-medium select-all text-center px-4 max-w-full truncate"
      >
        {username}
      </motion.span>
    </motion.a>
  )
}

// ─── Contact Section ─────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-24 md:py-32"
      aria-label="Contact section"
    >
      {/* Background DotGrid (matches Hero exactly) */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <DotGrid
          dotSize={4}
          gap={28}
          baseColor="#1e1e30"
          activeColor="#6366f1"
          proximity={120}
          speedTrigger={80}
          shockRadius={200}
          shockStrength={4}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div className="container-content relative z-10 w-full flex flex-col items-center text-center">

        {/* ── Section header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="mb-16 max-w-2xl"
        >
          <motion.p variants={fadeInUp} className="section-label">
            Contact
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-4"
          >
            Let&apos;s Connect
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base text-text-secondary leading-relaxed font-medium"
          >
            I&apos;m always open to discussing opportunities, collaborations, or simply connecting with fellow developers.
          </motion.p>
        </motion.div>

        {/* ── Responsive grid of contact cards ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 w-full max-w-5xl"
        >
          {contactLinks.map((link) => (
            <motion.div key={link.name} variants={fadeInUp}>
              <ContactCard link={link} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
