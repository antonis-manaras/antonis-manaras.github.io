'use server';

import { suggestPostCategories } from '@/ai/flows/suggest-post-categories';
import { z } from 'zod';

const formSchema = z.object({
  content: z.string().min(50, 'Content must be at least 50 characters long.'),
});

interface ActionState {
  error?: string;
  categories?: string[];
}

export async function getCategorySuggestions(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validatedFields = formSchema.safeParse({
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.content?.[0],
    };
  }

  try {
    const result = await suggestPostCategories({ postContent: validatedFields.data.content });
    return { categories: result.categories };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get suggestions. Please try again.' };
  }
}
