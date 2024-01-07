import { planEndingShieldIcon } from "@constants/icons/iconURLs";
import Link from "next/link";
import React from "react";

const BuyProPlan = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 group">
      <Link
        href="/plans"
        className="flex border-[#E7C869] border px-2 sm:px-3 lg:px-4 py-1.5 rounded-xl md:rounded-2xl group-hover:bg-gradient-to-b from-[#E7C869] via-[#FDEDC1] to-[#EBCE78] justify-center items-center cursor-pointer"
      >
        <img
          src={planEndingShieldIcon}
          className="w-3 sm:w-4 lg:w-5 aspect-1"
          alt="shield icon"
        />
        <p className="text-white group-hover:text-black/90 text-xs sm:text-sm lg:text-base font-popM text-center pl-1.5 whitespace-nowrap">
          Buy Pro plan
        </p>
      </Link>
    </div>
  );
};

export default BuyProPlan;
