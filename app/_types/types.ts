import { type ReactNode } from "react";

export type ButtonStyleType = "Primary" | "Secondary";
export interface Children {
  children: ReactNode;
}

export interface Product {
  productName: string;
  quantity: number;
  price: number;
}

export interface Option {
  id: string;
  label: string;
}
