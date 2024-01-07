import LandingHeaderV2 from "@templates/WomenTemplate/components/V2/LandingHeader";
import { Background } from "@templates/WomenTemplate/components/Background";
import { UserInterface } from "@models/User/User";
import { currency } from "@templates/OurPlans/Plan";
import Script from "next/script";
import LoadingModal from "@components/loading/LoadingModal";
import { useRouter } from "next/router";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import CheckoutComp from "./CheckoutComp";
import PayOptions from "./PayOptions";
import { usePlanAnchor } from "./usePlanAnchor";
import CouponComp from "./CouponComp";
import PriceComp from "./PriceComp";
import { SbPlans } from "@models/SbPlans/interface";

interface Props {
  user: UserInterface;
  durationInDays: number;
  currency: currency;
  splUID?: string;
  id?: string;
  plans: SbPlans[];
}

const PayTemplate: React.FC<Props> = ({
  user,
  durationInDays,
  currency,
  splUID,
  id,
  plans,
}) => {
  const router = useRouter();
  const { coachRef } = useCoachAtt();

  const onSuccess = () => {
    router.push({
      pathname: "/org/success",
      query: { platform: "android" },
    });
  };

  const {
    loading,
    selectedPlan,
    anchorEl,
    isOpen,
    handleOpen,
    handleClose,
    onPay,
    couponStatus,
    price,
    handleApplyCode,
    removeCode,
  } = usePlanAnchor(
    user,
    durationInDays,
    currency,
    onSuccess,
    plans,
    splUID,
    id
  );

  return (
    <div className="fixed inset-0 z-0 bg-[#100F1A] text-white scrollbar-hide">
      <Background imgUrl="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Rectangle_2192_1N9_WKdCM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674822458738" />

      {loading ? (
        <LoadingModal fill="#ff735c" width={40} height={40} fixed={true} />
      ) : null}

      <LandingHeaderV2
        route={`/start?origin=plans${coachRef ? `&${coachRef}` : ""}`}
        btnText="Reverse PCOD Now"
        activeLink="link_2"
        coachRef={coachRef}
      />

      <div className="w-full max-w-md mx-auto h-full p-4 pt-20 sm:pt-[92px]">
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
      </div>

      <PayOptions
        allPlans={plans}
        anchorEl={anchorEl}
        currency={currency}
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
  );
};

export default PayTemplate;
