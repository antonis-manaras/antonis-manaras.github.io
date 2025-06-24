'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getCategorySuggestions } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles, LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Getting Suggestions...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Suggest Categories
        </>
      )}
    </Button>
  );
}

export function NewPostForm() {
  const [state, formAction] = useFormState(getCategorySuggestions, {});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(formRef.current!);
      formAction(formData);
  }

  return (
    <Card>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <CardHeader>
          <CardTitle className="font-headline">Post Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Your amazing post title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your blog post here. Make it at least 50 characters to get suggestions."
              rows={10}
            />
          </div>
          {state.categories && (
            <div className="space-y-2">
              <Label>Suggested Categories (click to select)</Label>
              <div className="flex flex-wrap gap-2">
                {state.categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? 'default' : 'secondary'}
                    onClick={() => handleCategoryClick(category)}
                    className="cursor-pointer"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <SubmitButton />
          <Button variant="outline">Save Draft</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
