import { Linking, ScrollView, View } from "react-native";

// import { getUserTotalFP } from "@modules/HomeScreen/utills/getUserTotalFP";
import { useUserContext } from "@providers/user/UserProvider";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { BodyTypeData } from "@constants/Avatar/BodyTypeData";
import EditGoal from "./Components/EditGoal";
import DoingGreat from "./Components/DoingGreat";
import FeaturesList from "./Components/FeaturesList";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useStreakContext } from "@providers/streak/StreakProvider";

const ChangeBodyTypeMain = () => {
  const { user } = useUserContext();

  const gender =
    user?.gender && user?.gender !== "notSpecified" ? user.gender : "female";
  const currentBodyType =
    user?.currentBodyType && BodyTypeData[user?.currentBodyType].image[gender];
  const desiredBodyType =
    user?.desiredBodyType && BodyTypeData[user?.desiredBodyType].image[gender];

  const onWA = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI need help to transform myself")}`
    );

    weEventTrack("todayFitpoint_clickTalkCoach", {});
  };

  const { todaysObj } = useStreakContext();

  return (
    <View className="flex-1 bg-[#000000]">
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <EditGoal currentBody={currentBodyType} desiredBody={desiredBodyType} />

        <DoingGreat
          fpString={`${todaysObj?.achievedFP} / ${
            user?.dailyFPTarget ? user.dailyFPTarget : 35
          }`}
          percent={
            (todaysObj?.achievedFP ? todaysObj.achievedFP : 0) /
            (user?.dailyFPTarget ? user.dailyFPTarget : 35)
          }
        />
        <FeaturesList />
      </ScrollView>
      <View className="m-4 ">
        <StartButton
          title="Talk to Coach"
          bgColor="bg-[#fff]"
          textColor="text-[#100F1A] "
          roundedStr="rounded-full"
          textStyle="py-2.5 text-center text-xl font-bold rounded-md"
          onPress={onWA}
        />
      </View>
    </View>
  );
};

export default ChangeBodyTypeMain;
