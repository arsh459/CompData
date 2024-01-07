import { fireIcon } from "@constants/imageKitURL";
import { useDayRec } from "@hooks/dayRecs/useDayRec";
import useQuestCalendar from "@hooks/quest/useQuestCalendar";
import QuestCard from "@modules/ChallengesMain/QuestCard";
import QuestCompleteStateCard from "@modules/ChallengesMain/QuestCompleteStateCard";
// import QuestLockedIcon from "@modules/ChallengesMain/QuestLockedIcon";
import QuestProgressChildComp from "@modules/ChallengesMain/QuestProgressChildComp";
import { handleWorkoutClick } from "@modules/HomeScreen/MyPlanV2/utils";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import {
  tkProgressInterface,
  useUserStore,
} from "@providers/user/store/useUserStore";
import { useNavigation } from "@react-navigation/native";
// import clsx from "clsx";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { shallow } from "zustand/shallow";

interface Props {}

const DailyWorkoutQuest: React.FC<Props> = ({}) => {
  const onWorkoutClick = () => {};

  const { currentDate, isInPast, isInFuture } = useQuestCalendar((state) => ({
    currentDate: state.active?.currentDate,
    isInPast:
      state.active && state.today
        ? state.active?.unix < state.today?.unix
        : false,
    isInFuture:
      state.active && state.today
        ? state.active?.unix > state.today?.unix
        : false,
  }));
  // const { today } = useAuthContext();
  // const currentDate = useQuestCalendar((state) => state.active?.currentDate);
  const navigation = useNavigation();

  const { workoutProgress, badgeId, badgeIdEnrolled, startTime, done, total } =
    useUserStore((state) => {
      const p: tkProgressInterface | undefined =
        (state.user?.badgeId &&
          state.progress[`${state.user.badgeId}-${currentDate}`]) ||
        undefined;

      console.log(
        "Workout",
        state.user?.badgeId &&
          state.progress[`${state.user.badgeId}-${currentDate}`]
      );

      return {
        badgeId: state.user?.badgeId,
        badgeIdEnrolled: state.user?.badgeIdEnrolled,
        workoutProgress: p?.progressNumber ? p.progressNumber : 0,
        done: p?.done ? p.done : 0,
        total: p?.total ? p.total : 1,

        startTime: getStartTime(
          state.user?.recommendationConfig?.badgeConfig,
          state.user?.badgeId,
          "workout",
          state.user?.recommendationConfig?.start,
          undefined
        ),
      };
    }, shallow);

  useDayRec(currentDate, "workout", badgeId);

  const onQuestClick = () => {
    if (!isInFuture && !isInPast)
      handleWorkoutClick(navigation, badgeIdEnrolled, badgeId, startTime);
  };

  return (
    <View className="pt-4">
      {workoutProgress < 1 ? (
        <>
          <TouchableOpacity
            onPress={onQuestClick}
            disabled={isInFuture || isInPast}
          >
            <QuestCard
              onClaimReward={onWorkoutClick}
              hideArrow={workoutProgress === 1 || isInFuture || isInPast}
              rewardText="Complete daily workouts"
              progress={workoutProgress || 0}
              iconUrl={fireIcon}
              showProgress={true}
              isInFuture={isInFuture}
            >
              {isInFuture ? (
                <>
                  <QuestProgressChildComp
                    progress={workoutProgress}
                    text={"Locked"}
                    showLockIcon={true}
                  />
                </>
              ) : (
                <>
                  <QuestProgressChildComp
                    progress={workoutProgress}
                    text={done + " / " + total + " FP"}
                  />
                </>
              )}
            </QuestCard>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={onQuestClick}>
            <QuestCompleteStateCard
              iconUrl={fireIcon}
              completedText={"Completed All task in diet"}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default DailyWorkoutQuest;
