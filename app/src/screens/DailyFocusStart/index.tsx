import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Header from "@modules/Header";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import DailyFocusStartElement from "@modules/DailyFocusStartElement";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
export const totalDailyFocus = 5;
const DailyFocusStart = () => {
  const navigation = useNavigation();
  useScreenTrack();

  const onProceed = async () => {
    weEventTrack("dietFormDailyFocus_clickNext", {});
    navigation.navigate("TargetWeight");
  };

  const { bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#232136]">
      <Header back={true} headerColor="#232136" tone="dark" />
      <View className="flex-1">
        <DailyFocusStartElement primaryText="01" secondaryText="Basic Info" />
        <View style={{ paddingBottom: bottom || 16 }} className="px-4">
          <StartButton
            title={"Proceed"}
            bgColor="bg-[#6D55D1]"
            textColor="text-[#fff] "
            roundedStr="rounded-2xl"
            textStyle="py-3 text-center text-xl  "
            onPress={onProceed}
            fontFamily="Nunito-Bold"
          />
        </View>
      </View>
    </View>
  );
};

export default DailyFocusStart;
