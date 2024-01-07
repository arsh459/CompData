import { View, Text } from "react-native";
import React from "react";
import Header from "@modules/Header";
import FadingImages from "./FadingImages";
import GradientText from "@components/GradientText";
import CTAButton from "@modules/PeriodTrackerMain/MiddleCircleComponents/CTAButton";
import { goldLeagueBg } from "@constants/imageKitURL";

const UnlockedLeagueMain = () => {
  return (
    <View className="flex-1">
      <Header headerColor="#232136" back={true} />
      <View className="h-10" />

      <FadingImages imageUrl={goldLeagueBg} />
      <View className="flex-1">
        <GradientText
          text={"Gold League"}
          colors={["#FCF69A", "#E3B733"]}
          // start={{ x: 0, y: 1 }}
          // end={{ x: 1, y: 0 }}
          textStyle={{
            fontFamily: "Nunito-ExtraBold",
            fontSize: 28,
            textAlign: "center",
          }}
        />
        <Text
          className="text-white/70 text-base w-3/4 mx-auto leading-4 pt-2"
          style={{ fontFamily: "Nunito-Regular" }}
        >
          You have unlocked the gold league. Complete daily task to unlock other
          leagues.
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

export default UnlockedLeagueMain;
