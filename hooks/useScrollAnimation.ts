'use client'
import { useEffect, useRef } from 'react'

export function useScrollAnimation(threshold: number = 0.15) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    // Observe the element itself and any children with fade-in-up class
    const targets = el.querySelectorAll('.fade-in-up')
    if (targets.length > 0) {
      targets.forEach((t) => observer.observe(t))
    } else {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [threshold])

  return ref
}

export function useScrollAnimationMultiple(threshold: number = 0.1) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    const targets = el.querySelectorAll('.fade-in-up')
    targets.forEach((t, i) => {
      // Stagger delay via inline style
      ;(t as HTMLElement).style.transitionDelay = `${i * 0.1}s`
      observer.observe(t)
    })

    return () => observer.disconnect()
  }, [threshold])

  return ref
}
