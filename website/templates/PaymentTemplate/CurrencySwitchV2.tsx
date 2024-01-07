import clsx from "clsx";
import React from "react";
import { currency } from "./SelectPlanV2";

interface Props {
  selectedCurrency: currency;
  onChange: (newCurrency: currency) => void;
}

const CurrencySwitchV2: React.FC<Props> = ({ selectedCurrency, onChange }) => {
  return (
    <div className="border-2 border-white  flex rounded-full p-2 text-center w-1/2 min-w-fit max-w-[8rem]">
      <div className=" flex-[0.48] rounded-full ">
        <p
          onClick={() => onChange("INR")}
          className={clsx(
            "font-baib  rounded-full cursor-pointer text-base  capitalize",
            selectedCurrency === "INR"
              ? " bg-[#FFFF] text-black "
              : "text-[#FFFFFFA3]"
          )}
        >
          INR
        </p>
      </div>
      <div className="flex-[0.04] " />
      <div className="flex-[0.48] rounded-full ">
        <p
          onClick={() => onChange("USD")}
          className={clsx(
            "font-baib rounded-full cursor-pointer text-base   capitalize",
            selectedCurrency === "USD"
              ? " bg-[#FFFF] text-black "
              : "text-[#FFFFFFA3]"
          )}
        >
          USD
        </p>
      </div>
    </div>
  );
};

export default CurrencySwitchV2;
