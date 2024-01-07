import { useState } from "react";
import { CouponStatusType, priceType } from "./usePlanAnchor";
import { currency } from "@templates/OurPlans/Plan";

interface Props {
  price: priceType;
  currency: currency;
  couponStatus: CouponStatusType;
  removeCode: () => void;
  handleApplyCode: (value: number, code: string) => void;
}

const CouponComp: React.FC<Props> = ({
  price,
  currency,
  couponStatus,
  handleApplyCode,
  removeCode,
}) => {
  const [couponCode, setCouponCode] = useState<string>();

  switch (couponStatus) {
    case "valid":
      return (
        <div className="flex items-center px-1">
          <img
            src="https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Vector_wmZWm-rkD.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678453390698"
            alt="done"
            className="w-5 aspect-1"
          />
          <p className="flex-1 text-xs px-3">
            You saved{" "}
            <span className="font-bold">
              {currency}{" "}
              {parseFloat(
                (
                  price[currency].price - price[currency].dicountedPrice
                ).toFixed(2)
              )}
            </span>{" "}
            with this code
          </p>
          <button className="text-xs text-[#FF5F3C]" onClick={removeCode}>
            Remove
          </button>
        </div>
      );
    default:
      return (
        <>
          <div className="bg-[#EDEDED26] rounded-full flex p-1">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="bg-transparent rounded-full flex-1 px-4 text-white text-sm py-1"
              placeholder="Coupon Code"
            />
            <button
              onClick={() =>
                handleApplyCode(
                  price[currency].price,
                  couponCode ? couponCode : ""
                )
              }
              className="bg-white rounded-full text-[#0F0E18] text-xs px-4"
            >
              Apply
            </button>
          </div>
          {couponStatus === "invalid" ||
          couponStatus === "increasePlanValue" ? (
            <p className="flex-1 px-4 text-sm text-[#FF5F3C] pt-2">
              {couponStatus === "increasePlanValue"
                ? "The voucher is valid for high plans only"
                : "Invalid Code"}
            </p>
          ) : null}
        </>
      );
  }
};

export default CouponComp;
