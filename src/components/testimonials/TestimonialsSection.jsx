import { motion } from 'framer-motion'
import TestimonialMarqueeStrip from './TestimonialMarqueeStrip'
import {
  testimonials,
  productHuntTestimonials,
  chromeWebStoreTestimonials,
  sectionCopy,
} from './testimonials'
import logoUrl from '../../assets/Logo.png'
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

export default function TestimonialsSection() {
  const { headingLines, highlight, description, stats } = sectionCopy

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
          <motion.div className="testimonials-section__brand" variants={fadeUp}>
            <img src={logoUrl} alt="Velocity Logo" className="testimonials-section__logo" />
            <span className="testimonials-section__brand-name">Velocity</span>
          </motion.div>

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
          <div className="testimonials-section__marquee testimonials-section__marquee--desktop">
            <TestimonialMarqueeStrip
              items={productHuntTestimonials}
              direction="up"
              duration={75}
              label="Product Hunt reviews"
            />
            <TestimonialMarqueeStrip
              items={chromeWebStoreTestimonials}
              direction="down"
              duration={80}
              label="Chrome Web Store reviews"
            />
          </div>

          <div className="testimonials-section__marquee testimonials-section__marquee--mobile">
            <TestimonialMarqueeStrip
              items={testimonials}
              axis="horizontal"
              direction="left"
              duration={55}
              label="Customer reviews"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
