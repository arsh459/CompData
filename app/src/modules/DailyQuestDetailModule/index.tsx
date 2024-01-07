import ImageWithURL from "@components/ImageWithURL";
import ProgressBar from "@components/ProgressBar";
import QuestProgressChildComp from "@modules/ChallengesMain/QuestProgressChildComp";
import Header from "@modules/Header";
import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shallow } from "zustand/shallow";
interface Props {}

// const dailyQuestDescription = "Earn 100FPs in 21 days to finish the challenge";

const DailyQuestDetailModule: React.FC<Props> = ({}) => {
  // const { today } = useAuthContext();

  const { bottom } = useSafeAreaInsets();

  const { overallProgress, done, total, name } = useUserStore((state) => {
    // const progressNumber = getOverallProgress(
    //   today,
    //   state.progress,
    //   state.dailyRewardStatus,
    //   state.user?.badgeId,
    //   state.user?.nutritionBadgeId,
    //   state.challengeDayProgress
    // );
    const fpTarget = state.currentRound?.fpTarget
      ? state.currentRound?.fpTarget
      : 1;

    const fpTotal = state.myRank?.fp ? state.myRank?.fp : 0;
    const perc = fpTotal / fpTarget;

    return {
      overallProgress: perc > 1 ? 1 : perc,
      done: fpTotal,
      total: fpTarget,
      name: state.currentRound?.name || "SocialBoat Challenge",
    };
  }, shallow);

  console.log("progress", overallProgress);

  const navigation = useNavigation();

  const onContinue = () => {
    weEventTrack("dailyQuestScreen_goBack", {});
    navigation.goBack();
  };

  return (
    <View className="flex-1">
      <Header tone="dark" back={true} headerColor="#232136" />
      <View className="flex items-center flex-1 p-4 px-6">
        <View className="mt-0">
          <View className="w-[290px] h-[290px] ">
            <ImageWithURL
              source={{
                uri: "https://ik.imagekit.io/socialboat/Frame%201000001278_FFwr91wtl.png?updatedAt=1697003566179",
              }}
              className="w-full h-full "
            />
          </View>
        </View>
        <View className="mt-3">
          <View>
            <Text
              className="text-center text-[#FFF] text-lg tracking-wide"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {name}
            </Text>
          </View>
        </View>
        <View className="mt-5">
          <View>
            <Text
              className="text-center text-[#fff]/90 text-base "
              style={{ fontFamily: "Nunito-Light" }}
              numberOfLines={8}
            >
              {`Earn ${total}FP to finish this challenge`}
            </Text>
          </View>
        </View>
        <View className="mt-11">
          <View className="w-44 ">
            <ProgressBar
              height={1}
              progress={overallProgress * 100}
              heightOfContainer={16}
              activeColor="#F4B73F"
              inActiveColor="#494667"
            >
              <QuestProgressChildComp
                progress={overallProgress}
                text={done + " / " + total + " FP"}
                textStyle="text-xs"
              />
            </ProgressBar>
          </View>
        </View>
      </View>
      <View className="px-4" style={{ paddingBottom: bottom || 20 }}>
        <ClickButton nextBtnText="Continue" onNext={onContinue} />
      </View>
    </View>
  );
};

export default DailyQuestDetailModule;
