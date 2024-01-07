import { fireIcon } from "@constants/imageKitURL";
import useQuestCalendar from "@hooks/quest/useQuestCalendar";
import QuestCard from "@modules/ChallengesMain/QuestCard";
import QuestCompleteStateCard from "@modules/ChallengesMain/QuestCompleteStateCard";
// import QuestLockedIcon from "@modules/ChallengesMain/QuestLockedIcon";
import QuestProgressChildComp from "@modules/ChallengesMain/QuestProgressChildComp";
import { useUserStore } from "@providers/user/store/useUserStore";
// import { useNavigation } from "@react-navigation/native";
// import clsx from "clsx";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { shallow } from "zustand/shallow";

interface Props {}

const ReferFriendQuest: React.FC<Props> = ({}) => {
  const onWorkoutClick = () => {};

  /**
   *
   * State of current referrals.
   *
   *
   */

  useUserStore(
    (state) => ({
      roundStart: state.currentRound?.start,
      roundEnd: state.currentRound?.end,
    }),
    shallow
  );

  const { isInPast, isInFuture } = useQuestCalendar((state) => ({
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
  // const navigation = useNavigation();

  const referProgress = 0;
  const done = 1;
  const total = 0;
  const onReferClick = () => {};

  return (
    <View className="pt-4">
      {referProgress < 1 ? (
        <>
          <TouchableOpacity
            onPress={onReferClick}
            disabled={isInFuture || isInPast}
          >
            <QuestCard
              onClaimReward={onWorkoutClick}
              // hideArrow={referProgress === 1 || isInFuture || isInPast}
              rewardText="Complete daily workouts"
              progress={referProgress || 0}
              iconUrl={fireIcon}
              showProgress={true}
              isInFuture={isInFuture}
            >
              {isInFuture ? (
                <>
                  <QuestProgressChildComp
                    progress={referProgress}
                    text={"Locked"}
                    showLockIcon={true}
                  />
                </>
              ) : (
                <>
                  <QuestProgressChildComp
                    progress={referProgress}
                    text={done + " / " + total + " FP"}
                  />
                </>
              )}
            </QuestCard>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={onReferClick}>
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

export default ReferFriendQuest;
