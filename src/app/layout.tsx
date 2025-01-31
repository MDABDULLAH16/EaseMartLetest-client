import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/shared/Navbar";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/utils/authOption";

import { Bounce, ToastContainer } from "react-toastify";
import Providers from "@/lib/Providers";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "EaseMart",
  description: "Stay busy with EaseMart",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions);
  return (
    <Providers>
      <html lang="en" data-theme="light">
        <body>
          <Navbar  />
          <div className="min-h-screen w-[90%] mx-auto">{children}</div>
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
          ></ToastContainer>
          <Footer></Footer>
        </body>
      </html>
    </Providers>
  );
}
