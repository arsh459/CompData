import IconTextBtn from "@components/Buttons/IconTextBtn";
import { View, Text } from "react-native";
import clsx from "clsx";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";
import { StackActions, useNavigation } from "@react-navigation/native";
import { shallow } from "zustand/shallow";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { usePostNavigationProvider } from "@modules/CircularProgressMain/providers/postNavigationProvider";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { getTodayFp } from "@providers/streakV2/utils/getTodayFp";
import {
  createTrackNavigationUtils,
  getNavAction,
} from "@modules/MealMain/utils/navUtils";
import { streakUpdate } from "@providers/streakV2/utils/streakUpdate";

interface Props {}

const Warning: React.FC<Props> = ({}) => {
  const navigation = useNavigation();

  const { todayUnix, today } = useAuthContext();
  const { uid } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
    };
  }, shallow);

  const setContinueCallback = usePostNavigationProvider(
    (state) => state.setContinueCallback,
    shallow
  );

  const { userStreak, todayStreakStatus, dailyFPTarget } = useStreakStore(
    (state) => ({
      userStreak: state.streak,
      dailyFPTarget: state.streak?.targetFp ? state.streak?.targetFp : 0,
      todayStreakStatus:
        state.streak && state.streak.streakMap[today]
          ? state.streak.streakMap[today]
          : undefined,
    }),
    shallow
  );
  const {
    streamingState,
    onResume,
    onQuit,
    onFinish,
    finalOrientation,
    attemptedDate,
  } = useWorkoutVideoStore((state) => {
    return {
      attemptedDate: state.attemptedDate,
      onFinish: state.onFinish,
      streamingState: state.streamingState,
      onResume: state.onResume,
      onQuit: state.onQuit,
      finalOrientation: state.finalOrientation,
    };
  }, shallow);

  const onQuitWrapper = () => {
    onQuit();
    navigation.goBack();
  };

  const onFinishWrapper = async () => {
    onFinish();

    console.log("today", today);
    console.log("attemptedDate", attemptedDate);

    // if task happened today
    if (today === attemptedDate && uid) {
      const todayFp = await getTodayFp(uid, todayUnix);

      console.log("todayFP", todayFp);

      const action = getNavAction(
        todayFp,
        dailyFPTarget,
        todayStreakStatus,
        userStreak
      );

      userStreak && (await streakUpdate(action, uid, today, userStreak));

      // console.log("action", action);

      const callback = createTrackNavigationUtils(navigation, 2, action);
      callback && setContinueCallback(callback);
    }

    setTimeout(() => {
      navigation.dispatch(
        StackActions.replace("CircularProgressScreen", { type: "fitpoint" })
      );

      // navigation.navigate("CircularProgressScreen", { type: "fitpoint" })
    }, 500);
  };

  return (
    <View className=" flex justify-center items-center relative z-0">
      {/* <Pressable
        className="absolute inset-0 w-full h-full -z-10"
        onPress={onResume}
      /> */}
      <View
        className={clsx(
          "bg-[#100F1A] border border-[#8F8F8F] rounded-xl p-3 iphoneX:p-5",
          finalOrientation === "landscape" ? "w-1/2" : "w-5/6"
        )}
      >
        <Text className="text-[#FF556C] text-base iphoneX:text-xl font-semibold">
          Do you want to Quit the workout?
        </Text>
        <View className="my-2 iphoneX:my-4">
          {!(streamingState === "init") ? (
            <IconTextBtn
              icon="resume"
              text="Resume Workout"
              contentColor="#F5F8FF"
              bgColor="#100F1A"
              onPress={onResume}
            />
          ) : null}
        </View>
        <IconTextBtn
          icon="quit"
          text="Quit Workout"
          contentColor="#F5F8FF"
          bgColor="#100F1A"
          onPress={onQuitWrapper}
        />
        {!(streamingState === "init") ? (
          <View className="my-2 iphoneX:my-4">
            <IconTextBtn
              icon="resume"
              text="Finish Workout"
              contentColor="#FF556C"
              bgColor="#100F1A"
              onPress={onFinishWrapper}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Warning;
