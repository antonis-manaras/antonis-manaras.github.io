
import { getPosts } from '@/lib/posts';
import Link from 'next/link';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';

type Props = {
  params: { tag: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  // Capitalize first letter for display
  const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  return {
    title: `Posts containing "${displayTag}"`,
    description: `A collection of posts containing the tag ${displayTag}.`,
  };
}

export default function TagPage({ params }: Props) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag).toLowerCase();
  const allPosts = getPosts();

  const posts = allPosts.filter(post =>
    (post.categories || []).map(c => c.toLowerCase()).includes(decodedTag)
  );

  const displayTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline mb-10">
        Posts containing: <span className="text-accent">{displayTag}</span>
      </h1>

      {posts.length > 0 ? (
        <ul className="divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug} className="py-5">
              <article className="flex flex-col sm:flex-row justify-between sm:items-baseline w-full gap-4">
                <div>
                  <Link href={`/posts/${post.slug}`} className="block">
                    <h2 className="text-xl font-bold font-headline hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                   <div className="mt-2 text-sm text-muted-foreground">
                    <time dateTime={post.date}>{format(new Date(post.date), 'MMM d, yyyy')}</time>
                    <span className="mx-2">&middot;</span>
                    <span>by {post.author}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 items-start">
                  {post.categories.map(category => (
                     <Badge key={category} variant={category.toLowerCase() === decodedTag ? 'default' : 'secondary'} className="cursor-default">
                        {category}
                    </Badge>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-muted-foreground">No posts found with this tag.</p>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getPosts();
  const allTags = new Set<string>();
  posts.forEach(post => {
    (post.categories || []).forEach(category => {
      allTags.add(category.toLowerCase());
    });
  });

  return Array.from(allTags).map(tag => ({
    tag: encodeURIComponent(tag),
  }));
}
