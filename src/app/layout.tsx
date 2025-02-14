import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { Bounce, ToastContainer } from "react-toastify";
import Providers from "@/lib/Providers";
import Footer from "@/components/shared/Footer";
import AOSInitializer from "@/components/shared/AOSInitializer";

import BannerContainer from "@/components/ui/BannerContainer";

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
        <body>
          <AOSInitializer />
          <Navbar />
          <div>
            <BannerContainer />
            <div className="min-h-screen max-w-[90%] mx-auto overflow-hidden"> {children}</div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
