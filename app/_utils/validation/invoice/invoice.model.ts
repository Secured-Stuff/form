import { z } from "zod";

export const InvoiceSchema = z.object({
  date: z.string(),
  fullName: z.string(),
  email: z.string(),
  address: z.string(),
  currency: z.string(),
  paymentMethod: z.string(),
  additionalInformation: z.string().optional(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
