import { View } from "react-native";
import NutritientTargetProgress from "../DaySelector/V3/NutritientTargetProgress";
import { badgeNutritionParams } from "@models/Prizes/Prizes";

interface Props {
  targets?: badgeNutritionParams | undefined;
}

const IndividualMeters: React.FC<Props> = ({ targets }) => {
  const totalProtien = targets?.protein ? targets.protein : 1;
  const totalCarbs = targets?.carbs ? targets.carbs : 1;
  const totalFats = targets?.fats ? targets.fats : 1;
  const totalFiber = targets?.fiber ? targets.fiber : 1;

  return (
    <View className="w-full">
      <View className=" pb-8 flex flex-1 flex-row justify-between ">
        <View className="pr-4  w-1/2">
          <NutritientTargetProgress text="protein" target={totalProtien} />
        </View>
        <View className="pl-4  w-1/2">
          <NutritientTargetProgress text="fiber" target={totalFiber} />
        </View>
      </View>
      <View className=" flex flex-1 flex-row justify-between ">
        <View className="pr-4 w-1/2 ">
          <NutritientTargetProgress text="fats" target={totalFats} />
        </View>
        <View className="pl-4 w-1/2 ">
          <NutritientTargetProgress text="carbs" target={totalCarbs} />
        </View>
      </View>
    </View>
  );
};

export default IndividualMeters;
