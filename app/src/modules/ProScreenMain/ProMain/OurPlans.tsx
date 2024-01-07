import { View, useWindowDimensions } from "react-native";
import { planContent, PlanContent } from "../utils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserContext } from "@providers/user/UserProvider";
import { initiatePayment } from "../payUtils";
import { PlanTypes, SbPlans } from "@models/AppSubscription/AppSubscription";
import { useNavigation } from "@react-navigation/native";
import PlanV2Mobile, { currency } from "../PlanMobile";
import { Dispatch, SetStateAction, useState } from "react";
import PlanTypeSwitch from "./PlanTypeSwitch";
import PlanBrief from "./PlanBrief";
import { createFBRequest } from "@utils/analytics/webengage/fb/main";
import { format } from "date-fns";
import { useDeviceStore } from "@providers/device/useDeviceStore";
import { shallow } from "zustand/shallow";

export const paddingY = 80;

interface Props {
  setLoading: (val: boolean) => void;
  sbplans: SbPlans[];
  planType: PlanTypes;
  iPlanType: PlanTypes;
  setPlanType: Dispatch<SetStateAction<PlanTypes>>;
}

const OurPlans: React.FC<Props> = ({
  setLoading,
  sbplans,
  planType,
  iPlanType,
  setPlanType,
}) => {
  const { user } = useUserContext();
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const [currency, _] = useState<currency>("INR");
  const { deviceData } = useDeviceStore(
    (state) => ({ deviceData: state.data }),
    shallow
  );

  // console.log("plan", planType);

  const initiatePurchase = async (plan: SbPlans) => {
    if (user?.uid)
      try {
        setLoading(true);
        await initiatePayment(
          plan,
          async () => {
            setLoading(false);
            navigation.navigate("WelcomePro");

            createFBRequest(
              "Purchase",
              user.uid,
              `${format(new Date(), "yyyy-MM-dd")}`,
              deviceData,
              undefined,
              currency === "INR" ? plan.cost : plan.usdBaseCost,
              currency
            );
          },
          async () => setLoading(false),
          currency,
          user?.uid,
          user?.phone ? user.phone : "",
          user?.name ? user.name : "",
          [],
          plan.id,
          user?.email
        );
        // setPurchaseStatus((p) => p + 1);

        weEventTrack("ProScreen_clickPlan", {
          value: currency === "INR" ? plan.cost : plan.usdBaseCost,
          planId: plan.id,
          planName: plan.name || "",
        });

        // fb request
        createFBRequest(
          "InitiateCheckout",
          user.uid,
          `${format(new Date(), "yyyy-MM-dd")}`,
          deviceData,
          undefined,
          currency === "INR" ? plan.cost : plan.usdBaseCost,
          currency
        );
      } catch (error) {
        setLoading(false);
        console.log("error in purchase", error);
      }
  };

  return (
    <View className="p-4" style={{ height: height - 2 * paddingY }}>
      {/* <CurrencyToggler currency={currency} setCurrency={setCurrency} /> */}

      {iPlanType === "proPlus" ? (
        <View className="h-12" />
      ) : (
        <PlanTypeSwitch planType={planType} setPlanType={setPlanType} />
      )}
      <View className="flex-1" />
      <PlanBrief planType={planType} />
      <View className="flex flex-row justify-between py-4">
        {sbplans?.slice(0, 3)?.map((plan, index) => {
          const planDetails: PlanContent | undefined = planContent[index];

          return (
            <PlanV2Mobile
              currency={currency}
              plan={plan}
              PlanContent={planDetails}
              isActive={false}
              onTap={async () => {
                await initiatePurchase(plan);
              }}
              key={plan.name}
            />
          );
        })}
      </View>
    </View>
  );
};

export default OurPlans;
