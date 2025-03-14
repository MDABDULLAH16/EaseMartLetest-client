import type { Metadata } from "next";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import Providers from "@/lib/Providers";

import AOSInitializer from "@/components/shared/AOSInitializer";

import BannerContainer from "@/components/ui/BannerContainer";
import NavbarContainer from "@/components/NavbarContainer";
import FooterContainer from "@/components/FooterContainer";

export const metadata: Metadata = {
  title: "EaseMart",
  description: "Stay busy with EaseMart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" data-theme="light">
        <body className="bg-slate-100 dark:bg-[#1B1B1B]  dark:text-white  text-black" >
          <AOSInitializer />
          <NavbarContainer />
          <div>
            <BannerContainer />
            <div className="min-h-screen  max-w-[95%] mx-auto overflow-hidden"> {children}</div>
          </div>
          <ToastContainer
            position="bottom-left"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}            
            draggable            
            theme="light"
            transition={Bounce}
          />
          <FooterContainer />
        </body>
      </html>
    </Providers>
  );
}
