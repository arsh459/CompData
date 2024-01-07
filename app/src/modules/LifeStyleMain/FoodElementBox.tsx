import { View, Text } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import SelectFoodCardItem from "./SelectFoodCardItem";
import { getSelectFoodItemsHeaderIcon } from "./utils";
import { MealTypesDietForm } from "@models/User/User";

interface Props {
  foodChoices: string[];
  handleOptionToggle: (
    meal: MealTypesDietForm,
    option: string,
    isSelected: boolean
  ) => void;
  selectedOptions?: Record<string, boolean>;
  color: string;
  mealType: "breakfast" | "lunch" | "dinner";
  containerColor?: string;
}

const FoodElementBox: React.FC<Props> = ({
  foodChoices,
  handleOptionToggle,
  selectedOptions,
  color,
  mealType,
  containerColor,
}) => {
  const uri = getSelectFoodItemsHeaderIcon(mealType);

  return (
    <View
      className="   m-4 rounded-2xl"
      style={{ backgroundColor: containerColor ? containerColor : "#503131" }}
    >
      <View
        className="flex flex-row items-center  py-2 px-4 rounded-t-2xl "
        style={{ backgroundColor: color ? color : undefined }}
      >
        <ImageWithURL
          source={{ uri: uri.icon }}
          className="w-5 aspect-square"
        />
        <Text
          className="text-[#351D00] pl-1.5 text-xl"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {uri.text}
        </Text>
      </View>
      <View className="  flex flex-row flex-wrap p-2.5 flex-1">
        {foodChoices.map((item) => {
          const isSelected =
            (selectedOptions && selectedOptions?.[item]) || false;

          return (
            <View key={item} className="relative z-0">
              <SelectFoodCardItem
                onPress={() => handleOptionToggle(mealType, item, isSelected)}
                item={item}
                isSelected={isSelected}
                color={color}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default FoodElementBox;
