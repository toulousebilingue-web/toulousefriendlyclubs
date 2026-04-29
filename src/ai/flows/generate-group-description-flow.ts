'use server';
/**
 * @fileOverview An AI agent that helps group creators generate captivating descriptions.
 *
 * - generateGroupDescription - A function that generates a group description based on purpose and target audience.
 * - GenerateGroupDescriptionInput - The input type for the generateGroupDescription function.
 * - GenerateGroupDescriptionOutput - The return type for the generateGroupDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGroupDescriptionInputSchema = z.object({
  purpose: z
    .string()
    .describe('The main purpose or goal of the group.'),
  targetAudience: z
    .string()
    .describe('Who the group is intended for (e.g., age, interests, location).'),
});
export type GenerateGroupDescriptionInput = z.infer<
  typeof GenerateGroupDescriptionInputSchema
>;

const GenerateGroupDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A captivating and well-structured description for the group.'),
});
export type GenerateGroupDescriptionOutput = z.infer<
  typeof GenerateGroupDescriptionOutputSchema
>;

export async function generateGroupDescription(
  input: GenerateGroupDescriptionInput
): Promise<GenerateGroupDescriptionOutput> {
  return generateGroupDescriptionFlow(input);
}

const generateGroupDescriptionPrompt = ai.definePrompt({
  name: 'generateGroupDescriptionPrompt',
  input: {schema: GenerateGroupDescriptionInputSchema},
  output: {schema: GenerateGroupDescriptionOutputSchema},
  prompt: `You are a marketing expert specializing in community groups.
Your task is to write a captivating and concise description for a new group based on its purpose and target audience.
The description should attract new members and clearly explain what the group offers.

Group Purpose: {{{purpose}}}
Target Audience: {{{targetAudience}}}

Craft a compelling description that highlights the benefits of joining and the community aspect.
`,
});

const generateGroupDescriptionFlow = ai.defineFlow(
  {
    name: 'generateGroupDescriptionFlow',
    inputSchema: GenerateGroupDescriptionInputSchema,
    outputSchema: GenerateGroupDescriptionOutputSchema,
  },
  async (input) => {
    const {output} = await generateGroupDescriptionPrompt(input);
    if (!output) {
      throw new Error('Failed to generate group description.');
    }
    return output;
  }
);
