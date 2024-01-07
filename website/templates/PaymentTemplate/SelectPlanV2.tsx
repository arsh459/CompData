import { orgTypes } from "@constants/organization";
// import Plan from "./Plan";
import { AppSubscription } from "@models/AppSubscription/AppSubscription";
import { useState } from "react";
import { subscriptionRequestV3 } from "@hooks/joinBoat/payUtils";
import { UserInterface } from "@models/User/User";
import LoadingModal from "@components/loading/LoadingModal";
import { useRouter } from "next/router";
import { deviceTypes } from "./SelectDevice";
import { internalFreeTrialRequest } from "@utils/payments/payRequest";
// import { useUserAppPlan } from "@hooks/subscription/useUserAppPlan";
import Header from "@templates/PaymentTemplate/Header";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import WhatsAppChat from "@components/WhatsAppChat";
// import CurrencySwitch from "./CurrencySwitch";
// import ProPlanCard from "@templates/joinBoatTemplate/V5/Components/ProPlanCard";
import PlanV2 from "./PlanV2";
import clsx from "clsx";
// import CurrencySwitchV2 from "./CurrencySwitchV2";
import {
  Background,
  WomenImg,
} from "@templates/WomenTemplate/components/Background";
import { getAccessBgImg } from "@constants/icons/iconURLs";

const gradients = [
  "from-[#E376FF] to-[#FE5FB2]",
  "from-[#FF6B77] to-[#FFAB70]",
  "from-[#3FB9E8] to-[#54FED7]",
  "from-[#43C7E5] to-[#52F8D9]",
];

interface Props {
  organization: orgTypes;
  user: UserInterface;

  heading?: string;
  deviceType: deviceTypes;
  onSuccess?: (selectedPlan: AppSubscription) => void;
}

export type currency = "USD" | "INR";

const SelectPlanV2: React.FC<Props> = ({
  organization,
  user,
  deviceType,
  onSuccess,
  heading,
}) => {
  // const { plans } = useSubscriptionPlans(TEAM_ALPHABET_GAME);
  const [loading, setLoading] = useState<boolean>(false);
  const [currency] = useState<currency>("INR");

  const router = useRouter();

  // const { savedPlan } = useUserAppPlan(
  //   user.uid,
  //   organization.plans.length ? organization.plans[0].id : ""
  // );
  // console.log("sav", savedPlan);

  const onSinglePayRequest = async (plan: AppSubscription) => {
    // console.log("hi", plan.gameId);
    if (plan.gameId) {
      // console.log("hi 2", plan.gameId);
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

        // success
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
            organization.name
          );
          setLoading(false);
        } else if (plan.durationInDays) {
          await internalFreeTrialRequest(
            plan.id,
            organization.name,
            user.uid,
            plan.durationInDays
          );

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
    <div className="w-full h-full flex-1 bg-[#100F1A] text-white flex flex-col justify-center   md:items-center  relative z-0 ">
      {loading ? (
        <LoadingModal fill="#ff735c" width={40} height={40} fixed={true} />
      ) : null}
      <Header eventName="paywall_clickLogo" noButton={true} />
      <WomenImg imgUrl={getAccessBgImg} />
      <Background />
      <div className="px-4 mt-36 sm:mt-0">
        <h2
          className="md:text-center font-extrabold  font-baib text-2xl sm:pb-8 sm:text-4xl md:text-5xl xl:text-6xl"
          // className=" md:mx-auto text-3xl sm:text-4xl lg:text-5xl font-extrabold pb-12 text-center font-baib"
        >
          Choose your Plan
        </h2>
        <div className="pt-4 flex">
          {organization.plans.slice(0, 3).map((plan, index) => {
            return (
              <div className={clsx("flex-1  mr-4")} key={`${plan.id}-${index}`}>
                <PlanV2
                  onTap={onSinglePayRequest}
                  plan={plan}
                  currency={currency}
                  gradient={gradients[index % gradients.length]}
                />
              </div>
            );
          })}
        </div>
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

export default SelectPlanV2;
