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
      'I was skeptical about using another prompt enhancer at first, I though perhaps LLMs are smart enough to understand the query and return most relevant result. Velocity changes that narrative, and shows just how incredibly beneficial and productive a prompt enhancing tool can be - this has saved 30% of my time. LLMs no longer require constant fight ton understand context deeply- rather in one shot prompt I achieved more result than I would after 10 prompts. Anyone that uses Claude - knows how quickly tokens burn out - explaining context and solving issues fast ahs never been easier. I would recommend everyone to use this for increasing your productivity.',
    author: 'Siddhant',
    rating: 5,
    platform: 'Product Hunt',
  },
  {
    id: 'combined_018',
    quote: 'Much required product. I love it',
    author: 'Gaayathri Murugan',
    rating: 4.5,
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
  {
    id: 'combined_026',
    quote:
      "Smart move, this is the sort of platform which is only going to become more & more consistently used as AI expands to the general population!!\n\nIt's key that people learn these shortcuts & I think you've created a great platform to help them!\n\nGood luck w/ the launch Aakash & team :)",
    author: 'Sam @CRANQ',
    rating: 5,
    platform: 'Product Hunt',
  },
  {
    id: 'combined_027',
    quote:
      'there you go! finally someone released a product that will cancel all these digital notion bundles with ,,100000 prompts for ChatGPT" :D',
    author: 'Valentine Sisman',
    rating: 5,
    platform: 'Product Hunt',
  },
  {
    id: 'combined_028',
    quote: 'I think this one will help me a lot.im intrested to be your beta user',
    author: 'Yeganeh Nikzad',
    rating: 5,
    platform: 'Product Hunt',
  },
  {
    id: 'combined_029',
    quote:
      "The ability to refine and enhance prompts for multiple LLMs with just one click is a huge productivity boost. It’s exciting to see tools that make AI interactions more intuitive and efficient. Can't wait to explore its potential—congrats on the launch! 🎉",
    author: 'Junghwan Seo',
    rating: 5,
    platform: 'Product Hunt',
  },
  {
    id: 'combined_030',
    quote:
      "I love Velocity! Even if you're not fluent in English, just provide key keywords, and it effortlessly transforms them into a well-phrased prompt. For example, if you type 'ReactJS login form, registration form, dashboards, authentication,' Velocity enhances it to 'How can I create a login form in ReactJS with validation?', 'How do I build a user registration form in ReactJS with form handling?', 'What are the best practices for creating dashboards in ReactJS?', and 'How do I implement authentication in a ReactJS application using JWT or Firebase?'. It's truly a game-changer for developers! 🚀✨I think not only for Developers it also a game changer for other professional to.",
    author: 'BAN STONE',
    rating: 5,
    platform: 'Product Hunt',
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
