import TestimonialCard from './TestimonialCard'

export default function TestimonialMarqueeStrip({
  items,
  direction = 'up',
  duration = 38,
}) {
  const loop = [...items, ...items]

  return (
    <div
      className="testimonial-marquee"
      aria-hidden={items.length === 0}
    >
      <div
        className={`testimonial-marquee__track testimonial-marquee__track--${direction}`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {loop.map((item, index) => (
          <TestimonialCard
            key={`${item.id}-${index}`}
            testimonial={item}
            animated={false}
          />
        ))}
      </div>
    </div>
  )
}
