import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  Linking,
} from "react-native";

import CirclePercent from "@components/CirclePercent";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { waBaseLink } from "@constants/links";
// import { useStreakContext } from "@providers/streak/StreakProvider";
import { useTodaysGoal } from "@providers/streak/hooks/useTodaysGoal";
import { useUserContext } from "@providers/user/UserProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const StepsTargetMain = () => {
  const { width: Width } = useWindowDimensions();
  const { todaysObj } = useTodaysGoal();
  const { user } = useUserContext();
  const onWA = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI want to know about my fp target")}`
    );
    weEventTrack("click_wa", {});
  };

  const prog =
    (todaysObj?.achievedFP ? todaysObj.achievedFP : 0) /
    (user?.dailyFPTarget ? user.dailyFPTarget : 1);

  return (
    <View className="pt-32 flex-1 bg-[#13121E] flex ">
      <ScrollView className="flex-1 bg-[#13121E] ">
        <View className="flex items-center  justify-center">
          <CirclePercent
            circleSize={Width * 0.576}
            percent={prog}
            activeColor={"#FF3A80"}
            strokeWidth={12}
            padding={2}
            inActiveColor="#FFFFFF2E"
            showInactive={true}
          >
            <View className="flex items-center justify-center absolute left-0 right-0 top-0 bottom-0">
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                className="text-white text-3xl"
              >
                {todaysObj?.achievedFP ? todaysObj?.achievedFP : 0}/
                {user?.dailyFPTarget ? user.dailyFPTarget : 0}
              </Text>
            </View>
          </CirclePercent>
          <Text
            className="text-[#F1F1F1] text-xl iphoneX:text-2xl py-7"
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            My Daily Target
          </Text>
        </View>
        <View
          className="flex items-center mx-auto w-4/5"
          // style={{ width: Width * 0.826 }}
        >
          <Text className="text-[#F1F1F1] text-lg font-sans font-normal  pb-11">
            Your Daily Fitpoint target help you achieve a 360 degree
            transformation.
          </Text>
          <Text className="text-[#F1F1F1] text-lg font-sans font-normal ">
            To get expert guidance and a custom plan click on the button below.
          </Text>
        </View>
      </ScrollView>
      <View className="m-4">
        <StartButton
          title="Talk to Coach"
          bgColor="bg-[#fff]"
          textColor="text-[#100F1A] "
          roundedStr="rounded-full"
          textStyle="py-2 text-center text-xl font-bold rounded-md"
          onPress={onWA}
        />
      </View>
    </View>
  );
};

export default StepsTargetMain;
