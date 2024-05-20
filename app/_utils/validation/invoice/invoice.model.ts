import { z } from "zod";

// const ProductSchema = z.object({
//   productName: z.string(),
//   quantity: z.number().int().positive(),
//   price: z.number().positive(),
// });

export const InvoiceSchema = z.object({
  date: z.string(),
  fullName: z.string(),
  email: z.string(),
  address: z.string(),
  // products: z.array(ProductSchema),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
