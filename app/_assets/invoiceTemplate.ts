import { Body } from "../_types/types";

export function invoiceTemplate(body: Body) {
  return `
  <head>
  <script src="https://cdn.tailwindcss.com"></script>
  </head>
    <body>
      <header class="text-center mt-8">
        <h1 class="mb-2 text-2xl font-semibold uppercase text-indigo-500">Umowa kupna - sprzedaży</h1>
        <p>Zawarta w dniu: ${body.date}</p>
      </header>
      <main class="mt-10 mx-10 mb-20">
      <div class="mb-10 pb-5 border-b grid grid-cols-2 gap-4">
          <div>
            <h2 class="font-semibold">Sprzedający</h2>
            <p>${body.fullName}</p>
            <p>${body.address}</p>
            <p>${body.city}</p>
          </div>
          <div>
            <h2 class="font-semibold">Kupujący</h2>
            <p>Marcin Kennemann</p>
            <p>1 Maja 24</p>
            <p>64-600 Oborniki</p>
            <p>NIP: 6060112970</p>
          </div>   
        </div>
        <div>
          <div class="mb-2">
            <h2 class="font-semibold">§ 1</h2>
            <p>Sprzedający sprzedaje, a Kupujący kupuje następujące rzeczy:</p>
            <table class="w-full my-2 text-sm">
              <thead>
                <tr>
                  <th class="border py-1">Lp.</th>
                  <th class="border text-left pl-2 py-1" width="60%">Nazwa produktu</th>
                  <th class="border py-1">Ilość</th>
                  <th class="border py-1">Cena za szt.</th>
                  <th class="border py-1">Łączna cena</th>
                </tr>
              </thead>
              <tbody>
                ${body.products.map(
                  (el: any, index: number) =>
                    `<tr>
                  <td class="border text-center py-1">${index + 1}</td>
                  <td class="border text-left pl-2 py-1" width="60%">${el.productName}</td>
                  <td class="border text-center py-1">${el.quantity}</td>
                  <td class="border text-right pr-2 py-1">${el.price} PLN</td>
                  <td class="border text-right pr-2 py-1">${el.quantity * el.price} PLN</td>
                </tr>`,
                )}
              </tbody>
            </table>
          </div>
          <div class="mb-2">
            <h2 class="font-semibold">§ 2</h2>
            <ol class="list-decimal pl-5">
              <li>
                Kupujący zapłaci Sprzedawcy za ww. przedmioty cenę brutto w wysokości ${body.totalPrice} PLN.
              </li>
              <li>
                Zapłata ceny brutto przez Kupującego nastąpi poprzez: ${body.paymentMethod}.
              </li>
            </ol>
          </div>
          <div class="mb-2">
            <h2 class="font-semibold">§ 3</h2>
            <ol class="list-decimal pl-5">
              <li>
                W sprawach nieuregulowanych niniejszą umową mają zastosowanie przepisy kodeksu
                cywilnego.
              </li>
              <li>
                Zmiana umowy wymaga formy pisemnej pod rygorem nieważności.
              </li>
              <li>
                Sprzedawane towary są uznawane za używane.
              </li>
              <li>
                Kupujący kupuje, a sprzedający sprzedaje produkty w stanie wolnym od wad.
              </li>
              <li>
                Przeniesienie własności towaru następuje z chwilą jego wydania Kupującemu.
              </li>
            </ol>
          </div>
          <div class="mb-2">
            <h2 class="font-semibold">§ 4</h2>
            <p>
              Umowę sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze stron.
            </p>
          </div>
        </div>
    <main>
    <footer class="flex justify-around gap-24 mt-20">
      <div class="text-center">
        <p>Podpis sprzedającego:</p>
        <img src=${body.signatureUrl} width="180" class="mb-2 mt-4"/>
        <div class="opacity-40">
          <p>....................................</p>
          <p>Sprzedający</p>
      </div>
      </div>
      <div class="text-center">
        <p>Podpis kupującego:</p>
        <div class="opacity-40 mt-[50px]">
          <p>....................................</p>
          <p>Kupujący</p>
        </div>
        
      </div>
    </footer>

    </body>
  `;
}
