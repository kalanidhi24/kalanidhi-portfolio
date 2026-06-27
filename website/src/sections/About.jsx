import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, GraduationCap, Briefcase, ArrowUpRight } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportOnce } from '../utils/animations'
import TiltedCard from '../components/reactbits/TiltedCard'

const infoItems = [
  { icon: GraduationCap, label: 'IT Undergrad, DBIT Mumbai' },
  { icon: MapPin,         label: 'Mumbai, India' },
  { icon: Briefcase,      label: 'Open to internships' },
]

export default function About() {
  const sectionRef = useRef(null)

  /*
   * Track the About section entering the viewport.
   *
   * offset: ['start end', 'start 0.65']
   *   – scrollYProgress = 0: section top hits viewport bottom
   *     (occurs at page load when Hero = 100vh and About is in normal flow)
   *   – scrollYProgress = 1: section top reaches 65% down from viewport top
   *     (roughly 35% of viewport height of scrolling drives the full animation)
   *
   * This means at page load the card is below the fold (opacity 0, y +80).
   * As the user scrolls, the card fades in and slides upward, landing
   * 100px above its natural layout position — creating the Hero overlap.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.65'],
  })

  // Card enters from 80px below, rises to 100px above its layout position.
  // Layout position of About section = Hero height (100vh), so final card
  // visual top = 100vh − 100px → ~100px overlap with Hero bottom.
  const cardY       = useTransform(scrollYProgress, [0, 1], [80, -100])
  // Fade in over the first 25% of scroll progress.
  const cardOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])

  return (
    /*
     * NO negative marginTop — the section sits in normal document flow
     * directly after the Hero (100vh). The overlap is achieved purely via
     * the scroll-driven cardY transform above.
     *
     * z-10 keeps the card above Hero content when the two visually overlap.
     */
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10"
      aria-label="About section"
    >
      <div className="container-content pb-10">

        {/* Card — scroll-driven entrance, overlaps Hero by ~100px at rest */}
        <motion.div
          style={{ y: cardY, opacity: cardOpacity }}
          className="relative rounded-2xl border border-[#1e1e30] bg-[#0e0e1a] overflow-visible shadow-[0_-12px_60px_rgba(0,0,0,0.6),0_24px_64px_rgba(0,0,0,0.4)]"
        >
          {/* Top indigo accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
            style={{ background: 'linear-gradient(90deg, transparent, #6366f1, transparent)' }}
            aria-hidden="true"
          />

          <div className="p-8 md:p-12 lg:p-16">
            <div className="flex flex-col md:flex-row gap-10 md:gap-14 lg:gap-20 items-start">

              {/* ── Left column: TiltedCard + quick info ── */}
              {/* pt-0 md:pt-10 aligns image with the "Who I am" heading on desktop */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="flex flex-col items-center md:items-start gap-6 flex-shrink-0 w-full md:w-auto pt-0 md:pt-10"
              >
                {/* ReactBits TiltedCard */}
                <motion.div variants={fadeInUp} className="w-full flex justify-center md:justify-start">
                  <div className="scale-[0.82] xs:scale-90 sm:scale-100 origin-top">
                    <TiltedCard
                      imageSrc="/profile.png"
                      altText="Kalanidhi Namboothiri — profile photo"
                      captionText="Kalanidhi Namboothiri"
                      containerHeight="390px"
                      containerWidth="300px"
                      imageHeight="370px"
                      imageWidth="300px"
                      scaleOnHover={1.06}
                      rotateAmplitude={12}
                      showMobileWarning={false}
                      showTooltip={false}
                    />
                  </div>
                </motion.div>

                {/* Quick info */}
                <motion.ul
                  variants={staggerContainer}
                  className="flex flex-col gap-2.5"
                  aria-label="Quick information"
                >
                  {infoItems.map(({ icon: Icon, label }) => (
                    <motion.li
                      key={label}
                      variants={fadeInUp}
                      className="flex items-center gap-2.5 text-xs text-text-secondary"
                    >
                      <Icon size={13} className="text-accent flex-shrink-0" aria-hidden="true" />
                      <span>{label}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* ── Right column: Bio ── */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="flex-1 min-w-0"
              >
                <motion.p variants={fadeInUp} className="section-label">
                  About Me
                </motion.p>

                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl font-bold text-text-primary mb-6 tracking-tight"
                >
                  Who I am
                </motion.h2>

                <motion.div variants={staggerContainer} className="space-y-4 text-text-secondary leading-relaxed">
                  <motion.p variants={fadeInUp}>
                    I&apos;m{' '}
                    <span className="text-text-primary font-medium">Kalanidhi Namboothiri</span>,
                    an Information Technology undergraduate at Don Bosco Institute of Technology, Mumbai,
                    currently exploring backend development, AI applications, and modern web technologies
                    by building projects that solve practical problems.
                  </motion.p>

                  <motion.p variants={fadeInUp}>
                    I enjoy understanding how software works behind the scenes — from designing APIs and
                    databases to creating responsive user experiences.
                  </motion.p>

                  <motion.p variants={fadeInUp}>
                    Outside the classroom, I&apos;m actively involved with{' '}
                    <span className="text-text-primary font-medium">CSI-DBIT</span> as an{' '}
                    <span className="text-text-primary font-medium">Assistant Event Head</span>,
                    contributing to organizing technical events, workshops, and competitions.
                  </motion.p>

                  <motion.p variants={fadeInUp}>
                    At this stage of my journey, my focus is simple: learn continuously, build meaningful
                    projects, strengthen my computer science fundamentals, and gain real-world development
                    experience.
                  </motion.p>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-8">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-light transition-colors duration-300 group"
                    aria-label="View full resume (opens in new tab)"
                  >
                    View full resume
                    <ArrowUpRight
                      size={15}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                      aria-hidden="true"
                    />
                  </a>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
