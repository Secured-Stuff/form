"use client";

import { ChangeEvent } from "react";
import { Product } from "../_types/types";

interface Props extends Product {
  index: number;
  onUpdateItem: (updatedItem: any) => void;
}

export function InvoiceItem({
  index,
  productName,
  quantity,
  price,
  onUpdateItem,
}: Readonly<Props>) {
  const updateItem = (key: string, value: string | number) => {
    const updatedItem = { ...{ productName, quantity, price }, [key]: value };
    onUpdateItem(updatedItem);
  };

  return (
    <tr id="product">
      <td className="border text-center ">{index + 1}</td>
      <td className="border p-2">
        <input
          id="productName"
          type="text"
          className="focus:outline-primary w-full rounded-lg border p-3"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateItem("productName", e.target.value)
          }
        />
      </td>
      <td className="border p-2 text-right">
        <input
          id="quantity"
          type="number"
          className="focus:outline-primary w-full rounded-lg border p-3"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateItem("quantity", Number(e.target.value))
          }
        />
      </td>
      <td className="border p-2 pr-2 text-right">
        <input
          id="price"
          type="number"
          className="focus:outline-primary w-full rounded-lg border p-3"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateItem("price", Number(e.target.value))
          }
        />
      </td>
      <td className="border p-2 pr-2 text-right">{price * quantity}</td>
    </tr>
  );
}
