import { MealTypes } from "@models/Tasks/Task";
import { getTaskSectionIcon } from "@modules/HomeScreen/MyPlan/utils";
import { View, Text, Image } from "react-native";
// import { useNutriTaskSection } from "./hooks/useNutriTaskSection";

interface Props {
  mealType?: MealTypes;
}

const SectionComp: React.FC<Props> = ({ mealType }) => {
  // const { nutritionSection } = useNutriTaskSection(sectionId);
  const { icon } = getTaskSectionIcon(mealType);

  return (
    <View className="flex flex-row items-center">
      <Image
        className="w-6 aspect-square "
        source={{ uri: icon }}
        resizeMode="contain"
      />

      <Text
        className="text-sm pl-1 text-[#F1F1F1]  iphoneX:text-base"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {mealType}
      </Text>
    </View>
  );
};

export default SectionComp;
