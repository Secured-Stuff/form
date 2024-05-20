import { type ReactNode } from "react";

export interface Children {
  children: ReactNode;
}

export interface Product {
  productName: string;
  quantity: number;
  price: number;
}
