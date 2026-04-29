'use server';
/**
 * @fileOverview An AI agent that generates creative event ideas and compelling descriptions.
 *
 * - generateEventContent - A function that handles the event content generation process.
 * - GenerateEventContentInput - The input type for the generateEventContent function.
 * - GenerateEventContentOutput - The return type for the generateEventContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventContentInputSchema = z.object({
  themes: z
    .array(z.string())
    .describe(
      'A list of themes or keywords for the event, e.g., "outdoor activities", "Toulouse history", "creative workshop".'
    ),
  numIdeas: z
    .number()
    .int()
    .min(1)
    .max(5)
    .default(3)
    .describe('The number of event ideas to generate (between 1 and 5).'),
});
export type GenerateEventContentInput = z.infer<
  typeof GenerateEventContentInputSchema
>;

const GeneratedEventIdeaSchema = z.object({
  title: z.string().describe('A catchy and descriptive title for the event idea.'),
  description:
    z.string().describe(
      'A compelling description for the event, highlighting its unique aspects and what attendees can expect.'
    ),
  keywords:
    z.array(z.string()).optional().describe('Relevant keywords for this specific event idea.'),
});

const GenerateEventContentOutputSchema = z.object({
  eventIdeas:
    z.array(GeneratedEventIdeaSchema).describe('A list of generated event ideas.'),
});
export type GenerateEventContentOutput = z.infer<
  typeof GenerateEventContentOutputSchema
>;

export async function generateEventContent(
  input: GenerateEventContentInput
): Promise<GenerateEventContentOutput> {
  return generateEventContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEventContentPrompt',
  input: {schema: GenerateEventContentInputSchema},
  output: {schema: GenerateEventContentOutputSchema},
  prompt: `You are an expert event planner for a community group platform called ToulouseFriendlyClubs. Your goal is to generate creative and engaging event ideas and compelling descriptions for a group based on provided themes or keywords.

Generate {{numIdeas}} distinct event ideas. Each idea should include a catchy title and a detailed description that makes attendees excited to join. Also, provide relevant keywords for each idea.

The event themes and keywords are:
{{#each themes}}
- {{{this}}}
{{/each}}

Ensure the output is in the specified JSON format.`,
});

const generateEventContentFlow = ai.defineFlow(
  {
    name: 'generateEventContentFlow',
    inputSchema: GenerateEventContentInputSchema,
    outputSchema: GenerateEventContentOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
