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
import { SignaturePad } from "./_components/SignaturePad";
import axios from "axios";

export default function Home() {
  const invoiceForm = useForm<Invoice>({
    resolver: zodResolver(InvoiceSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [currentDate] = useState<Date>(new Date());
  const minDate = new Date(currentDate.getFullYear(), 0, 1);
  const maxDate = currentDate;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [signatureUrl, setSignatureUrl] = useState<string>("");
  const [products, setProducts] = useState([
    {
      productName: "",
      quantity: 0,
      price: 0,
    },
  ]);

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

  const updateProduct = (index: number, updatedProduct: Product) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    setProducts(updatedProducts);
  };

  const deleteProduct = (indexToDelete: number) => {
    if (products.length > 1) {
      const update = products.filter(
        (el: Product, index: number) => index !== indexToDelete,
      );
      setProducts(update);
    } else {
      window.alert("Wymagany jest conajmniej jeden produkt.");
    }
  };

  const calcTotalPurchasePrice = () => {
    const newTotal = products.reduce(
      (sum, el) => sum + el.price * el.quantity,
      0,
    );
    setTotalPrice(newTotal);
  };

  const handleSignature = (url: string) => {
    setSignatureUrl(url);
  };

  const sendForm = async (data: Invoice) => {
    setIsLoading(true);
    const formattedData = { ...data, products, totalPrice, signatureUrl };

    try {
      const response = await axios.post("/api", formattedData);
      if ((response.status = 200)) {
        window.alert("Umowa kupna-sprzedaży została wysłana.");
        window.location.reload();
      }
    } catch (error: any) {
      window.alert("Wystąpił błąd!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    calcTotalPurchasePrice();
  }, [products]);

  return (
    <main className="mx-4">
      <div className="m-8 mx-auto max-w-4xl rounded-lg border bg-white p-4 ">
        <h1 className="my-2 text-center text-lg font-semibold md:text-xl lg:my-4 lg:text-2xl">
          Sales Agreement / Umowa Kupna-Sprzedaży
        </h1>
        <FormProvider {...invoiceForm}>
          <form onSubmit={invoiceForm.handleSubmit(sendForm)} className="my-8">
            <div>
              <FormField
                id="date"
                type="date"
                label="Select date / Wybierz datę"
                min={minDate.toISOString().slice(0, 10)}
                max={maxDate.toISOString().slice(0, 10)}
                required={true}
              />
              <FormField
                id="fullName"
                label="Full name / Imię i nazwisko"
                placeholder="Full name / Imię i nazwisko"
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
                label="Address / Ulica, numer domu/mieszkania"
                placeholder="Address / Ulica, numer domu/mieszkania"
                required={true}
              />
              <FormField
                id="city"
                label="Postal Code, City / Kod pocztowy, miasto"
                placeholder="Postal Code, City / Kod pocztowy, miasto"
                required={true}
              />
              <div>
                <h2 className="mb-2 text-lg font-semibold">
                  Products / Produkty
                </h2>

                <table className="w-full text-left text-sm">
                  <thead className="font-semibold">
                    <tr>
                      <th className="border py-2 text-center">Lp.</th>
                      <th className="border py-2 pl-2">Name / Nazwa</th>
                      <th className="border py-2 pl-2">Quantity / Ilość</th>
                      <th className="border py-2 pl-2">
                        Price per unit / Cena za szt.
                      </th>
                      <th className="border pr-2 text-right">
                        Total product price / Łączna cena produktu
                      </th>
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
                        onRemove={(index: number) => deleteProduct(index)}
                      />
                    ))}
                  </tbody>
                </table>
                <Button
                  type="button"
                  styleType="Primary"
                  onClick={addProduct}
                  wFull={true}
                >
                  Add product / Dodaj produkt
                </Button>
              </div>
              <h2 className="my-2 border-t pt-4 text-right text-lg font-semibold">
                Total Purchase Price / Łączna cena zakupu: {totalPrice}
              </h2>
              <div className="mt-8">
                <FormSelect
                  id="currency"
                  label="Currency / Waluta"
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
                  label="Payment method / Metoda płatności"
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
                  label="Additional information / Dodatkowe informacje"
                  placeholder="Additional information / Dodatkowe informacje"
                  rows={5}
                />
              </div>
              <SignaturePad onSignatureChange={handleSignature} />
            </div>
            <div className="mt-8 flex items-center justify-center">
              <Button
                styleType="Primary"
                loading={isLoading}
                loadingLabel="Sending / Wysyłanie"
              >
                Send / Wyślij
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
