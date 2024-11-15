import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React Hook Form",
  description: "React Hook Form Tutorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
