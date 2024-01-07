// import { UserProvider } from "@providers/user/UserProvider";
import Header from "@modules/Header";
import HeaderTitleNode from "./HeaderTitleNode";
// import { BadgeProvider } from "@providers/badges/BadgeProvider";
// import BadgeScroll from "./BadgeScroll/BadgeScroll";
// import StatsSection from "./Stats/StatsSection";
import { Pressable, ScrollView, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
// import { TeamProgressProvider } from "@providers/teamProgress/TeamProgressProvider";
import { useEffect, useState } from "react";
import BlurBG from "@components/BlurBG";
import NotifyBell from "@components/SvgIcons/NotifyBell";
import { useNavigation } from "@react-navigation/native";
import { useDNSNav } from "@providers/dnLinks/hooks/useDNSNav";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { updateLastGameId } from "@models/User/createUtils";
import { LinearGradient } from "expo-linear-gradient";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import crashlytics from "@react-native-firebase/crashlytics";
// import { useSteps } from "@hooks/steps/useSteps";
// import MyGoalHome from "./MyGoal";
// import ArenaDetail from "./MyGoal/ArenaDetail";
// import ArenaProgress from "./MyGoal/ArenaProgress";
// import TapList from "./MyGoal/TapList";
// import ArenaHolder from "./MyGoal/ArenaHolder";
// import BadgeScrollV2 from "./BadgeScroll/BadgeScrollV2";
// import StepCounter from "@modules/StepCounter";
// import { useSteps } from "@hooks/steps/useSteps";
// import SbAffirmation from "./MyGoal/SbAffirmation";
// import { usePortrait } from "@hooks/orientation/usePortrait";

/**
 * taskId -> stepsStore
 * backgroundfetch -> to store in db
 * if save fails, store in async storage
 * onAppLoad -> getItems from async storage, save in db, remove from storage
 *
 */

const HomeScreenV2 = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [isBlured, setIsBlured] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const navigation = useNavigation();
  // const [isProgress, setIsProgress] = useState(false);
  useDNSNav();
  // useSteps();

  const { state } = useAuthContext();
  // useLandscape();
  // usePortrait();

  useEffect(() => {
    if (state.uid && state.gameId) {
      updateLastGameId(state.uid, state.gameId).catch((e) => {
        console.log("error in updating gameId");
        crashlytics().recordError(e);
      });
    }
  }, [state.uid, state.gameId]);

  const handleScroll = (yOffset: number) => {
    if (yOffset > 0) {
      setIsBlured(true);
    } else {
      setIsBlured(false);
    }
  };

  const onNotificationBellPress = () => {
    weEventTrack("home_clickNotification", {});
    navigation.navigate("Notification");
  };

  // return <View className="h-full"></View>;

  return (
    // <UserProvider>
    <>
      <Header
        titleNode={<HeaderTitleNode />}
        setHeaderHeight={setHeaderHeight}
        defaultOption={true}
        headerColor="#100F1A"
        headerType="transparent"
        tone="dark"
        optionNode={
          <Pressable
            className="w-6 iphoneX:w-7 aspect-square flex items-center mr-2 justify-center"
            onPress={onNotificationBellPress}
          >
            <NotifyBell showDot={true} />
          </Pressable>
        }
      />

      <LinearGradient
        colors={["#2E2A6A", "#181625", "#141320", "#100F1A"]}
        className=" flex-1"
      >
        <ScrollView
          className="relative flex-1"
          bounces={false}
          onScroll={(e) => handleScroll(e.nativeEvent.contentOffset.y)}
          scrollEventThrottle={16}
        >
          <View style={{ height: headerHeight }} />

          {/* <SbAffirmation
            textString1="Your Fitpoints are Calculated "
            textString2="Tap to View Fitpoints"
          /> */}

          <View style={{ height: tabBarHeight }} />
        </ScrollView>
      </LinearGradient>
      {isBlured ? (
        <BlurBG
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: headerHeight,
          }}
          blurType="dark"
          blurAmount={10}
          fallbackColor="#100F1A"
        />
      ) : null}
    </>
    // </UserProvider>
  );
};

export default HomeScreenV2;
