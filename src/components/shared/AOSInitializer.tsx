"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInitializer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Whether animation should happen only once
      easing: "ease-in-out",
      mirror: true,
    });
  }, []);

  return null;
};

export default AOSInitializer;
