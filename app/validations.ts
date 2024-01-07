import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z.string().max(255).min(1, 'title is required.'),
  description: z.string().min(1, 'description is required.'),
});
