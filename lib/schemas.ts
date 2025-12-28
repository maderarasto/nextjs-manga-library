import {z} from "zod";

export const volumeSchema = z.object({
  collectionId: z.int(),
  name: z.string().min(3).max(255),
  summary: z.string().min(3).max(600).optional(),
  pages: z.coerce.number<number>().positive().optional(),
});

export type VolumeSchemaType = z.infer<typeof volumeSchema>;

