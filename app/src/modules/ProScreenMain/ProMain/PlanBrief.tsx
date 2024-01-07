import { View, Text, TextStyle } from "react-native";
import React from "react";
import { PlanTypes } from "@models/AppSubscription/AppSubscription";
import GradientText from "@components/GradientText";
interface Props {
  planType: PlanTypes;
}
const PlanBrief: React.FC<Props> = ({ planType }) => {
  const textStyle: TextStyle = {
    fontFamily: "Nunito-Bold",
    fontSize: 28,
    textAlign: "center",
  };

  const colors =
    planType === "proPlus"
      ? ["#FF8C8C", "#FF317B", "#FF477D"]
      : ["#CCA467", "#CCA467", "#CCA467"];
  return (
    <View>
      <View className="flex flex-row ">
        <GradientText
          text={"SocialBoat"}
          colors={["#fff", "#fff"]}
          textStyle={{ ...textStyle, paddingRight: 10 }}
        />
        <GradientText
          text={planType === "proPlus" ? "Pro Plus" : "Pro"}
          colors={colors}
          start={{ x: 0, y: 0 }} // Starting point (top-left)
          end={{ x: 1, y: 1 }}
          textStyle={textStyle}
        />
      </View>
      {planType === "proPlus" ? (
        <Text className="font-popR text-sm sm:text-base text-white/70 py-4">
          Everything in pro with{" "}
          <Text className="text-[#FF6098]">LIVE yoga</Text> sessions on{" "}
          <Text className="text-[#61BDFF]">ZOOM</Text>, 4 days a week.
        </Text>
      ) : (
        <Text className="font-popR text-sm sm:text-base text-white/70 py-4">
          Workout with follow along videos, weekly diet sessions and doctor
          consultations
        </Text>
      )}
    </View>
  );
};

export default PlanBrief;
