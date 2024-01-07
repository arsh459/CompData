import { View, Text } from "react-native";
import React from "react";
import Header from "@modules/Header";
import FadingImages from "./FadingImages";
import CTAButton from "@modules/PeriodTrackerMain/MiddleCircleComponents/CTAButton";
import { goldLeagueBg } from "@constants/imageKitURL";

const EarnedFpMain = () => {
  return (
    <View className="flex-1">
      <Header headerColor="#232136" back={true} />
      <View className="h-10" />

      <FadingImages imageUrl={goldLeagueBg} />
      <View className="flex-1">
        <Text
          className="text-white/70 text-2xl w-3/4 mx-auto leading-4 pt-2"
          style={{ fontFamily: "Nunito-ExtraBold" }}
        >
          10 Fitpoints Earned
        </Text>
        <Text
          className="text-white/70 text-base w-3/4 mx-auto leading-4 pt-2"
          style={{ fontFamily: "Nunito-Regular" }}
        >
          You can use these Fitpoints to buy powerups and other real products
        </Text>
      </View>
      <CTAButton
        cta="Continue"
        onPress={() => {}}
        ctaTextColor="#FFFFFF"
        ctaClassStr="rounded-xl p-4 m-4"
        ctaTextClassStr="text-sm text-center"
        ctaColor="#6D55D1"
      />
      <View className="h-4" />
    </View>
  );
};

export default EarnedFpMain;
