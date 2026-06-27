import { useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { staggerContainer, fadeInUp } from '../utils/animations'
import ChromaGrid from '../components/reactbits/ChromaGrid'

// Import project screenshots directly
import civicLinkImage from '../assets/project-images/civiclink.png'
import rainHarvestImage from '../assets/project-images/rainharvest.png'

// ─── Project data (from content/projects.md) ─────────────────────────────────

const projects = [
  {
    id: 'civiclink',
    title: 'CivicLink',
    subtitle: 'Open Civic Complaint Portal',
    description:
      'A web-based platform that enables citizens to register, track, and manage civic complaints while helping authorities streamline complaint resolution.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
    image: civicLinkImage,
    github: '#',
    status: 'Completed',
    borderColor: '#6366f1',
    gradient: 'linear-gradient(145deg, #1e1b4b, #0c0c18)',
  },
  {
    id: 'rainharvest',
    title: 'RainHarvest',
    subtitle: 'Rainwater Harvesting Estimator',
    description:
      'A MERN-stack application that estimates rainwater harvesting potential, installation costs, and annual savings based on user inputs.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Framer Motion'],
    image: rainHarvestImage,
    github: '#',
    status: 'Completed',
    borderColor: '#4f46e5',
    gradient: 'linear-gradient(145deg, #1b1a3e, #0c0c18)',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const [activeProject, setActiveProject] = useState(null)

  // Motion values to track the cursor relative to the relative section container
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring animations for cursor-following lag effect
  const springConfig = { stiffness: 180, damping: 20, mass: 0.2 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    // Calculate position relative to the section container
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-visible"
      onMouseMove={handleMouseMove}
      aria-label="Projects section"
    >
      <div className="container-content py-24 md:py-32">
        {/* ── Section header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.p variants={fadeInUp} className="section-label">
            Projects
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight"
          >
            What I&apos;ve built
          </motion.h2>
        </motion.div>

        {/* ── Grid Layout (ChromaGrid component wrapping project cards) ── */}
        <div className="max-w-5xl">
          <ChromaGrid
            items={projects}
            radius={320}
            damping={0.4}
            fadeOut={0.5}
            onMouseEnterCard={setActiveProject}
            onMouseLeaveCard={() => setActiveProject(null)}
          />
        </div>
      </div>

      {/* ── Floating Preview Image (follows the cursor relative to the section) ── */}
      <AnimatePresence>
        {activeProject && (
          <motion.img
            src={activeProject.image}
            alt={`${activeProject.title} preview`}
            className="absolute pointer-events-none z-50 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-auto h-auto max-w-[480px] max-h-[300px] hidden md:block"
            style={{
              left: x,
              top: y,
              x: 20, // offset 20px to the right of cursor
              y: '-50%', // vertically centered relative to cursor
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            onError={() => {
              console.error("Failed to load project image. Resolved path:", activeProject.image);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
