import { View, ScrollView } from "react-native";
import MealCard from "./components/mealCardComp/MealCard";
import MealHeader from "./components/headerComp/MealHeader";
import { useMealStore } from "./store/useMealStore";
import { shallow } from "zustand/shallow";
import ItemsAdded from "./components/trackerComp/ItemsAdded";
import MealHeaderMain from "./components/headerComp/MealHeaderMain";
import { SwapItemParams } from "@screens/AddNewItemLoadingScreen/utils";
import { RootStackParamList } from "@routes/MainStack";
interface Props {
  toBeSwaped?: SwapItemParams;
  navBackScreen?: keyof RootStackParamList;
  dayRecommendationId?: string;
}
const MealMain: React.FC<Props> = ({
  toBeSwaped,
  navBackScreen,
  dayRecommendationId,
}) => {
  const { subTasks } = useMealStore(({ task }) => {
    return {
      subTasks: task?.subTasks,
    };
  }, shallow);

  return (
    <View className="flex-1 bg-[#232136]">
      <MealHeaderMain
        toBeSwaped={toBeSwaped}
        dayRecommendationId={dayRecommendationId}
      />
      <ScrollView bounces={false} className="flex-1">
        <MealHeader />
        <View className="py-2">
          {subTasks?.map((item, index) => (
            <MealCard key={`${item.subTaskId}-${index}`} item={item} />
          ))}
        </View>
      </ScrollView>

      <ItemsAdded toBeSwaped={toBeSwaped} navBackScreen={navBackScreen} />
    </View>
  );
};

export default MealMain;
