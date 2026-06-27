import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Terminal, Layers, Server, Database } from 'lucide-react'
import { fadeInUp } from '../utils/animations'
import BorderGlow from '../components/reactbits/BorderGlow'
import Ferrofluid from '../components/reactbits/Ferrofluid'

// ─── Data (from content/skills.md) ───────────────────────────────────────────

const categories = [
  {
    id: 'languages',
    label: 'Programming Languages',
    Icon: Terminal,
    skills: ['Java', 'Python', 'C', 'C++', 'JavaScript'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    Icon: Layers,
    skills: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'backend',
    label: 'Backend',
    Icon: Server,
    skills: ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs'],
  },
  {
    id: 'databases',
    label: 'Databases',
    Icon: Database,
    skills: ['MySQL', 'MongoDB'],
  },
]

// ─── Variant definitions ─────────────────────────────────────────────────────

const rowVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const chipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.34, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const headingVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ─── Single category block ───────────────────────────────────────────────────

function CategoryBlock({ category, isLast }) {
  return (
    <motion.div
      className="relative md:pl-16"
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-48px' }}
    >
      {/* Timeline dot — visible md+ */}
      <motion.span
        className="absolute -left-[5px] top-[7px] hidden md:block w-[10px] h-[10px] rounded-full bg-[#0e0e1a] border-2 border-accent z-10"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-48px' }}
        transition={{ duration: 0.35, type: 'spring', stiffness: 300 }}
        aria-hidden="true"
      />

      {/* Category heading */}
      <motion.div
        variants={headingVariants}
        className="flex items-center gap-3 mb-6"
      >
        <category.Icon
          size={16}
          className="text-accent flex-shrink-0"
          aria-hidden="true"
        />
        <h3 className="text-sm font-semibold uppercase tracking-widest text-text-secondary">
          {category.label}
        </h3>
      </motion.div>

      {/* Skill chips — BorderGlow wrapper for hover glow effect */}
      <div className="flex flex-wrap gap-4">
        {category.skills.map((skill) => (
          <BorderGlow
            key={skill}
            borderRadius={14}
            backgroundColor="#0c0c18"
            glowColor="239 84 67"
            colors={['#818cf8', '#6366f1', '#4f46e5']}
            glowRadius={18}
            glowIntensity={0.7}
            edgeSensitivity={28}
            coneSpread={22}
          >
            <motion.span
              variants={chipVariants}
              className="flex items-center px-6 py-3.5 text-[1.05rem] font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-default whitespace-nowrap"
            >
              {skill}
            </motion.span>
          </BorderGlow>
        ))}
      </div>

      {/* Horizontal separator between categories (except the last) */}
      {!isLast && (
        <div className="mt-12 border-t border-[#1a1a28]" aria-hidden="true" />
      )}
    </motion.div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function Skills() {
  const sectionRef  = useRef(null)
  const timelineRef = useRef(null)

  /*
   * Measure the timeline container height so the glowing indicator
   * can travel from the exact top to the exact bottom of the line.
   * ResizeObserver keeps this in sync if the user resizes the window.
   */
  const [lineLength, setLineLength] = useState(600)

  useEffect(() => {
    const el = timelineRef.current
    if (!el) return
    setLineLength(el.offsetHeight)
    const ro = new ResizeObserver(() => setLineLength(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /*
   * Scroll progress that drives both the line scaleY and the indicator position.
   * offset: ['start 0.85', 'end 0.4']
   *   – 0: section top enters from viewport bottom
   *   – 1: section bottom is at 40% viewport height
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.4'],
  })

  // Line grows from 0% → 100% height (origin-top)
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Glowing indicator travels from top-2 (8px) to bottom of container minus 8px
  const indicatorY = useTransform(scrollYProgress, [0, 1], [8, lineLength - 8])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden"
      aria-label="Skills section"
    >
      {/*
       * Ferrofluid background — rendered via WebGL (ogl), transparent canvas.
       * mix-blend-mode: screen → only adds light, never darkens the dark bg.
       * pointer-events: none → never intercepts clicks/hovers on the content.
       * Opacity kept low (0.55) so the fluid glows subtly without overpowering
       * the text or the timeline.
       */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <Ferrofluid
          colors={['#c4b5fd', '#818cf8', '#6366f1']}
          speed={0.28}
          scale={1.9}
          turbulence={0.75}
          fluidity={0.12}
          rimWidth={0.22}
          sharpness={2.2}
          shimmer={1.2}
          glow={1.8}
          flowDirection="down"
          opacity={0.38}
          mouseInteraction={false}
          mixBlendMode="screen"
        />
      </div>
      {/*
       * pt-12 md:pt-16: reduced top padding to close the gap with the About section.
       * About's pb was also reduced (pb-28 → pb-10) for a combined tighter transition.
       */}
      <div className="container-content relative z-10 pt-12 pb-24 md:pt-16 md:pb-32">

        {/* ── Section header ── */}
        <motion.div
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-16"
        >
          <motion.p variants={fadeInUp} className="section-label">
            Skills
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight"
          >
            What I work with
          </motion.h2>
        </motion.div>

        {/* ── Timeline + Categories ── */}
        <div ref={timelineRef} className="relative">

          {/* Background line (full height, md+) */}
          <div
            className="absolute left-0 top-2 bottom-2 w-[1px] bg-[#1e1e30] hidden md:block"
            aria-hidden="true"
          />

          {/* Animated progress line (scroll-driven, md+) */}
          <motion.div
            className="absolute left-0 top-2 w-[1px] bg-accent origin-top hidden md:block"
            style={{ scaleY: lineScaleY, height: 'calc(100% - 1rem)' }}
            aria-hidden="true"
          />

          {/*
           * Glowing indicator dot — travels along the timeline as the user scrolls.
           * left-[-5px]: centers the 11px dot on the 1px line at left:0
           *   (offset = -(dotWidth/2 - lineWidth/2) = -(5.5 - 0.5) ≈ -5px)
           * top: driven by indicatorY (px, measured container height)
           */}
          <motion.div
            className="absolute left-[-5px] w-[11px] h-[11px] rounded-full bg-accent hidden md:block"
            style={{
              top: indicatorY,
              zIndex: 20,
              boxShadow: [
                '0 0 0 2px rgba(99,102,241,0.25)',
                '0 0 6px 3px rgba(99,102,241,0.90)',
                '0 0 14px 5px rgba(99,102,241,0.55)',
                '0 0 28px 10px rgba(99,102,241,0.22)',
                '0 0 48px 16px rgba(99,102,241,0.08)',
              ].join(', '),
            }}
            aria-hidden="true"
          />

          {/* Categories */}
          <div className="space-y-14 md:space-y-16">
            {categories.map((cat, index) => (
              <CategoryBlock
                key={cat.id}
                category={cat}
                isLast={index === categories.length - 1}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
