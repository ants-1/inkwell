import * as z from "zod";

export const createNoteSchema = z.object({
    title: z.string(),
    content: z.string(),
    userId: z.string()
});

export const updateNoteSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional()
});