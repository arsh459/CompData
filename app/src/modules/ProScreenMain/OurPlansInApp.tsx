import { View, Text, useWindowDimensions } from "react-native";
import { getDurationString } from "@hooks/purchases/utils";
import { PurchasesPackage } from "react-native-purchases";
import { PlanContent, planContent } from "./utils";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import ProPlanCardInApp from "./ProPlanCardInApp";

interface Props {
  purchaseRequested: number;
  setPurchaseStatus: (val: number) => void;
}

const OurPlansInApp: React.FC<Props> = ({
  purchaseRequested,
  setPurchaseStatus,
}) => {
  const { width } = useWindowDimensions();
  const { packages, makePurchase, res } = useSubscriptionContext();

  // console.log("packages", packages);

  const initiatePurchase = async (plan: PurchasesPackage) => {
    try {
      await makePurchase(plan);
      setPurchaseStatus(purchaseRequested + 1);

      weEventTrack("ProScreen_clickPlan", {
        value: plan.product.price,
        planId: plan.identifier,
        planName: plan.product.title,
      });
    } catch (error) {
      console.log("error in purchase", error);
    }
  };

  return (
    <>
      <Text
        className="text-[#FFFFFF] text-xl"
        style={{
          fontFamily: "Nunito-Bold",
          paddingTop: width * 0.16,
        }}
      >
        Choose Your Plan
      </Text>
      <View className="flex flex-row justify-between py-4">
        {packages.slice(0, 3).map((plan, index) => {
          const planDetails: PlanContent | undefined = planContent[index]
            ? planContent[index]
            : planContent[0];
          const duration = getDurationString(plan.packageType, plan.identifier);

          return (
            <ProPlanCardInApp
              active={res.planIdentifyer === plan.product.identifier}
              onPress={async () => {
                initiatePurchase(plan);
              }}
              plan={planDetails}
              key={plan.identifier}
              price={plan.product.price}
              duration={duration}
              currency={plan.product.currencyCode}
            />
            //
          );
        })}
      </View>
    </>
  );
};

export default OurPlansInApp;
