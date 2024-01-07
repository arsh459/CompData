import { ScrollView, View } from "react-native";
import React from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import HabitBuilderSection from "./components/HabitBuilder/HabitBuilderSection";
import CompletedQuest from "./CompletedQuest";
import { useDailyRewardProgress } from "@hooks/rounds/useDailyRewardProgress";

import QuestCardWrapper from "./components/QuestCardWrapper/QuestCardWrapper";
import { getChallengeTimingString } from "./utils";
import Loading from "@components/loading/Loading";

import QuestCalendarHeading from "./components/QuestCalendar/QuestCalendarHeading";
import HorizontalDayComp from "./components/QuestCalendar/HorizontalDayComp";
import ChallengeStatusComp from "./components/QuestCalendar/ChallengeStatusComp";
const now = Date.now();

const GoalSection = () => {
  // const hoursRemaining = differenceInHours(endOfToday, Date.now());

  useDailyRewardProgress();

  const round = useUserStore((state) => state.currentRound, shallow);
  const isCompleted = round?.end && round.end < now;
  // const isCompleted = false;
  // const toStart = round?.start && now < round?.start ? true : false;
  const startIn = getChallengeTimingString(round?.start, round?.end);

  // console.log("startIn", startIn);

  return (
    <View className="flex-1 h-full ">
      {!round?.start ? (
        <View className="flex-1 flex items-center justify-center py-8">
          <Loading width="w-12" height="h-12" />
        </View>
      ) : isCompleted || startIn ? (
        <View className="flex-1">
          <CompletedQuest startIn={startIn} />
        </View>
      ) : (
        <ScrollView
          className="flex-1 h-full"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <HabitBuilderSection />
          <QuestCalendarHeading />
          <HorizontalDayComp />
          <ChallengeStatusComp />

          {round?.taskOrder.map((item) => {
            return (
              <View key={item}>
                <QuestCardWrapper taskType={item} />
              </View>
            );
          })}
          <View className="w-8 aspect-square" />
        </ScrollView>
      )}
    </View>
  );
};

export default GoalSection;
