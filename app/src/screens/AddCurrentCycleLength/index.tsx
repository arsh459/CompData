import { View } from "react-native";
import AddCurrentCycleLengthMain from "@modules/PeriodStartJourney/PeriodOnBoardMain/AddCurrentCycleLengthMain";
import { useRoute } from "@react-navigation/native";
import { GoBackParams } from "@modules/NutritionSettingMain";

const AddCurrentCycleLength = () => {
  const route = useRoute();

  const params = route.params as GoBackParams;
  return (
    <View className="flex-1 bg-[#232136]">
      <AddCurrentCycleLengthMain
        isGoback={params && params.isGoback ? true : false}
      />
    </View>
  );
};

export default AddCurrentCycleLength;
