import { stepsImage } from "@constants/imageKitURL";
import useQuestCalendar from "@hooks/quest/useQuestCalendar";
import { usePlainSteps } from "@hooks/steps/usePlainSteps";
import QuestCard from "@modules/ChallengesMain/QuestCard";
import QuestProgressChildComp from "@modules/ChallengesMain/QuestProgressChildComp";
import { useUserStore } from "@providers/user/store/useUserStore";

import { TouchableOpacity, View } from "react-native";
import { shallow } from "zustand/shallow";

interface Props {}

const DailyStepsQuest: React.FC<Props> = ({}) => {
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

  const { dailyStepsTarget } = useUserStore((state) => {
    return {
      dailyStepsTarget: state.user?.dailyStepTarget
        ? state.user.dailyStepTarget
        : 7000,
    };
  }, shallow);

  const { daySteps } = usePlainSteps(currentDate);

  // console.log("daySteps", daySteps);

  const walked = daySteps?.steps ? daySteps.steps : 0;
  const walkProgressInt = walked / dailyStepsTarget;
  const walkProgress = walkProgressInt >= 1 ? 1 : walkProgressInt;
  // const stepsFP = Math.floor(walked / 1000);
  // const stepsFPTarget = Math.floor(dailyStepsTarget / 1000);

  // console.log("stepsFP", stepsFP);

  return (
    <View className="pt-4">
      <TouchableOpacity disabled={isInFuture || isInPast}>
        <QuestCard
          onClaimReward={() => {}}
          hideArrow={true}
          rewardText={`Walk ${dailyStepsTarget} steps everyday`}
          progress={walkProgress || 0}
          iconUrl={stepsImage}
          showProgress={true}
          isInFuture={isInFuture}
        >
          {isInFuture ? (
            <>
              <QuestProgressChildComp
                progress={walkProgress}
                text={"Locked"}
                showLockIcon={true}
              />
            </>
          ) : (
            <>
              <QuestProgressChildComp
                progress={walkProgress}
                // text={stepsFP + " / " + stepsFPTarget + " FP"}
                text={`${walked} steps`}
              />
            </>
          )}
        </QuestCard>
      </TouchableOpacity>
    </View>
  );
};

export default DailyStepsQuest;
