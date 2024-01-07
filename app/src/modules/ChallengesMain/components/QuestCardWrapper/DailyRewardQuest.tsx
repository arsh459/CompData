import { startYellow, treasureSmallIcon } from "@constants/imageKitURL";
import QuestCard from "@modules/ChallengesMain/QuestCard";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { View } from "react-native";
import { shallow } from "zustand/shallow";

interface Props {}

const DailyRewardQuest: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const onClaimDailyReward = () => {
    navigation.navigate("ClaimScreen");
    weEventTrack("challengeClaimReward", {});
  };

  const { today } = useAuthContext();

  const { todayProgress, dailyRewardStatus } = useUserStore((state) => {
    return {
      todayProgress: state.dailyRewardObjs[today] ? 1 : 0,
      dailyRewardStatus: state.dailyRewardStatus,
    };
  }, shallow);

  let btnText = "Claim now";
  let showClaim = dailyRewardStatus === "claim";
  if (dailyRewardStatus === "claimed") {
    btnText = "View Progress";
    showClaim = false;
  } else if (dailyRewardStatus === "missed") {
    btnText = "Restart Daily Reward";
    showClaim = false;
  }

  if (dailyRewardStatus === "unknown") {
    return <></>;
  }

  return (
    <View className="pt-4">
      <QuestCard
        onClaimReward={onClaimDailyReward}
        btnText={btnText}
        rewardText={"Daily Reward"}
        progress={todayProgress}
        iconUrl={startYellow}
        btnImg={showClaim ? treasureSmallIcon : ""}
        showProgress={true}
        nextRewardTime={showClaim ? "" : "Claim your Next Reward tomorrow"}
        containerStyleTw="bg-[#AD90FE]"
        hideArrow={!showClaim}
        isShimmer={!showClaim}
      />
    </View>
  );
};

export default DailyRewardQuest;
