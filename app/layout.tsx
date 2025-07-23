
import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MiRifa - Plataforma de Rifas",
  description: "Compra tu número de la suerte y gana increíbles premios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
            .font-pacifico {
              font-family: var(--font-pacifico), cursive;
            }
            .\\!rounded-button {
              border-radius: 1rem !important;
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased font-sans`}
        style={{
          fontFamily: 'var(--font-geist-sans), system-ui, sans-serif'
        }}
      >
        {children}
      </body>
    </html>
  );
}
