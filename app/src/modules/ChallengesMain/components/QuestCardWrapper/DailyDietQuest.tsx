import {
  // fireIcon,
  // imgProPlusShield,
  tickSquareIcon,
} from "@constants/imageKitURL";
import { useDayRec } from "@hooks/dayRecs/useDayRec";
import useQuestCalendar from "@hooks/quest/useQuestCalendar";
import QuestCard from "@modules/ChallengesMain/QuestCard";
import QuestCompleteStateCard from "@modules/ChallengesMain/QuestCompleteStateCard";

import QuestProgressChildComp from "@modules/ChallengesMain/QuestProgressChildComp";

import { handleNutritionClick } from "@modules/HomeScreen/MyPlanV2/utils";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import {
  tkProgressInterface,
  useUserStore,
} from "@providers/user/store/useUserStore";
import { useNavigation } from "@react-navigation/native";

import { TouchableOpacity, View } from "react-native";
import { shallow } from "zustand/shallow";

interface Props {}

const DailyDietQuest: React.FC<Props> = ({}) => {
  // const { today } = useAuthContext();
  const { currentDate, isInPast, isInFuture } = useQuestCalendar(
    (state) => ({
      currentDate: state.active?.currentDate,
      isInPast:
        state.active && state.today
          ? state.active?.unix < state.today?.unix
          : false,
      isInFuture:
        state.active && state.today
          ? state.active?.unix > state.today?.unix
          : false,
    }),
    shallow
  );
  // const { subStatus } = useSubscriptionContext();
  const navigation = useNavigation();

  const {
    dietProgress,
    nutritionBadgeId,
    nutritionBadgeIdEnrolled,
    startTime,
    done,
    total,
  } = useUserStore((state) => {
    const p: tkProgressInterface | undefined =
      (state.user?.nutritionBadgeId &&
        state.progress[`${state.user.nutritionBadgeId}-${currentDate}`]) ||
      undefined;

    // console.log(
    //   "DIET",
    //   state.user?.nutritionBadgeId &&
    //     state.progress[`${state.user.nutritionBadgeId}-${currentDate}`]
    // );

    return {
      dietProgress: p?.progressNumber ? p.progressNumber : 0,
      done: p?.done ? p.done : 0,
      total: p?.total ? p.total : 1,
      nutritionBadgeIdEnrolled: state.user?.nutritionBadgeIdEnrolled,
      nutritionBadgeId: state.user?.nutritionBadgeId,
      startTime: getStartTime(
        state.user?.recommendationConfig?.badgeConfig,
        state.user?.nutritionBadgeId,
        "nutrition",
        undefined,
        state.user?.recommendationConfig?.nutritionStart
      ),
    };
  }, shallow);

  useDayRec(currentDate, "nutrition", nutritionBadgeId);

  const onDietClick = () => {
    if (!isInFuture && !isInPast) {
      handleNutritionClick(
        navigation,
        nutritionBadgeIdEnrolled,
        nutritionBadgeId,
        startTime
      );
    }
  };

  return (
    <View className="pt-4">
      {dietProgress < 1 ? (
        <TouchableOpacity
          onPress={onDietClick}
          disabled={isInFuture || isInPast}
        >
          <QuestCard
            onClaimReward={onDietClick}
            hideArrow={dietProgress === 1 || isInFuture || isInPast}
            rewardText="Complete daily diet"
            progress={dietProgress || 0}
            iconUrl={tickSquareIcon}
            showProgress={true}
            isInFuture={isInFuture}
          >
            {isInFuture ? (
              <>
                <QuestProgressChildComp
                  progress={dietProgress}
                  text={"Locked"}
                  showLockIcon={true}
                />
              </>
            ) : (
              <>
                <QuestProgressChildComp
                  progress={dietProgress}
                  text={done + " / " + total + " FP"}
                />
              </>
            )}
          </QuestCard>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onDietClick}>
          <QuestCompleteStateCard
            completedText="Diet tasks are completed"
            iconUrl={tickSquareIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DailyDietQuest;
