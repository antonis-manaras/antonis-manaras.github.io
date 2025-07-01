import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Astrotype',
  description: 'Learn more about the Astrotype blog and its mission.',
};

export default function AboutPage() {
  return (
    <div>
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">About Astrotype</h1>
      </header>
      <div className="space-y-6 text-lg text-foreground/90 leading-relaxed">
        <div className="flex justify-center">
          <Image
            src="https://placehold.co/400x400.png"
            alt="Astrotype team"
            width={400}
            height={400}
            className="rounded-full shadow-md"
            data-ai-hint="team office"
          />
        </div>
        <div className="max-w-prose mx-auto space-y-6">
          <p>
            Welcome to Astrotype, a space where technology, design, and performance converge. Our mission is to provide a clean, uncluttered, and performant platform for developers, designers, and writers to share their insights with the world.
          </p>
          <p>
            We believe in the power of minimalism and the importance of a fast, accessible web. Astrotype is built on the principles of static site generation, leveraging the power of Next.js to deliver content at lightning speed. Our design philosophy is simple: content is king, and the user experience should be seamless.
          </p>
          <p>
            This platform is more than just a blog; it's a testament to modern web development practices. From AI-powered features to a Git-based content workflow, we're constantly exploring new ways to make content creation more efficient and enjoyable.
          </p>
          <p>
            Thank you for being part of our journey. We're excited to see what you'll create and share with the community.
          </p>
        </div>
      </div>
    </div>
  );
}
