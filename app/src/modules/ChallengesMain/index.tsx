import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import ViewSelectorGeneric from "@components/ViewSelector/Generic/ViewSelectorGeneric";
import GoalSection from "./GoalSection";
import LeaderboardSection from "./LeaderboardSection";
import FeedSection from "./FeedSection";
import clsx from "clsx";
import Header from "@modules/Header";
import { infoBtnRing } from "@constants/imageKitURL";
import ImageWithURL from "@components/ImageWithURL";
import { useNavigation } from "@react-navigation/native";

export type selectedChallengeViewType = "goals" | "leaderboard" | "feed";

const ChallengesMain = () => {
  const navigation = useNavigation();
  const [selectedView, setSelectedView] =
    useState<selectedChallengeViewType>("goals");

  const views: { label: selectedChallengeViewType; onPress: () => void }[] = [
    {
      label: "goals",
      onPress: () => setSelectedView("goals"),
    },
    {
      label: "leaderboard",
      onPress: () => setSelectedView("leaderboard"),
    },
    {
      label: "feed",
      onPress: () => setSelectedView("feed"),
    },
  ];

  return (
    <>
      <Header
        back={true}
        tone="dark"
        headerColor={selectedView === "goals" ? "#6D55D1" : "#232136"}
        centerTitle={true}
        titleNode={
          <View className="flex flex-row items-center">
            <Text
              className="text-white text-sm iphoneX:text-base mr-2"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Challenges
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChallengeDetailScreen", {
                  roundId: "",
                });
              }}
            >
              <ImageWithURL
                source={{ uri: infoBtnRing }}
                className="w-4 aspect-square"
              />
            </TouchableOpacity>
          </View>
        }
      />

      <View className="flex-1">
        <ViewSelectorGeneric
          views={views}
          currView={selectedView}
          bgColor={clsx(
            selectedView === "goals" ? "bg-[#6D55D1] " : "",
            "flex justify-center"
          )}
          fitToWidth={true}
        />
        {selectedView === "goals" ? (
          <GoalSection />
        ) : selectedView === "leaderboard" ? (
          <LeaderboardSection />
        ) : selectedView === "feed" ? (
          <FeedSection />
        ) : null}
      </View>
    </>
  );
};

export default ChallengesMain;
