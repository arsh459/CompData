import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import GradientText from "@components/GradientText";
import { iPhoneX } from "@constants/screen";
import { PlanContent } from "./utils";
import clsx from "clsx";
interface Props {
  plan: PlanContent;
  currency: string;
  duration: string;
  price: number;
  onPress: () => Promise<void>;
  active: boolean;
}
const ProPlanCardInApp: React.FC<Props> = ({
  onPress,
  plan,
  currency,
  duration,
  price,
  active,
}) => {
  const { bgColor, colors } = plan;
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={clsx(" rounded-xl  ", active ? "border-2" : "border")}
        style={
          active
            ? {
                width: width * 0.28,
                borderColor: colors[1],
                //borderColor: "#FFFFFF42"
              }
            : {
                width: width * 0.28,
                borderColor: "#FFFFFF42",
              }
        }
      >
        <View
          className="  backdrop-blur-3xl  items-center p-2 rounded-t-xl "
          style={{ backgroundColor: bgColor }}
        >
          <GradientText
            text={currency}
            textStyle={{
              fontSize: width > iPhoneX ? 14 : 12,
              fontFamily: "Nunito-Bold",
              color: "white",
            }}
            colors={colors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            fallbackColor="white"
          />
          <GradientText
            text={currency === "INR" ? Math.round(price) : price.toFixed(2)}
            textStyle={{
              fontSize: width > iPhoneX ? 28 : 24,
              fontFamily: "Nunito-Bold",
              color: "white",
              textAlign: "center",
            }}
            colors={colors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            fallbackColor="white"
          />
        </View>
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={colors}
          className="rounded-b-xl"
        >
          <Text
            className="text-center py-2  text-xs iphoneX:text-sm text-[#000000]"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {duration}
          </Text>
        </LinearGradient>
      </View>
      {active ? (
        <GradientText
          text="Currently Active"
          textStyle={{
            fontSize: 12,
            fontFamily: "Nunito-bold",
            color: "white",
            textAlign: "center",
            lineHeight: width > iPhoneX ? 34 : 28,
            // paddingBottom: 20,
          }}
          colors={colors}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          fallbackColor="white"
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default ProPlanCardInApp;
