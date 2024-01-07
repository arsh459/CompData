import clsx from "clsx";
import React from "react";
import { formatWithCommas } from "utils/number";

interface Props {
  label: string;
  value: number;
  currency?: string;
  color: "primary" | "seconday";
}
const KPIContainer: React.FC<Props> = ({ label, value, currency, color }) => {
  return (
    <div
      className={clsx(
        "p-2 pl-4 pr-4 shadow-xl rounded-lg",
        "hover:-translate-y-1 transition-transform transform hover:shadow-2xl",
        color === "primary" ? " bg-gradient-to-b from-white to-white" : ""
      )}
    >
      <div className="flex justify-center">
        {currency ? <p className="text-sm text-gray-700">{currency}</p> : null}
        <p className="text-gray-800 text-xl font-medium text-center">
          {formatWithCommas(value)}
        </p>
      </div>
      <p className="text-lg text-center italic font-light text-gray-500">
        {label}
      </p>
    </div>
  );
};

export default KPIContainer;
