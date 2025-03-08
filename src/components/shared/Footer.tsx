import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../assets/EaseMart.png";
const Footer = () => {
  return (
    <footer className=" pl-12 bg-gray-200 text-black">
      <div className="container w-full mx-auto px-6 py-10 grid gap-8 grid-cols-1 md:grid-cols-3 text-center md:text-left">
        {/* Logo and description */}
        <div>
           {/* Logo */}
           <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={logo.src || "/fallback-logo.png"}
                alt="EaseMart"
                width={200}
                height={100}
              
                priority
              />
            </Link>
          </div>

          <p className="mt-2">Your one-stop shop for all your needs</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-black">Quick Links</h2>
          <nav className="mt-4 flex flex-col space-y-2">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="/about" className="hover:text-blue-400">About Us</Link>
            <Link href="/product" className="hover:text-blue-400">Products</Link>
          </nav>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-semibold text-black">Follow Us</h2>
          <div className="mt-4 flex justify-center md:justify-start space-x-4">
            <Link href="https://x.com/AbdullahDev15" className="hover:text-blue-500">
              <svg width="30" height="30" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path fill="#1d9bf0" d="M199.572 91.411c.11 1.587.11 3.174.11 4.776c0 48.797-37.148 105.075-105.075 105.075v-.03A104.54 104.54 0 0 1 38 184.677q4.379.525 8.79.533a74.15 74.15 0 0 0 45.865-15.839a36.98 36.98 0 0 1-34.501-25.645a36.8 36.8 0 0 0 16.672-.636c-17.228-3.481-29.623-18.618-29.623-36.198v-.468a36.7 36.7 0 0 0 16.76 4.622c-16.226-10.845-21.228-32.432-11.43-49.31a104.8 104.8 0 0 0 76.111 38.582a36.95 36.95 0 0 1 10.683-35.283c14.874-13.982 38.267-13.265 52.249 1.601a74.1 74.1 0 0 0 23.451-8.965a37.06 37.06 0 0 1-16.234 20.424A73.5 73.5 0 0 0 218 72.282a75 75 0 0 1-18.428 19.13"/></svg>
            </Link>
            <Link href="https://www.youtube.com/@arsabdullah1051" className="hover:text-red-500">
              <svg width="30" height="30" viewBox="0 0 256 180" xmlns="http://www.w3.org/2000/svg"><path fill="#f00" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"/><path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z"/></svg>
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=100013022822481" className="hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256">
	<path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445" />
	<path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z" />
</svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 mt-4 py-2 text-center text-black">
        <p>&copy; {new Date().getFullYear()} EaseMart. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
