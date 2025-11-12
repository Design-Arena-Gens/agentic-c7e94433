import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A is for Apple",
  description:
    "A cheerful animated apple teaching the alphabet with sunshine, sparkles, and a joyful voice."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
