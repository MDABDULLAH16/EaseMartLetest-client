"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./shared/Navbar";

const NavbarContainer = () => {
  const pathname = usePathname();

  // Check if the current route is an admin or dashboard route
  const isAdminRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  return (
    <>
      {/* Render Navbar only if it's not an admin or dashboard route */}
      {!isAdminRoute && <Navbar />}
    </>
  );
};

export default NavbarContainer;