import { View, ScrollView } from "react-native";

import DailyLifestyleSetting from "./DailyLifestyleSetting";
import DietHistorySetting from "./DietHistorySetting";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import DoctorSettings from "./DoctorSettings";
import GeneralInfo from "./GeneralInfo";
import MenstrualDetails from "./MenstrualDetails";

export interface GoBackParams {
  isGoback: boolean;
}

export interface ReinitParams extends GoBackParams {
  reinit?: boolean;
}

const NutritionSettingMain = () => {
  useScreenTrack();
  return (
    <ScrollView className="bg-[#232136] flex-1">
      <View className="mb-0">
        <GeneralInfo />
      </View>
      <View className="mb-0">
        <DailyLifestyleSetting />
      </View>
      <View className="mb-0">
        <DietHistorySetting />
      </View>
      <View className="mb-0">
        <DoctorSettings />
      </View>
      <View className="mb-0">
        <MenstrualDetails />
      </View>
    </ScrollView>
  );
};

export default NutritionSettingMain;
