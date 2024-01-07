import ImageWithURL from "@components/ImageWithURL";
import { startStreak } from "@constants/imageKitURL";
import Header from "@modules/Header";
import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const StartStreakMain = () => {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  return (
    <>
      <Header back={true} tone="dark" headerColor="#232136" />
      <View className="bg-[#232136] flex-1">
        <View className=" flex-1 flex items-center justify-center">
          <ImageWithURL
            className=" w-1/2 h-1/2"
            resizeMode="contain"
            source={{ uri: startStreak }}
          />
          <Text className=" text-white text-xl my-2 font-extrabold">
            Start a streak!
          </Text>
          <Text className="text-center px-12 text-[#BDBCC3] text-base font-medium">
            Start a 7 day streak to achieve your daily FP target everyday.
          </Text>
        </View>
        <View style={{ bottom: bottom || 20 }} className=" px-4">
          <TouchableOpacity
            onPress={() => {
              weEventTrack("StartStreak_NotNow", {});

              navigation.goBack();
            }}
            className="rounded-2xl px-4 py-3 w-full mb-2"
          >
            <Text className="text-[#8163FF] text-base iphoneX:text-xl text-center">
              Not Now
            </Text>
          </TouchableOpacity>
          <ClickButton
            nextBtnText="Let's Do This"
            onNext={() => {
              weEventTrack("StartStreak_ClickCTA", {});
              navigation.navigate("StreakGoalScreen");
            }}
          />
        </View>
      </View>
    </>
  );
};

export default StartStreakMain;
