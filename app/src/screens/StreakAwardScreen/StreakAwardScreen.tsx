// import ImageWithURL from "@components/ImageWithURL";
// import { goldenFlame } from "@constants/imageKitURL";
// import StreakComp from "@modules/Awards/StreakComp";
import Header from "@modules/Header";
import { View, Text, TouchableOpacity } from "react-native";
import StreakGreetWithNumber from "./StreakGreetWithNumber";
// import { Achiever, Award } from "@models/Awards/interface";
// import { updateAchiever } from "@hooks/dayRecs/useDayRec";
// import { useAchievedAwards } from "@modules/Awards/hook/useAchievedAwards";
// import { useAchieverWithAwardStatus } from "@modules/Awards/hook/useAchieverWithAwardStatus";
import { useAward } from "@modules/Awards/hook/useAward";
import { useRoute } from "@react-navigation/native";
import { useAchiever } from "@modules/Awards/hook/useAchiever";
import StreakCompV2 from "@modules/Awards/StreakCompV2";
import { useRef } from "react";

export interface StreakAwardScreenProps {
  achieverId: string;
  awardId: string;
}
// const ac = {
//   "1": { container: 7, label: "Mon", tickStatus: "HIT" },
//   "2": { container: 7, label: "Tue", tickStatus: "HIT" },
//   "3": { container: 7, label: "Wed", tickStatus: "HIT" },
//   "4": { container: 7, label: "Thu", tickStatus: "HIT" },
//   "5": { container: 7, label: "Fri", tickStatus: "HIT" },
//   "6": { container: 7, label: "Sat" },
//   "7": { container: 7, isBadge: true, label: "Sun" },
//   "8": { container: 7, label: "Mon", tickStatus: "HIT" },
//   "9": { container: 7, label: "Tue", tickStatus: "HIT" },
//   "10": { container: 7, label: "Wed", tickStatus: "HIT" },
//   "11": { container: 7, label: "Thu", tickStatus: "HIT" },
//   "12": { container: 7, label: "Fri", tickStatus: "HIT" },
//   "13": { container: 7, label: "Sat", tickStatus: "HIT" },
// };
const StreakAwardScreen = () => {
  const route = useRoute();
  const { achieverId, awardId } = route.params as StreakAwardScreenProps;
  const { achiever } = useAchiever(achieverId);
  const { award } = useAward(awardId);
  const dayRef = useRef<number>(0);
  console.log(dayRef?.current);
  const missedIndex = achiever?.progress
    ? Object.values(achiever?.progress).findIndex(
        (i) => i.tickStatus === "MISS"
      )
    : -1;
  // updateAchiever();
  const showBroken = missedIndex !== -1;
  return (
    <View className="flex-1 bg-[#232136]">
      <Header back={true} headerColor="#232136" tone="dark" />
      <StreakGreetWithNumber
        streakNumber={dayRef.current}
        streakText={showBroken ? "Streak Broken!" : "Day Streak !"}
        isBroken={showBroken}
      />
      {/* {noStreak ? (
            <View className="w-full aspect-[4/1]" />
          ) : (
            <StreakComp  />
          )} */}
      <View className="">
        {award && achiever ? (
          <StreakCompV2 award={award} achiever={achiever} dayRef={dayRef} />
        ) : null}
      </View>

      <Text
        className="text-xs pt-4 px-4  w-4/5 mx-auto text-white/70  "
        style={{ fontFamily: "Nunito-Medium" }}
      >
        Daily Eating and Tracking will make your streak grow. Incase you skip a
        day it resets day 1
      </Text>
      <View className="absolute left-0 right-0 bottom-8 p-4">
        <TouchableOpacity className="border bg-[#7E62F0] rounded-xl py-3">
          <Text
            className="text-base text-center text-white"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StreakAwardScreen;
