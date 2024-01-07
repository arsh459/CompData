import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  AppSubscription,
  SbPlans,
} from "@models/AppSubscription/AppSubscription";
import { getPrefixSuffix } from "./GetAccessMain/utils";
import { percentIcon } from "@constants/imageKitURL";
import { PlanContent } from "./utils";
import { LinearGradient } from "expo-linear-gradient";
import clsx from "clsx";
import GradientText from "@components/GradientText";

export type currency = "USD" | "INR";

interface Props {
  plan: SbPlans;
  gradient?: string;
  isActive?: boolean;
  currency: currency;
  onTap: () => void;
  loading?: AppSubscription;
  PlanContent?: PlanContent;
}

const PlanV2Mobile: React.FC<Props> = ({
  plan,
  gradient,
  isActive,
  currency,
  onTap,
  loading,
  PlanContent,
}) => {
  // console.log(plan.mostPopular);

  const duration = getPrefixSuffix(
    plan.durationInDays ? plan.durationInDays : 0
  );
  const isOneMonth = plan?.durationInDays === 30;

  const discountPerc = Math.round(
    (((plan?.baseCost ? plan.baseCost : 0) - plan.cost) /
      (plan?.baseCost ? plan.baseCost : 0)) *
      100
  );

  return (
    <TouchableOpacity
      onPress={onTap}
      className={clsx(
        "w-[30%] aspect-[113/131] rounded-2xl flex  flex-col justify-between relative z-0",
        !isOneMonth && "rounded-t-none"
      )}
      style={{ backgroundColor: PlanContent?.bgColor }}
    >
      {/* Discount Label */}
      {!plan.mostPopular && discountPerc ? (
        <View
          className={`
            absolute left-0 right-0 -bottom-6 -z-10 flex flex-row items-center pt-4 flex-1 justify-center
          `}
        >
          <Image
            source={{ uri: percentIcon }}
            className="w-3 lg:w-5 aspect-square"
          />
          <Text className="text-center font-popR text-xs text-white/70 pl-1.5">
            {discountPerc}% Sale Offer
          </Text>
        </View>
      ) : null}

      {/* Most Popular Label */}
      {plan.mostPopular ? (
        <View
          className={`
            absolute left-0 right-0 -bottom-6 -z-10 flex items-center pt-4 flex-1 justify-center
          `}
        >
          <GradientText
            text={"Most Popular"}
            textStyle={{
              fontSize: 12,

              marginBottom: 0,
              color: "white",
            }}
            colors={PlanContent?.colors || ["transparent", "transparent"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            fallbackColor="white"
          />
        </View>
      ) : null}

      {/* Original Price Label */}
      {!isOneMonth && (
        <View
          className={clsx(
            "absolute left-0 right-0 -top-6 -z-10  rounded-t-2xl flex items-center flex-1 justify-center border-b-[1px] border-white/10"
          )}
          style={{ backgroundColor: PlanContent?.bgColor }}
        >
          <Text className="text-center font-popR text-xs line-through text-white/30 py-1 z-20">
            {currency}{" "}
            {currency === "INR"
              ? plan.baseCost && Math.round(plan.baseCost)
              : plan.usdBaseCost}
          </Text>
        </View>
      )}

      {/* Main Price */}
      <View className=" pt-2.5 leading-tight  flex-1 flex justify-around">
        <Text
          className="text-xl pl-4 text-white font-semibold"
          style={{ lineHeight: 21 }}
        >
          <Text>{currency}</Text>
          {"\n"}
          <Text>
            {currency === "INR" ? Math.round(plan.cost) : plan.usdCost}
          </Text>
        </Text>

        {duration.nbMonth > 1 ? (
          <Text className="text-[10px] text-white/30 text-center ">
            {currency}{" "}
            {currency === "INR"
              ? plan.durationInDays && Math.round(plan.cost / duration.nbMonth)
              : Math.round(plan.usdCost / duration.nbMonth)}
            /month
          </Text>
        ) : (
          <Text className="text-[10px] text-white/30 text-center " />
        )}
      </View>

      {/* Duration Label */}
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={PlanContent?.colors || ["transparent", "transparent"]}
        className={`
          
          rounded-b-2xl 
        `}
      >
        <Text
          className="text-center text-sm py-2 text-black"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {plan.cost === 0 ? "∞" : duration.prefix}{" "}
          {plan.cost === 0 ? "days" : duration?.suffix?.split(" ")[0]}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PlanV2Mobile;
