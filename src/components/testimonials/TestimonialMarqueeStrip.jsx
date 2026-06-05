import { useEffect, useRef } from 'react'
import TestimonialCard from './TestimonialCard'

const VERTICAL_DIRECTIONS = ['up', 'down']
const HORIZONTAL_DIRECTIONS = ['left', 'right']

export default function TestimonialMarqueeStrip({
  items,
  direction = 'up',
  duration = 38,
  axis = 'vertical',
  label,
}) {
  const viewportRef = useRef(null)
  const isInteractingRef = useRef(false)
  const isHoveredRef = useRef(false)
  const timeoutRef = useRef(null)

  const isVertical = axis === 'vertical'

  // Auto-scroll loop for both vertical and horizontal axes
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    let animationFrameId
    let lastTime = performance.now()
    const speed = isVertical ? 15 : 22 // Reduced speeds to slow down the strips

    const scrollLoop = (time) => {
      const container = viewportRef.current
      if (container && !isInteractingRef.current && !isHoveredRef.current) {
        const delta = (time - lastTime) / 1000
        const scrollAmount = speed * delta

        if (isVertical) {
          const maxScroll = container.scrollHeight / 2
          if (direction === 'down') {
            let nextScroll = container.scrollTop - scrollAmount
            if (nextScroll <= 2) {
              nextScroll += maxScroll
            }
            container.scrollTop = nextScroll
          } else {
            let nextScroll = container.scrollTop + scrollAmount
            if (nextScroll >= maxScroll) {
              nextScroll -= maxScroll
            }
            container.scrollTop = nextScroll
          }
        } else {
          const maxScroll = container.scrollWidth / 2
          if (direction === 'right') {
            let nextScroll = container.scrollLeft - scrollAmount
            if (nextScroll <= 2) {
              nextScroll += maxScroll
            }
            container.scrollLeft = nextScroll
          } else {
            let nextScroll = container.scrollLeft + scrollAmount
            if (nextScroll >= maxScroll) {
              nextScroll -= maxScroll
            }
            container.scrollLeft = nextScroll
          }
        }
      }
      lastTime = time
      animationFrameId = requestAnimationFrame(scrollLoop)
    }

    animationFrameId = requestAnimationFrame(scrollLoop)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isVertical, direction])

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
    if (!container) return

    if (isVertical) {
      const maxScroll = container.scrollHeight / 2
      if (container.scrollTop >= maxScroll) {
        container.scrollTop -= maxScroll
      } else if (container.scrollTop <= 2) {
        container.scrollTop += maxScroll
      }
    } else {
      const maxScroll = container.scrollWidth / 2
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft -= maxScroll
      } else if (container.scrollLeft <= 2) {
        container.scrollLeft += maxScroll
      }
    }
  }

  // Mouse drag-to-scroll implementation
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const scrollTopRef = useRef(0)

  const handleMouseDown = (e) => {
    const container = viewportRef.current
    if (!container) return

    startInteraction()
    isDraggingRef.current = true

    if (isVertical) {
      startYRef.current = e.pageY - container.offsetTop
      scrollTopRef.current = container.scrollTop
    } else {
      startXRef.current = e.pageX - container.offsetLeft
      scrollLeftRef.current = container.scrollLeft
    }
    
    container.style.cursor = 'grabbing'
    document.body.style.userSelect = 'none'
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return
    const container = viewportRef.current
    if (!container) return

    e.preventDefault()
    if (isVertical) {
      const y = e.pageY - container.offsetTop
      const walk = (y - startYRef.current) * 1.5 // drag sensitivity
      container.scrollTop = scrollTopRef.current - walk
    } else {
      const x = e.pageX - container.offsetLeft
      const walk = (x - startXRef.current) * 1.5
      container.scrollLeft = scrollLeftRef.current - walk
    }
  }

  const handleMouseUpOrLeave = () => {
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

  const handleMouseEnter = () => {
    isHoveredRef.current = true
  }

  const handleMouseEnterLeave = () => {
    isHoveredRef.current = false
    handleMouseUpOrLeave()
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
        onMouseLeave={handleMouseEnterLeave}
        onMouseEnter={handleMouseEnter}
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
