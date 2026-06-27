import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import BorderGlow from './BorderGlow';

const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
  onMouseEnterCard,
  onMouseLeaveCard
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
    if (onMouseLeaveCard) onMouseLeaveCard();
  };

  const handleCardMove = e => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full flex flex-col md:flex-row justify-center items-stretch gap-8 ${className}`}
      style={{
        '--r': `${radius}px`,
        '--x': '50%',
        '--y': '50%'
      }}
    >
      {items.map((c, i) => (
        <article
          key={c.id || i}
          onMouseMove={handleCardMove}
          onMouseEnter={() => onMouseEnterCard?.(c)}
          onMouseLeave={onMouseLeaveCard}
          className="group relative flex flex-col justify-between p-7 md:p-9 w-full md:w-[460px] rounded-[20px] overflow-hidden border border-white/[0.08] transition-colors duration-300 bg-[#0c0c18] hover:border-accent/30 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.08)]"
          style={{
            '--card-border': c.borderColor || 'transparent',
            background: c.gradient || '#0c0c18',
            '--spotlight-color': 'rgba(255,255,255,0.12)'
          }}
        >
          {/* Spotlight overlay effect on hover inside the card */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
            }}
          />

          {/* Card Content wrapper (relative z-10 to stay above spotlight) */}
          <div className="relative z-10 flex flex-col justify-between h-full flex-1 pointer-events-auto">
            {/* Header: Title + Subtitle + Completed badge */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight transition-colors duration-200 group-hover:text-accent">
                    {c.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 font-semibold tracking-wide uppercase">
                    {c.subtitle}
                  </p>
                </div>
                <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-[0.7rem] font-bold tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  {c.status}
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {c.description}
              </p>
            </div>

            <div>
              {/* Divider */}
              <div className="border-t border-[#1a1a28] mb-5" aria-hidden="true" />

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {c.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md text-text-secondary border border-white/[0.05] bg-white/[0.02]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* GitHub Link wrapped in BorderGlow for premium hover */}
              <div className="w-fit">
                <BorderGlow
                  borderRadius={8}
                  backgroundColor="#0d0d1c"
                  glowColor="239 84 67"
                  colors={['#818cf8', '#6366f1', '#4f46e5']}
                  glowRadius={14}
                  glowIntensity={0.65}
                  edgeSensitivity={30}
                  coneSpread={22}
                >
                  <a
                    href={c.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors duration-200"
                    aria-label={`View ${c.title} source code on GitHub`}
                  >
                    <FaGithub size={14} />
                    GitHub
                    <ArrowUpRight size={12} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </BorderGlow>
              </div>
            </div>
          </div>
        </article>
      ))}

      {/* GSAP flashlight backdrop overlays */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-30"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          opacity: 1
        }}
      />
    </div>
  );
};

export default ChromaGrid;
