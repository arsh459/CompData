// import clsx from "clsx";
import React from "react";
import { formatWithCommas } from "utils/number";

interface Props {
  currency?: string;
  price?: number;
}
const Price: React.FC<Props> = ({ currency, price }) => {
  return (
    <div className="pt-0 flex">
      {price && price > 0 ? (
        <>
          <p className="text-orange-500">{currency}</p>
          <p className="text-2xl font-medium text-gray-700">
            {formatWithCommas(price)}
          </p>
        </>
      ) : (
        <p className="text-2xl text-gray-700">Free</p>
      )}
    </div>
  );
};

export default Price;
