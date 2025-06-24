'use server';

/**
 * @fileOverview Provides suggestions for blog post categories based on the content.
 *
 * - suggestPostCategories - A function that suggests categories for a blog post.
 * - SuggestPostCategoriesInput - The input type for the suggestPostCategories function.
 * - SuggestPostCategoriesOutput - The return type for the suggestPostCategories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPostCategoriesInputSchema = z.object({
  postContent: z.string().describe('The content of the blog post.'),
});
export type SuggestPostCategoriesInput = z.infer<typeof SuggestPostCategoriesInputSchema>;

const SuggestPostCategoriesOutputSchema = z.object({
  categories: z.array(z.string()).describe('Suggested categories for the blog post.'),
});
export type SuggestPostCategoriesOutput = z.infer<typeof SuggestPostCategoriesOutputSchema>;

export async function suggestPostCategories(input: SuggestPostCategoriesInput): Promise<SuggestPostCategoriesOutput> {
  return suggestPostCategoriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPostCategoriesPrompt',
  input: {schema: SuggestPostCategoriesInputSchema},
  output: {schema: SuggestPostCategoriesOutputSchema},
  prompt: `You are a blog post categorization expert. Given the content of a blog post, you will suggest relevant categories.

  Blog Post Content: {{{postContent}}}

  Suggest at least 3 categories.
  Categories:`,
});

const suggestPostCategoriesFlow = ai.defineFlow(
  {
    name: 'suggestPostCategoriesFlow',
    inputSchema: SuggestPostCategoriesInputSchema,
    outputSchema: SuggestPostCategoriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
