import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Glob all images inside src/assets/reviewersImages
const reviewerImages = import.meta.glob('/src/assets/reviewersImages/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG}', { eager: true })

function normalizeName(str) {
  return str.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove special characters
    .replace(/\s+/g, '-')         // replace spaces with single dash
}

function getReviewerImage(name) {
  if (!name) return null
  const normalizedName = normalizeName(name)
  
  // Find key in reviewerImages that matches the normalized name
  const matchKey = Object.keys(reviewerImages).find(key => {
    const filename = key.split('/').pop().split('.').slice(0, -1).join('.')
    return normalizeName(filename) === normalizedName
  })
  
  return matchKey ? reviewerImages[matchKey].default : null
}

function ReviewerAvatar({ name }) {
  const [imgUrl, setImgUrl] = useState(null)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const url = getReviewerImage(name)
    setImgUrl(url)
    setImgError(!url)
  }, [name])

  const firstLetter = name ? name.trim().charAt(0).toUpperCase() : '?'

  if (imgUrl && !imgError) {
    return (
      <div className="testimonial-card__avatar testimonial-card__avatar--image">
        <img
          src={imgUrl}
          alt={name}
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div className="testimonial-card__avatar testimonial-card__avatar--fallback" aria-label={name}>
      {firstLetter}
    </div>
  )
}

function StarRating({ count = 5 }) {
  const fullStars = Math.floor(count)
  const hasHalfStar = count % 1 !== 0
  const totalStars = 5

  return (
    <div className="testimonial-card__stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: totalStars }, (_, i) => {
        if (i < fullStars) {
          return (
            <span key={i} className="testimonial-card__star" aria-hidden="true">
              ★
            </span>
          )
        } else if (i === fullStars && hasHalfStar) {
          return (
            <span key={i} className="testimonial-card__star testimonial-card__star--half" aria-hidden="true">
              ★
            </span>
          )
        } else {
          return (
            <span key={i} className="testimonial-card__star testimonial-card__star--empty" aria-hidden="true">
              ★
            </span>
          )
        }
      })}
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
  const [isExpanded, setIsExpanded] = useState(false)
  const isLong = quote.length > 240

  const body = (
    <>
      <ReviewerAvatar name={author} />

      <div className="testimonial-card__author-info">
        <h3 className="testimonial-card__name">{author}</h3>
        <p className="testimonial-card__platform">{platform}</p>
      </div>

      <div className={`testimonial-card__body-container ${isLong && !isExpanded ? 'testimonial-card__body-container--collapsed' : ''}`}>
        <p className="testimonial-card__body">{quote}</p>
        {isLong && !isExpanded && <div className="testimonial-card__body-fade" />}
      </div>

      {isLong && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsExpanded(!isExpanded)
          }}
          className="testimonial-card__read-more"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}

      <div className="testimonial-card__rating">
        {rating ? <StarRating count={rating} /> : null}
      </div>
    </>
  )

  const className = [
    'testimonial-card',
    layout === 'horizontal' ? 'testimonial-card--horizontal' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (!animated) {
    return (
      <article className={className} onMouseLeave={() => setIsExpanded(false)}>
        {body}
      </article>
    )
  }

  return (
    <motion.article
      className={className}
      variants={variants}
      onMouseLeave={() => setIsExpanded(false)}
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
