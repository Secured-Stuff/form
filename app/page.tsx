"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./_components/Button";
import { FormField } from "./_components/FormField";
import { FormProvider, useForm } from "react-hook-form";
import {
  InvoiceSchema,
  Invoice,
} from "./_utils/validation/invoice/invoice.model";
import { Product } from "./_types/types";
import { InvoiceItem } from "./_components/InvoiceItem";
import { FormSelect } from "./_components/FormSelect";

export default function Home() {
  const invoiceForm = useForm<Invoice>({
    resolver: zodResolver(InvoiceSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [products, setProducts] = useState([
    {
      productName: "",
      quantity: 0,
      price: 0,
    },
  ]);

  const updateProduct = (index: number, updatedProduct: Product) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        productName: "",
        quantity: 0,
        price: 0,
      },
    ]);
  };

  const [total, setTotal] = useState<number>(0);

  const calcTotalPurchasePrice = () => {
    const newTotal = products.reduce(
      (sum, el) => sum + el.price * el.quantity,
      0,
    );
    setTotal(newTotal);
  };

  const sendForm = (data: Invoice) => {
    console.log(data);
    console.log(products);
  };

  useEffect(() => {
    calcTotalPurchasePrice();
  }, [products]);

  return (
    <main className="mx-4">
      <div className="m-8 mx-auto max-w-4xl rounded-lg border bg-white p-4 ">
        <h1 className="my-2 text-center text-lg font-semibold md:text-xl lg:my-4 lg:text-2xl">
          Umowa Kupna-Sprzedaży
        </h1>
        <FormProvider {...invoiceForm}>
          <form onSubmit={invoiceForm.handleSubmit(sendForm)} className="my-8">
            <div>
              <FormField
                id="date"
                type="date"
                label="Wybierz datę"
                required={true}
              />
              <FormField
                id="fullName"
                label="Imię i nazwisko"
                placeholder="Imię i nazwisko"
                required={true}
              />
              <FormField
                id="email"
                type="email"
                label="Email"
                placeholder="Email"
                required={true}
              />

              <FormField
                id="address"
                label="Adres"
                placeholder="Kod pocztowy, miasto"
                required={true}
              />

              <div>
                <h2 className="mb-2 text-lg font-semibold">Produkty</h2>

                <table className="w-full text-left text-sm">
                  <thead className="font-semibold">
                    <tr>
                      <th className="border py-2 text-center">L.p.</th>
                      <th className="border py-2 pl-2">Nazwa</th>
                      <th className="border py-2 pl-2">Ilość</th>
                      <th className="border py-2 pl-2">Cena za szt.</th>
                      <th className="border pr-2 text-right">Łączna cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((el: Product, index: number) => (
                      <InvoiceItem
                        key={index}
                        index={index}
                        productName={el.productName}
                        quantity={el.quantity}
                        price={el.price}
                        onUpdateItem={(updatedItem) =>
                          updateProduct(index, updatedItem)
                        }
                      />
                    ))}
                  </tbody>
                </table>
                <Button type="button" onClick={addProduct} wFull={true}>
                  Dodaj produkt
                </Button>
              </div>

              <h2 className="my-2 border-t pt-4 text-right text-lg font-semibold">
                Łączna cena zakupu: {total}
              </h2>
              <div className="mt-8">
                <FormSelect
                  id="currency"
                  label="Waluta"
                  options={[
                    {
                      id: "PLN",
                      label: "PLN",
                    },
                    { id: "EUR", label: "EUR" },
                  ]}
                  form={invoiceForm.register("currency")}
                />
                <FormSelect
                  id="paymentMethod"
                  label="Metoda płatności"
                  options={[
                    {
                      id: "BLIK",
                      label: "BLIK",
                    },
                    { id: "PayPal", label: "PayPal" },
                    { id: "Przelew bankowy", label: "Przelew bankowy" },
                    { id: "Gotówka", label: "Gotówka" },
                  ]}
                  form={invoiceForm.register("paymentMethod")}
                />
                <FormField
                  id="additionalInformation"
                  type="textarea"
                  label="Dodatkowe informacje"
                  placeholder="Dodatkowe informacje"
                  rows={5}
                />
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center">
              <Button>Wyślij</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
