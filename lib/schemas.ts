import {z} from "zod";

export const volumeSchema = z.object({
  collectionId: z.coerce.number<number>(),
  name: z.string().min(3).max(255),
  summary: z.string().max(600).optional(),
  pages: z.coerce.number<number>().positive().optional(),
});

export type VolumeSchemaType = z.infer<typeof volumeSchema>;

