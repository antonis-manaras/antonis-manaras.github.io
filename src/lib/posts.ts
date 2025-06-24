export interface Post {
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  categories: string[];
}

const posts: Post[] = [
  {
    title: 'The Journey into Static Generation',
    slug: 'journey-into-static-generation',
    date: '2024-05-15',
    author: 'Alex Doe',
    excerpt: 'Exploring the benefits of static site generators and how they are changing web development.',
    content: `<p>Static site generators (SSGs) have revolutionized the way we think about building websites. By pre-rendering pages at build time, they offer incredible performance, enhanced security, and a simplified developer experience. In this post, we'll dive deep into what makes SSGs like Next.js and Astro so powerful.</p>
    <h2 class="text-2xl font-bold my-4 font-headline">Performance Benefits</h2>
    <p>Because the HTML is generated ahead of time, there's no need for server-side processing per request. This means your pages are served instantly from a CDN, providing a lightning-fast experience for your users. This is crucial for user retention and SEO.</p>
    <h2 class="text-2xl font-bold my-4 font-headline">Security and Scalability</h2>
    <p>With no database or complex server-side logic to worry about on the front-end, the attack surface for malicious actors is significantly reduced. Static sites are also incredibly easy to scale. Since they are just a collection of files, they can be served globally on any CDN with minimal configuration.</p>`,
    categories: ['Web Development', 'Performance', 'Next.js'],
  },
  {
    title: 'Designing with Minimalism in Mind',
    slug: 'designing-with-minimalism',
    date: '2024-06-02',
    author: 'Jane Smith',
    excerpt: 'How minimalist design principles can lead to more effective and user-friendly websites.',
    content: `<p>Minimalism isn't just about using less; it's about making what you use more impactful. In web design, this translates to clean layouts, generous white space, and a focus on content. The Zaggonaut theme is a perfect example of this philosophy in action.</p>
    <h2 class="text-2xl font-bold my-4 font-headline">Focus on Readability</h2>
    <p>A key tenet of minimalist design is ensuring that the content is king. By removing unnecessary visual clutter, we allow users to focus on what matters most: the information they came for. This means choosing readable fonts, like 'Exo 2', and ensuring high contrast between text and background.</p>
    <h2 class="text-2xl font-bold my-4 font-headline">The Role of Color</h2>
    <p>Color is used intentionally in minimalist design. A neutral background like off-white provides a calm canvas, while a strong primary color like black for text ensures clarity. An accent color, like a soft green or blue, can be used to draw attention to key actions and links without overwhelming the user.</p>`,
    categories: ['UI/UX', 'Design', 'Minimalism'],
  },
  {
    title: 'AI in Content Creation: A New Frontier',
    slug: 'ai-in-content-creation',
    date: '2024-06-20',
    author: 'Sam Wilson',
    excerpt: 'How generative AI is helping creators streamline their workflow, from brainstorming to categorization.',
    content: `<p>Generative AI is no longer a futuristic concept; it's a practical tool that content creators are using today. One of the most interesting applications is in assisting with the editorial process, such as suggesting relevant categories for a blog post.</p>
    <h2 class="text-2xl font-bold my-4 font-headline">How AI-Powered Suggestions Work</h2>
    <p>By analyzing the text of a post, AI models can identify key themes, topics, and keywords. They can then match these against a vast knowledge base to suggest categories that are not only relevant but also likely to be searched for by users. This saves creators time and improves the discoverability of their content.</p>
    <h2 class="text-2xl font-bold my-4 font-headline">Beyond Categories</h2>
    <p>The applications don't stop at categorization. AI can help generate titles, write excerpts, check for grammar, and even create entire drafts. As the technology matures, it will become an indispensable partner in the creative process.</p>`,
    categories: ['AI', 'Content Strategy', 'Technology'],
  },
];

export function getPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}
