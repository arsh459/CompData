import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import GradientText from "@components/GradientText";
import { PlanContent } from "./utils";
import clsx from "clsx";
import { getPrefixSuffix } from "./GetAccessMain/utils";

interface Props {
  plan: PlanContent;
  currency: string;
  duration: string;
  price: string;
  onPress: () => Promise<void>;
  active: boolean;
  durationInDays: number;
}

const ProPlanCard: React.FC<Props> = ({
  onPress,
  plan,
  currency,
  duration,
  price,
  active,
  durationInDays,
}) => {
  const { bgColor, colors } = plan;
  const { width } = useWindowDimensions();
  const durationPlan = getPrefixSuffix(durationInDays ? durationInDays : 0);
  const cardWidth = width * 0.28;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={clsx("rounded-xl", active ? "border-2" : "border")}
        style={{
          width: cardWidth,
          borderColor: active ? colors[1] : "#FFFFFF42",
        }}
      >
        <View
          className="backdrop-blur-3xl items-center p-2 rounded-t-xl"
          style={{ backgroundColor: bgColor }}
        >
          <GradientText
            text={currency}
            textStyle={{
              fontSize: Math.min(cardWidth * 0.115, 14),
              fontFamily: "Nunito-Bold",
              color: "white",
            }}
            noWrap={true}
            colors={colors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            fallbackColor="white"
          />
          <GradientText
            text={price}
            textStyle={{
              fontSize: Math.min(cardWidth * 0.2, 28),
              fontFamily: "Nunito-Bold",
              color: "white",
              textAlign: "center",
            }}
            noWrap={true}
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
            className="text-center py-2 iphoneX:text-sm text-[#000000] whitespace-nowrap"
            style={{
              fontFamily: "Nunito-Bold",
              fontSize: Math.min(cardWidth * 0.1, 12),
            }}
          >
            {price === "0" ? "∞" : durationPlan.prefix}{" "}
            {price === "0" ? "days" : durationPlan.suffix}
          </Text>
        </LinearGradient>
      </View>
      {active ? (
        <GradientText
          text="Currently Active"
          textStyle={{
            fontSize: Math.min(cardWidth * 0.1, 12),
            fontFamily: "Nunito-bold",
            color: "white",
            textAlign: "center",
          }}
          noWrap={true}
          colors={colors}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          fallbackColor="white"
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default ProPlanCard;
