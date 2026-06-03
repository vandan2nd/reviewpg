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

export default function TestimonialCard({ testimonial, variants }) {
  const { name, role, content, rating, tags } = testimonial

  return (
    <motion.article
      className="testimonial-card"
      variants={variants}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <header className="testimonial-card__header">
        <h3 className="testimonial-card__name">{name}</h3>
        <p className="testimonial-card__role">{role}</p>
      </header>

      {rating ? <StarRating count={rating} /> : null}

      <p className="testimonial-card__body">{content}</p>

      {tags?.length ? (
        <footer className="testimonial-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="testimonial-card__tag">
              {tag}
            </span>
          ))}
        </footer>
      ) : null}
    </motion.article>
  )
}
