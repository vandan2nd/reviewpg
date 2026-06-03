export const testimonials = [
  {
    id: 'combined_001',
    quote:
      'Velocity actually surprised me. I just typed my usual messy prompt, and it refined it into something so much clearer. The AI outputs I get now are way more accurate and usable it genuinely levels up the results.',
    author: 'Rahul Thokal',
    rating: 5,
    platform: 'Product Hunt',
  },
  {
    id: 'combined_002',
    quote:
      'Velocity Co-Pilot significantly streamlines workflows by generating optimized, context-aware prompts, reducing the time spent on manual prompt crafting and enhancing overall efficiency in task execution.',
    author: 'Dhanesh Gore',
    rating: 5,
    platform: 'Product Hunt',
  },
  {
    id: 'combined_007',
    quote:
      '"Grammarly for prompting" is the perfect analogy — this looks incredibly useful for anyone serious about AI productivity. The one-click optimization for 20+ models is a killer feature.',
    author: 'Agbaje Olajide',
    rating: 5,
    platform: 'Product Hunt',
  },
  {
    id: 'combined_011',
    quote: 'This is amazing!!! So many usecases for this. Love what you guys are building!',
    author: 'Sohazur',
    rating: 5,
    platform: 'Product Hunt',
  },
  {
    id: 'combined_014',
    quote:
      'I was skeptical about using another prompt enhancer at first. Velocity changes that narrative — this has saved 30% of my time. LLMs no longer require constant fight to understand context deeply. I would recommend everyone to use this for increasing your productivity.',
    author: 'Siddhant',
    rating: 5,
    platform: 'Product Hunt',
  },
  {
    id: 'combined_018',
    quote: 'Much required product. I love it',
    author: 'Gaayathri Murugan',
    rating: 5,
    platform: 'Product Hunt',
  },
  {
    id: 'combined_019',
    quote:
      'This tool has truly made a difference in how I work with AI. It helps me express my ideas more clearly and get the results I\'m looking for, especially with my college projects.',
    author: 'Vaishnavi Parab',
    rating: 5,
    platform: 'Chrome Web Store',
  },
  {
    id: 'combined_020',
    quote: 'The enhanced prompts make a lot of difference!! Definitely recommended 🎯',
    author: 'Rini Pillai',
    rating: 5,
    platform: 'Chrome Web Store',
  },
  {
    id: 'combined_021',
    quote:
      'So amazing, I am a vibe coder. Ever since Velocity entered my life, I have started coding in all languages and have built so much for myself. Thank you for this super creation. Love it',
    author: 'Ashutossh',
    rating: 5,
    platform: 'Chrome Web Store',
  },
  {
    id: 'combined_023',
    quote:
      'Significant productivity improvement — reduced average prompts from 6 to 2, works with ChatGPT and Claude. First prompt often delivers desired output. Highly recommended for LLM users.',
    author: 'Javed Akhtar',
    rating: 5,
    platform: 'Chrome Web Store',
  },
  {
    id: 'combined_024',
    quote:
      'Game-changer for AI users — works across ChatGPT, Gemini, Lovable, Bolt. Like Grammarly for prompts — saves time and tokens. Perfect for anyone using AI daily.',
    author: 'Muhammad Rizwan',
    rating: 5,
    platform: 'Chrome Web Store',
  },
  {
    id: 'combined_025',
    quote: 'Simplifies the process a lot',
    author: 'Parth Yadav',
    rating: 5,
    platform: 'Chrome Web Store',
  },
]

export const productHuntTestimonials = testimonials.filter(
  (t) => t.platform === 'Product Hunt',
)

export const chromeWebStoreTestimonials = testimonials.filter(
  (t) => t.platform === 'Chrome Web Store',
)

export const sectionCopy = {
  label: '| TESTIMONIALS',
  headingLines: ['Trusted by', 'people', 'building smarter', 'with AI'],
  highlight: 'building smarter',
  description:
    'Velocity helps builders craft sharper AI prompts in seconds so you spend less time iterating and more time shipping what matters.',
  stats: [
    { value: '50K+', label: 'PROMPTS GENERATED' },
    { value: '5K+', label: 'ACTIVE USERS' },
  ],
}
