import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GoalSection from "@modules/ChallengesMain/GoalSection";
import LeaderboardSection from "@modules/ChallengesMain/LeaderboardSection";
import FeedSection from "@modules/ChallengesMain/FeedSection";
import Header from "@modules/Header";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import ChallengesHeader from "../HeaderComponents/ChallengesHeader";
import { View } from "react-native";

const Tab = createMaterialTopTabNavigator();

export type selectedChallengeViewType = "goals" | "leaderboard" | "feed";

export interface ChallengeScreenParams {
  initialRouteName?: selectedChallengeViewType;
  roundId: string;
}

const ChallengeScreenMain = () => {
  const route = useRoute();
  const params = route.params as ChallengeScreenParams;

  const [headerColor, setHeaderColor] = useState<string>(
    !params?.initialRouteName || params?.initialRouteName === "goals"
      ? "#6D55D1"
      : "#232136"
  );

  const handleRouteChange = (routeName: selectedChallengeViewType) => {
    setHeaderColor(routeName !== "goals" ? "#232136" : "#6D55D1");
  };

  const onGoalClick = () => {
    handleRouteChange("goals");
    weEventTrack("ChallengesScreen_clickGoal", {});
  };
  const onLeaderboardClick = () => {
    handleRouteChange("leaderboard");
    weEventTrack("ChallengesScreen_clickLeaderboard", {});
  };
  const onFeedClick = () => {
    handleRouteChange("feed");
    weEventTrack("ChallengesScreen_clickFeed", {});
  };

  return (
    <View className="flex-1">
      <Header
        back={true}
        tone="dark"
        // headerColor={selectedView === "goals" ? "#6D55D1" : "#232136"}
        headerColor={headerColor}
        centerTitle={true}
        titleNode={<ChallengesHeader />}
      />

      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "#232136" }}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: headerColor,
            shadowColor: "#00000000",
          },
          tabBarLabelStyle: {
            color: "#FFFFFF",
            fontFamily: "Nunito-SemiBold",
            textTransform: "capitalize",
          },
          tabBarIndicatorStyle: { backgroundColor: "#FFFFFF" },
          swipeEnabled: false,
          lazy: true,
        }}
        initialRouteName={params?.initialRouteName || "goals"}
      >
        <Tab.Screen
          name="goals"
          component={GoalSection}
          listeners={{
            tabPress: onGoalClick,
          }}
        />
        <Tab.Screen
          name="leaderboard"
          component={LeaderboardSection}
          listeners={{
            tabPress: onLeaderboardClick,
          }}
        />
        <Tab.Screen
          name="feed"
          component={FeedSection}
          listeners={{
            tabPress: onFeedClick,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default ChallengeScreenMain;
