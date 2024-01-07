import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "@modules/Header";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import DailyFocusStartElement from "@modules/DailyFocusStartElement";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const totalDietHistory = 5;

const DietHistoryStart = () => {
  useScreenTrack();
  const navigation = useNavigation();

  const onProceed = async () => {
    navigation.navigate("DietPreference");
    weEventTrack("dietFormDietHistory_clickNext", {});
  };

  const { bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#232136]">
      <Header back={true} headerColor="#232136" tone="dark" />
      <View className="flex-1">
        <DailyFocusStartElement primaryText="03" secondaryText="Diet Details" />
        <View style={{ paddingBottom: bottom || 16 }} className="px-4">
          <StartButton
            title={"Proceed"}
            bgColor="bg-[#6D55D1]"
            textColor="text-[#fff] "
            roundedStr="rounded-2xl"
            textStyle="py-3 text-center text-xl"
            onPress={onProceed}
            fontFamily="Nunito-Bold"
          />
        </View>
      </View>
    </View>
  );
};

export default DietHistoryStart;
