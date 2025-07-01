import { getPosts } from '@/lib/posts';
import Link from 'next/link';
import { format } from 'date-fns';
import Image from 'next/image';

export default function Home() {
  const posts = getPosts();

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-center gap-6">
        <Image
          src="https://placehold.co/100x100.png"
          alt="Blog logo"
          width={100}
          height={100}
          className="rounded-full"
          data-ai-hint="logo abstract"
        />
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">Welcome to Your Blog</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">A clean, minimalist blog template for the modern web.</p>
        </div>
      </div>

      <div>
        <ul className="divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug} className="py-4">
              <article className="flex justify-between items-baseline w-full gap-4">
                <div>
                  <Link href={`/posts/${post.slug}`} className="block">
                    <h2 className="text-2xl font-bold font-headline hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                </div>
                <div className="text-sm text-muted-foreground text-right shrink-0">
                  <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
                  <span className="block text-xs">by {post.author}</span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
