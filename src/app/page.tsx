import { getPosts } from '@/lib/posts';
import Link from 'next/link';
import { format } from 'date-fns';

export default function Home() {
  const posts = getPosts();

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">Welcome to Astrotype</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">A clean, minimalist blog template for the modern web.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <ul className="divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug} className="py-8">
              <article className="space-y-2">
                <Link href={`/posts/${post.slug}`} className="block">
                  <h2 className="text-3xl font-bold font-headline hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <div className="text-sm text-muted-foreground">
                  <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span> by <span>{post.author}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed pt-2">{post.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
