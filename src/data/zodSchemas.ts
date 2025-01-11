import { z } from "zod";

export const journalSchema = z.object({
    title: z.string().min(1, 'This is required field.'),
    content: z.string().min(49, 'Content must be upto 50 words.'),
    mood: z.string().min(1, 'This is required field.'),
    collectionId: z.string().min(1, 'This is required field.'),
})

export const collectionSchema = z.object({
    name: z.string().min(1, 'This is required field.'),
    description: z.string().min(1, 'This is required field.'),
})