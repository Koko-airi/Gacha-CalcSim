import type { Metadata } from "next";
import "./globals.css";
import { Figtree, Nunito } from "next/font/google";

const inter = Nunito({ subsets: ["latin"], weight: ["400", "500"] });
export const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gacha CalcSim",
  description:
    "Calculate probabilities and simulate pulls for your favorite gacha games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${inter.className}`}>
        <div className="absolute top-0 left-0 h-screen w-screen image-bg -z-10" />
        {children}
      </body>
    </html>
  );
}
