import { motion } from 'framer-motion'

function StarRating({ count = 5 }) {
  return (
    <div className="testimonial-card__stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="testimonial-card__star" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  )
}

export default function TestimonialCard({
  testimonial,
  variants,
  animated = true,
  layout = 'vertical',
}) {
  const { author, quote, rating, platform } = testimonial

  const body = (
    <>
      {rating ? <StarRating count={rating} /> : null}

      <p className="testimonial-card__body">{quote}</p>

      <footer className="testimonial-card__footer">
        <h3 className="testimonial-card__name">{author}</h3>
        <p className="testimonial-card__platform">{platform}</p>
      </footer>
    </>
  )

  const className = [
    'testimonial-card',
    layout === 'horizontal' ? 'testimonial-card--horizontal' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (!animated) {
    return <article className={className}>{body}</article>
  }

  return (
    <motion.article
      className={className}
      variants={variants}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {body}
    </motion.article>
  )
}
