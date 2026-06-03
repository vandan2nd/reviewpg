import { useMemo } from 'react'
import { motion } from 'framer-motion'
import TestimonialCard from './TestimonialCard'
import { testimonials, sectionCopy } from './testimonials'
import './TestimonialsSection.css'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function splitIntoColumns(items) {
  const left = []
  const right = []
  items.forEach((item, index) => {
    if (index % 2 === 0) left.push(item)
    else right.push(item)
  })
  return { left, right }
}

export default function TestimonialsSection() {
  const { left, right } = useMemo(() => splitIntoColumns(testimonials), [])

  const { label, headingLines, highlight, description, stats } = sectionCopy

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="testimonials-section__glow" aria-hidden="true" />
      <div className="testimonials-section__vignette" aria-hidden="true" />

      <div className="testimonials-section__inner">
        <motion.div
          className="testimonials-section__content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <motion.p className="testimonials-section__label" variants={fadeUp}>
            {label}
          </motion.p>

          <motion.h2
            id="testimonials-heading"
            className="testimonials-section__heading"
            variants={fadeUp}
          >
            {headingLines.map((line) => (
              <span key={line} className="testimonials-section__heading-line">
                {line === highlight ? (
                  <span className="testimonials-section__highlight">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h2>

          <motion.p className="testimonials-section__description" variants={fadeUp}>
            {description}
          </motion.p>

          <motion.div className="testimonials-section__stats" variants={fadeUp}>
            {stats.map((stat) => (
              <div key={stat.label} className="testimonials-section__stat">
                <p className="testimonials-section__stat-value">{stat.value}</p>
                <p className="testimonials-section__stat-label">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="testimonials-section__cards"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <div className="testimonials-section__grid testimonials-section__grid--desktop">
            <div className="testimonials-section__column">
              {left.map((item) => (
                <TestimonialCard
                  key={item.id}
                  testimonial={item}
                  variants={cardVariant}
                />
              ))}
            </div>
            <div className="testimonials-section__column">
              {right.map((item) => (
                <TestimonialCard
                  key={item.id}
                  testimonial={item}
                  variants={cardVariant}
                />
              ))}
            </div>
          </div>

          <div className="testimonials-section__stack testimonials-section__stack--mobile">
            {testimonials.map((item) => (
              <TestimonialCard
                key={`mobile-${item.id}`}
                testimonial={item}
                variants={cardVariant}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
