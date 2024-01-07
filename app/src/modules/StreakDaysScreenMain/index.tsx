import { ScrollView, Text, View } from "react-native";

import CalenderDays from "@modules/HomeScreen/MyProgress/CalenderDays";
import Header from "@modules/Header";

import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";
import { MonthlyStreakProvider } from "@providers/monthlyStreak/MonthlyStreakProvider";
import ProgressHighlight from "@modules/HomeScreen/MyProgress/ProgressHighlight";
import { useCurrentDayStore } from "@providers/monthlyStreak/CurrentDayStore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const StreakDaysScreenMain = () => {
  const { interactionStatus } = useInteractionContext();
  const { today } = useAuthContext();
  const navigation = useNavigation();
  const setSelDate = useCurrentDayStore((state) => state.setSelDate);

  const onBack = () => {
    setSelDate(today);
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-[#232136] ">
      <Header headerColor="#232136" tone="dark" back={true} onBack={onBack} />
      <ScrollView
        className="flex-1 bg-[#232136]"
        contentContainerStyle={{ paddingBottom: 20 }}
        bounces={false}
      >
        <View className="flex flex-row items-center px-4 pt-4">
          <Text
            className="pl-2.5 text-xl iphoneX:text-2xl text-white"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            My Fitpoints
          </Text>
        </View>
        {interactionStatus ? (
          <MonthlyStreakProvider>
            <CalenderDays />
            <ProgressHighlight />
            {/* <View className="h-10" /> */}
          </MonthlyStreakProvider>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default StreakDaysScreenMain;
