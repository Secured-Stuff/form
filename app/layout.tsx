import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { IChildren as Props } from "./_types/types";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Umowa kupna - sprzedaży",
};

export default function RootLayout({ children }: Readonly<Props>) {
	return (
		<html lang="pl">
			<body className={font.className}>{children}</body>
		</html>
	);
}
