import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { staggerContainer, fadeInUp, fadeIn } from '../utils/animations'
import DotGrid from '../components/reactbits/DotGrid'
import Shuffle from '../components/reactbits/Shuffle'
import BorderGlow from '../components/reactbits/BorderGlow'

export default function Hero() {
  const handleScrollDown = () => {
    const about = document.querySelector('#about')
    if (about) about.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ReactBits Dot Grid Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
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

      {/* Content */}
      <motion.div
        className="container-content relative z-10 flex flex-col items-center text-center pt-20"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting badge */}
        <motion.div variants={fadeIn} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-[#1e1e30] bg-[#12121f] text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Greeting line */}
        <motion.p
          variants={fadeInUp}
          className="text-base md:text-lg font-medium text-text-secondary mb-4 tracking-wide"
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name — ReactBits Shuffle Text */}
        {/* "Kalanidhi" — white, triggers immediately on load, hover replays */}
        <Shuffle
          text="Kalanidhi"
          tag="h1"
          shuffleDirection="up"
          duration={0.4}
          stagger={0.025}
          animationMode="evenodd"
          threshold={0.01}
          rootMargin="0px"
          triggerOnce={true}
          triggerOnHover={true}
          textAlign="center"
          style={{
            fontFamily: "'Silkscreen', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textTransform: 'none',
            color: '#f1f1f5',
            display: 'block',
          }}
        />

        {/* "Namboothiri" — indigo accent color, animates in slightly after */}
        <Shuffle
          text="Namboothiri"
          tag="span"
          shuffleDirection="up"
          duration={0.4}
          stagger={0.02}
          animationMode="evenodd"
          threshold={0.01}
          rootMargin="0px"
          triggerOnce={true}
          triggerOnHover={true}
          textAlign="center"
          colorTo="#818cf8"
          style={{
            fontFamily: "'Silkscreen', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textTransform: 'none',
            color: '#6366f1',
            display: 'block',
            marginBottom: '1rem',
          }}
        />

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="text-base md:text-lg font-medium text-text-secondary mt-2 mb-10 max-w-md"
        >
          IT Undergraduate &amp; Aspiring Software Engineer
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          {/* Primary — View Resume */}
          <BorderGlow
            borderRadius={12}
            backgroundColor="#6366f1"
            glowColor="239 84 67"
            colors={['#a5b4fc', '#818cf8', '#6366f1']}
            glowRadius={30}
            glowIntensity={0.9}
            coneSpread={28}
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-7 py-3.5 font-semibold text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="View Resume (opens in new tab)"
            >
              View Resume
            </a>
          </BorderGlow>

          {/* Secondary — Get In Touch */}
          <BorderGlow
            borderRadius={12}
            backgroundColor="#0d0d1c"
            glowColor="239 84 67"
            colors={['#818cf8', '#6366f1', '#4f46e5']}
            glowRadius={22}
            glowIntensity={0.7}
            coneSpread={24}
          >
            <button
              onClick={() => {
                const contact = document.querySelector('#contact')
                if (contact) contact.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex items-center justify-center gap-2.5 px-7 py-3.5 font-semibold text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Mail size={15} />
              Get In Touch
            </button>
          </BorderGlow>
        </motion.div>

        {/* Scroll hint */}
        <motion.button
          variants={fadeIn}
          transition={{ delay: 1 }}
          onClick={handleScrollDown}
          className="mt-20 flex flex-col items-center gap-2 text-text-muted hover:text-accent transition-colors duration-300 group"
          aria-label="Scroll down"
        >
          <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
          <ArrowDown
            size={16}
            className="animate-bounce group-hover:text-accent transition-colors duration-300"
          />
        </motion.button>
      </motion.div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #080810)' }}
        aria-hidden="true"
      />
    </section>
  )
}
