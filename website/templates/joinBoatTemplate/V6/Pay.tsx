import { sectionTypes } from "@hooks/joinBoat/V6/useSection";
import { UserInterface } from "@models/User/User";
import CheckoutComp from "@templates/PayTemplate/CheckoutComp";
import PayOptions from "@templates/PayTemplate/PayOptions";
import { usePlanAnchor } from "@templates/PayTemplate/usePlanAnchor";
import { currency } from "@templates/OurPlans/Plan";
import Script from "next/script";
import LoadingModal from "@components/loading/LoadingModal";
import PriceComp from "@templates/PayTemplate/PriceComp";
import CouponComp from "@templates/PayTemplate/CouponComp";
import { SbPlans } from "@models/SbPlans/interface";

interface Props {
  user: UserInterface;
  plans: SbPlans[];
  gotoSection: (sec: sectionTypes, replace?: boolean) => void;
  durationInDays: number;
}

const Pay: React.FC<Props> = ({ user, gotoSection, durationInDays, plans }) => {
  const currency: currency = "INR";

  const {
    loading,
    selectedPlan,
    anchorEl,
    isOpen,
    price,
    couponStatus,
    handleOpen,
    handleClose,
    handleApplyCode,
    onPay,
    removeCode,
  } = usePlanAnchor(
    user,
    durationInDays,
    currency,
    () => gotoSection("download"),
    plans
  );

  return (
    <div className="h-full relative z-0 mx-4">
      <div className="absolute inset-0 z-0">
        {loading ? (
          <LoadingModal fill="#ff735c" width={40} height={40} fixed={true} />
        ) : null}

        <CheckoutComp
          durationInDays={durationInDays}
          currency={currency}
          selectedPlan={selectedPlan}
          isOpen={isOpen}
          handleOpen={handleOpen}
          onPay={onPay}
          priceComp={
            <PriceComp
              price={price}
              currency={currency}
              couponStatus={couponStatus}
            />
          }
        >
          <CouponComp
            price={price}
            removeCode={removeCode}
            currency={currency}
            couponStatus={couponStatus}
            handleApplyCode={handleApplyCode}
          />
        </CheckoutComp>

        <PayOptions
          anchorEl={anchorEl}
          currency={currency}
          allPlans={plans}
          isOpen={isOpen}
          handleClose={handleClose}
          selectedPlan={selectedPlan}
        />

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          type="text/javascript"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
};

export default Pay;
