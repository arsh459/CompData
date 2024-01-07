import { View } from "react-native";
import AddCurrentPeriodLengthMain from "@modules/PeriodStartJourney/PeriodOnBoardMain/AddCurrentPeriodLengthMain";
import { useRoute } from "@react-navigation/native";
import { GoBackParams } from "@modules/NutritionSettingMain";

const AddCurrentPeriodLength = () => {
  const route = useRoute();

  const params = route.params as GoBackParams;
  return (
    <View className="flex-1 bg-[#232136]">
      <AddCurrentPeriodLengthMain
        isGoback={params && params.isGoback ? true : false}
      />
    </View>
  );
};

export default AddCurrentPeriodLength;
