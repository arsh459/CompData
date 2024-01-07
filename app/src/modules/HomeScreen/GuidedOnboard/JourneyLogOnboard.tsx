// import { useUserContext } from "@providers/user/UserProvider";
import UseModal from "@components/UseModal";
import { RefObject } from "react";
import { ScrollView, Text, View } from "react-native";
import PopupForRef from "./PopupForRef";
import ActivityLogs from "@modules/JourneyLogMain/ActivityLogs";
import FitPointStreak from "@modules/JourneyLogMain/FitPointStreak";
import SvgIcons from "@components/SvgIcons";
import { useUserContext } from "@providers/user/UserProvider";

export type onboardJourneyStateType =
  | "unknown"
  | "welcome"
  | "FitPointStreak"
  | "ActivityLogs";

interface Props {
  onboardState: onboardJourneyStateType;
  setOnboardState: (val: onboardJourneyStateType) => void;
  FitPointStreakRef: RefObject<View>;
  ActivityLogsRef: RefObject<View>;
  scrollRef: RefObject<ScrollView>;
}

const JourneyLogOnboard: React.FC<Props> = ({
  onboardState,
  setOnboardState,
  scrollRef,
  ActivityLogsRef,
  FitPointStreakRef,
}) => {
  const { user } = useUserContext();

  // const fpString = user?.dailyFPTarget ? user.dailyFPTarget : 20;
  // user?.fitnessGoal?.length && user.fitnessGoal[0];

  return (
    <UseModal
      visible={onboardState !== "unknown"}
      onClose={() => setOnboardState("unknown")}
      width="w-full"
      height="h-full"
      tone="dark"
      blurAmount={20}
      fallbackColor="#232136"
    >
      <>
        {onboardState === "welcome" ? (
          <View className="flex  items-center justify-center flex-1">
            <View className="w-10 aspect-square ">
              <SvgIcons iconType="journeyLog" />
            </View>
            <Text className="text-white pt-10   text-2xl text-center w-3/5 font-bold  iphoneX:text-3xl">
              Welcome {user?.name} To Journey Log
            </Text>
          </View>
        ) : onboardState === "FitPointStreak" ? (
          <PopupForRef
            target={FitPointStreakRef}
            onPressCta={() => setOnboardState("ActivityLogs")}
            popupText={`These are your daily fitpoints that you have earned everyday`}
            // scrollRef={scrollRef}
            // popupCtaStyleTw="bg-indigo-500 py-2.5 rounded-2xl"
            // popupCtaTextStyleTw="text-sm iphoneX:text-base text-white font-bold text-center"
          >
            <FitPointStreak />
          </PopupForRef>
        ) : onboardState === "ActivityLogs" ? (
          <PopupForRef
            target={ActivityLogsRef}
            onPressCta={() => setOnboardState("unknown")}
            popupText={`These trackers help you to track your overall Health progress`}
            // scrollRef={scrollRef}
            // popupCtaStyleTw="bg-indigo-500 py-2.5 rounded-2xl"
            // popupCtaTextStyleTw="text-sm iphoneX:text-base text-white font-bold text-center"
          >
            <ActivityLogs />
          </PopupForRef>
        ) : null}
      </>
    </UseModal>
  );
};

export default JourneyLogOnboard;
