import { ScrollView, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import { useDNSNav } from "@providers/dnLinks/hooks/useDNSNav";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { updateLastGameId } from "@models/User/createUtils";
import TodayFp from "./MyProgress/TodayFp";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import HomeHeaderV2 from "./HomeHeaderV2";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import crashlytics from "@react-native-firebase/crashlytics";
import ExploreAll from "./ExploreAll";
import MyPlanElement from "./MyPlanV2/MyPlanElement";
import HomeGuidedOnboard from "./GuidedOnboard";
import KnowledgeCarousal from "@modules/Knowledge/KnowledgeCarousal";
import ScrollableItemChat from "./SakhiComponents/ScrollableItemChat";
import BotFloatingContent from "./SakhiComponents/BotFloatingContent";
import {
  OnboardProvider,
  useOnboardContext,
} from "./GuidedOnboard/OnboardProvider";
import TestimonialsCarousal from "./TestimonialsCarousal";
import { useDNContext } from "@providers/dnLinks/DNProvider";
import { useNetConnection } from "@hooks/netinfo/useNetConnection";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import ChallengeCardHolder from "./ChallengeCardHolder";
// import { useUserStreakV2 } from "@providers/streakV2/hooks/useUserStreakV2";
// import { useNavigation } from "@react-navigation/native";
// import SvgIcons from "@components/SvgIcons";
import SearchBarV2 from "./SearchBarV2";

export type popupType = "CANCELLED" | "DONE" | "PENDING";

const HomeScreen = () => {
  return (
    <OnboardProvider>
      <HomeScreenHelperComp />
    </OnboardProvider>
  );
};

export default HomeScreen;

const HomeScreenHelperComp = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const { top } = useSafeAreaInsets();
  const { todayFp, scrollRef } = useOnboardContext();
  // const navigation = useNavigation();
  // const route = useRoute();
  useNetConnection();

  useDNSNav();
  useScreenTrack();
  const { state } = useAuthContext();
  const { dnResult } = useDNContext();

  const showOnboard = useUserStore(
    ({ user }) =>
      !user?.flags?.bootcampOnboarded ||
      !user?.guidedOnboardDone ||
      user?.unseenAwards?.length ||
      !user.flags.appointmentFlag ||
      (user.slotIntervention && user.slotIntervention !== "none"),
    shallow
  );

  useEffect(() => {
    if (state.uid && state.gameId) {
      updateLastGameId(state.uid, state.gameId).catch((e) => {
        console.log("error in updating gameId");
        crashlytics().recordError(e);
      });
    }
  }, [state.uid, state.gameId]);

  return (
    <View
      className="flex-1 relative z-0 w-full bg-[#232136]"
      style={{ paddingTop: top }}
    >
      <ScrollView
        ref={scrollRef}
        className="relative flex-1"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="m-4">
          <HomeHeaderV2 />
        </View>
        <View className="px-4">
          <SearchBarV2 />
        </View>
        <View className="h-4" />

        <View ref={todayFp} collapsable={false} className="mx-4 mb-4">
          <TodayFp />
        </View>

        <View className="pt-4">
          <MyPlanElement />
        </View>
        <View className="h-4" />

        <ChallengeCardHolder />
        <ScrollableItemChat />

        <KnowledgeCarousal />

        <TestimonialsCarousal />

        <View className="pt-4">
          <ExploreAll />
        </View>

        <View style={{ height: tabBarHeight + 24 }} />
      </ScrollView>

      {(!dnResult || dnResult.route === "Home") && showOnboard ? (
        <HomeGuidedOnboard />
      ) : null}

      <BotFloatingContent offsetBottom={tabBarHeight} />
    </View>
  );
};
