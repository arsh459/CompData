import Plan from "./Plan";
import { AppSubscription } from "@models/AppSubscription/AppSubscription";
import { useState } from "react";
import { subscriptionRequestV3 } from "@hooks/joinBoat/payUtils";
import { UserInterface } from "@models/User/User";
import LoadingModal from "@components/loading/LoadingModal";
import { useRouter } from "next/router";
import { deviceTypes } from "./SelectDevice";
import Header from "@templates/PaymentTemplate/Header";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import WhatsAppChat from "@components/WhatsAppChat";
import CurrencySwitch from "./CurrencySwitch";
import { PlanType } from "@constants/teams/plans";

const gradients = [
  "from-[#E376FF] to-[#FF57A2]",
  "from-[#FF7A7A] to-[#FF5F89]",
  "from-[#FFAA7A] to-[#E1C843]",
  "from-[#43C7E5] to-[#52F8D9]",
];

interface Props {
  user: UserInterface;
  planData: PlanType;
  heading?: string;
  deviceType: deviceTypes;
  onSuccess?: (selectedPlan: AppSubscription) => void;
}

export type currency = "USD" | "INR";

const SelectPlan: React.FC<Props> = ({
  planData,
  user,
  deviceType,
  onSuccess,
  heading,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [currency, setCurrency] = useState<currency>("INR");

  const onSinglePayRequest = async (plan: AppSubscription) => {
    if (plan.gameId) {
      const onSubscribeCallback = async () => {
        if (onSuccess) {
          onSuccess(plan);
        } else {
          router.push({
            pathname: "/org/success",
            query: { platform: deviceType },
          });
        }

        // success event
        if (plan.cost) {
          weEventTrack("conv_paid", {
            value: plan.cost,
            currency: currency,
            product_id: `${plan.durationInDays} days`,
            store: "web",
          });
        }

        weEventTrack("paywallSuccess_noClick", {});
      };

      setLoading(true);
      try {
        if (plan.cost && plan.durationInDays) {
          await subscriptionRequestV3(
            plan.id,
            user.uid,
            user.email ? user.email : "",
            user.phone ? user.phone : "",
            currency,
            currency === "INR" ? plan.cost : plan.usdCost,
            plan.durationInDays,
            user.name ? user.name : "no name",
            [],
            plan.sbPlanId,
            onSubscribeCallback,
            () => {},
            planData.companyCode
          );
          setLoading(false);
        } else if (plan.durationInDays) {
          onSubscribeCallback();
        }
      } catch (error) {
        setLoading(false);
        console.log("error", error);
      }
    }

    weEventTrack("paywall_clickPlan", {});
  };

  const onPaywallWAClick = () => {
    weEventTrack("paywall_clickWhatsApp", {});
  };

  return (
    <div className="w-full h-full flex-1 bg-[#100F1A] text-white flex flex-col justify-between md:items-center px-4 relative z-0 pt-20">
      {loading ? (
        <LoadingModal fill="#ff735c" width={40} height={40} fixed={true} />
      ) : null}
      <div>
        <Header eventName="paywall_clickLogo" noButton={true} />
        <h1 className="max-w-screen-xl md:mx-auto text-3xl sm:text-4xl lg:text-5xl font-extrabold py-6 pb-4 md:text-center font-baib">
          {heading ? heading : planData.plansTitle}
        </h1>

        <div className="flex pb-4">
          <CurrencySwitch selectedCurrency={currency} onChange={setCurrency} />
        </div>

        <div className="max-w-screen-xl md:mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {planData.plans.map((plan, index) => {
            const trialFinished = false;
            return trialFinished ? null : (
              <Plan
                onTap={onSinglePayRequest}
                key={`${plan.id}-${index}`}
                plan={plan}
                currency={currency}
                gradient={gradients[index % gradients.length]}
              />
            );
          })}
        </div>
      </div>
      <div className="flex-1">
        <img
          src="https://ik.imagekit.io/socialboat/tr:w-800,c-maintain-ratio/Screenshot_2022-07-25_at_2.01_2_IdiKAOiBT.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663411647876"
          className="w-full max-w-xl object-contain"
          alt="4 feet people"
        />
      </div>
      <WhatsAppChat
        redirectLink="https://api.whatsapp.com/send?phone=919958730020&text=Hi!"
        additionalFunc={onPaywallWAClick}
        position="right-5 bottom-5"
        popupMsg={`Have any questions?\nMessage us`}
      />
    </div>
  );
};

export default SelectPlan;
