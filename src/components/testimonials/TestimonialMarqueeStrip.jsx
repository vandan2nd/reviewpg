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

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return undefined
    return blockScroll(el)
  }, [])

  if (!items.length) return null

  const loop = [...items, ...items]
  const isVertical = axis === 'vertical'
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

  return (
    <div className={marqueeClass} aria-label={label}>
      <div className="testimonial-marquee__fade testimonial-marquee__fade--start" aria-hidden="true" />
      <div className="testimonial-marquee__fade testimonial-marquee__fade--end" aria-hidden="true" />

      <div ref={viewportRef} className="testimonial-marquee__viewport">
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
