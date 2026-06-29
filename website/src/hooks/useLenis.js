import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const initLenis = () => {
      // Cleanup existing instance if any
      if (lenisRef.current) {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
          rafIdRef.current = null
        }
        lenisRef.current.destroy()
        lenisRef.current = null
      }

      // Initialize Lenis only on screens 768px and wider
      if (window.innerWidth >= 768) {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          smoothTouch: false,
        })

        lenisRef.current = lenis

        const raf = (time) => {
          lenis.raf(time)
          rafIdRef.current = requestAnimationFrame(raf)
        }
        rafIdRef.current = requestAnimationFrame(raf)
      }
    }

    // Run initial setup
    initLenis()

    // Listen to resize events to enable/disable Lenis dynamically
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      // Debounce resize updates to maintain optimal performance
      resizeTimer = setTimeout(() => {
        const isCurrentlyActive = !!lenisRef.current
        const shouldBeActive = window.innerWidth >= 768
        if (isCurrentlyActive !== shouldBeActive) {
          initLenis()
        }
      }, 150)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [])

  return lenisRef
}
