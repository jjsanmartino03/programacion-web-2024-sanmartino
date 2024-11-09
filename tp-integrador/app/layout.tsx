import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import Providers from "@/app/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MeWeb",
  description: "Aplicación para generar páginas estáticas",
  authors: [{
    name: "Julián Sanmartino",
    url: "https://juli.ar",
  }],
  icons: ["/logo.ico"],
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <Providers>
      {/* Pass navbar as children to providers */}
      <div className={'flex flex-col'} style={{maxHeight: '100dvh', height: '100dvh'}}>
        <Navbar/>
        <div className={'flex flex-col flex-grow'}>
          {children}
        </div>
        <Footer/>
      </div>
    </Providers>
    <Toaster/>
    </body>
    </html>
  );
}
