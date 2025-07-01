import { getPosts } from '@/lib/posts';
import Link from 'next/link';
import { format } from 'date-fns';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const posts = getPosts();

  const tagCounts = posts.reduce((acc, post) => {
    (post.categories || []).forEach(category => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
      <div className="lg:col-span-3">
        <div className="flex items-center justify-center text-center md:text-left md:justify-start gap-6 mb-12">
          <Image
            src="https://placehold.co/100x100.png"
            alt="Blog logo"
            width={100}
            height={100}
            className="rounded-full"
            data-ai-hint="logo abstract"
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">Welcome to Your Blog</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">A clean, minimalist blog template for the modern web.</p>
          </div>
        </div>

        <div>
          <ul className="divide-y divide-border">
            {posts.map((post) => (
              <li key={post.slug} className="py-5">
                <article className="flex justify-between items-baseline w-full gap-4">
                  <div>
                    <Link href={`/posts/${post.slug}`} className="block">
                      <h2 className="text-xl font-bold font-headline hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                  </div>
                  <div className="text-sm text-muted-foreground text-right shrink-0">
                    <time dateTime={post.date}>{format(new Date(post.date), 'MMM d, yyyy')}</time>
                    <span className="block text-xs mt-1">by {post.author}</span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="lg:col-span-1 pt-2">
        <div className="sticky top-20">
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sortedTags.map(([tag, count]) => (
                   <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm font-medium">
                    {tag} ({count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
}
