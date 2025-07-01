import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About This Template',
  description: 'Learn more about this blog template.',
};

export default function AboutPage() {
  return (
    <div>
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">About This Template</h1>
      </header>
      <div className="space-y-6 text-lg text-foreground/90 leading-relaxed">
        <div className="flex justify-center">
          <Image
            src="https://placehold.co/400x400.png"
            alt="Author or blog logo"
            width={400}
            height={400}
            className="rounded-full shadow-md"
            data-ai-hint="logo abstract"
          />
        </div>
        <div className="max-w-prose mx-auto space-y-6">
          <p>
            Welcome! This is a clean, minimal, and performant blog template built with Next.js, Tailwind CSS, and ShadCN UI. It's designed to be a perfect starting point for your personal or professional blog.
          </p>
          <p>
            The design philosophy is simple: content is king, and the user experience should be seamless and fast. It leverages static site generation to deliver content at lightning speed.
          </p>
          <p>
           To get started, you can edit this page, modify the header and footer, and start adding your own content as Markdown files in the `/content/posts` directory. Each new `.md` file you push to your repository will automatically become a new blog post.
          </p>
          <p>
            Thank you for using this template. We're excited to see what you'll create and share with the community.
          </p>
        </div>
      </div>
    </div>
  );
}
