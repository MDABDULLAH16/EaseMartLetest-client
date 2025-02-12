import React from "react";
import { FaGift, FaShippingFast } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import TitleSection from "../shared/TitleWithHelmet";

const ServicesStat = () => {
  return (
    <div className="w-full  py-12 mx-auto">
      <div>
        <TitleSection
          header={"Our Awesome"}
          optional={"Services"}
          title={"Product"}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
        <div className="flex flex-col items-center w-full gap-2 p-4 text-center bg-white border-2 border-gray-600 rounded-lg shadow-lg dark:bg-gray-800">
          <FaShippingFast className="text-6xl text-blue-500 text-center" />
          <p className="text-3xl font-medium text-gray-900 dark:text-gray-300">
            Free Shipping
          </p>
          <p className="leading-relaxed dark:text-gray-400">
            For all order over $100
          </p>
        </div>

        <div className="flex flex-col items-center w-full gap-2 p-4 text-center bg-white border-2 border-gray-600 rounded-lg shadow-lg dark:bg-gray-800">
          <GiReturnArrow className="text-6xl text-blue-500 text-center" />
          <p className="text-3xl font-medium text-gray-900 dark:text-gray-300">
            30 Day returns
          </p>
          <p className="leading-relaxed dark:text-gray-400">
            For an Exchange Products
          </p>
        </div>

        <div className="flex flex-col items-center w-full gap-2 p-4 text-center bg-white border-2 border-gray-600 rounded-lg shadow-lg dark:bg-gray-800">
          <RiSecurePaymentLine className="text-6xl text-blue-500 text-center" />
          <p className="text-3xl font-medium text-gray-900 dark:text-gray-300">
            Secured Payment
          </p>
          <p className="leading-relaxed dark:text-gray-400">
            Payment Card Accepted
          </p>
        </div>

        <div className="flex flex-col items-center w-full gap-2 p-4 text-center bg-white border-2 border-gray-600 rounded-lg shadow-lg dark:bg-gray-800">
          <FaGift className="text-6xl text-blue-500 text-center" />

          <p className="text-3xl font-medium text-gray-900 dark:text-gray-300">
            Spacial Gift Pack
          </p>
          <p className="leading-relaxed dark:text-gray-400">
            Contact for Special Gift
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesStat;
