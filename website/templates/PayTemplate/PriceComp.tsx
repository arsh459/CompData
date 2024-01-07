import { CouponStatusType, priceType } from "./usePlanAnchor";
import { currency } from "@templates/OurPlans/Plan";

interface Props {
  price: priceType;
  currency: currency;
  couponStatus: CouponStatusType;
}

const PriceComp: React.FC<Props> = ({ price, currency, couponStatus }) => {
  return (
    <div className="flex flex-col items-end">
      {couponStatus === "valid" ? (
        <h3 className="text-white/50 font-nunitoM text-xs whitespace-nowrap">
          Earlier{" "}
          <span className="line-through">{`${currency} ${price[currency].price}`}</span>
        </h3>
      ) : null}
      <h3 className="font-popM text-base iphoneX:text-lg whitespace-nowrap">{`${currency} ${price[currency].dicountedPrice}`}</h3>
    </div>
  );
};

export default PriceComp;
