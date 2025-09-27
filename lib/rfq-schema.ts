// lib/rfq-schema.ts
import { z } from "zod";

export const rfqSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal("")),
  service: z.string().optional().or(z.literal("")),
  details: z.string().min(5),
});
