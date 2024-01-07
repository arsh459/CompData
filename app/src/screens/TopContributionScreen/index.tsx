import { View, Text } from "react-native";
import React from "react";
import Header from "@modules/Header";
import TopContribution from "@modules/TopContribution";
import { useRoute } from "@react-navigation/native";
import { SingleBadgeProvider } from "@providers/Badge/BadgeProvider";
export interface TopContributionProps {
  badgeId: string;
}
const TopContributionScreen = () => {
  const route = useRoute();
  const { badgeId } = route.params as TopContributionProps;
  return (
    <View className="flex-1 bg-[#232136]">
      <Header
        back={true}
        tone="dark"
        headerColor="#232136"
        titleNode={
          <View className="flex flex-row items-center">
            <Text
              className="text-white text-sm iphoneX:text-base mr-4"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              My Top Contibutors
            </Text>
          </View>
        }
        centerTitle={true}
      />
      {badgeId && (
        <SingleBadgeProvider badgeId={badgeId}>
          <TopContribution />
        </SingleBadgeProvider>
      )}
    </View>
  );
};

export default TopContributionScreen;
