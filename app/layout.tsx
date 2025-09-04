import "./globals.css";
import { Providers } from "@/shared/components/shared/providers";
import localFont from "next/font/local";

const nunito = localFont({
  src: [
    {
      path: "../public/fonts/Nunito-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Nunito-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Nunito-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Nunito-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Nunito-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Nunito-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nunito",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={nunito.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

