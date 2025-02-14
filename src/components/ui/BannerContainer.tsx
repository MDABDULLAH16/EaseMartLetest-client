"use client";
import { usePathname } from "next/navigation";
import Banner from "../Banner";

const BannerContainer = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  return <div>{isHomePage && <Banner />}</div>;
};

export default BannerContainer;
