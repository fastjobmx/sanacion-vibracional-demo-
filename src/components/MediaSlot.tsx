import { useEffect, useRef, type ReactNode } from 'react'
import { media, type MediaSource } from '../data/media'
import { reducedMotion } from '../lib/motion'

/** Solo reproduce mientras está en pantalla; con movimiento reducido queda el póster. */
function LoopVideo({ source, className }: { source: MediaSource; className: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current
    if (!video || reducedMotion()) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      src={source.src}
      poster={source.poster}
      aria-label={source.alt}
      preload="none"
      muted
      loop
      playsInline
    />
  )
}

/** Muestra el archivo definitivo si está registrado en data/media.ts; si no, el arte provisional. */
export function MediaSlot({ name, fallback, className = '' }: { name: string; fallback: ReactNode; className?: string }) {
  const source = media[name]
  if (!source) return <>{fallback}</>
  if (source.type === 'video') return <LoopVideo source={source} className={className} />
  return <img className={`h-full w-full object-cover ${className}`} src={source.src} alt={source.alt} loading="lazy" />
}
