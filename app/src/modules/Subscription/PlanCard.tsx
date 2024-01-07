import { popularCardLike } from "@constants/imageKitURL";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import clsx from "clsx";
import { View, Text, Image, TouchableOpacity } from "react-native";
interface Props {
  isPopular?: true;
  features?: string[];
  duration: string;
  amount: string;
  onClick: () => void;
  basePlanName: string;
  basePlanStatus?: subscriptionStatus;
}

const PlanCard: React.FC<Props> = ({
  isPopular,
  features,
  duration,
  amount,
  onClick,
  basePlanName,
  basePlanStatus,
}) => {
  const isSub = basePlanStatus === "PAID_ONE";
  return (
    <TouchableOpacity onPress={isSub ? () => {} : onClick}>
      <View
        className={clsx(
          "min-h-[224px] border rounded-xl border-gray-100 flex flex-col",
          isPopular ? "relative" : ""
        )}
      >
        <View className=" flex-[0.3]">
          <Text
            className={clsx(
              "text-[#FF697E] py-2 text-base font-semibold text-center",
              isSub ? "line-through" : ""
            )}
          >
            {isPopular ? "Monthly Plan" : basePlanName}
          </Text>
          <Text
            className={clsx(
              "text-[#FF697E] text-2xl font-bold text-center",
              isSub ? "line-through" : ""
            )}
          >
            {amount}
          </Text>
        </View>
        <View className="flex-[0.6]">
          <View>
            {features?.map((item, index) => {
              return (
                <Text
                  key={`${item}-${index}`}
                  className="flex  items-center pt-1 px-2"
                >
                  <Text className="text-[#F5F5F7] py-1   font-medium pl-2 flex-1">
                    {index + 1}. {item}
                  </Text>
                </Text>
              );
            })}
          </View>
        </View>
        <View className=" flex-[0.1] border border-b-transparent border-l-transparent border-r-transparent border-t-[#F5F5F7] flex items-center justify-center py-2">
          <Text className="text-[#F5F5F7] text-center text-xs font-bold">
            {isSub ? "Already Subscribed" : duration}
          </Text>
        </View>
        {isPopular ? (
          <Image
            source={{ uri: popularCardLike }}
            className="w-4 h-4 iphoneX:w-5 iphoneX:h-5 absolute top-0 right-0 -translate-x-0.5 -translate-y-1"
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
export default PlanCard;
