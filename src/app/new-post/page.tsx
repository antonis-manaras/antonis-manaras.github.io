import { NewPostForm } from './new-post-form';

export default function NewPostPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">Create a New Post</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Write your content and get AI-powered category suggestions.
        </p>
      </div>
      <NewPostForm />
    </div>
  );
}
