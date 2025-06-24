import { getPosts } from '@/lib/posts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const posts = getPosts();

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">Welcome to Astrotype</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">A clean, minimalist blog template for the modern web.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                <Link href={`/posts/${post.slug}`} className="hover:text-accent transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription>
                <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span> by <span>{post.author}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
               <div className="flex flex-wrap gap-2">
                {post.categories.map(category => (
                  <Badge key={category} variant="secondary">{category}</Badge>
                ))}
              </div>
              <Link href={`/posts/${post.slug}`} className="flex items-center text-accent hover:underline">
                Read more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
