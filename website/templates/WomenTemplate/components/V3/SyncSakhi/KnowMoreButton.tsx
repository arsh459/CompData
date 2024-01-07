import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";

const KnowMoreButton = () => {
  return (
    <div className="w-full lg:w-2/3 flex justify-center items-center">
      <Link
        passHref
        href={`/sakhi`}
        className="px-6 py-3 mt-5 border font-popR text-xs sm:text-sm lg:text-base border-white flex items-center rounded-full"
      >
        <p className="whitespace-nowrap">Know More about Sakhi</p>
        <ChevronRightIcon className="w-4 h-4 " color="#fff" />
      </Link>
    </div>
  );
};

export default KnowMoreButton;
