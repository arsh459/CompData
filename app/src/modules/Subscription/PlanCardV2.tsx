import GradientText from "@components/GradientText";
import { iPhoneX } from "@constants/screen";
import { getDuration } from "@hooks/purchases/utils";
import clsx from "clsx";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { PACKAGE_TYPE } from "react-native-purchases";
import { storedDescriptions } from "./constants";
interface Props {
  amount: string;
  onClick: () => void;
  active?: boolean;
  currency: string;
  durationLabel: PACKAGE_TYPE;
  description: string;
  id: string;
  colors: string[];
}

const PlanCardV2: React.FC<Props> = ({
  active,
  amount,
  onClick,
  currency,
  durationLabel,
  id,
  description,
  colors,
}) => {
  const days =
    durationLabel === "MONTHLY"
      ? 30
      : durationLabel === "WEEKLY"
      ? 7
      : getDuration(id);
  const { width } = useWindowDimensions();
  const descriptionArray = storedDescriptions[id]
    ? storedDescriptions[id]
    : [description];

  return (
    <>
      {days === 1 ? <View className="py-4 border border-t-white" /> : null}
      <TouchableOpacity onPress={onClick}>
        <View
          style={{}}
          className={clsx(
            active ? "border-green-500" : "border-[#373643] ",
            "border-[1px] min-h-[120px] cursor-pointer bg-[#292832] rounded-xl p-4 flex flex-row"
          )}
        >
          <View className="w-1/4 flex items-center justify-center">
            <GradientText
              text={days}
              colors={colors}
              textStyle={{
                fontWeight: "bold",
                fontFamily: "BaiJamjuree-Bold",
                fontSize: width > iPhoneX ? 60 : 40,
              }}
            />
            <GradientText
              text={days > 1 ? "Days" : "Day"}
              colors={colors}
              textStyle={{
                fontWeight: "bold",
                fontFamily: "BaiJamjuree-Bold",
                fontSize: width > iPhoneX ? 20 : 18,
              }}
            />
          </View>
          <View className="px-4 w-3/4 flex justify-center">
            <View className="flex flex-row items-end">
              <GradientText
                text={`@ ${currency} ${amount}`}
                colors={colors}
                textStyle={{
                  fontWeight: "bold",
                  fontFamily: "BaiJamjuree-Bold",
                  fontSize: width > iPhoneX ? 20 : 18,
                }}
              />
              {active ? (
                <GradientText
                  text="Active"
                  colors={colors}
                  textStyle={{
                    // fontWeight: "bold",
                    fontFamily: "BaiJamjuree-Medium",
                    fontSize: width > iPhoneX ? 14 : 12,
                    paddingLeft: 8,
                  }}
                />
              ) : null}
            </View>
            <View className="pt-2 iphoneX:pt-4">
              {descriptionArray.map((item) => {
                return (
                  <View key={`${item}-${id}`} className="pb-1">
                    <Text className="text-[#DDDFF4] text-xs break-all">
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default PlanCardV2;
