import { useEffect, useRef } from 'react'
import TestimonialCard from './TestimonialCard'

const VERTICAL_DIRECTIONS = ['up', 'down']
const HORIZONTAL_DIRECTIONS = ['left', 'right']

function blockScroll(el) {
  const stop = (e) => e.preventDefault()
  el.addEventListener('wheel', stop, { passive: false })
  el.addEventListener('touchmove', stop, { passive: false })
  return () => {
    el.removeEventListener('wheel', stop)
    el.removeEventListener('touchmove', stop)
  }
}

export default function TestimonialMarqueeStrip({
  items,
  direction = 'up',
  duration = 38,
  axis = 'vertical',
  label,
}) {
  const viewportRef = useRef(null)
  const isInteractingRef = useRef(false)
  const timeoutRef = useRef(null)

  const isVertical = axis === 'vertical'

  useEffect(() => {
    const el = viewportRef.current
    if (!el || !isVertical) return undefined
    return blockScroll(el)
  }, [isVertical])

  // Auto-scroll loop for horizontal axis
  useEffect(() => {
    const el = viewportRef.current
    if (!el || isVertical) return

    let animationFrameId
    let lastTime = performance.now()
    const speed = 35 // pixels per second

    const scrollLoop = (time) => {
      if (viewportRef.current && !isInteractingRef.current) {
        const delta = (time - lastTime) / 1000
        viewportRef.current.scrollLeft += speed * delta
      }
      lastTime = time
      animationFrameId = requestAnimationFrame(scrollLoop)
    }

    animationFrameId = requestAnimationFrame(scrollLoop)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isVertical])

  if (!items.length) return null

  const loop = [...items, ...items]
  const validDirection = isVertical
    ? VERTICAL_DIRECTIONS.includes(direction)
      ? direction
      : 'up'
    : HORIZONTAL_DIRECTIONS.includes(direction)
      ? direction
      : 'left'

  const trackClass = [
    'testimonial-marquee__track',
    isVertical
      ? `testimonial-marquee__track--${validDirection}`
      : `testimonial-marquee__track--h-${validDirection}`,
  ].join(' ')

  const marqueeClass = [
    'testimonial-marquee',
    isVertical ? 'testimonial-marquee--vertical' : 'testimonial-marquee--horizontal',
  ].join(' ')

  const startInteraction = () => {
    isInteractingRef.current = true
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const endInteraction = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false
    }, 2500) // resume auto-scroll after 2.5s of inactivity
  }

  const handleScroll = () => {
    const container = viewportRef.current
    if (!container || isVertical) return

    const maxScroll = container.scrollWidth / 2
    if (container.scrollLeft >= maxScroll) {
      container.scrollLeft -= maxScroll
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += maxScroll
    }
  }

  // Mouse drag-to-scroll implementation for horizontal mode
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  const handleMouseDown = (e) => {
    if (isVertical) return
    const container = viewportRef.current
    if (!container) return

    startInteraction()
    isDraggingRef.current = true
    startXRef.current = e.pageX - container.offsetLeft
    scrollLeftRef.current = container.scrollLeft
    
    container.style.cursor = 'grabbing'
    document.body.style.userSelect = 'none'
  }

  const handleMouseMove = (e) => {
    if (isVertical || !isDraggingRef.current) return
    const container = viewportRef.current
    if (!container) return

    e.preventDefault()
    const x = e.pageX - container.offsetLeft
    const walk = (x - startXRef.current) * 1.5 // multiplier for drag sensitivity
    container.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUpOrLeave = () => {
    if (isVertical) return
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      const container = viewportRef.current
      if (container) {
        container.style.cursor = 'grab'
      }
      document.body.style.userSelect = ''
      endInteraction()
    }
  }

  return (
    <div className={marqueeClass} aria-label={label}>
      <div className="testimonial-marquee__fade testimonial-marquee__fade--start" aria-hidden="true" />
      <div className="testimonial-marquee__fade testimonial-marquee__fade--end" aria-hidden="true" />

      <div
        ref={viewportRef}
        className={marqueeClass === 'testimonial-marquee testimonial-marquee--horizontal' ? 'testimonial-marquee__viewport testimonial-marquee__viewport--horizontal' : 'testimonial-marquee__viewport'}
        onScroll={handleScroll}
        onTouchStart={startInteraction}
        onTouchEnd={endInteraction}
        onTouchCancel={endInteraction}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onWheel={() => {
          startInteraction()
          endInteraction()
        }}
      >
        <div
          className={trackClass}
          style={{ '--marquee-duration': `${duration}s` }}
        >
          {loop.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="testimonial-marquee__item"
              aria-hidden={index >= items.length}
            >
              <TestimonialCard
                testimonial={item}
                animated={false}
                layout={isVertical ? 'vertical' : 'horizontal'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
