// import Button from "@components/button";
// import clsx from "clsx";
import React from "react";

interface Props {}

const BrandedWebpage: React.FC<Props> = () => {
  return (
    <div className="mx-auto w-[320px] md:w-[480px] md:pl-4 md:pr-4">
      <div className="flex flex-wrap">
        <p className="text-5xl lg:text-6xl font-bold flex-none text-gray-700">
          A website that
        </p>
        <p className="text-orange-500 text-5xl lg:text-6xl font-bold">
          keeps up
        </p>
        <p className="text-5xl lg:text-6xl font-bold flex-none text-gray-700">
          with your content
        </p>
      </div>
      <div className="pt-2">
        <p className="text-xl font-medium text-gray-500">
          Your colors & content,
        </p>
        <p className="text-xl font-medium text-gray-500">Drag & drop,</p>
        <p className="text-xl font-medium text-gray-500">Built for makers.</p>
      </div>
    </div>
  );
};

export default BrandedWebpage;
