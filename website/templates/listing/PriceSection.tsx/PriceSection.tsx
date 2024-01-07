import clsx from "clsx";
import React from "react";
import Price from "../HeadingSection/Price";
import TextLayout from "../Layout/TextLayout";

interface Props {
  currency?: "₹";
  price?: number;
  editing?: boolean;
  active?: boolean;
}
const PriceSection: React.FC<Props> = ({
  currency,
  price,
  editing,
  active,
}) => {
  return (
    <TextLayout active={active} editing={editing}>
      {currency && typeof price === "number" ? (
        <div className="pl-4 pr-4">
          <Price currency={currency} price={price} />
        </div>
      ) : (!currency || !price) && editing ? (
        <div className="pl-4 pr-4 pt-2">
          <p
            className={clsx(
              "text-xl font-semibold",
              !active ? "text-gray-400" : "text-gray-700"
            )}
          >
            Add price
          </p>
        </div>
      ) : null}
    </TextLayout>
  );
};

export default PriceSection;
